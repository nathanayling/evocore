import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

async function getTodayFootballFixtures() {
  try {
    const token = process.env.SPORTMONKS_API_TOKEN;

    if (!token) return null;

    const today = new Date().toISOString().split("T")[0];

    const url = new URL(
      `https://api.sportmonks.com/v3/football/fixtures/date/${today}`
    );

    url.searchParams.set("api_token", token);
    url.searchParams.set(
      "include",
      "participants;league;scores;state;venue"
    );

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();

      console.error("SportMonks API Error:", {
        status: response.status,
        url: url.toString(),
        body: text,
      });

      return null;
    }

    return response.json();
  } catch (error) {
    console.error("SportMonks API Error:", error);
    return null;
  }
}

function extractJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = (messages || [])
      .filter((m: ChatMessage) => m.role && m.content)
      .slice(-10);

    const latestUserMessage =
      [...safeMessages].reverse().find((m: ChatMessage) => m.role === "user")
        ?.content || "";

    const lowerMessage = latestUserMessage.toLowerCase();

    const wantsSignalDashboard =
      lowerMessage.includes("strongest") ||
      lowerMessage.includes("signals") ||
      lowerMessage.includes("today") ||
      lowerMessage.includes("value") ||
      lowerMessage.includes("fixtures") ||
      lowerMessage.includes("matches");

    const footballData = await getTodayFootballFixtures();
    const fixtures = footballData?.data || [];

    const compactFixtures = fixtures.slice(0, 15).map((fixture: any) => {
      const participants = fixture.participants || [];

      const home =
        participants.find((team: any) => team.meta?.location === "home") ||
        participants[0];

      const away =
        participants.find((team: any) => team.meta?.location === "away") ||
        participants[1];

      return {
        fixture_id: fixture.id,
        name: fixture.name,
        starting_at: fixture.starting_at,
        league: fixture.league?.name,
        state: fixture.state?.name,
        venue: fixture.venue?.name,
        home_team: home?.name,
        away_team: away?.name,
        scores: fixture.scores || [],
      };
    });

    const footballContext =
      compactFixtures.length > 0
        ? JSON.stringify(compactFixtures)
        : "No live football fixtures available.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content: wantsSignalDashboard
            ? `
You are EvoCore Football Intelligence.

You MUST return valid JSON only. No markdown. No prose before or after JSON.

Use this exact JSON shape:

{
  "type": "football_signals",
  "title": "Strongest Football Signals Today",
  "summary": "Short 1-2 sentence summary.",
  "topSignals": [
    {
      "race": "League / Match Time",
      "selection": "Team or Match Angle",
      "odds": "N/A",
      "confidence": "High",
      "risk": "Medium",
      "summary": "Short reason this is a strong football signal.",
      "reasons": [
        "Reason 1",
        "Reason 2",
        "Reason 3"
      ]
    }
  ],
  "riskWatch": [
    {
      "race": "League / Match Time",
      "selection": "Team or Match Angle",
      "risk": "Medium",
      "reason": "Short risk explanation."
    }
  ],
  "keyTakeaways": [
    "Short takeaway 1",
    "Short takeaway 2",
    "Short takeaway 3"
  ],
  "disclaimer": "Educational analysis only. No outcome is guaranteed."
}

Important naming:
- Use "race" field as the match label because the frontend currently uses shared racing/football cards.
- Use "selection" for team, match, or angle.
- Use "odds": "N/A" unless odds are provided.

Rules:
- Use live football fixture data only.
- Do not invent xG, form, odds, injuries, or team stats unless provided.
- If data is thin, make confidence Medium or Low.
- Focus on fixture context, league, timing, teams, and obvious match risk.
- Keep all strings concise.
- Return 3 to 5 topSignals maximum.
- Return 2 to 4 riskWatch items maximum.

LIVE FOOTBALL DATA:
${footballContext}
`
            : `
You are EvoCore Football Intelligence.

You help users understand football fixtures, match trends, team form, prediction reasoning, risk factors, and value angles.

Rules:
- Be clear, concise, practical, and data-led.
- Use the live football data if available.
- Do not invent xG, odds, injuries, or form stats unless they are provided.
- If live data is missing, say the SportMonks connector returned no data.
- Do not guarantee outcomes.
- Keep betting-related answers educational and risk-aware.

LIVE FOOTBALL DATA:
${footballContext}
`,
        },
        ...safeMessages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    });

    const rawAnswer =
      completion.choices[0]?.message?.content ||
      "I could not generate a football response.";

    if (wantsSignalDashboard) {
      const structured = extractJson(rawAnswer);

      if (structured) {
        return NextResponse.json({
          answer: structured.summary || "Football signal analysis generated.",
          structured,
        });
      }
    }

    return NextResponse.json({
      answer: rawAnswer,
      structured: null,
    });
  } catch (error) {
    console.error("Football chat error:", error);

    return NextResponse.json(
      { error: "Football chat failed" },
      { status: 500 }
    );
  }
}
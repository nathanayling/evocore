import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

async function getTodayRacecards() {
  try {
    const url = `${process.env.RACING_API_BASE_URL}/racecards/standard`;

    const response = await fetch(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.RACING_API_USERNAME}:${process.env.RACING_API_PASSWORD}`
          ).toString("base64"),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();

      console.error("Racing API Error:", {
        status: response.status,
        url,
        body: text,
      });

      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Racing API Error:", error);
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

function shouldUseStructuredResponse(message: string) {
  const lower = message.toLowerCase();

  return (
    lower.includes("strongest") ||
    lower.includes("signals") ||
    lower.includes("today") ||
    lower.includes("value") ||
    lower.includes("likely") ||
    lower.includes("win") ||
    lower.includes("winner") ||
    lower.includes("best") ||
    lower.includes("race") ||
    lower.includes("horse") ||
    lower.includes("bath") ||
    lower.includes("risk") ||
    lower.includes("odds") ||
    lower.includes("which") ||
    lower.includes("who")
  );
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

    const wantsStructuredResponse =
      shouldUseStructuredResponse(latestUserMessage);

    const racingData = await getTodayRacecards();
    const racecards = racingData?.racecards || [];

    const compactRacecards = racecards.slice(0, 14).map((race: any) => ({
      race: `${race.off_time || ""} ${race.course || ""}`.trim(),
      race_name: race.race_name,
      course: race.course,
      off_time: race.off_time,
      distance: race.distance,
      going: race.going,
      runners:
        race.runners?.slice(0, 12).map((runner: any) => ({
          horse: runner.horse,
          odds: runner.odds,
          jockey: runner.jockey,
          trainer: runner.trainer,
          age: runner.age,
          weight: runner.weight,
          form: runner.form,
          draw: runner.draw,
        })) || [],
    }));

    const racingContext =
      compactRacecards.length > 0
        ? JSON.stringify(compactRacecards)
        : "No live racecards available.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content: wantsStructuredResponse
            ? `
You are EvoCore Racing Intelligence.

You MUST return valid JSON only. No markdown. No prose before or after JSON.

Use this exact JSON shape for every structured racing response:

{
  "type": "racing_analysis",
  "title": "Short analysis title",
  "summary": "Short 1-2 sentence answer to the user's question.",
  "topSignals": [
    {
      "event": "2:30 Bath",
      "selection": "Horse Name",
      "odds": "3/1",
      "confidence": "High",
      "risk": "Medium",
      "summary": "Short reason this is the strongest signal or answer.",
      "reasons": [
        "Reason 1",
        "Reason 2",
        "Reason 3"
      ]
    }
  ],
  "riskWatch": [
    {
      "event": "3:00 Bath",
      "selection": "Horse Name",
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

Rules:
- Answer the latest user question directly.
- Use live racecard data only.
- Do not invent trainer/jockey strike rates unless provided.
- Do not invent market movement unless odds movement data is provided.
- If data is thin, use Medium or Low confidence.
- Focus on odds, race context, going, form fields, runner profile, and obvious market shape.
- Keep all strings concise.
- Return 1 to 5 topSignals maximum.
- Return 0 to 4 riskWatch items maximum.
- If the user asks "who is most likely to win", make the topSignals list ranked with the most likely first.
- If the user asks "which race is most likely", use topSignals to show the clearest race/selection combos.

LIVE RACING DATA:
${racingContext}
`
            : `
You are EvoCore Racing Intelligence.

You help users analyse horse racing data, race cards, horse profiles, trainer form, jockey form, pace setup, going suitability, market movement, prediction reasoning, risk factors, and value angles.

Rules:
- Be clear, concise, practical, and data-led.
- Use the live racing data if available.
- Do not guarantee outcomes.
- Keep betting-related analysis educational and risk-aware.
- Do not invent data that is not provided.

LIVE RACING DATA:
${racingContext}
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
      "I could not generate a racing response.";

    if (wantsStructuredResponse) {
      const structured = extractJson(rawAnswer);

      if (structured) {
        return NextResponse.json({
          answer: structured.summary || "Racing analysis generated.",
          structured,
        });
      }
    }

    return NextResponse.json({
      answer: rawAnswer,
      structured: null,
    });
  } catch (error) {
    console.error("Racing chat error:", error);

    return NextResponse.json(
      { error: "Racing chat failed" },
      { status: 500 }
    );
  }
}
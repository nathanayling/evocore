import { NextResponse } from "next/server";
import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getPrivateKey(value?: string) {
  return value?.replace(/\\n/g, "\n");
}

function getAdminApp(name: string, config: {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}) {
  const existing = getApps().find((app) => app.name === name);

  if (existing) return existing;

  return initializeApp(
    {
      credential: cert({
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKey: getPrivateKey(config.privateKey),
      }),
    },
    name
  );
}

const evoCoreApp = getAdminApp("evocore", {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.EVOCORE_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.EVOCORE_FIREBASE_PRIVATE_KEY,
});

const footyApp = getAdminApp("footyevo", {
  projectId: process.env.FOOTYEVO_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FOOTYEVO_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FOOTYEVO_FIREBASE_PRIVATE_KEY,
});

const raceApp = getAdminApp("raceevo", {
  projectId: process.env.RACEEVO_FIREBASE_PROJECT_ID,
  clientEmail: process.env.RACEEVO_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.RACEEVO_FIREBASE_PRIVATE_KEY,
});

async function checkProByEmail(app: any, email: string) {
  const db = getFirestore(app);

  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).limit(1).get();

  if (snapshot.empty) return false;

  const data = snapshot.docs[0].data();

  return (
    data.plan === "pro" ||
    data.plan === "premium" ||
    data.subscriptionStatus === "active" ||
    data.stripeSubscriptionStatus === "active" ||
    data.isPro === true
  );
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = await getAuth(evoCoreApp).verifyIdToken(token);

    if (!decoded.email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    const email = decoded.email.toLowerCase();

    const [footyEvoPro, raceEvoPro] = await Promise.all([
      checkProByEmail(footyApp, email),
      checkProByEmail(raceApp, email),
    ]);

    return NextResponse.json({
      email,
      entitlements: {
        footyEvoPro,
        raceEvoPro,
        oddsEvoPro: false,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to check entitlements" },
      { status: 500 }
    );
  }
}
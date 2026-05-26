"use client";

import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, googleProvider } from "@/lib/firebase";

type Entitlements = {
  footyEvoPro: boolean;
  raceEvoPro: boolean;
  oddsEvoPro: boolean;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  entitlements: Entitlements | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshEntitlements: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const defaultEntitlements: Entitlements = {
  footyEvoPro: false,
  raceEvoPro: false,
  oddsEvoPro: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [entitlements, setEntitlements] =
    useState<Entitlements | null>(null);

  async function refreshEntitlements() {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setEntitlements(null);
      return;
    }

    const token = await currentUser.getIdToken();

    const res = await fetch("/api/entitlements/check", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      setEntitlements(defaultEntitlements);
      return;
    }

    const data = await res.json();
    setEntitlements(data.entitlements ?? defaultEntitlements);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        await refreshEntitlements();
      } else {
        setEntitlements(null);
      }
    });

    return () => unsubscribe();
  }, []);

  async function signInWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    await refreshEntitlements();
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider);
    await refreshEntitlements();
  }

  async function logout() {
    await signOut(auth);
    setEntitlements(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      entitlements,
      signInWithEmail,
      signInWithGoogle,
      logout,
      refreshEntitlements,
    }),
    [user, loading, entitlements]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
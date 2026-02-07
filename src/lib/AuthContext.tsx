import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id?: string;
  name?: string;
  email?: string;
  tier?: string;
  memberSince?: string;
  orderCount?: number;
};

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Try refresh on mount (server should read httpOnly refresh cookie)
  useEffect(() => {
    (async () => {
      try {
        await refresh();
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    try {
      // Demo credentials for testing
      if (email === "demo@roastville.com" && password === "demo123") {
        const dummyUser: User = {
          id: "1",
          name: "Demo User",
          email: "demo@roastville.com",
          tier: "Bloom",
          memberSince: "2024-01-15",
          orderCount: 8,
        };
        setAccessToken("demo-token-" + Date.now());
        setUser(dummyUser);
        try {
          if (remember) localStorage.setItem("rv_remember", "1");
        } catch (e) {
          // ignore storage errors
        }
        return true;
      }

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setAccessToken(data.accessToken ?? null);
      setUser(data.user ?? null);
      try {
        if (remember) localStorage.setItem("rv_remember", "1");
      } catch (e) {
        // ignore storage errors
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const refresh = async () => {
    try {
      // always include credentials so httpOnly refresh cookie can be used
      const res = await fetch(`/api/auth/refresh`, { method: "POST", credentials: "include" });
      if (!res.ok) return false;
      const data = await res.json();
      setAccessToken(data.accessToken ?? null);
      setUser(data.user ?? null);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`/api/auth/logout`, { method: "POST", credentials: "include" });
    } catch (e) {
      // noop
    }
    setAccessToken(null);
    setUser(null);
    try {
      localStorage.removeItem("rv_remember");
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

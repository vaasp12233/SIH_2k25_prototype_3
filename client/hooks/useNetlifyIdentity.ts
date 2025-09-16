import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    netlifyIdentity?: any;
  }
}

export type IdentityUser = {
  id?: string;
  email?: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
  app_metadata?: { provider?: string };
} | null;

export function useNetlifyIdentity() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<IdentityUser>(null);

  useEffect(() => {
    const id = window.netlifyIdentity;
    if (!id) return;

    const handleInit = (u: IdentityUser) => {
      setUser(u);
      setReady(true);
    };
    const handleLogin = (u: IdentityUser) => setUser(u);
    const handleLogout = () => setUser(null);

    try {
      id.on("init", handleInit);
      id.on("login", handleLogin);
      id.on("logout", handleLogout);
      id.init();
    } catch {}

    return () => {
      try {
        id.off("init", handleInit);
        id.off("login", handleLogin);
        id.off("logout", handleLogout);
      } catch {}
    };
  }, []);

  const openLogin = useCallback(() => {
    const id = window.netlifyIdentity;
    if (!id) return false;
    try {
      id.open("login");
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    const id = window.netlifyIdentity;
    if (!id) return false;
    try {
      id.logout();
      return true;
    } catch {
      return false;
    }
  }, []);

  return { ready, user, openLogin, logout };
}

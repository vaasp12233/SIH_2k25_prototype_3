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
    function setup(identity: any) {
      const handleInit = (u: IdentityUser) => {
        setUser(u);
        setReady(true);
      };
      const handleLogin = (u: IdentityUser) => setUser(u);
      const handleLogout = () => setUser(null);
      try {
        identity.on("init", handleInit);
        identity.on("login", handleLogin);
        identity.on("logout", handleLogout);
        identity.init();
      } catch {}
      return () => {
        try {
          identity.off("init", handleInit);
          identity.off("login", handleLogin);
          identity.off("logout", handleLogout);
        } catch {}
      };
    }

    if (window.netlifyIdentity) {
      return setup(window.netlifyIdentity);
    }

    const script = document.querySelector(
      'script[src="https://identity.netlify.com/v1/netlify-identity-widget.js"]',
    ) as HTMLScriptElement | null;

    let cleanup: (() => void) | undefined;

    const onLoad = () => {
      if (window.netlifyIdentity) {
        cleanup = setup(window.netlifyIdentity);
      }
    };

    if (script) {
      script.addEventListener("load", onLoad, { once: true });
    }

    const timer = window.setInterval(() => {
      if (window.netlifyIdentity) {
        window.clearInterval(timer);
        cleanup = setup(window.netlifyIdentity);
      }
    }, 300);

    return () => {
      window.clearInterval(timer);
      if (script) script.removeEventListener("load", onLoad);
      if (cleanup) cleanup();
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

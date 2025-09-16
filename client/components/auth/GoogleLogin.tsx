import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Minimal JWT parsing to read profile claims from the ID token
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

interface Profile {
  name?: string;
  email?: string;
  picture?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const google: any;
}

type GoogleMode = "signin" | "signup";

export default function GoogleLogin({
  size = "large",
  mode = "signin",
}: {
  size?: "large" | "medium" | "small";
  mode?: GoogleMode;
}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const btnRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      const raw = localStorage.getItem("ecospark_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    if (window.google) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [clientId]);

  useEffect(() => {
    if (!clientId || !ready || !btnRef.current || typeof google === "undefined")
      return;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp: { credential: string }) => {
        const claims = parseJwt(resp.credential);
        const p: Profile = {
          name: claims?.name,
          email: claims?.email,
          picture: claims?.picture,
        };
        setProfile(p);
        try {
          localStorage.setItem("ecospark_user", JSON.stringify(p));
        } catch {}
      },
      auto_select: false,
      context: mode as "signin" | "signup",
    });

    google.accounts.id.renderButton(btnRef.current, {
      type: "standard",
      theme: "outline",
      size,
      shape: "pill",
      text: mode === "signup" ? "signup_with" : "signin_with",
      logo_alignment: "left",
    });
  }, [clientId, ready]);

  if (!clientId) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={() =>
          alert(
            "Set VITE_GOOGLE_CLIENT_ID to enable Google OAuth, or ask us to connect Supabase via MCP.",
          )
        }
      >
        {mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
      </Button>
    );
  }

  if (profile) {
    return (
      <div className="flex items-center gap-3 rounded-full border px-3 py-2">
        {profile.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.picture}
            alt={profile.name || ""}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold">
            {(profile.name || profile.email || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm">
          Signed in as {profile.name || profile.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            try {
              google?.accounts.id.disableAutoSelect();
            } catch {}
            localStorage.removeItem("ecospark_user");
            setProfile(null);
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return <div ref={btnRef} className="inline-flex" />;
}

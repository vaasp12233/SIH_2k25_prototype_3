import { Button } from "@/components/ui/button";
import { Sparkles, LogOut } from "lucide-react";
import { useNetlifyIdentity } from "@/hooks/useNetlifyIdentity";
import { useNavigate } from "react-router-dom";

export default function SignInButton() {
  const { ready, user, openLogin, logout } = useNetlifyIdentity();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button className="shadow-sm" onClick={() => navigate("/challenges")}>
          <Sparkles className="h-4 w-4" /> Go to challenges
        </Button>
        <Button variant="ghost" onClick={() => logout()}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="shadow-sm"
      onClick={() => {
        const opened = openLogin();
        if (!opened) navigate("/#get-started");
      }}
      disabled={!ready && !window.netlifyIdentity}
    >
      <Sparkles className="h-4 w-4" /> Sign in with Google
    </Button>
  );
}

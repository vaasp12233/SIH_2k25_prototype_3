import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Leaf, Medal, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Leaf className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <span className="block text-base font-extrabold tracking-tight">EcoSpark</span>
        <span className="block text-xs text-muted-foreground -mt-0.5">Learn • Act • Win</span>
      </div>
    </Link>
  );
}

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
              isActive("/") && "bg-accent text-foreground",
            )}
          >
            Home
          </Link>
          <Link
            to="/challenges"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
              isActive("/challenges") && "bg-accent text-foreground",
            )}
          >
            Challenges
          </Link>
          <Link
            to="/account"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground",
              isActive("/account") && "bg-accent text-foreground",
            )}
          >
            Account
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/#leaderboard" className="inline-flex items-center gap-1">
              <Medal className="h-4 w-4" />
              Leaderboard
            </Link>
          </Button>
          <Button asChild className="shadow-sm">
            <Link to="/#get-started" className="inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Get started
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;

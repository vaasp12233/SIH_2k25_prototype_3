import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gradient-to-b from-transparent to-accent/30">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/90">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-extrabold tracking-tight">EcoSpark</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            A gamified learning platform empowering India’s students to build
            lifelong sustainable habits through real-world action.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Explore
            </p>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:underline">
                  Challenges
                </Link>
              </li>
              <li>
                <a href="#leaderboard" className="hover:underline">
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              About
            </p>
            <ul className="space-y-1">
              <li>
                <a href="#impact" className="hover:underline">
                  Impact
                </a>
              </li>
              <li>
                <a href="#stakeholders" className="hover:underline">
                  Stakeholders
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="text-xs text-muted-foreground md:text-right">
          <p>
            Aligned with NEP 2020 and SDGs. Built for schools, colleges, and
            youth communities across India.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} EcoSpark</p>
        </div>
      </div>
    </footer>
  );
}

import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { CHALLENGES, Challenge } from "./challenges-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Droplets, Bike, SunMedium } from "lucide-react";

function Icon({ name }: { name: Challenge["icon"] }) {
  const C =
    name === "recycle"
      ? Recycle
      : name === "droplets"
        ? Droplets
        : name === "bike"
          ? Bike
          : name === "sun"
            ? SunMedium
            : Leaf;
  return <C className="h-5 w-5 text-primary" />;
}

export default function ChallengeDetail() {
  const { slug } = useParams<{ slug: string }>();

  const challenge = useMemo(
    () => CHALLENGES.find((c) => c.slug === slug),
    [slug],
  );

  if (!challenge) {
    return (
      <section className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Challenge not found</CardTitle>
            <CardDescription>
              The challenge you tried to open does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/challenges">Back to challenges</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent))_0%,transparent_50%),radial-gradient(60%_60%_at_90%_10%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name={challenge.icon} /> {challenge.title}
              </CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  to={`/challenges/${challenge.slug}/learn`}
                  className="group rounded-lg border p-4 transition-colors hover:border-primary/40"
                >
                  <div className="text-sm font-semibold">Learn</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Concepts and why it matters
                  </p>
                </Link>
                <Link
                  to={`/challenges/${challenge.slug}/act`}
                  className="group rounded-lg border p-4 transition-colors hover:border-primary/40"
                >
                  <div className="text-sm font-semibold">Act</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Steps to complete and log
                  </p>
                </Link>
                <Link
                  to={`/challenges/${challenge.slug}/rewards`}
                  className="group rounded-lg border p-4 transition-colors hover:border-primary/40"
                >
                  <div className="text-sm font-semibold">Rewards</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Points and badges
                  </p>
                </Link>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold">Getting started</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {challenge.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-2">
                <Button>Start challenge</Button>
                <Button asChild variant="secondary">
                  <Link to="/challenges">Browse more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

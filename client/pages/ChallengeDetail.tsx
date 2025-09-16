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
    <section className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name={challenge.icon} /> {challenge.title}
            </CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Getting started</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {challenge.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button>Start challenge</Button>
                <Button asChild variant="secondary">
                  <Link to="/challenges">Browse more</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

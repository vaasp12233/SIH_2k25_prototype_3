import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Droplets, Bike, SunMedium } from "lucide-react";
import { Link } from "react-router-dom";
import { CHALLENGES } from "./challenges-data";

function Icon({
  name,
}: {
  name: "recycle" | "droplets" | "bike" | "sun" | "leaf";
}) {
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

export default function Challenges() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent))_0%,transparent_50%),radial-gradient(60%_60%_at_90%_10%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container py-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">
            Beta
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Daily and Weekly Eco Challenges
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore curated, India-first tasks you can do at school, college, or
            home. Full challenge catalog coming soon.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c) => (
            <Link key={c.slug} to={`/challenges/${c.slug}`} className="group">
              <Card className="transition-all hover:-translate-y-0.5 hover:shadow-sm group-hover:border-primary/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={c.icon} /> {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {c.description}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Want a custom challenge for your school or NGO? Reach out and we’ll
          add it.
        </p>
      </div>
    </section>
  );
}

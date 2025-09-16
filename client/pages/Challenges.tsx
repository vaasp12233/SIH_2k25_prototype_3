import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Leaf, Recycle, Droplets, Bike, SunMedium } from "lucide-react";

const CHALLENGES = [
  {
    id: "waste",
    title: "Waste Segregation",
    icon: Recycle,
    blurb:
      "Start a 3-bin system for dry, wet, and reject waste. Earn points by keeping logs and photos.",
    steps: [
      "Place three labeled bins in class or home",
      "Log photos weekly",
      "Share audit summary with your eco‑club",
    ],
  },
  {
    id: "water",
    title: "Save Water",
    icon: Droplets,
    blurb:
      "Conduct a tap‑leak audit on campus. Submit findings and fixes for bonus points.",
    steps: ["Check taps and flush valves", "Report leaks", "Track fixes"],
  },
  {
    id: "walk",
    title: "Walk/Cycle to School",
    icon: Bike,
    blurb: "Replace one car/scooter trip per week. Track your CO₂ saved.",
    steps: ["Plan safe route", "Go with friends", "Log distance weekly"],
  },
  {
    id: "energy",
    title: "Energy Audit",
    icon: SunMedium,
    blurb:
      "Switch off idle fans/lights. Map high‑usage areas and propose improvements.",
    steps: ["List rooms/devices", "Note idle hours", "Suggest timers/LEDs"],
  },
  {
    id: "trees",
    title: "Tree Plantation",
    icon: Leaf,
    blurb:
      "Participate in local drives. Care for saplings for 6 months to earn a badge.",
    steps: ["Plant native species", "Water weekly", "Protect with guards"],
  },
];

export default function Challenges() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">
          Beta
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Daily and Weekly Eco Challenges
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore curated, India-first tasks you can do at school, college, or
          home. Tap a card to see quick steps.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CHALLENGES.map((c) => {
          const Icon = c.icon;
          const expanded = openId === c.id;
          const completed = !!done[c.id];
          return (
            <Card
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => setOpenId(expanded ? null : c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenId(expanded ? null : c.id);
                }
              }}
              aria-pressed={expanded}
              className={
                "transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary " +
                (expanded ? "ring-1 ring-primary/40" : "")
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" /> {c.title}
                  </span>
                  {completed && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Done</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{c.blurb}</p>
                {expanded && (
                  <div className="mt-3 space-y-2">
                    <ul className="list-inside list-disc space-y-1">
                      {c.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast({ title: "Challenge started", description: c.title });
                        }}
                      >
                        Start challenge
                      </Button>
                      <Button
                        size="sm"
                        variant={completed ? "secondary" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDone((d) => ({ ...d, [c.id]: !completed }));
                          toast({
                            title: completed ? "Marked undone" : "Marked done",
                            description: c.title,
                          });
                        }}
                      >
                        {completed ? "Undo" : "Mark as done"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Want a custom challenge for your school or NGO? Reach out and we’ll add
        it.
      </p>
    </section>
  );
}

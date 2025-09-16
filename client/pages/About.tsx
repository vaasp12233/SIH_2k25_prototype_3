import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent))_0%,transparent_50%),radial-gradient(60%_60%_at_90%_10%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container py-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-3">
            Environment • Hackathon
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            About EcoSpark
          </h1>
          <p className="mt-2 text-muted-foreground">
            A gamified platform that turns environmental learning into
            measurable action.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" /> Mission
              </CardTitle>
              <CardDescription>
                Build lifelong sustainable habits through local action.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Aligned with NEP 2020 and India’s SDGs, designed with teachers and
              NGOs.
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Community
              </CardTitle>
              <CardDescription>
                Students, teachers, NGOs, and departments.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Run eco‑clubs, leaderboards, and local drives with simple tools.
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" /> Focus
              </CardTitle>
              <CardDescription>Waste, Water, Energy</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Short modules, micro‑challenges, and impact tracking.
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" /> Built for Hackathons
              </CardTitle>
              <CardDescription>Clear outcomes and fast demos</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Beautiful UI, rapid onboarding, and sample data to showcase
              impact.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

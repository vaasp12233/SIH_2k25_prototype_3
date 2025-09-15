import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Bike, Droplets, Sparkles, Medal, BookOpen, Users, Target, ShieldCheck } from "lucide-react";

export default function Index() {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [tasks, setTasks] = useState({
    segregate: false,
    cycle: false,
    bottle: false,
  });

  const [quizChoice, setQuizChoice] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  const progress = useMemo(() => Math.min(100, Math.round((ecoPoints / 100) * 100)), [ecoPoints]);

  const toggleTask = (key: keyof typeof tasks, points: number) => {
    setTasks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const delta = next[key] ? points : -points;
      setEcoPoints((p) => Math.max(0, p + delta));
      return next;
    });
  };

  const answerQuiz = () => {
    if (quizDone) return;
    setQuizDone(true);
    if (quizChoice === "500-1000") setEcoPoints((p) => p + 20);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent))_0%,transparent_50%),radial-gradient(60%_60%_at_90%_10%,hsl(var(--accent))_0%,transparent_50%)]" />
        <div className="container grid gap-8 py-12 md:grid-cols-2 md:py-16 lg:py-20">
          <div className="space-y-6">
            <Badge className="rounded-full">Built for India · NEP 2020</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Learn, act, and win for the planet
            </h1>
            <p className="text-lg text-muted-foreground">
              EcoSpark is a gamified platform that turns environmental education into
              real-world impact. Complete interactive lessons and local tasks to earn
              eco‑points, badges, and bring change to your school and community.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow">
                <a href="#get-started" className="inline-flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Start learning
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#impact" className="inline-flex items-center gap-2">
                  <Leaf className="h-5 w-5" /> Why it works
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Medal className="h-4 w-4 text-primary" /> School competitions
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> SDG aligned
              </span>
            </div>
          </div>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your eco‑points
                <Badge variant="secondary">Beta</Badge>
              </CardTitle>
              <CardDescription>
                Earn points by completing challenges and quick quizzes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex items-end justify-between">
                  <div className="text-3xl font-extrabold tracking-tight">{ecoPoints}</div>
                  <span className="text-xs text-muted-foreground">Level 1 • 100 pts</span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Today’s micro‑challenges</p>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Checkbox id="seg" checked={tasks.segregate} onCheckedChange={() => toggleTask("segregate", 10)} />
                    <label htmlFor="seg" className="grid cursor-pointer text-sm">
                      Segregate your waste at home
                      <span className="text-xs text-muted-foreground">+10 pts</span>
                    </label>
                    <Recycle className="ml-auto h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Checkbox id="cyc" checked={tasks.cycle} onCheckedChange={() => toggleTask("cycle", 15)} />
                    <label htmlFor="cyc" className="grid cursor-pointer text-sm">
                      Walk or cycle for 15 minutes
                      <span className="text-xs text-muted-foreground">+15 pts</span>
                    </label>
                    <Bike className="ml-auto h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Checkbox id="bot" checked={tasks.bottle} onCheckedChange={() => toggleTask("bottle", 5)} />
                    <label htmlFor="bot" className="grid cursor-pointer text-sm">
                      Carry a reusable water bottle
                      <span className="text-xs text-muted-foreground">+5 pts</span>
                    </label>
                    <Droplets className="ml-auto h-4 w-4 text-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold">1‑minute quiz</p>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">
                      How long can a plastic bottle take to decompose?
                    </p>
                    <div className="mt-2 grid gap-2 text-sm">
                      {[
                        { id: "25-50", label: "25–50 years" },
                        { id: "500-1000", label: "500–1,000 years" },
                        { id: "5-10", label: "5–10 years" },
                      ].map((opt) => (
                        <label key={opt.id} className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 ${quizChoice === opt.id ? "border-primary bg-primary/5" : "hover:bg-accent"}`}>
                          <input
                            type="radio"
                            name="quiz1"
                            className="accent-primary"
                            onChange={() => setQuizChoice(opt.id)}
                            checked={quizChoice === opt.id}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      {!quizDone ? (
                        <Button size="sm" onClick={answerQuiz} disabled={!quizChoice}>
                          Submit
                        </Button>
                      ) : (
                        <span className={`text-sm ${quizChoice === "500-1000" ? "text-emerald-600" : "text-destructive"}`}>
                          {quizChoice === "500-1000" ? "+20 pts • Correct!" : "Incorrect. +0 pts"}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">UNESCO: Gamified learning boosts retention by 70%+</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="impact" className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Why EcoSpark</h2>
          <p className="mt-3 text-muted-foreground">
            Textbooks alone can’t change behavior. We combine interactive lessons with
            real tasks and local projects to build lifelong habits—aligned with India’s
            SDGs and NEP 2020’s experiential learning.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Value icon={<BookOpen className="h-5 w-5" />} title="Practical lessons" desc="Short, localised modules with activities that matter." />
          <Value icon={<Target className="h-5 w-5" />} title="Action + tracking" desc="Eco‑points, streaks, and badges to sustain habits." />
          <Value icon={<Users className="h-5 w-5" />} title="School competitions" desc="House and school leaderboards drive participation." />
          <Value icon={<Medal className="h-5 w-5" />} title="Recognition" desc="Digital certificates for students and eco‑clubs." />
        </div>
      </section>

      <section id="leaderboard" className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard preview</CardTitle>
            <CardDescription>Top schools this month by eco‑points</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Green Valley H.S.", pts: 1240 },
              { name: "Lotus Public School", pts: 980 },
              { name: "Nalanda College", pts: 860 },
              { name: "St. Teresa Jr. College", pts: 820 },
            ].map((row, i) => (
              <div key={row.name} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold">{i + 1}. {row.name}</span>
                  <span className="text-muted-foreground">{row.pts} pts</span>
                </div>
                <Progress value={Math.min(100, (row.pts / 1300) * 100)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="stakeholders" className="container py-16">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight">Who benefits</h3>
            <ul className="list-inside space-y-2 text-muted-foreground">
              <li>• Students build real, sustainable habits</li>
              <li>• Teachers and eco‑clubs get ready‑to‑run activities</li>
              <li>• NGOs and departments can run local drives with youth</li>
            </ul>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Built‑in rewards</CardTitle>
              <CardDescription>Badges unlock as students act</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {[
                { label: "Water Saver", icon: <Droplets className="h-4 w-4" /> },
                { label: "Waste Warrior", icon: <Recycle className="h-4 w-4" /> },
                { label: "Green Rider", icon: <Bike className="h-4 w-4" /> },
                { label: "Campus Hero", icon: <Medal className="h-4 w-4" /> },
              ].map((b) => (
                <Badge key={b.label} variant="secondary" className="inline-flex items-center gap-1">
                  {b.icon}
                  {b.label}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="get-started" className="container pb-20">
        <Card className="mx-auto max-w-5xl border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bring EcoSpark to your school</CardTitle>
            <CardDescription>
              Set up eco‑clubs, track points, and run inter‑house competitions with ease.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a href="/challenges">Explore challenges</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#faq">Learn more</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section id="faq" className="container pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-extrabold tracking-tight">FAQ</h3>
          <p className="mt-2 text-muted-foreground">
            EcoSpark follows NEP 2020’s call for experiential learning and supports India’s SDGs.
          </p>
        </div>
      </section>
    </>
  );
}

function Value({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-5 shadow-sm">
      <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

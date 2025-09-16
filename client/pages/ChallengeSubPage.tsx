import { Link, useParams } from "react-router-dom";
import { CHALLENGES } from "./challenges-data";
import { SUB_PAGES } from "./challenge-subpages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChallengeSubPage() {
  const { slug, sub } = useParams<{ slug: string; sub: string }>();
  const challenge = CHALLENGES.find((c) => c.slug === slug);
  const subPage = SUB_PAGES.find((s) => s.slug === sub);

  if (!challenge || !subPage) {
    return (
      <section className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Page not found</CardTitle>
            <CardDescription>We couldn’t find that section.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to={`/challenges/${slug}`}>Back to challenge</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-xl border bg-gradient-to-r from-accent to-transparent p-6">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {challenge.title} • {subPage.title}
          </h1>
          <p className="mt-1 text-muted-foreground">{subPage.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {subPage.slug === "learn" && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  This section explains the background and importance of{" "}
                  {challenge.title.toLowerCase()} with India-first context and
                  examples.
                </p>
                <ul>
                  {challenge.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {subPage.slug === "act" && (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Follow these steps and log your progress to earn points:</p>
                <ol className="list-decimal pl-4">
                  {challenge.steps.map((s, i) => (
                    <li key={i} className="mb-1">
                      {s}
                    </li>
                  ))}
                </ol>
                <Button className="mt-2">Log progress</Button>
              </div>
            )}
            {subPage.slug === "rewards" && (
              <div className="text-sm text-muted-foreground">
                <p>Complete tasks to unlock badges and bonus points.</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>+10 pts for basic completion</li>
                  <li>+20 pts for verified evidence</li>
                  <li>Badge after 4 consecutive weeks</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link to={`/challenges/${slug}`}>Back to {challenge.title}</Link>
          </Button>
          <Button asChild>
            <Link to="/challenges">All challenges</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

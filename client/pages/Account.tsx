import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleLogin from "@/components/auth/GoogleLogin";

interface Profile {
  name?: string;
  email?: string;
  picture?: string;
}

export default function Account() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ecospark_user");
      setProfile(raw ? JSON.parse(raw) : null);
    } catch {
      setProfile(null);
    }
  }, []);

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Sign in with Google and manage your EcoSpark profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!profile ? (
              <div className="flex flex-wrap items-center gap-3">
                <GoogleLogin mode="signin" />
                <GoogleLogin mode="signup" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {profile.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.picture}
                    className="h-12 w-12 rounded-full"
                    alt={profile.name || ""}
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-bold">
                    {(profile.name || profile.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{profile.name || "Student"}</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    localStorage.removeItem("ecospark_user");
                    setProfile(null);
                  }}
                >
                  Sign out
                </Button>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="secondary">
                <a href="/challenges">Explore challenges</a>
              </Button>
              <Button asChild>
                <a href="#leaderboard">View leaderboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

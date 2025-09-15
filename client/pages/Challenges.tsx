import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Droplets, Bike, SunMedium } from "lucide-react";

export default function Challenges() {
  return (
    <section className="container py-10">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">Beta</Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Daily and Weekly Eco Challenges
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore curated, India-first tasks you can do at school, college, or home. Full
          challenge catalog coming soon.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-primary" /> Waste Segregation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Start a 3-bin system for dry, wet, and reject waste. Earn points by keeping logs and photos.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" /> Save Water
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Conduct a tap-leak audit on campus. Submit findings and fixes for bonus points.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-primary" /> Walk/Cycle to School
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Replace one car/scooter trip per week. Track your CO₂ saved.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SunMedium className="h-5 w-5 text-primary" /> Energy Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Switch off idle fans/lights. Map high-usage areas and propose improvements.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" /> Tree Plantation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Participate in local drives. Care for saplings for 6 months to earn a badge.
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Want a custom challenge for your school or NGO? Reach out and we’ll add it.
      </p>
    </section>
  );
}

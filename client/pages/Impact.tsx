import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplets, SunMedium } from "lucide-react";
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", co2: 12, water: 80, energy: 50 },
  { month: "Feb", co2: 18, water: 95, energy: 60 },
  { month: "Mar", co2: 26, water: 120, energy: 74 },
  { month: "Apr", co2: 33, water: 140, energy: 86 },
  { month: "May", co2: 45, water: 160, energy: 103 },
  { month: "Jun", co2: 58, water: 190, energy: 122 },
];

const config = {
  co2: {
    label: "CO₂ saved (kg)",
    icon: Leaf,
    theme: { light: "hsl(152 61% 45%)", dark: "hsl(152 61% 45%)" },
  },
  water: {
    label: "Water saved (L)",
    icon: Droplets,
    theme: { light: "hsl(199 89% 48%)", dark: "hsl(199 89% 48%)" },
  },
  energy: {
    label: "Energy saved (kWh)",
    icon: SunMedium,
    theme: { light: "hsl(42 95% 56%)", dark: "hsl(42 95% 56%)" },
  },
};

export default function Impact() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent))_0%,transparent_50%),radial-gradient(60%_60%_at_90%_10%,hsl(var(--accent))_0%,transparent_50%)]" />
      <div className="container py-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">
              Hackathon Ready
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Real-world Impact
            </h1>
            <p className="mt-2 text-muted-foreground">
              Track environmental outcomes from student actions across CO₂,
              water, and energy.
            </p>
          </div>

          <Card className="mt-8 border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle>School-wide progress</CardTitle>
              <CardDescription>
                Aggregated metrics (sample data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={config} className="w-full">
                <AreaChart data={data} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    type="monotone"
                    dataKey="co2"
                    stroke="var(--color-co2)"
                    fill="var(--color-co2)"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="water"
                    stroke="var(--color-water)"
                    fill="var(--color-water)"
                    fillOpacity={0.15}
                  />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="var(--color-energy)"
                    fill="var(--color-energy)"
                    fillOpacity={0.15}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Stat label="CO₂ saved" value="58 kg" sub="last 6 months" />
            <Stat label="Water saved" value="190 L" sub="last 6 months" />
            <Stat label="Energy saved" value="122 kWh" sub="last 6 months" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Impact of Environmental Studies in Education</CardTitle>
                <CardDescription>
                  How classroom learning translates into measurable change
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Builds eco‑literacy: students understand waste, water, and energy systems.</p>
                <p>• Improves problem‑solving: audits and projects foster practical skills.</p>
                <p>• Encourages civic action: clubs and drives connect schools with communities.</p>
                <p>• Supports NEP 2020: experiential learning with local, real‑world outcomes.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Daily‑life Uses and Habits</CardTitle>
                <CardDescription>
                  Small actions at home and school that add up
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Track and reduce electricity use by switching off idle appliances.</p>
                <p>• Save water via leak checks, low‑flow fixtures, and mindful consumption.</p>
                <p>• Segregate waste into wet/dry/reject to enable recycling and composting.</p>
                <p>• Prefer walking/cycling or shared transport to cut CO₂ emissions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl">{value}</CardTitle>
        <CardDescription>
          {label} • {sub}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

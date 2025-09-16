import { Bike, Droplets, Leaf, Recycle, SunMedium } from "lucide-react";

export type Challenge = {
  slug: string;
  title: string;
  description: string;
  icon: "recycle" | "droplets" | "bike" | "sun" | "leaf";
  steps: string[];
};

export const CHALLENGES: Challenge[] = [
  {
    slug: "waste-segregation",
    title: "Waste Segregation",
    description:
      "Start a 3-bin system for dry, wet, and reject waste. Earn points by keeping logs and photos.",
    icon: "recycle",
    steps: [
      "Set up three bins labeled Dry, Wet, Reject",
      "Educate classmates/household on what goes where",
      "Track your segregation for 7 days and upload photos",
    ],
  },
  {
    slug: "save-water",
    title: "Save Water",
    description:
      "Conduct a tap-leak audit on campus. Submit findings and fixes for bonus points.",
    icon: "droplets",
    steps: [
      "Audit taps and list leaks with locations",
      "Report to facility/parent/warden and suggest fixes",
      "Verify fixes and estimate water saved",
    ],
  },
  {
    slug: "walk-cycle-to-school",
    title: "Walk/Cycle to School",
    description: "Replace one car/scooter trip per week. Track your CO₂ saved.",
    icon: "bike",
    steps: [
      "Plan a safe walking/cycling route",
      "Invite 1–2 friends to join",
      "Log distance and days completed this week",
    ],
  },
  {
    slug: "energy-audit",
    title: "Energy Audit",
    description:
      "Switch off idle fans/lights. Map high-usage areas and propose improvements.",
    icon: "sun",
    steps: [
      "Identify top 3 rooms with most devices left ON",
      "Create switch-off checklist and assign monitors",
      "Share before/after photos and estimate savings",
    ],
  },
  {
    slug: "tree-plantation",
    title: "Tree Plantation",
    description:
      "Participate in local drives. Care for saplings for 6 months to earn a badge.",
    icon: "leaf",
    steps: [
      "Plant native saplings with local NGO/club",
      "Water and mulch regularly for 8 weeks",
      "Share growth updates monthly for 6 months",
    ],
  },
];

export function ChallengeIcon({ name, className }: { name: Challenge["icon"]; className?: string }) {
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
  return <C className={className} />;
}
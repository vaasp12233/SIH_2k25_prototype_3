import { BookOpen, ListChecks, Medal } from "lucide-react";

export type SubPage = {
  slug: "learn" | "act" | "rewards";
  title: string;
  description: string;
  icon: "book" | "check" | "medal";
};

export const SUB_PAGES: SubPage[] = [
  {
    slug: "learn",
    title: "Learn",
    description: "Concepts, why it matters, local examples.",
    icon: "book",
  },
  {
    slug: "act",
    title: "Act",
    description: "Step-by-step tasks to complete and log.",
    icon: "check",
  },
  {
    slug: "rewards",
    title: "Rewards",
    description: "Points, badges, and how to level up.",
    icon: "medal",
  },
];

export function SubIcon({ name, className }: { name: SubPage["icon"]; className?: string }) {
  const C = name === "book" ? BookOpen : name === "check" ? ListChecks : Medal;
  return <C className={className} />;
}
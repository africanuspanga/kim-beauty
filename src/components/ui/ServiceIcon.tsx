import {
  Brush,
  Crown,
  Droplet,
  Eye,
  Flower2,
  Gem,
  GraduationCap,
  Hand,
  Package,
  Scissors,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  scissors: Scissors,
  sparkles: Sparkles,
  eye: Eye,
  brush: Brush,
  flower: Flower2,
  hand: Hand,
  droplet: Droplet,
  "graduation-cap": GraduationCap,
  "shopping-bag": ShoppingBag,
  crown: Crown,
  gem: Gem,
  package: Package,
};

/** Names an admin can type into the service "icon" field. */
export const ICON_NAMES = Object.keys(ICONS);

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = ICONS[name ?? "sparkles"] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}

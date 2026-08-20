import {
  BookHeart,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Languages,
  Piano,
  Puzzle,
  Calculator,
  Bot,
  BookOpen,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  CalendarCheck,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const ICONS: Record<string, IconComponent> = {
  "book-heart": BookHeart,
  shield: ShieldCheck,
  sparkles: Sparkles,
  "heart-handshake": HeartHandshake,
  languages: Languages,
  piano: Piano,
  puzzle: Puzzle,
  calculator: Calculator,
  bot: Bot,
  "book-open": BookOpen,
  star: Star,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  clock: Clock,
  users: Users,
  "calendar-check": CalendarCheck,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}

export const ICON_OPTIONS = Object.keys(ICONS);

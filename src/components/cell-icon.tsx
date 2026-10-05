import { Cross, Flame, HandHeart, Heart, ShieldCheck, Sprout, Star, Sun, TreePine } from "lucide-react";
import type { CellIcon as CellIconName } from "../data/cells";

const icons = { heart: Heart, flame: Flame, shield: ShieldCheck, star: Star, sun: Sun, handshake: HandHeart, tree: TreePine, sprout: Sprout, cross: Cross };

export function CellIcon({ icon, color, size = 18 }: { icon: CellIconName; color: string; size?: number }) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" size={size} strokeWidth={2.2} style={{ color }} />;
}

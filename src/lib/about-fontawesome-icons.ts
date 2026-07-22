import type { LucideIcon } from 'lucide-react'
import {
  Trophy,
  GraduationCap,
  Factory,
  UserCheck,
  Building2,
  TrendingUp,
  Globe,
  Briefcase,
  Lightbulb,
  Crown,
  ChessKnight,
  UsersRound,
  RefreshCw,
} from 'lucide-react'

/** Maps Sanity icon name strings → Lucide icon components. */
export function getIconByName(iconName: string): LucideIcon {
  switch (iconName) {
    case 'trophy': return Trophy
    case 'graduation-cap': return GraduationCap
    case 'industry': return Factory
    case 'user-graduate': return UserCheck
    case 'university': return Building2
    case 'chart-line': return TrendingUp
    case 'globe': return Globe
    case 'briefcase': return Briefcase
    case 'lightbulb': return Lightbulb
    case 'crown': return Crown
    case 'chess': return ChessKnight
    case 'people-group': return UsersRound
    case 'arrows-rotate': return RefreshCw
    default: return Trophy
  }
}

import { BookOpen, HeartPulse, Sprout, Users, Wheat } from 'lucide-react'
import type { ProgramSlug } from '@/lib/content'

export const programIcons: Record<ProgramSlug, typeof BookOpen> = {
  education: BookOpen,
  healthcare: HeartPulse,
  food: Wheat,
  empowerment: Users,
  community: Sprout,
}

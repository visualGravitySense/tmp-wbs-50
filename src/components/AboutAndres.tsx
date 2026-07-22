import TrainerBioCard, { type TrainerBioCardData } from '@/components/TrainerBioCard'

interface AboutAndresProps {
  data?: TrainerBioCardData
}

/** Homepage trainer bio — compact variant (unchanged layout). */
export default function AboutAndres({ data }: AboutAndresProps) {
  return <TrainerBioCard data={data} variant="compact" />
}

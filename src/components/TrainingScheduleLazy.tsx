import dynamic from 'next/dynamic'

const TrainingSchedule = dynamic(() => import('./TrainingSchedule'), {
  ssr: false,
  loading: () => null,
})

export default TrainingSchedule

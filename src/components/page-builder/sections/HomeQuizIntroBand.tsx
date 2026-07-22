/* eslint-disable @typescript-eslint/no-explicit-any */
import CompactQuiz from '@/components/ui/CompactQuiz'
import { MarketingContainer, Section, SplitHeader } from '@/components/ui'

export type HomeQuizIntroBandProps = {
  quiz?: any
}

export default function HomeQuizIntroBand({ quiz }: HomeQuizIntroBandProps) {
  return (
    <Section variant="band" className="relative z-10 bg-transparent">
      
      <MarketingContainer
        elevated
        className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8"
      >
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
          <SplitHeader
            title={`${quiz?.introTopLine || 'Kas need tootmisjuhtimise probleemid'}, ${quiz?.introAccentLine || 'esinevad ka sinu töös?'}`}
            subtitle={quiz?.introDescription || 'Märgi alamprobleemid, mida oma töös või organisatsioonis ära tunned. Tööriist toob esile peamise juhtimiskategooria ning seob selle vastava arendusteema ja kasuga.'}
            align="custom"
            className="items-center text-center md:items-start md:text-left max-w-[540px]"
          />
        </div>

        <CompactQuiz quizData={quiz} />
      </MarketingContainer>
    </Section>
  )
}

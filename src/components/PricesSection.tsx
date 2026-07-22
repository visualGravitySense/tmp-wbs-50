import { MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
'use client'

interface PricesSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  priceCards?: Array<{
    type: string
    price?: string
    priceVat?: string
    featuredBadge?: string
    eisSupport?: string
    features: string[]
    buttonText?: string
    buttonLink?: string
    buttonStyle?: 'primary' | 'secondary'
    isFeatured?: boolean
  }>
  backgroundColor?: string
}

const PricesSection: React.FC<PricesSectionProps> = ({
  eyebrow = "Hinnad",
  title = "Hinnakiri 2026–2027",
  subtitle = "Eraisikule, ettevõttele ja grupile — EIS toetusega kuni 50% tagasi.",
  priceCards = [
    {
      type: "Eraisik / omanik",
      price: "890",
      priceVat: "+ km",
      features: [
        "9-päevane programm täies mahus",
        "Kõik materjalid ja mallid",
        "Product Name tunnistus",
        "Toitlustus kõik päevad"
      ],
      buttonText: "Registreeru →",
      buttonLink: "#registreeru",
      buttonStyle: "primary",
      isFeatured: false
    },
    {
      type: "Ettevõte",
      price: "1290",
      priceVat: "+ km · EIS → alates 645 €",
      featuredBadge: "⭐ Populaarseim",
      eisSupport: "✓ EIS toetus kuni 50%",
      features: [
        "Kõik eelmises paketis sisalduv",
        "12 kuud järeltuge meeskonnalt",
        "Individuaalsed coachingu sessioonid",
        "Arve ettevõttele, EIS menetlus kaetud"
      ],
      buttonText: "Registreeru →",
      buttonLink: "#registreeru",
      buttonStyle: "primary",
      isFeatured: true
    },
    {
      type: "Grupp 5+",
      price: "Küsi hinda",
      priceVat: "Kohapeal koolitus",
      features: [
        "Programm teie ettevõttes kohapeal",
        "Kohandatud teie tootmise jaoks",
        "Grupihind 5+ osalejale",
        "Paindlik ajakava"
      ],
      buttonText: "Võta ühendust →",
      buttonLink: "mailto:hello@example.com",
      buttonStyle: "secondary",
      isFeatured: false
    }
  ],
  backgroundColor = "bg-white"
}) => {
  return (
    <Section variant="band" className={backgroundColor} id="hinnad">
      <MarketingContainer elevated>
        <div className="text-center mb-12">
          <EyebrowPillBadge text={eyebrow} centered wrapperClassName="mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {priceCards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${marketingInsetCardClass} ${
                card.isFeatured 
                  ? 'border-2 border-blue-600 md:scale-105' 
                  : ''
              }`}
            >
              {card.featuredBadge && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2 text-sm font-semibold">
                  {card.featuredBadge}
                </div>
              )}

              <div className={`p-6 md:p-8 ${card.isFeatured ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <div className={`text-lg font-semibold text-gray-900 ${card.isFeatured ? 'mb-4' : ''}`}>
                    {card.type}
                  </div>
                  
                  {card.price && (
                    <div className="mb-2">
                      <div className={`font-bold text-gray-900 ${card.price === "Küsi hinda" ? "text-2xl" : "text-4xl"}`}>
                        {card.price !== "Küsi hinda" && <sup className="text-lg">€</sup>}{card.price}
                      </div>
                    </div>
                  )}
                  
                  {card.priceVat && (
                    <div className="text-sm text-gray-600 mb-4">
                      {card.priceVat}
                    </div>
                  )}

                  {card.eisSupport && (
                    <div className="text-green-600 font-semibold text-sm mb-4">
                      {card.eisSupport}
                    </div>
                  )}

                  {card.price === "Küsi hinda" && (
                    <div className="h-px bg-gray-200 mb-6"></div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href={card.buttonLink}
                    className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                      card.buttonStyle === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {card.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MarketingContainer>
    </Section>
  )
}

export default PricesSection

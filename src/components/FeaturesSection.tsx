'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TrendingUp, Award } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'

export interface FactoryBadge {
  name: string
  isActive: boolean
}

export interface FeatureCard {
  id: string
  icon: unknown
  title: string
  description: string
  insight: string
  isHighlighted: boolean
  relevantHabit?: string
}

export interface MiniCard {
  icon: unknown
  title: string
  description: string
  proof: string
}

export interface FeaturesSectionProps {
  eyebrow: string
  title: string
  subtitle: string
  mainFeature: {
    icon: any
    title: string
    description: string
    difference: string
    factoryBadges: FactoryBadge[]
    expandContent: string
    ctaText: string
    ctaLink: string
  }
  features: FeatureCard[]
  miniCards: MiniCard[]
  shortcutCTA: {
    text: string
    primaryLink: string
    primaryText: string
    secondaryLink: string
    secondaryText: string
  }
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  mainFeature,
  features,
  miniCards,
  shortcutCTA
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const toggleExpand = (cardId: string) => {
    if (isMountedRef.current) {
      setExpandedCard(expandedCard === cardId ? null : cardId)
    }
  }

  return (
    <Section variant="minimal" className="bg-white font-sans">
      <Container size="6xl" padding="none" elevated className="py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <EyebrowPillBadge text={eyebrow} centered wrapperClassName="mb-4" />
        <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-1 leading-tight">
          {title.split(' ').map((word, index) => 
            word.includes('<em>') ? (
              <em key={index} className="italic text-blue-600 font-normal font-serif">
                {word.replace('<em>', '').replace('</em>', '')}
              </em>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </h2>
        <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Main Feature Card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-blue-100 to-transparent opacity-60 pointer-events-none"></div>
        
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            {React.isValidElement(mainFeature.icon as React.ReactNode)
              ? (mainFeature.icon as React.ReactNode)
              : null}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {mainFeature.title}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-1">
              {mainFeature.description}
            </p>
            <p className="text-sm text-blue-600 italic font-medium">
              {mainFeature.difference}
            </p>
          </div>
        </div>

        {/* Factory Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mainFeature.factoryBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-blue-200 text-gray-700"
            >
              <span className={`w-2 h-2 rounded-full ${badge.isActive ? 'bg-green-500' : 'bg-gray-300'} flex-shrink-0`}></span>
              {badge.name}
            </div>
          ))}
        </div>

        {/* Expandable Content */}
        <div className="mb-4">
          <button
            onClick={() => toggleExpand('main')}
            className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            {expandedCard === 'main' ? <TrendingUp className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {expandedCard === 'main' ? 'Peida' : 'Mida see tähendab sinu jaoks?'}
          </button>
          {expandedCard === 'main' && (
            <div className="mt-3 bg-white rounded-xl p-4 text-sm text-gray-600 leading-relaxed border border-blue-100">
              {mainFeature.expandContent}
            </div>
          )}
        </div>

        {/* Inline CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
          <span className="text-sm text-gray-500">{mainFeature.ctaText}</span>
          <a
            href={mainFeature.ctaLink}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            Hoia koht kinni →
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-gray-50 border rounded-2xl p-6 transition-all duration-200 cursor-default relative ${
              feature.isHighlighted 
                ? 'bg-blue-50 border-blue-200' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              {React.isValidElement(feature.icon)
                ? feature.icon
                : null}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-2">
              {feature.description}
            </p>
            <p className="text-sm text-blue-600 italic leading-relaxed">
              {feature.insight}
            </p>
            {feature.isHighlighted && feature.relevantHabit && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200 text-xs text-blue-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                Seotud sinu valitud harjumusega: {feature.relevantHabit}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Row - Mini Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {miniCards.map((mini, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
              {React.isValidElement(mini.icon)
                ? mini.icon
                : null}
            </div>
            <h5 className="text-base font-bold text-gray-900 mb-1">
              {mini.title}
            </h5>
            <p className="text-sm text-gray-500 leading-relaxed mb-2">
              {mini.description}
            </p>
            <p className="text-xs text-blue-600 font-semibold italic">
              {mini.proof}
            </p>
          </div>
        ))}
      </div>

      {/* Shortcut CTA */}
      <div className="text-center py-4 text-sm text-gray-500">
        {shortcutCTA.text}{' '}
        <a href={shortcutCTA.primaryLink} className="text-blue-600 font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          → {shortcutCTA.primaryText}
        </a>
        {' '}·{' '}
        <a href={shortcutCTA.secondaryLink} className="text-blue-600 font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          {shortcutCTA.secondaryText} →
        </a>
      </div>
      </Container>
    </Section>
  )
}

export default FeaturesSection

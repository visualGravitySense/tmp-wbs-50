'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MarketingContainer, Section } from '@/components/ui'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import {
  Building2,
  Factory,
  Warehouse,
  Store,
  Home,
  Landmark,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart2,
  Cog,
  Rocket,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react'

export interface BuildingCard {
  id: string
  title: string
  description: string
  features: string[]
  icon: unknown
  color: string
  size: 'small' | 'medium' | 'large'
  isHighlighted: boolean
  stats?: {
    label: string
    value: string
  }
  buttonText?: string
  buttonLink?: string
}

export interface BuildingsSectionProps {
  eyebrow?: string
  title: string
  subtitle: string
  buildings: BuildingCard[]
  backgroundGradient?: string
  showStats?: boolean
}

const BuildingsSection: React.FC<BuildingsSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  buildings,
  backgroundGradient = 'from-gray-50 to-blue-50',
  showStats = true
}) => {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleMouseEnter = (buildingId: string) => {
    if (isMountedRef.current) {
      setHoveredBuilding(buildingId)
    }
  }

  const handleMouseLeave = () => {
    if (isMountedRef.current) {
      setHoveredBuilding(null)
    }
  }

  const getBuildingHeight = (size: string) => {
    switch (size) {
      case 'small': return 'h-64'
      case 'medium': return 'h-80'
      case 'large': return 'h-96'
      default: return 'h-80'
    }
  }

  const getBuildingColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-400 to-blue-600'
      case 'green': return 'from-green-400 to-green-600'
      case 'purple': return 'from-purple-400 to-purple-600'
      case 'orange': return 'from-orange-400 to-orange-600'
      case 'red': return 'from-red-400 to-red-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getIcon = (iconName: string) => {
    const cls = 'w-8 h-8 text-white'
    switch (iconName) {
      case 'industry': return <Factory className={cls} />
      case 'warehouse': return <Warehouse className={cls} />
      case 'store': return <Store className={cls} />
      case 'home': return <Home className={cls} />
      case 'city': return <Landmark className={cls} />
      case 'cog': return <Cog className={cls} />
      case 'rocket': return <Rocket className={cls} />
      case 'shield': return <ShieldCheck className={cls} />
      case 'lightbulb': return <Lightbulb className={cls} />
      default: return <Building2 className={cls} />
    }
  }

  return (
    <Section variant="band" className="relative overflow-x-clip bg-transparent">
      <div className="section-edge-fade-t" aria-hidden />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-48 h-48 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-green-500 rounded-full"></div>
      </div>

      <MarketingContainer elevated>
        {/* Header */}
        <div className="text-center mb-16">
          {eyebrow ? (
            <div className="mb-4 flex justify-center">
              <EyebrowPillBadge text={eyebrow} />
            </div>
          ) : null}
          <h2 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-[rgb(var(--text-primary))] md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Buildings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {buildings.map((building) => (
            <div
              key={building.id}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                building.isHighlighted ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(building.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Building Card */}
              <div className={`relative ${getBuildingHeight(building.size)} bg-gradient-to-br ${getBuildingColor(building.color)} rounded-t-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                hoveredBuilding === building.id ? 'shadow-3xl' : ''
              }`}>
                
                {/* Windows Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-white rounded"></div>
                    ))}
                  </div>
                </div>

                {/* Building Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  {getIcon(typeof building.icon === 'string' ? building.icon : 'building')}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {building.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-sm leading-relaxed mb-4 flex-grow">
                    {building.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {building.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-white/80" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  {showStats && building.stats && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{building.stats.value}</div>
                        <div className="text-xs text-white/80">{building.stats.label}</div>
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  {building.buttonText && (
                    <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center justify-center gap-2">
                      {building.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Building Base */}
              <div className="bg-gray-800 h-4 rounded-b-xl shadow-lg"></div>
              
              {/* Ground */}
              <div className="bg-green-100 h-2 rounded-b-lg opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Row */}
        {showStats && (
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: <Users className="w-6 h-6 text-blue-600" />, label: 'Active Users', value: '10,000+' },
              { icon: <Building2 className="w-6 h-6 text-blue-600" />, label: 'Buildings', value: '500+' },
              { icon: <BarChart2 className="w-6 h-6 text-blue-600" />, label: 'Growth', value: '150%' },
              { icon: <Cog className="w-6 h-6 text-blue-600" />, label: 'Features', value: '50+' }
            ].map((stat, index) => (
              <div key={index} className="rounded-2xl bg-white/85 p-6 text-center shadow-lg backdrop-blur-sm dark:border dark:border-white/10 dark:bg-[rgb(var(--bg-secondary))]/70 dark:shadow-[0_20px_50px_-24px_rgba(30,64,175,0.35)]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                   {stat.icon}
                </div>
                <div className="mb-1 text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </MarketingContainer>
    </Section>
  )
}

export default BuildingsSection

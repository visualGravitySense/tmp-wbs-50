'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import QuickStatsStrip from '@/components/ui/QuickStatsStrip'


// ── Types ──────────────────────────────────────────────────────────────────

export interface HeroDiagramNode {
  title: string
  position: { x: number; y: number }
  description?: string
}

export interface HeroDiagramMetric {
  value: string
  label: string
  number?: string
  suffix?: string
}

export interface HeroDiagramIllustration {
  centralText?: string
  illustrationItems?: HeroDiagramNode[]
}

export interface OpstarProfitHeroDiagramProps {
  /** Header eyebrow label */
  eyebrowLabel?: string
  /** Main heading inside card */
  cardTitle?: string
  /** Badge text (top right) */
  badgeText?: string
  /** Horizontal tag pills row */
  tagPills?: string[]
  /** Central hub text (split in two lines by first space) */
  centralText?: string
  /** Satellite nodes around orbit */
  nodes?: HeroDiagramNode[]
  /** Bottom metrics strip */
  metrics?: HeroDiagramMetric[]
}

// ── Defaults ───────────────────────────────────────────────────────────────

const DEFAULT_NODES: HeroDiagramNode[] = [
  {
    title: 'STRATEEGILINE JUHTIMINE',
    position: { x: 50, y: 15 },
    description:
      'Millal, kellega ja kuidas eesmärgini jõuame? Nägemus, plaan, tegevused ja terviklik strateegiline suunamine.',
  },
  {
    title: 'INTEGREERITUS',
    position: { x: 82, y: 35 },
    description:
      'Sobivus, sidusus ja seostatus — kõik komponendid töötavad koos ühtse Product Name süsteemina.',
  },
  {
    title: 'PROFESSIONAALSUS',
    position: { x: 82, y: 65 },
    description:
      'Teadmine, kompetentsid, oskused ja koostöö. Otsused põhinevad andmetel, faktidel ja praktikal.',
  },
  {
    title: 'OPERATSIOONIDE JUHTIMINE',
    position: { x: 50, y: 85 },
    description:
      'Tootmise ja teenuste valmistamise igapäevane juhtimine — protsess, põhjalikkus, detailid ja sisu.',
  },
  {
    title: 'KASUM',
    position: { x: 18, y: 65 },
    description:
      'Tootlikkus, väärtus, areng ja tulemuslikkus — mõõdetav kasu ettevõttele ja meeskonnale.',
  },
  {
    title: 'VISIOON & EESMÄRK',
    position: { x: 18, y: 35 },
    description:
      'Mille nimel ja miks me oma asja teeme? Selge visioon, eesmärk ja ühine suund tuleviku poole.',
  },
]

const DEFAULT_METRICS: HeroDiagramMetric[] = [
  { value: '25+',     label: 'AASTAT'    },
  { value: '4',       label: 'VALDKONDA' },
  { value: '+25-40%', label: 'KASUM'     },
  { value: '31%',     label: 'OEE KASV'  },
]

const DEFAULT_TAG_PILLS = ['STRATEEGIA', 'PROTSESSID', 'KASUMILIKKUS', 'LEAN-AGILE']

// ── Helpers ────────────────────────────────────────────────────────────────

/** Determine text-alignment class from X position */
function alignFromX(x: number): 'center' | 'left' | 'right' {
  if (x < 35) return 'right'
  if (x > 65) return 'left'
  return 'center'
}

function translateClass(align: 'center' | 'left' | 'right') {
  if (align === 'center') return '-translate-x-1/2'
  if (align === 'left')   return '-translate-x-0'
  return '-translate-x-full'
}

function normalizeNodeKey(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const NODE_DETAIL_FALLBACKS: Record<string, string> = {
  'strateegiline juhtimine': DEFAULT_NODES[0].description!,
  integreeritus: DEFAULT_NODES[1].description!,
  professionaalsus: DEFAULT_NODES[2].description!,
  'operatsioonide juhtimine': DEFAULT_NODES[3].description!,
  kasum: DEFAULT_NODES[4].description!,
  'visioon eesmark': DEFAULT_NODES[5].description!,
  'visioon ja eesmark': DEFAULT_NODES[5].description!,
}

function getNodeDescription(node: HeroDiagramNode): string {
  if (node.description?.trim()) return node.description.trim()
  const key = normalizeNodeKey(node.title)
  return NODE_DETAIL_FALLBACKS[key] ?? 'Lisainfo selle komponendi kohta.'
}

// ── Component ──────────────────────────────────────────────────────────────

export default function OpstarProfitHeroDiagram({
  eyebrowLabel = 'Product Name • METOODIKA RAAMISTIK',
  cardTitle    = 'Product Name SÜSTEEMNE JUHTIMINE',
  badgeText    = 'BAASRAAMISTIK',
  tagPills     = DEFAULT_TAG_PILLS,
  centralText  = 'Product Name',
  nodes,
  metrics,
}: OpstarProfitHeroDiagramProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const activeNodes   = nodes && nodes.length > 0   ? nodes   : DEFAULT_NODES
  const activeMetrics = metrics && metrics.length > 0 ? metrics : DEFAULT_METRICS
  const activeNode = activeIdx !== null ? activeNodes[activeIdx] : null

  // Split centralText into two visual lines (first word / rest)
  const centralParts = centralText.trim().split(/\s+/)
  const centralLine1 = centralParts[0] ?? 'OPSTAR'
  const centralLine2 = centralParts.slice(1).join(' ') || 'PROFIT'

  return (
    <div className={`relative mx-auto flex w-full max-w-[540px] flex-col justify-between overflow-hidden !p-5 transition-all duration-500 sm:!p-7 ${marketingInsetCardClass}`}>
      {/* Subtle background glow */}
      <div className="absolute -left-20 -top-20 pointer-events-none h-48 w-48 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 pointer-events-none h-48 w-48 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl" />

      {/* 1. Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-white/40">
            {eyebrowLabel}
          </span>
          {cardTitle && (
            <div className="text-base sm:text-xl font-black text-slate-800 dark:text-white tracking-tight leading-tight mt-1">
              {cardTitle}
            </div>
          )}
        </div>
        <span className={`shrink-0 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-white/80 sm:text-[9px] ${marketingMicroPillClass}`}>
          {badgeText}
        </span>
      </div>

      {/* 2. Tag pills */}
      {tagPills.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
          {tagPills.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/50 sm:text-[9px] ${marketingMicroPillClass}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 3. Orbit diagram + detail panel */}
      <div
        className="relative z-10 my-4"
        onMouseLeave={() => setActiveIdx(null)}
      >
      <div className="relative w-full max-w-[380px] mx-auto aspect-[1.2/1] sm:aspect-[1.25/1] flex items-center justify-center">
        {/* SVG connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Inner ring */}
          <circle cx="50" cy="50" r="16" className="stroke-slate-200/40 dark:stroke-white/5 fill-none" strokeWidth="0.5" />
          {/* Outer ring */}
          <circle cx="50" cy="50" r="34" className="stroke-slate-200/60 dark:stroke-white/10 fill-none" strokeWidth="0.75" strokeDasharray="1.5 1.5" />

          {/* Radial lines */}
          {activeNodes.map((node, idx) => {
            const isActive = activeIdx === idx
            return (
              <line
                key={idx}
                x1="50" y1="50"
                x2={node.position.x} y2={node.position.y}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'stroke-blue-500 dark:stroke-blue-400 opacity-100'
                    : 'stroke-slate-200/70 dark:stroke-white/10 opacity-70'
                }`}
                strokeWidth={isActive ? '0.75' : '0.4'}
                strokeDasharray={isActive ? 'none' : '1 1'}
              />
            )
          })}
        </svg>

        {/* Center hub */}
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative px-4 py-2 sm:px-6 sm:py-3.5 rounded-2xl bg-white/95 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-slate-900/90 dark:border-white/15 text-center flex flex-col items-center justify-center min-w-[90px] sm:min-w-[125px] cursor-default transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: activeIdx !== null ? '0 0 25px rgba(59, 130, 246, 0.25)' : undefined,
            }}
          >
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-800 dark:text-white leading-none">
              {centralLine1}
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-blue-600 dark:text-blue-400 leading-none mt-0.5 sm:mt-1">
              {centralLine2}
            </span>
          </motion.div>
        </div>

        {/* Satellite nodes */}
        {activeNodes.map((node, idx) => {
          const isActive = activeIdx === idx
          const align = alignFromX(node.position.x)
          const tClass = translateClass(align)

          return (
            <div
              key={idx}
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              className={`absolute z-10 -translate-y-1/2 ${tClass} transition-all duration-300`}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onBlur={() => setActiveIdx(null)}
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls="opstar-diagram-detail"
                onClick={() => setActiveIdx(isActive ? null : idx)}
                className={`max-w-[120px] cursor-pointer px-2 py-1.5 text-center transition-all duration-300 sm:max-w-[170px] sm:px-3.5 sm:py-2 ${
                  isActive
                    ? 'rounded-xl border border-blue-500/60 bg-blue-50/90 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:border-blue-400/50 dark:bg-slate-800/95 dark:text-blue-400'
                    : `${marketingMicroPillClass} text-slate-800 hover:border-slate-300 dark:text-slate-200`
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                }}
              >
                <span className="block text-[7px] min-[380px]:text-[8px] sm:text-[9.5px] font-black tracking-wider leading-tight">
                  {node.title}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {/* Detail panel — hover / tap */}
      <div
        id="opstar-diagram-detail"
        className="relative z-10 mx-auto mb-1 w-full max-w-[380px] min-h-[4.5rem]"
        aria-live="polite"
      >
        {activeNode ? (
          <motion.div
            key={activeNode.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`px-4 py-3 ${marketingMicroPillClass}`}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400 sm:text-[10px]">
              {activeNode.title}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xs">
              {getNodeDescription(activeNode)}
            </p>
          </motion.div>
        ) : (
          <p className="px-1 text-center text-[10px] leading-relaxed text-slate-400 dark:text-white/35 sm:text-[11px]">
            <span className="hidden sm:inline">Liigu hiirega komponendi peale — kuvatakse lühike selgitus.</span>
            <span className="sm:hidden">Puuduta komponenti, et näha lühikest selgitust.</span>
          </p>
        )}
      </div>
      </div>

      {/* 4. Bottom metrics */}
      <QuickStatsStrip
        className="mt-2.5 !border-slate-200/60 !bg-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_4px_20px_-8px_rgba(15,23,42,0.05)] dark:!border-white/[0.1] dark:!bg-white/[0.05] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
        stats={activeMetrics.map(s => {
          const numStr = String(s.number || s.value || '').trim()
          const end = parseFloat(numStr.replace(/[^0-9.]/g, '')) || 0
          const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
          return {
            end,
            decimals,
            suffix: s.suffix || '',
            label: s.label
          }
        })}
      />
    </div>
  )
}

'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity/client'
import type { PartnerLogo } from '@/types/partner'
import { marketingInsetCardClass } from '@/components/ui'
import IndustryFilterPills, { buildIndustryFilterOptions } from '@/components/filters/IndustryFilterPills'

interface ClientFilterGridProps {
  clients: PartnerLogo[]
}

export default function ClientFilterGrid({ clients }: ClientFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState('Kõik')

  const { industries, counts: industryCounts } = useMemo(
    () => buildIndustryFilterOptions(clients),
    [clients],
  )

  const filteredClients = useMemo(() => {
    if (activeFilter === 'Kõik') return clients
    return clients.filter((client) => client.industry?.trim() === activeFilter)
  }, [clients, activeFilter])

  return (
    <div className="w-full">
      <IndustryFilterPills
        industries={industries}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        getCount={(industry) => (industry === 'Kõik' ? clients.length : industryCounts.get(industry))}
        className="mb-12"
      />

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence>
          {filteredClients.map((client) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={client._id}
              className={`${marketingInsetCardClass} flex h-full flex-col justify-between p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-100/60 hover:bg-white/80 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:border-sky-400/20 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
            >
              <div className="mb-6 flex min-h-[120px] flex-1 items-center justify-center">
                {client.logo?.asset?._ref ? (
                  <div className="relative h-16 w-full opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:h-20">
                    <Image
                      src={urlFor(client.logo).width(400).url()}
                      alt={client.logo.alt || client.name}
                      fill
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="text-center text-xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                    {client.name}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5 border-t border-slate-200/60 pt-4 dark:border-white/10">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {client.name}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  {client.industry ? (
                    <span className="truncate pr-2">{client.industry}</span>
                  ) : null}
                  {client.country ? (
                    <span className="shrink-0">{client.country}</span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredClients.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400">
          Selles valdkonnas pole hetkel kliente kuvada.
        </div>
      ) : null}
    </div>
  )
}
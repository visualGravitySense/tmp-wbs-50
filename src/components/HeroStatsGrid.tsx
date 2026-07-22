import React from 'react';
import { getGlobalStats } from '@/lib/sanity';
import HeroStatsGridClient from './HeroStatsGridClient';
export type { HeroStat } from './HeroStatsGridClient';

export type HeroStatInput = {
  label: string;
  number?: string;
  value?: string;
  suffix?: string;
}

export type HeroStatsGridProps = {
  stats?: HeroStatInput[] | null;
  showDivider?: boolean;
  className?: string;
  gridClassName?: string;
  dividerClassName?: string;
  animate?: boolean;
}

function normalizeStat(input: HeroStatInput) {
  const number = String(input.number ?? ('value' in input ? input.value : '') ?? '').trim();
  const suffix = input.suffix?.trim();
  return {
    label: input.label?.trim() || '',
    number,
    suffix: suffix || undefined,
  };
}

export default async function HeroStatsGrid({
  stats,
  showDivider = true,
  className,
  gridClassName,
  animate = false,
}: HeroStatsGridProps) {
  // If stats are passed from the page/builder, use them; otherwise fetch globally
  const rawStats = stats && stats.length > 0 ? stats : await getGlobalStats();

  if (!rawStats || rawStats.length === 0) {
    return null;
  }

  // Filter and normalize stats
  const resolvedStats = rawStats
    .filter((s: any) => {
      const label = s.label?.trim();
      const number = String(s.number ?? ('value' in s ? s.value : '') ?? '').trim();
      return Boolean(label && number);
    })
    .map(normalizeStat);

  if (resolvedStats.length === 0) {
    return null;
  }

  return (
    <HeroStatsGridClient
      stats={resolvedStats}
      showDivider={showDivider}
      className={className}
      gridClassName={gridClassName}
      animate={animate}
    />
  );
}

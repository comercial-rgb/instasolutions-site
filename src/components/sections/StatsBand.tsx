import React, { useEffect, useRef, useState } from 'react';
import { Wrench, Fuel, Satellite, MapPin } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useIntersection } from '../../hooks/useIntersection';
import { COLORS } from '../../lib/constants';

interface Stat {
  icon: React.ReactNode;
  endValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function useCountUp(end: number, duration = 1200, started: boolean) {
  const [count, setCount] = useState(0);
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!started) return;
    if (prefersReduced) {
      setCount(end);
      return;
    }
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration, prefersReduced]);

  return count;
}

function StatItem({ icon, endValue, prefix = '', suffix = '', label, started }: Stat & { started: boolean }) {
  const count = useCountUp(endValue, 1400, started);
  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: '#EAF0FF', color: COLORS.azulTech }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="text-3xl font-bold" style={{ color: COLORS.azulCorp }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-neutral-500 text-center">{label}</div>
    </div>
  );
}

export function StatsBand() {
  const { t } = useLanguage();
  const [ref, visible] = useIntersection(0.2);

  const stats: Stat[] = [
    { icon: <Wrench className="w-6 h-6" />, endValue: 500, prefix: '+', suffix: '', label: t('stats.workshopsLabel') },
    { icon: <MapPin className="w-6 h-6" />, endValue: 20, prefix: '+', suffix: '', label: t('stats.clientsLabel') },
    { icon: <Satellite className="w-6 h-6" />, endValue: 6, prefix: '', suffix: '', label: t('stats.statesLabel') },
    { icon: <Fuel className="w-6 h-6" />, endValue: 30, prefix: '+', suffix: '', label: t('stats.integrationsLabel') },
  ];

  return (
    <div
      ref={ref}
      className="border-y"
      style={{ backgroundColor: COLORS.bgPill, borderColor: COLORS.borderPill }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: COLORS.borderPill }}>
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} started={visible} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { COLORS } from '../../lib/constants';
import type { TestimonialType } from '../../types';

export function TestimonialsCarousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // TODO: Winner — substituir pelos 3 depoimentos reais de clientes
  const testimonials: TestimonialType[] = [
    {
      quote: t('testimonials.1.quote'),
      author: t('testimonials.1.author'),
      role: t('testimonials.1.role'),
      company: t('testimonials.1.company'),
    },
    {
      quote: t('testimonials.2.quote'),
      author: t('testimonials.2.author'),
      role: t('testimonials.2.role'),
      company: t('testimonials.2.company'),
    },
    {
      quote: t('testimonials.3.quote'),
      author: t('testimonials.3.author'),
      role: t('testimonials.3.role'),
      company: t('testimonials.3.company'),
    },
  ];

  const go = useCallback(
    (index: number) => setCurrent((index + testimonials.length) % testimonials.length),
    [testimonials.length],
  );

  useEffect(() => {
    if (prefersReduced || paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, testimonials.length, prefersReduced]);

  const t_curr = testimonials[current];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: COLORS.azulCorp }}>
        {t('testimonials.title')}
      </h2>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Depoimentos de clientes"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          aria-live={paused ? 'off' : 'polite'}
          aria-atomic="true"
          className="max-w-2xl mx-auto rounded-2xl border p-8 relative"
          style={{ borderColor: COLORS.borderPill, backgroundColor: COLORS.bgPill }}
        >
          <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: COLORS.azulCorp }} aria-hidden="true" />
          <blockquote className="text-lg text-neutral-700 leading-relaxed italic mb-6">
            "{t_curr.quote}"
          </blockquote>
          <footer className="flex items-center gap-3">
            {/* TODO: Winner — adicionar foto real do depoente */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: COLORS.azulTech }}
              aria-hidden="true"
            >
              {t_curr.author.charAt(0)}
            </div>
            <div>
              <cite className="not-italic font-semibold text-sm" style={{ color: COLORS.azulCorp }}>
                {t_curr.author}
              </cite>
              <p className="text-xs text-neutral-500">
                {t_curr.role} · {t_curr.company}
              </p>
            </div>
          </footer>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(current - 1)}
            aria-label="Depoimento anterior"
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            style={{ borderColor: COLORS.borderPill }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Ir para depoimento ${idx + 1}`}
              aria-current={idx === current ? 'true' : undefined}
              className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                idx === current ? 'w-4' : ''
              }`}
              style={{ backgroundColor: idx === current ? COLORS.azulTech : '#D1D5DB' }}
            />
          ))}
          <button
            onClick={() => go(current + 1)}
            aria-label="Próximo depoimento"
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            style={{ borderColor: COLORS.borderPill }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

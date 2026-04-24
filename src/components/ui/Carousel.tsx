import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: string[];
  alt: string;
  autoRotateMs?: number;
  objectFit?: 'cover' | 'contain';
  label?: string;
}

export function Carousel({
  items,
  alt,
  autoRotateMs = 3000,
  objectFit = 'cover',
  label,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = useCallback(
    (index: number) => {
      setCurrent((index + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoRotateMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, items.length, autoRotateMs, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label || alt}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative aspect-[4/3] rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden"
        aria-live={paused ? 'off' : 'polite'}
        aria-atomic="false"
      >
        {items.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${idx + 1} de ${items.length}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit }}
            aria-hidden={idx !== current}
          />
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <button
            onClick={() => go(current + 1)}
            aria-label="Próximo slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ChevronRight className="w-5 h-5 text-neutral-700" />
          </button>
          <div className="flex justify-center gap-2 mt-3" role="tablist" aria-label="Slides">
            {items.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Ir para slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  idx === current ? 'bg-blue-600 w-4' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/Button';
import { COLORS } from '../../lib/constants';

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #F3F6FF 0%, #FFFFFF 45%, #EAF1FF 100%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 py-16 lg:py-24 items-center">
        {/* Left: copy */}
        <div className="fade-up flex flex-col gap-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3 py-1 w-max"
            style={{ backgroundColor: '#E6F0FF', color: COLORS.azulTech }}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            {t('home.fleetManagement')}
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: COLORS.azulCorp }}
          >
            {/* TODO: Winner — validar número "18% em 90 dias" com métricas reais antes de publicar */}
            {t('hero.h1')}
          </h1>

          <p className="text-neutral-600 text-lg leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contato">
              <Button variant="primary" size="lg">
                {t('hero.cta.primary')}
              </Button>
            </Link>
            <Link to="/solucoes">
              <Button variant="outline" size="lg">
                {t('hero.cta.secondary')}
              </Button>
            </Link>
          </div>
          <Link
            to="/clientes/acesso"
            className="text-sm hover:underline transition-colors w-max"
            style={{ color: COLORS.azulTech }}
          >
            {t('hero.cta.tertiary')} →
          </Link>

          {/* Trust strip */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-2 mt-2 pt-4 border-t text-xs text-neutral-500"
            style={{ borderColor: COLORS.borderPill }}
          >
            {[
              t('hero.trust.lgpd'),
              t('hero.trust.integration'),
              t('hero.trust.coverage'),
              t('hero.trust.network'),
            ].map((item) => (
              <span key={item} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right: images */}
        <div className="fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative aspect-[4/3] rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden">
            <img
              src="/imagens/home-1.png"
              alt="Dashboard InstaSolutions"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <StatCard value="500+" label={t('home.workshops')} />
            <StatCard value={t('home.brazilWide')} label={t('home.coverage')} />
            <StatCard value="+30" label={t('home.integrations')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border p-3 text-center" style={{ borderColor: COLORS.borderPill }}>
      <div className="text-xl font-bold" style={{ color: COLORS.azulTech }}>
        {value}
      </div>
      <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
    </div>
  );
}

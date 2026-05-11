import React from 'react';
import { Layers } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Carousel } from '../components/ui/Carousel';
import { useLanguage } from '../hooks/useLanguage';
import { COLORS, DOMAIN } from '../lib/constants';

export default function SobrePage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Sobre | InstaSolutions — Produtos e Gestão Empresarial"
        description="Plataforma SaaS integrada com manutenção, abastecimento e rastreamento para gestão completa de frotas."
        canonical={`${DOMAIN}/sobre`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span
            className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 w-max"
            style={{ backgroundColor: '#E6E7F7', color: COLORS.azulCorp }}
          >
            <Layers className="w-4 h-4" aria-hidden="true" /> {t('about.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-3" style={{ color: COLORS.azulCorp }}>
            {t('about.title')}
          </h1>
          <div className="text-neutral-700 mt-3 space-y-3 text-sm leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <p>{t('about.p4')}</p>
            <p>{t('about.p5')}</p>
            <p>
              <strong>{t('about.p6')}</strong>
              <br />
              {t('about.p6b')}
            </p>
          </div>
        </div>
        <Carousel
          items={['/imagens/sobre.png', '/imagens/sobre-1.png', '/imagens/sobre-2.png', '/imagens/sobre-3.png']}
          alt="Operação InstaSolutions"
        />
      </section>
    </>
  );
}

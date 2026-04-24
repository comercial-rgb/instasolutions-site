import React from 'react';
import { MapPin, Layers } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { useLanguage } from '../hooks/useLanguage';
import { COLORS, DOMAIN } from '../lib/constants';

export default function RedePage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Rede | InstaSolutions — Cobertura Brasil inteiro"
        description="Rede nacional com 500+ oficinas credenciadas e postos parceiros em todo o Brasil."
        canonical={`${DOMAIN}/rede`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.azulCorp }}>
              {t('network.title')}
            </h1>
            <div className="text-neutral-700 mt-3 space-y-3">
              <p>{t('network.desc1')}</p>
              <p>{t('network.desc2')}</p>
              <p>{t('network.desc3')}</p>
              <p><strong>{t('network.desc4')}</strong></p>
            </div>
            <div className="mt-8 rounded-3xl shadow-lg overflow-hidden">
              <img
                src="/imagens/rede-01.png"
                alt="Rede de atendimento InstaSolutions"
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
          <div className="space-y-6">
            <LocationCard>
              <h2 className="font-semibold text-lg flex items-center gap-2" style={{ color: COLORS.azulCorp }}>
                <MapPin className="w-5 h-5" aria-hidden="true" /> {t('network.whereWeAre')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <LocationItem city="Barueri/SP" label={t('network.headquarters')} detail={t('network.nationalService')} />
                <LocationItem city="Port. St. Lucie — Florida, US" label={t('network.branch')} detail={t('network.regionalOperation')} />
              </div>
            </LocationCard>
            <LocationCard>
              <h2 className="font-semibold text-lg flex items-center gap-2" style={{ color: COLORS.azulCorp }}>
                <MapPin className="w-5 h-5" aria-hidden="true" /> {t('network.branchHighlight')}
              </h2>
              <div className="mt-4">
                <LocationItem city="Campo Grande/MS" label="Filial" detail={t('network.regionalOperationMidwest')} />
              </div>
            </LocationCard>
            <div className="rounded-3xl shadow-lg overflow-hidden">
              <img
                src="/imagens/rede-02.png"
                alt="Cobertura nacional da rede"
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LocationCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: COLORS.borderPill }}>
      {children}
    </div>
  );
}

function LocationItem({ city, label, detail }: { city: string; label: string; detail: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-medium text-sm" style={{ color: COLORS.azulCorp }}>{label}</div>
      <div className="text-sm font-semibold">{city}</div>
      <div className="text-xs text-neutral-500">{detail}</div>
    </div>
  );
}

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { useLanguage } from '../../hooks/useLanguage';
import { COLORS, DOMAIN, APP_URL_GERAL, APP_URL_COMBUSTIVEL } from '../../lib/constants';

export default function FornecedoresPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Parceiros | Acesso ao Sistema | InstaSolutions"
        description="Acesse o sistema InstaSolutions como parceiro fornecedor."
        canonical={`${DOMAIN}/parceiros/fornecedores`}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
          {t('access.welcome')} {t('access.supplier')}
        </h1>
        <p className="text-neutral-600 mb-8">{t('access.description')}</p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <AccessCard title={t('access.generalSystem')} href={APP_URL_GERAL} />
          <AccessCard title={t('access.fuelSystem')} href={APP_URL_COMBUSTIVEL} />
        </div>

        <div className="mt-10">
          <img
            src="/imagens/acesso_fornecedores.png"
            alt="Tela de acesso ao sistema — parceiros fornecedores"
            className="rounded-3xl shadow-lg w-full max-w-2xl mx-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </>
  );
}

function AccessCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl border p-5 font-semibold text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{ borderColor: COLORS.borderPill, color: COLORS.azulCorp }}
    >
      <span>{title}</span>
      <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
    </a>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../hooks/useLanguage';
import { COLORS } from '../lib/constants';

export default function ObrigadoPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Obrigado | InstaSolutions"
        description="Mensagem recebida com sucesso."
        noindex
      />

      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: '#DCFCE7' }}
          aria-hidden="true"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
          {t('thankyou.title')}
        </h1>
        <p className="text-neutral-600 max-w-md mb-8">{t('thankyou.message')}</p>
        <Link to="/">
          <Button variant="primary" size="lg">{t('thankyou.backHome')}</Button>
        </Link>
      </section>
    </>
  );
}

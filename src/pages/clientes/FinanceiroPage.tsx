import React from 'react';
import { Construction } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { COLORS, DOMAIN } from '../../lib/constants';

export default function ClientesFinanceiroPage() {
  return (
    <>
      <SEOHead
        title="Clientes | Portal Financeiro | InstaSolutions"
        description="Portal financeiro para clientes InstaSolutions."
        canonical={`${DOMAIN}/clientes/financeiro`}
      />

      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <Construction className="w-12 h-12 mb-4" style={{ color: COLORS.azulTech }} aria-hidden="true" />
        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>
          Em construção
        </h1>
        <p className="text-neutral-500 max-w-sm">
          O portal financeiro para clientes está sendo preparado. Em breve estará disponível.
        </p>
      </section>
    </>
  );
}

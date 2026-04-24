import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { COLORS } from '../lib/constants';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Página não encontrada | InstaSolutions" description="Esta página não existe." noindex />

      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <p className="text-7xl font-black mb-4" style={{ color: COLORS.borderPill }}>
          404
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
          Página não encontrada
        </h1>
        <p className="text-neutral-500 max-w-sm mb-8">
          Não conseguimos encontrar o que você está procurando. Verifique o endereço ou volte para a home.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/">
            <Button variant="primary">Ir para a Home</Button>
          </Link>
          <Link to="/contato">
            <Button variant="outline">Falar com o suporte</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

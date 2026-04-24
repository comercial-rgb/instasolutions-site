import React from 'react';
import { COLORS } from '../../lib/constants';

// TODO: Winner — substituir pelos logos reais de clientes (8 arquivos SVG em /public/imagens/clientes/)
const CLIENTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/imagens/clientes/logo-cliente-${i + 1}.svg`,
  alt: `Cliente ${i + 1}`,
}));

export function SocialProofStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-center text-sm font-medium text-neutral-400 uppercase tracking-widest mb-8">
        Empresas que confiam na InstaSolutions
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 items-center">
        {CLIENTS.map(({ id, src, alt }) => (
          <div key={id} className="flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="max-h-8 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                // Fallback placeholder if SVG not found
                const el = e.currentTarget;
                el.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-20 h-8 rounded bg-neutral-100 flex items-center justify-center text-xs text-neutral-400';
                fallback.textContent = `Cliente ${id}`;
                el.parentNode?.appendChild(fallback);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

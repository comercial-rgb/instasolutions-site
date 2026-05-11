import React from 'react';
import { COLORS } from '../../lib/constants';

const CLIENTS = [
  { src: '/imagens/clientes/prefeitura-santa-teresa.png',           alt: 'Prefeitura Municipal de Santa Teresa – ES' },
  { src: '/imagens/clientes/prefeitura-venda-nova-imigrante.jpg',   alt: 'Prefeitura de Venda Nova do Imigrante – ES' },
  { src: '/imagens/clientes/prefeitura-fundao.jpg',                 alt: 'Prefeitura de Fundão – ES' },
  { src: '/imagens/clientes/crf-rs.png',                            alt: 'Conselho Regional de Farmácia do RS' },
  { src: '/imagens/clientes/prefeitura-cariacica.png',              alt: 'Prefeitura de Cariacica – ES' },
  { src: '/imagens/clientes/prefeitura-campina-grande.png',         alt: 'Prefeitura de Campina Grande – PB' },
  { src: '/imagens/clientes/prefeitura-conceicao-castelo.png',      alt: 'Prefeitura de Conceição do Castelo – ES' },
  { src: '/imagens/clientes/unila.png',                             alt: 'UNILA – Universidade Federal da Integração Latino-Americana' },
];

export function SocialProofStrip() {
  return (
    <section className="py-14 border-y" style={{ borderColor: COLORS.borderPill, backgroundColor: COLORS.bgPill }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-10">
          Instituições que confiam na InstaSolutions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {CLIENTS.map(({ src, alt }) => (
            <div
              key={src}
              className="flex items-center justify-center h-16 px-2"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

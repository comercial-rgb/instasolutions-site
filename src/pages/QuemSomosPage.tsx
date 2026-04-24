import React from 'react';
import { SEOHead } from '../components/ui/SEOHead';
import { COLORS, DOMAIN } from '../lib/constants';

export default function QuemSomosPage() {
  return (
    <>
      <SEOHead
        title="Quem Somos | InstaSolutions — Nossa História"
        description="Conheça a trajetória da InstaSolutions desde 2022 e nossa missão de transformar a gestão de frotas no Brasil."
        canonical={`${DOMAIN}/quem-somos`}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: COLORS.azulCorp }}>
          Nossa História
        </h1>
        <div className="text-neutral-700 mt-6 space-y-4 leading-relaxed">
          <p>
            A história da InstaSolutions começa com uma inquietação: por que a gestão de frotas,
            algo tão essencial para empresas e instituições públicas, ainda era marcada por processos
            lentos, falta de transparência e decisões tomadas "no escuro"?
          </p>
          <p>
            Em 16 de setembro de 2022, em Campo Grande (MS), a empresa deu seus primeiros passos
            como uma jovem iniciativa focada na venda de peças. Mas, desde o início, havia algo maior
            nos bastidores: a convicção de que a tecnologia poderia transformar completamente a forma
            como as frotas eram administradas no Brasil.
          </p>
          <p>
            Ao acompanhar os desafios de clientes e parceiros, percebemos que o problema não estava
            apenas no fornecimento de peças — estava na falta de integração, na ausência de dados
            confiáveis, na dificuldade de acompanhar serviços, na burocracia e no custo elevado que
            muitos enfrentavam sem sequer perceber. Foi então que surgiu a primeira grande virada:
            desenvolver um sistema próprio de gestão de manutenção.
          </p>
          <p>
            Em dois anos, aquilo que começou como um pequeno projeto se tornou uma empresa sólida,
            inovadora e em expansão nacional. Transferimos nossa matriz para Barueri (SP) e levamos
            nossa cultura jovem e colaborativa para outras regiões com filiais em Campo Grande (MS)
            e Fortaleza (CE).
          </p>
          <p>
            Hoje, atendemos mais de 20 clientes em seis estados, conectando-os a uma rede com mais
            de 500 oficinas credenciadas e postos parceiros. Mas mais do que números, o que realmente
            importa é o impacto: cada ordem de serviço aberta representa tempo economizado, dinheiro
            poupado e operações mais seguras e eficientes.
          </p>
          <p>
            A InstaSolutions nasceu da inquietação de poucos, mas cresceu com o esforço de muitos.
            Cresceu porque ouviu seus clientes, aprendeu com o mercado e acreditou na força da inovação.
          </p>
          <p>
            E seguimos em movimento — expandindo nossa presença, ampliando nossa rede,
            aperfeiçoando nossos produtos e construindo diariamente a confiança de quem coloca
            a frota em nossas mãos.
          </p>
          <p className="text-lg font-semibold" style={{ color: COLORS.azulCorp }}>
            Somos a InstaSolutions — uma empresa jovem, inovadora e comprometida com a evolução
            contínua. E esta é apenas a primeira parte de uma história que ainda tem muito para crescer.
          </p>
        </div>
      </section>
    </>
  );
}

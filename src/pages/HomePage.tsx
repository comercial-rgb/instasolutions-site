import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Hero } from '../components/sections/Hero';
import { StatsBand } from '../components/sections/StatsBand';
import { SocialProofStrip } from '../components/sections/SocialProofStrip';
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel';
import { FAQSection } from '../components/sections/FAQSection';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../hooks/useLanguage';
import { COLORS, DOMAIN, ORG_NAME } from '../lib/constants';
import { organizationSchema } from '../lib/seo';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={`${ORG_NAME} | Sistema de Gestão de Frotas`}
        description="Sistemas de gestão de frotas com manutenção, abastecimento e rastreamento integrados. 500+ oficinas credenciadas e cobertura Brasil inteiro."
        canonical={`${DOMAIN}/`}
        jsonLd={[organizationSchema()]}
      />

      <Hero />
      <StatsBand />
      <SocialProofStrip />

      {/* Solutions grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.azulCorp }}>
            {t('home.solutions')}
          </h2>
          <p className="text-neutral-600 max-w-xl">
            {t('home.solutionsDesc')}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link to="/parceiros/credenciar">
              <Button variant="primary">{t('button.credential')}</Button>
            </Link>
            <Link to="/solucoes">
              <Button variant="outline">{t('button.knowSolutions')}</Button>
            </Link>
          </div>
        </div>
        <SolucoesGrid />
      </section>

      {/* Cost-benefit section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            {t('home.costBenefit')}
          </h2>
          <p className="mt-3 text-neutral-700">{t('home.costBenefitDesc')}</p>
          <p className="mt-2 text-neutral-700">{t('home.costBenefitDesc2')}</p>
        </div>
        <img
          className="rounded-3xl shadow-lg"
          src="/imagens/home_custo-beneficio.png"
          alt="Custo-benefício do sistema"
          loading="lazy"
          decoding="async"
        />
      </section>

      {/* Workshops section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <img
          className="rounded-3xl shadow-lg order-last lg:order-first"
          src="/imagens/home-oficinas-parceiras.png"
          alt="Rede de oficinas parceiras"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            Serviços e produtos das melhores oficinas do mercado
          </h2>
          <p className="mt-3 text-neutral-700">
            Com um sistema de gestão de frotas conectado às melhores oficinas do
            mercado, você garante um atendimento completo e de qualidade.
          </p>
          <p className="mt-2 text-neutral-700">
            Desde manutenções preventivas e corretivas até serviços especializados —
            alinhamento, balanceamento, trocas de peças, revisão elétrica e mecânica —
            tudo pensado para manter sua frota sempre em operação.
          </p>
        </div>
      </section>

      {/* Realtime section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            Fique atualizado em qualquer lugar
          </h2>
          <p className="mt-3 text-neutral-700">
            Acompanhe tudo o que acontece com seus veículos em tempo real, onde quer
            que esteja. Receba notificações sobre manutenções, relatórios de desempenho
            e status de serviços nos parceiros.
          </p>
          <p className="mt-2 text-neutral-700">
            Mantenha o controle total da sua frota com praticidade e tecnologia na
            palma da mão.
          </p>
        </div>
        <img
          className="rounded-3xl shadow-lg"
          src="/imagens/home-mobile-alertas.png"
          alt="Atualizações em tempo real no mobile"
          loading="lazy"
          decoding="async"
        />
      </section>

      {/* About section */}
      <section
        className="py-16"
        style={{ backgroundColor: COLORS.bgPill }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.azulCorp }}>
            Quem somos?
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 text-neutral-700">
            <p>
              A InstaSolutions nasceu com o propósito de ser uma empresa jovem,
              inovadora e transparente, voltada para atender instituições públicas e
              empresas privadas. Iniciando suas atividades em 16 de setembro de 2022,
              na cidade de Campo Grande (MS), a empresa começou no setor automotivo,
              comercializando peças.
            </p>
            <div>
              <p>
                Em apenas dois anos, a InstaSolutions cresceu significativamente,
                transferindo sua matriz para Barueri (SP) e mantendo filiais em Campo
                Grande (MS) e Fortaleza (CE). Hoje, atende mais de 20 clientes em seis
                estados e opera com uma rede de mais de 500 oficinas credenciadas.
              </p>
              <div className="mt-4">
                <Link to="/quem-somos">
                  <Button variant="outline" size="sm">Saiba mais sobre nós →</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />
      <FAQSection />
    </>
  );
}

function SolucoesGrid() {
  const { t } = useLanguage();
  const solutions = [
    {
      icon: '🔧',
      title: t('solutions.manutencao.title'),
      description: t('solutions.manutencao.desc'),
    },
    {
      icon: '⛽',
      title: t('solutions.abastecimento.title'),
      description: t('solutions.abastecimento.desc'),
    },
    {
      icon: '📡',
      title: t('solutions.rastreamento.title'),
      description: t('solutions.rastreamento.desc'),
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {solutions.map((sol) => (
        <div
          key={sol.title}
          className="rounded-2xl border p-6 flex flex-col gap-3"
          style={{ borderColor: COLORS.borderPill }}
        >
          <div className="text-3xl" aria-hidden="true">{sol.icon}</div>
          <h3 className="font-bold text-lg" style={{ color: COLORS.azulCorp }}>
            {sol.title}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{sol.description}</p>
          <Link
            to="/solucoes"
            className="text-sm font-medium hover:underline mt-auto"
            style={{ color: COLORS.azulTech }}
          >
            Saiba mais →
          </Link>
        </div>
      ))}
    </div>
  );
}

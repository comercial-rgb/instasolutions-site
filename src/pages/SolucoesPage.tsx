import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/ui/SEOHead';
import { Carousel } from '../components/ui/Carousel';
import { AppDownloadBanner } from '../components/sections/AppDownloadBanner';
import { useLanguage } from '../hooks/useLanguage';
import { COLORS, DOMAIN } from '../lib/constants';

type Tab = 'manut' | 'abast' | 'rast';

const HASH_TO_TAB: Record<string, Tab> = {
  '#manutencao': 'manut',
  '#abastecimento': 'abast',
  '#rastreamento': 'rast',
};

const TAB_TO_HASH: Record<Tab, string> = {
  manut: '#manutencao',
  abast: '#abastecimento',
  rast: '#rastreamento',
};

export default function SolucoesPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const tab: Tab = HASH_TO_TAB[location.hash] ?? 'manut';

  function setTab(next: Tab) {
    navigate({ hash: TAB_TO_HASH[next] }, { replace: true });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'manut', label: t('solutions.maintenance') },
    { key: 'abast', label: t('solutions.fueling') },
    { key: 'rast', label: t('solutions.tracking') },
  ];

  return (
    <>
      <SEOHead
        title="Soluções | InstaSolutions — Manutenção, Abastecimento e Rastreamento"
        description="Módulos integrados de gestão de frotas com dashboards em tempo real, SLAs e +500 parceiros credenciados."
        canonical={`${DOMAIN}/solucoes`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: COLORS.azulCorp }}>
          {t('solutions.title')}
        </h1>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Módulos de solução"
          className="flex flex-wrap gap-2 mt-6"
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setTab(key)}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              style={
                tab === key
                  ? { backgroundColor: COLORS.azulTech, color: 'white', borderColor: COLORS.azulTech }
                  : { backgroundColor: 'white', color: COLORS.azulCorp, borderColor: COLORS.borderPill }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="mt-8">
          <div
            role="tabpanel"
            id="panel-manut"
            aria-labelledby="tab-manut"
            hidden={tab !== 'manut'}
          >
            {tab === 'manut' && (
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: COLORS.azulCorp }}>
                    {t('solutions.maintenance')}
                  </h2>
                  <ul className="list-disc ml-6 text-neutral-700 mt-3 space-y-1 text-sm">
                    <li>App mobile para motoristas com registro de ocorrências</li>
                    <li>Alertas de manutenção preventiva e corretiva</li>
                    <li>Personalização completa conforme necessidade do cliente</li>
                    <li>Ordens de serviço digitais com fluxo automático</li>
                    <li>Aprovação e auditoria de orçamentos em tempo real</li>
                    <li>Rede nacional com +500 oficinas homologadas</li>
                    <li>Histórico completo de serviços e peças por veículo</li>
                    <li>Comparação automática de preços e prazos</li>
                    <li>Indicadores de performance e custo por centro de custo</li>
                    <li>Controle de saldos e garantias</li>
                    <li>Registro fotográfico e documental integrado</li>
                    <li>Relatórios personalizados e dashboards gerenciais</li>
                    <li>Cadastro e gestão de fornecedores</li>
                    <li>Múltiplos perfis de acesso com permissões</li>
                    <li>Software moderno com acesso 24/7</li>
                    <li>Suporte técnico especializado</li>
                  </ul>
                </div>
                <Carousel
                  items={['/imagens/manutencao-2.png', '/imagens/manutencao-3.png', '/imagens/manutencao-1.png', '/imagens/manutencao.png']}
                  alt="Manutenção"
                />
              </div>
            )}
          </div>

          <div
            role="tabpanel"
            id="panel-abast"
            aria-labelledby="tab-abast"
            hidden={tab !== 'abast'}
          >
            {tab === 'abast' && (
              <>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: COLORS.azulCorp }}>
                      {t('solutions.fueling')}
                    </h2>
                    <ul className="list-disc ml-6 text-neutral-700 mt-3 space-y-1 text-sm">
                      <li>Alertas personalizáveis conforme necessidade do cliente</li>
                      <li>App mobile com registro instantâneo de abastecimento</li>
                      <li>Validação geográfica e antifraude em tempo real</li>
                      <li>Rede de postos parceiros em todo o Brasil</li>
                      <li>Controle de consumo por veículo e motorista</li>
                      <li>Relatórios por período, posto ou centro de custo</li>
                      <li>Conciliação automática de abastecimentos</li>
                      <li>Painel unificado de despesas de combustível</li>
                      <li>Importação de notas e integração com ERP</li>
                      <li>Regras de limite por veículo, motorista ou horário</li>
                      <li>Identificação de variações anormais de consumo</li>
                      <li>Múltiplos perfis de acesso com permissões</li>
                      <li>Dashboards gerenciais em tempo real</li>
                      <li>Economia comprovada na operação</li>
                      <li>Software moderno com acesso 24/7</li>
                      <li>Suporte técnico especializado</li>
                    </ul>
                  </div>
                  <Carousel
                    items={['/imagens/abastecimento-2.png', '/imagens/abastecimento-1.png', '/imagens/abastecimento-3.png', '/imagens/abastecimento.png']}
                    alt="Abastecimento"
                  />
                </div>
                <AppDownloadBanner system="combustiveis" />
              </>
            )}
          </div>

          <div
            role="tabpanel"
            id="panel-rast"
            aria-labelledby="tab-rast"
            hidden={tab !== 'rast'}
          >
            {tab === 'rast' && (
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: COLORS.azulCorp }}>
                    {t('solutions.tracking')}
                  </h2>
                  <ul className="list-disc ml-6 text-neutral-700 mt-3 space-y-1 text-sm">
                    <li>Telemetria e videotelemetria completa</li>
                    <li>Rastreamento com controle de portas e acessórios</li>
                    <li>Alertas personalizáveis conforme necessidade do cliente</li>
                    <li>Monitoramento em tempo real com atualização contínua</li>
                    <li>Cercas virtuais configuráveis com alertas automáticos</li>
                    <li>Alertas de velocidade, rota e comportamento de direção</li>
                    <li>Histórico completo de trajetos e deslocamentos</li>
                    <li>Relatórios de condução e análise de telemetria</li>
                    <li>Identificação de ociosidade e desvios operacionais</li>
                    <li>Manutenção preventiva baseada em quilometragem</li>
                    <li>Câmeras embarcadas com gravação de eventos</li>
                    <li>Integração com sistemas de gestão e ERPs</li>
                    <li>Rastreadores homologados pela Anatel</li>
                    <li>Bloqueio remoto do veículo via plataforma</li>
                    <li>Múltiplos perfis de acesso com permissões</li>
                    <li>Suporte técnico especializado</li>
                  </ul>
                </div>
                <Carousel
                  items={['/imagens/rastreamento.png', '/imagens/rastreamento-1.png', '/imagens/rastreamento-2.png', '/imagens/rastreamento-3.png']}
                  alt="Rastreamento"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

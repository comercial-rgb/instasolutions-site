import React from 'react';
import { SEOHead } from '../components/ui/SEOHead';
import { COLORS, DOMAIN, EMAIL, ORG_NAME } from '../lib/constants';

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <SEOHead
        title="Política de Privacidade | InstaSolutions"
        description="Política de Privacidade dos aplicativos InstaSolutions — Combustível, Manutenção e Rastreamento."
        canonical={`${DOMAIN}/politica-de-privacidade`}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>
          Política de Privacidade
        </h1>
        <p className="text-sm text-neutral-400 mb-10">Última atualização: 06 de abril de 2026</p>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700 leading-relaxed">
          <p>
            A <strong>{ORG_NAME}</strong> (CNPJ 47.611.398/0001-66), doravante denominada simplesmente
            "InstaSolutions", é responsável pelo tratamento dos dados pessoais coletados por meio de seus
            aplicativos móveis: <strong>InstaSolutions Combustíveis</strong>,{' '}
            <strong>InstaSolutions Manutenção</strong> e <strong>InstaSolutions Rastreamento</strong>.
          </p>
          <p>
            Esta Política descreve como coletamos, utilizamos, armazenamos e protegemos suas informações,
            em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
          </p>

          <Section title="1. Dados Pessoais Coletados">
            <ul>
              <li><strong>Identificação:</strong> nome, CPF/RG, e-mail, telefone, empresa e cargo.</li>
              <li><strong>Autenticação:</strong> credenciais de login (e-mail e senha criptografada).</li>
              <li><strong>Localização:</strong> coordenadas GPS em tempo real.</li>
              <li><strong>Câmera e imagens:</strong> fotos para ordens de serviço e QR codes.</li>
              <li><strong>NFC:</strong> leitura de tags para identificação de veículos (app Combustíveis).</li>
              <li><strong>Uso do aplicativo:</strong> logs de acesso, interações e preferências.</li>
              <li><strong>Veículos:</strong> placa, modelo, quilometragem e histórico de serviços.</li>
              <li><strong>Notificações push:</strong> tokens de dispositivo para alertas operacionais.</li>
            </ul>
          </Section>

          <Section title="2. Finalidades do Tratamento">
            <ul>
              <li>Fornecer, operar e manter os serviços.</li>
              <li>Gerenciar abastecimentos, manutenções e rastreamento.</li>
              <li>Exibir postos e oficinas próximas à localização do usuário.</li>
              <li>Enviar notificações e alertas operacionais.</li>
              <li>Gerar relatórios e indicadores de desempenho da frota.</li>
              <li>Garantir a segurança e prevenir fraudes.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </Section>

          <Section title="3. Base Legal para o Tratamento">
            <ul>
              <li><strong>Execução de contrato</strong> — para prestação dos serviços contratados.</li>
              <li><strong>Consentimento</strong> — para coleta de localização e notificações push.</li>
              <li><strong>Legítimo interesse</strong> — para melhoria dos serviços e prevenção de fraudes.</li>
              <li><strong>Obrigação legal</strong> — para cumprimento de exigências regulatórias.</li>
            </ul>
          </Section>

          <Section title="4. Compartilhamento de Dados">
            <ul>
              <li><strong>Rede de credenciados:</strong> oficinas e postos parceiros para execução dos serviços.</li>
              <li><strong>Prestadores de serviço:</strong> fornecedores de infraestrutura tecnológica, sob contrato de confidencialidade.</li>
              <li><strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
            </ul>
            <p>Não comercializamos, alugamos ou vendemos dados pessoais a terceiros para fins de marketing.</p>
          </Section>

          <Section title="5. Armazenamento e Segurança">
            <ul>
              <li>Criptografia em trânsito (TLS/SSL) e em repouso.</li>
              <li>Controles de acesso baseados em perfis e permissões.</li>
              <li>Hashing de senhas e monitoramento de vulnerabilidades.</li>
            </ul>
          </Section>

          <Section title="6. Direitos do Titular">
            <p>Nos termos da LGPD, você pode:</p>
            <ul>
              <li>Confirmar a existência e acessar seus dados.</li>
              <li>Corrigir dados incompletos ou inexatos.</li>
              <li>Solicitar anonimização, bloqueio ou eliminação.</li>
              <li>Solicitar portabilidade dos dados.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p>
              Para exercer seus direitos:{' '}
              <a href={`mailto:${EMAIL}`} className="underline font-medium" style={{ color: COLORS.azulTech }}>
                {EMAIL}
              </a>
            </p>
          </Section>

          <Section title="7. Permissões dos Aplicativos">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden mt-2">
                <thead>
                  <tr style={{ backgroundColor: COLORS.bgPill }}>
                    <th className="text-left px-4 py-2 font-semibold border-b" style={{ color: COLORS.azulCorp }}>Permissão</th>
                    <th className="text-left px-4 py-2 font-semibold border-b" style={{ color: COLORS.azulCorp }}>Finalidade</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Localização (GPS)', 'Localizar postos/oficinas e rastreamento veicular em tempo real.'],
                    ['Câmera', 'Leitura de QR codes, registro fotográfico de ordens de serviço.'],
                    ['NFC', 'Identificação de veículos e validação de abastecimentos.'],
                    ['Notificações', 'Alertas de cercas virtuais e atualizações operacionais.'],
                    ['Galeria / Fotos', 'Seleção de imagem para perfil ou documentos.'],
                    ['Microfone', 'Captura de áudio para operações específicas.'],
                  ].map(([perm, fin], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : COLORS.bgPill }}>
                      <td className="px-4 py-2 border-b">{perm}</td>
                      <td className="px-4 py-2 border-b">{fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="8. Alterações nesta Política">
            <p>
              Esta Política poderá ser atualizada periodicamente. Alterações significativas serão comunicadas
              por meio dos Aplicativos ou por e-mail.
            </p>
          </Section>

          <Section title="9. Contato">
            <ul className="list-none pl-0 space-y-1">
              <li><strong>Empresa:</strong> {ORG_NAME}</li>
              <li><strong>CNPJ:</strong> 47.611.398/0001-66</li>
              <li>
                <strong>E-mail:</strong>{' '}
                <a href={`mailto:${EMAIL}`} className="underline" style={{ color: COLORS.azulTech }}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href={DOMAIN} className="underline" style={{ color: COLORS.azulTech }}>
                  {DOMAIN}
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-10 mb-3" style={{ color: COLORS.azulCorp }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

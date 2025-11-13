import React, { useMemo, useState, useEffect, type CSSProperties } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Wrench,
  Satellite,
  Fuel,
  MapPin,
  Layers,
  ShieldCheck,
  ChevronDown,
  ExternalLink
} from "lucide-react";

/**********************
 * CONFIG & CONSTANTS *
 **********************/
const DOMAIN = "https://frotainstasolutions.com.br";
const ORG_NAME = "InstaSolutions Produtos e Gestão Empresarial";
const EMAIL = "comercial@instasolutions.com.br";
const COLORS = {
  azulTech: "#005BED",
  azulCorp: "#251C59",
  bgPill: "#F3F6FF",
  borderPill: "#D6E2FF"
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

function ImageCarousel({ images, alt, objectFit = "cover" }: { images: string[]; alt: string; objectFit?: "cover" | "contain" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative aspect-[4/3] rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${alt} ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity duration-500 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

function buildCanonical(path = "/") {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${DOMAIN}${path === "/" ? "" : path}`;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+55-11-3336-6941",
        contactType: "customer service",
        email: EMAIL
      }
    ]
  };
}

// Brazil UFs and sample cities (pode ser expandido depois)
const UFS: string[] = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RO",
  "RS",
  "RR",
  "SC",
  "SE",
  "SP",
  "TO"
];

const CITIES_BY_UF: Record<string, string[]> = {
  AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
  AL: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo"],
  AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro", "Lauro de Freitas", "Ilhéus", "Jequié", "Teixeira de Freitas"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá"],
  DF: ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina"],
  ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Viana", "Cachoeiro de Itapemirim", "Linhares", "São Mateus", "Colatina", "Guarapari"],
  GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama"],
  MA: ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Sorriso", "Lucas do Rio Verde", "Barra do Garças", "Primavera do Leste"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Sidrolândia", "Aquidauana", "Nova Andradina", "Maracaju", "Naviraí"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga"],
  PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal", "Parauapebas", "Itaituba", "Cametá", "Bragança", "Abaetetuba"],
  PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cajazeiras", "Guarabira", "Mamanguape", "Cabedelo"],
  PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá"],
  PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão"],
  PI: ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior", "Barras", "Altos", "Esperantina", "Pedro II"],
  RJ: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "São João de Meriti", "Petrópolis", "Volta Redonda"],
  RN: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Caicó", "Assu", "Currais Novos", "Nova Cruz"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande"],
  RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Jaru", "Rolim de Moura", "Guajará-Mirim", "Pimenta Bueno", "Buritis"],
  RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó", "Criciúma", "Itajaí", "Jaraguá do Sul", "Lages", "Palhoça"],
  SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "São Cristóvão", "Tobias Barreto", "Simão Dias", "Propriá", "Barra dos Coqueiros"],
  SP: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "São José dos Campos", "Ribeirão Preto", "Sorocaba", "Santos", "Barueri", "Mauá", "São José do Rio Preto", "Mogi das Cruzes", "Diadema"],
  TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins", "Guaraí", "Araguatins", "Miracema do Tocantins", "Tocantinópolis"]
};
function getCitiesForUF(uf: string): string[] {
  return CITIES_BY_UF[uf] || ["Cidade"];
}

/**************
 * LAYOUT UI *
 **************/
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <nav className="sticky top-0 bg-white/90 backdrop-blur border-b z-40 flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-[60px]" />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <NavPill to="/">Home</NavPill>
          <NavPill to="/solucoes">Soluções</NavPill>

          <NavDropdown label="Parceiros">
            <DropdownItem to="/parceiros/credenciar">Quero me Credenciar</DropdownItem>
            <DropdownItem to="/parceiros/fornecedores">
              Acesso ao sistema - Fornecedores
            </DropdownItem>
            <DropdownItem to="/parceiros/financeiro">Portal Financeiro</DropdownItem>
          </NavDropdown>

          <NavDropdown label="Sou cliente">
            <DropdownItem to="/clientes/queroser">Quero ser Cliente</DropdownItem>
            <DropdownItem to="/clientes/acesso">Acesso ao sistema - Clientes</DropdownItem>
            <DropdownItem to="/clientes/financeiro">Portal Financeiro</DropdownItem>
          </NavDropdown>

          <NavPill to="/rede">Rede</NavPill>
          <NavPill to="/sobre">Sobre</NavPill>
          <NavPill to="/contato">Contato</NavPill>
        </div>
        <Link to="/contato">
          <GeoButton size="sm">Fale com o time</GeoButton>
        </Link>
      </nav>
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 items-start">
        <div>
          <img src="/imagens/logo_rodapé.png" alt="InstaSolutions" className="h-16" />
          <div className="text-xs text-neutral-500 mt-3">
            © {new Date().getFullYear()} {ORG_NAME}. Todos os direitos reservados.
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Institucional</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="hover:underline" to="/sobre">
                Sobre
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/rede">
                Rede
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Soluções</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="hover:underline" to="/solucoes">
                Visão geral
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Parceiros</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="hover:underline" to="/parceiros/credenciar">
                Quero me Credenciar
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/parceiros/fornecedores">
                Acesso ao sistema
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/contato">
                Contato
              </Link>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-sm">
            <a className="underline" href="#" aria-label="Instagram">
              Instagram
            </a>
            <a className="underline" href="#" aria-label="Facebook">
              Facebook
            </a>
            <a className="underline" href="#" aria-label="YouTube">
              YouTube
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}

function Section({
  id,
  className = "",
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

/*****************
 * PAGES CONTENT *
 *****************/

function HomePage() {
  const title = `${ORG_NAME} | Sistema de Gestão de Frotas`;
  const description =
    "Sistemas de gestão de frotas com manutenção, abastecimento e rastreamento integrados. 500+ oficinas credenciadas e cobertura Brasil inteiro.";
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/")} />
        <script type="application/ld+json">
          {JSON.stringify(buildOrganizationSchema())}
        </script>
      </Helmet>

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #F3F6FF 0%, #FFFFFF 45%, #EAF1FF 100%)"
          }}
        />
        <Section className="relative grid lg:grid-cols-2 gap-10 py-16 lg:py-24">
          <motion.div {...fadeUp} className="flex flex-col gap-6">
            <span
              className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 w-max"
              style={{ backgroundColor: "#E6F0FF", color: COLORS.azulTech }}
            >
              <ShieldCheck className="w-4 h-4" /> Gestão completa de frotas
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold leading-tight"
              style={{ color: COLORS.azulCorp }}
            >
              Plataforma corporativa para gestão de frotas com módulos integrados
            </h1>
            <p className="text-neutral-700 text-lg">
              Manutenção com rede de oficinas, abastecimento com rede de postos e
              rastreamento — tudo em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/solucoes">
                <GeoButton size="lg">Ver soluções</GeoButton>
              </Link>
              <Link to="/contato">
                <GeoButton size="lg" variant="outline">
                  Solicitar demonstração
                </GeoButton>
              </Link>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm mt-4">
              {[
                "+500 oficinas credenciadas",
                "Rede de postos integrada",
                "Dashboards em tempo real"
              ].map((t, i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: COLORS.azulTech }}
                  />{" "}
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }}>
            <ImageCarousel
              images={[
                "/imagens/home_dashboard-1.png",
                "/imagens/home_dashboard-2.png",
                "/imagens/home_dashboard-3.png"
              ]}
              alt="Dashboard de Frotas"
            />
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <Stat label="Oficinas" value="500+" />
              <Stat label="Cobertura" value="Brasil inteiro" />
              <Stat label="Integrações" value="> 30 APIs" />
            </div>
          </motion.div>
        </Section>
      </div>

      {/* MÓDULOS + CTA CONHEÇA */}
      <Section className="pb-4">
        <SolucoesGrid />
        <div className="flex justify-center mt-8">
          <GeoButton size="lg" onClick={() => navigate("/solucoes")}>
            Conheça nossas soluções
          </GeoButton>
        </div>
      </Section>

      {/* Seções descritivas */}
      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            Excelente custo-benefício
          </h3>
          <p className="mt-3 text-neutral-700">
            A InstaSolutions atua na intermediação de contratação de serviços e peças
            automotivas para empresas e instituições públicas.
          </p>
          <p className="mt-2 text-neutral-700">
            Através de um software próprio e aplicativo, oferece aos clientes acesso a
            uma rede de credenciados que oferece seus serviços e produtos a um preço
            competitivo. A rede de credenciados, por sua vez, paga uma taxa à
            plataforma a cada serviço contratado.
          </p>
        </div>
        <img
          className="rounded-3xl shadow"
          src="/imagens/home_custo-beneficio.png"
          alt="Custo-benefício"
        />
      </Section>

      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <img
          className="rounded-3xl shadow order-last lg:order-first"
          src="/imagens/home_Oficinas parceiras.png"
          alt="Oficinas"
        />
        <div>
          <h3 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            Serviços e produtos oferecidos pelas melhores oficinas do mercado
          </h3>
          <p className="mt-3 text-neutral-700">
            Com um sistema de gestão de frotas conectado às melhores oficinas do
            mercado, você garante um atendimento completo e de qualidade.
          </p>
          <p className="mt-2 text-neutral-700">
            Desde manutenções preventivas e corretivas até serviços especializados,
            como alinhamento, balanceamento, trocas de peças, revisão elétrica e
            mecânica, além de produtos confiáveis, tudo é pensado para manter sua
            frota sempre em operação.
          </p>
          <p className="mt-2 text-neutral-700">
            Aproveite a conveniência e os benefícios de um convênio que une eficiência,
            economia e excelência no cuidado com seus veículos.
          </p>
        </div>
      </Section>

      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            Fique atualizado em qualquer lugar
          </h3>
          <p className="mt-3 text-neutral-700">
            Com nosso sistema de gestão de frotas, você acompanha tudo o que acontece
            com seus veículos em tempo real, onde quer que esteja. Receba notificações
            sobre manutenções, relatórios de desempenho e status de serviços nos
            parceiros.
          </p>
          <p className="mt-2 text-neutral-700">
            Mantenha o controle total da sua frota com praticidade e tecnologia na
            palma da mão.
          </p>
        </div>
        <img
          className="rounded-3xl shadow"
          src="/imagens/home_Mobile e alertas.png"
          alt="Atualizado"
        />
      </Section>

      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
          Quem somos?
        </h3>
        <div className="grid lg:grid-cols-2 gap-8 text-neutral-700">
          <div>
            <p>
              A InstaSolutions nasceu com o propósito de ser uma empresa jovem,
              inovadora e transparente, voltada para atender instituições públicas e
              empresas privadas. Iniciando suas atividades em 16 de setembro de 2022,
              na cidade de Campo Grande (MS), a empresa começou no setor automotivo,
              comercializando peças. Logo, expandiu sua atuação com o desenvolvimento
              de um sistema de gestão de manutenção que conecta clientes a uma rede
              credenciada de oficinas, permitindo cotações e condições vantajosas para
              aquisição de peças e serviços.
            </p>
          </div>
          <div>
            <p>
              Em apenas dois anos, a InstaSolutions cresceu significativamente,
              transferindo sua matriz para Barueri (SP) e mantendo filiais em Campo
              Grande (MS) e Fortaleza (CE). Hoje, atende mais de 20 clientes em seis
              estados, entre instituições públicas e privadas, e opera com uma rede de
              mais de 500 oficinas credenciadas e postos de combustível.
            </p>
            <p className="mt-2">
              Comprometida em expandir sua presença em todo o território nacional, a
              empresa segue inovando e fortalecendo sua posição no setor de gestão de
              frotas e manutenção automotiva.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function SolucoesPage() {
  const title = "Soluções | InstaSolutions — Manutenção, Abastecimento e Rastreamento";
  const description = "Módulos integrados com dashboards e SLAs.";
  const [tab, setTab] = useState<"manut" | "abast" | "rast">("manut");

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/solucoes")} />
      </Helmet>

      <Section className="py-12">
        <h2
          className="text-2xl sm:text-4xl font-bold"
          style={{ color: COLORS.azulCorp }}
        >
          Soluções
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <TabButton active={tab === "manut"} onClick={() => setTab("manut")}>
            Manutenção
          </TabButton>
          <TabButton active={tab === "abast"} onClick={() => setTab("abast")}>
            Abastecimento
          </TabButton>
          <TabButton active={tab === "rast"} onClick={() => setTab("rast")}>
            Rastreamento
          </TabButton>
        </div>
        <div className="mt-8">
          {tab === "manut" && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.azulCorp }}
                >
                  Manutenção
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2">
                  <li>Ordens de serviço digitais com fluxo e histórico.</li>
                  <li>Orçamentos com auditoria e aprovação centralizada.</li>
                  <li>Rede de oficinas credenciadas com SLA e qualidade.</li>
                </ul>
              </div>
              <ImageCarousel
                images={[
                  "/imagens/soluções_manunteção-1.png",
                  "/imagens/soluções_manunteção-2.png",
                  "/imagens/soluções_manunteção-3.png"
                ]}
                alt="Manutenção"
                objectFit="contain"
              />
            </div>
          )}
          {tab === "abast" && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.azulCorp }}
                >
                  Abastecimento
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2">
                  <li>Rede de postos integrada com preços competitivos.</li>
                  <li>Controle de consumo e prevenção de fraudes.</li>
                  <li>Relatórios por centro de custo.</li>
                  <li>Aplicativo e camadas de segurança.</li>
                </ul>
              </div>
              <ImageCarousel
                images={[
                  "/imagens/solução_abastecimento-1.png",
                  "/imagens/solução_abastecimento-2.png",
                  "/imagens/solução_abastecimento-3.png"
                ]}
                alt="Abastecimento"
                objectFit="contain"
              />
            </div>
          )}
          {tab === "rast" && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.azulCorp }}
                >
                  Rastreamento
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2">
                  <li>Localização em tempo real com telemetria.</li>
                  <li>Alertas e cercas virtuais.</li>
                  <li>Análise de direção e rotas.</li>
                  <li>Alertas de manutenção.</li>
                </ul>
              </div>
              <ImageCarousel
                images={[
                  "/imagens/solução_rastreamento-1.png",
                  "/imagens/solução_rastreamento-2.png",
                  "/imagens/solução_rastreamento-3.png"
                ]}
                alt="Rastreamento"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      </Section>
    </Layout>
  );
}

/************ PARCEIROS ************/

const SEGMENTOS_ATUACAO = [
  "Aquisição de peças",
  "Aquisição de pneu",
  "Auto peças & Distribuidora",
  "Auto elétrica",
  "Ar-condicionado",
  "Borracharia",
  "Consessionária",
  "Despachante ou Comércio de placas",
  "Funilaria e pintura",
  "Lavagem automotiva",
  "Troca de óleo Express",
  "Oficina mecânica",
  "Centro Automotivo",
  "Vidros em geral",
  "Reforma de pneu",
  "Guincho",
  "Tapeçaria",
  "Vistoria veicular e Inspeção veicular",
  "Chaveiro",
  "Posto de Molas",
  "Outro"
];

function ParceirosCredenciarPage() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<"postos" | "linha">("postos");
  const [uf, setUf] = useState("SP");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(`https://formsubmit.co/${EMAIL}`, { method: "POST", body: data })
      .then(() => {
        alert(
          "Formulario enviado com sucesso, nossa equipe entrará em contato em até 24 horas para finalização do credenciamento, se atente ao telefone e e-mail informados"
        );
        navigate("/");
      })
      .catch(() => alert("Erro ao enviar. Tente novamente."));
  }

  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Credenciamento</title>
        <link rel="canonical" href={buildCanonical("/parceiros/credenciar")} />
      </Helmet>

      <Banner title="Preencha o formulario abaixo para credenciamento" />

      <Section className="py-10">
        <div className="flex gap-2 mb-6">
          <TabButton active={tipo === "postos"} onClick={() => setTipo("postos")}>
            Postos de combustível
          </TabButton>
          <TabButton active={tipo === "linha"} onClick={() => setTipo("linha")}>
            Linha Automotiva
          </TabButton>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="[Credenciamento] Novo parceiro" />
          <input type="hidden" name="Tipo" value={tipo} />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="CNPJ" label="CNPJ" required />
            <Input name="Razao Social" label="Razão social" required />
            <Input name="Nome Fantasia" label="Nome Fantasia" required />
            <Input name="Bairro" label="Bairro" />
            <Input name="Endereco" label="Endereço c/ número" className="md:col-span-2" />
            <div>
              <Label>Estado</Label>
              <select
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                name="Estado"
                className="border rounded-xl px-3 py-2 w-full"
              >
                {UFS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <Input name="Cidade" label="Cidade" />
            <Input name="Email" type="email" label="E-mail" required />
            <Input name="Responsavel" label="Responsável" />
            <Input name="CPF_RG" label="CPF/RG" />
            <Input name="DDD_Celular" label="DDD / Celular" />
            <Input name="DDD_Fixo" label="DDD / Fixo" />
            {tipo === "postos" && (
              <div className="md:col-span-2">
                <Label> Bandeira </Label>
                <select
                  name="Bandeira"
                  className="border rounded-xl px-3 py-2 w-full"
                  defaultValue="SHELL"
                >
                  {["SHELL", "ALE", "IPIRANGA", "PROPRIA", "PETROBAS", "RAÍZEN", "OUTROS"].map(
                    (o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            {tipo === "linha" && (
              <div className="md:col-span-2">
                <Label> Segmento de atuação </Label>
                <select
                  name="Segmento de atuação"
                  className="border rounded-xl px-3 py-2 w-full"
                  defaultValue={SEGMENTOS_ATUACAO[0]}
                >
                  {SEGMENTOS_ATUACAO.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-center gap-2 md:col-span-2">
              <input type="checkbox" required id="termos" />
              <label htmlFor="termos" className="text-sm">
                Confirmo que concordo com os termos e processo de credenciamento da
                InstaSolutions.
              </label>
            </div>
          </div>
          <GeoButton size="lg">Enviar</GeoButton>
        </form>
      </Section>
    </Layout>
  );
}

function ParceirosFornecedoresPage() {
  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Acesso ao sistema</title>
        <link rel="canonical" href={buildCanonical("/parceiros/fornecedores")} />
      </Helmet>
      <Banner title="Bem vindo Fornecedor" />
      <Section className="py-10">
        <p className="text-center text-neutral-700 mb-6">
          Para acessar nosso sistema para clicar no botão "Acessar" abaixo e você será redirecionado para nosso site.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <AccessCard
            title="Acesso geral ao sistema"
            href="https://app.frotainstasolutions.com.br/"
          />
          <AccessCard
            title="Acesso combustível"
            href="https://front.instasolutionscomb.com.br/login"
          />
        </div>
        <div className="mt-10 flex justify-center">
          <img
            src="/imagens/acesso_fornecedores.png"
            alt="Acesso ao sistema - Fornecedores"
            className="rounded-3xl shadow-lg w-full max-w-2xl object-contain"
          />
        </div>
      </Section>
    </Layout>
  );
}

function ParceirosFinanceiroPage() {
  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Portal Financeiro</title>
        <link rel="canonical" href={buildCanonical("/parceiros/financeiro")} />
      </Helmet>
      <Banner title="Página em construção. Aguarde lançamento em breve !" />
    </Layout>
  );
}

/************ CLIENTES ************/

function ClientesQueroSerPage() {
  const navigate = useNavigate();
  const [uf, setUf] = useState("SP");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch(`https://formsubmit.co/${EMAIL}`, { method: "POST", body: data })
      .then(() => {
        alert(
          "Formulario enviado com sucesso, nossa equipe entrará em contato em até 24 horas para agendamento de uma reunião, se atente ao telefone e e-mail informados"
        );
        navigate("/");
      })
      .catch(() => alert("Erro ao enviar. Tente novamente."));
  }

  return (
    <Layout>
      <Helmet>
        <title>Sou Cliente | Quero ser Cliente</title>
        <link rel="canonical" href={buildCanonical("/clientes/queroser")} />
      </Helmet>
      <Section className="py-10">
        <div className="flex justify-end">
          <img src="/imagens/logo_rodapé.png" alt="Logo" className="h-16" />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mt-2 text-center"
          style={{ color: COLORS.azulCorp }}
        >
          Venha ser InstaSolutions e descomplique sua gestão de frotas
        </h2>
        <div className="grid md:grid-cols-2 gap-6 items-center mt-4">
          <p className="text-neutral-700">
            Nossa plataforma integra manutenção, abastecimento e rastreamento em um
            único ambiente, reduzindo custos, acelerando aprovações e oferecendo
            indicadores confiáveis para decisões rápidas.
          </p>
          <div className="rounded-2xl shadow mx-auto overflow-hidden bg-white max-w-sm">
            <img
              src="/imagens/contato_foto.png"
              alt="Sua Frota em Dia"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <form className="grid gap-4 mt-8" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="[Cliente] Quero ser Cliente" />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="CNPJ" label="CNPJ" required />
            <Input name="Razao Social" label="Razão social" required />
            <Input name="Nome Fantasia" label="Nome Fantasia" required />
            <Input name="Bairro" label="Bairro" />
            <Input name="Endereco" label="Endereço c/ número" className="md:col-span-2" />
            <div>
              <Label>Estado</Label>
              <select
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                name="Estado"
                className="border rounded-xl px-3 py-2 w-full"
              >
                {UFS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <Input name="Cidade" label="Cidade" />
            <Input name="Email" type="email" label="E-mail" required />
            <Input name="Responsavel" label="Responsável" />
            <div>
              <Label> Segmento de atuação </Label>
              <select
                name="Segmento de atuacao"
                className="border rounded-xl px-3 py-2 w-full"
              >
                {["Transportadora", "Órgão Público", "Locadora", "Microempresa", "Outro"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label> Quantidade de veículos </Label>
              <select
                name="Quantidade de veiculos"
                className="border rounded-xl px-3 py-2 w-full"
              >
                {["1-25", "26-100", "101-500", "500+"].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <Input name="DDD_Celular" label="DDD / Celular" />
            <Input name="DDD_Fixo" label="DDD / Fixo" />
            <div className="md:col-span-2">
              <Label> Qual solução deseja contratar ? </Label>
              <select name="Solucao" className="border rounded-xl px-3 py-2 w-full">
                {[
                  "Manutenção",
                  "Combustível",
                  "Rastreamento",
                  "Sistema completo",
                  "Personalizado"
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <GeoButton size="lg">Enviar</GeoButton>
        </form>
      </Section>
    </Layout>
  );
}

function ClientesAcessoPage() {
  return (
    <Layout>
      <Helmet>
        <title>Sou Cliente | Acesso ao sistema</title>
        <link rel="canonical" href={buildCanonical("/clientes/acesso")} />
      </Helmet>
      <Banner title="Bem vindo Cliente" />
      <Section className="py-10">
        <p className="text-center text-neutral-700 mb-6">
          Para acessar nosso sistema para clicar no botão "Acessar" abaixo e você será redirecionado para nosso site.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <AccessCard
            title="Acesso manutenção & rastreamento"
            href="https://app.frotainstasolutions.com.br/"
          />
          <AccessCard
            title="Acesso combustível"
            href="https://front.instasolutionscomb.com.br/login"
          />
        </div>
        <div className="mt-10 flex justify-center">
          <img
            src="/imagens/acesso_clientes.png"
            alt="Acesso ao sistema - Clientes"
            className="rounded-3xl shadow-lg w-full max-w-2xl object-contain"
          />
        </div>
      </Section>
    </Layout>
  );
}

function ClientesFinanceiroPage() {
  return (
    <Layout>
      <Helmet>
        <title>Sou Cliente | Portal Financeiro</title>
        <link rel="canonical" href={buildCanonical("/clientes/financeiro")} />
      </Helmet>
      <Banner title="Página em construção. Aguarde lançamento em breve !" />
    </Layout>
  );
}

/************ REDE / SOBRE / CONTATO / OBRIGADO ************/

function RedePage() {
  const title = "Rede | InstaSolutions — Cobertura Brasil inteiro";
  const description = "Rede nacional com 500+ oficinas credenciadas e postos parceiros.";

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/rede")} />
      </Helmet>

      <Section className="py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: COLORS.azulCorp }}
            >
              Rede nacional de atendimento
            </h3>
            <p className="text-neutral-700 mt-3">
              Mais de 500 oficinas credenciadas e rede de postos parceira para garantir
              disponibilidade e padronização.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Qualificação técnica & auditoria",
                "SLA de prazos e qualidade",
                "Condições comerciais negociadas",
                "Cobertura Brasil inteiro"
              ].map((t, i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: COLORS.azulTech }}
                  />{" "}
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <img
                src="/imagens/rede-01.png"
                alt="Rede de atendimento"
                className="rounded-3xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  <MapPin className="w-5 h-5 inline mr-2" /> Onde estamos
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <Location
                  city="Barueri/SP"
                  label="Matriz - Brasil"
                  detail="Atendimento nacional"
                />
                <Location
                  city="Port. St. Lucie - Florida - US"
                  label="Filiais"
                  detail="Operação e suporte regional"
                />
              </CardContent>
            </Card>
            <div className="mt-8">
              <img
                src="/imagens/rede-02.png"
                alt="Cobertura da rede"
                className="rounded-3xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function SobrePage() {
  const title = "Sobre | InstaSolutions — Produtos e Gestão Empresarial";
  const description = "Integração total entre manutenção, abastecimento e rastreamento.";

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/sobre")} />
      </Helmet>

      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span
            className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 w-max"
            style={{ backgroundColor: "#E6E7F7", color: COLORS.azulCorp }}
          >
            <Layers className="w-4 h-4" /> Quem somos
          </span>
          <h3
            className="text-2xl sm:text-3xl font-bold mt-3"
            style={{ color: COLORS.azulCorp }}
          >
            Tecnologia corporativa para decisões rápidas e seguras
          </h3>
          <p className="text-neutral-700 mt-3">
            Integramos manutenção (rede de oficinas), abastecimento (rede de postos) e
            rastreamento, oferecendo indicadores em tempo real.
          </p>
        </div>
        <div>
          <ImageCarousel
            images={[
              "/imagens/sobre_operaçãoinstasolutions-1.png",
              "/imagens/sobre_operaçãoinstasolutions-2.png",
              "/imagens/sobre_operaçãoinstasolutions-3.png"
            ]}
            alt="Operação InstaSolutions"
            objectFit="contain"
          />
        </div>
      </Section>
    </Layout>
  );
}

function ContatoPage() {
  const title = "Contato | InstaSolutions — Fale com nosso time";
  const description =
    "Solicite uma demonstração ou envie uma mensagem. Responderemos em breve.";

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/contato")} />
      </Helmet>

      <Section className="py-12 grid lg:grid-cols-2 gap-8">
        <div>
          <h2
            className="text-2xl sm:text-4xl font-bold"
            style={{ color: COLORS.azulCorp }}
          >
            Vamos conversar
          </h2>
          <p className="text-neutral-700 mt-3">
            Preencha o formulário e retornaremos para agendar uma demonstração.
          </p>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <img
            src="/imagens/contato_foto.png"
            alt="Contato InstaSolutions"
            className="rounded-3xl shadow-lg w-full max-w-md mx-auto"
          />
          <Card>
            <CardHeader>
              <CardTitle>Contatos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div>
                <div className="font-medium">Endereço Matriz</div>
                <div>
                  Alameda Rio Negro, 1030, Edifício Stadium Corporate Alphaville,
                  Escritório 2304 - Alphaville
                </div>
                <div>Barueri - SP, 06454-000</div>
              </div>
              <div>
                <div className="font-medium">Entre em contato conosco</div>
                <div>(11) 3336-6941</div>
                <div>(67) 98218-2448 - WhatsApp</div>
              </div>
              <div>
                <div className="font-medium">E-mail</div>
                <a
                  className="text-blue-700 hover:underline"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Layout>
  );
}

function ContactForm() {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(`https://formsubmit.co/${EMAIL}`, { method: "POST", body: data })
      .then(() => alert("Mensagem enviada com sucesso! Entraremos em contato em breve."))
      .catch(() => alert("Erro ao enviar. Tente novamente."));
  }
  return (
    <form className="grid gap-4 mt-6" onSubmit={handleFormSubmit}>
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="[Site] Novo contato" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${DOMAIN}/obrigado`} />
      <Input name="nome" label="Nome" required />
      <Input name="email" type="email" label="E-mail" required />
      <Input name="empresa" label="Empresa" />
      <Textarea name="mensagem" label="Como podemos ajudar?" rows={5} required />
      <GeoButton size="lg">Enviar</GeoButton>
    </form>
  );
}

function ObrigadoPage() {
  return (
    <Layout>
      <Helmet>
        <title>Obrigado | InstaSolutions</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={buildCanonical("/obrigado")} />
      </Helmet>
      <Section className="py-16 text-center">
        <h1
          className="text-3xl font-bold"
          style={{ color: COLORS.azulCorp }}
        >
          Obrigado!
        </h1>
        <p className="text-neutral-700 mt-2">
          Recebemos sua mensagem e retornaremos em breve.
        </p>
        <div className="mt-6">
          <Link to="/">
            <GeoButton size="lg">Voltar à página inicial</GeoButton>
          </Link>
        </div>
      </Section>
    </Layout>
  );
}

/****************
 * REUSABLE UI  *
 ****************/

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border shadow-sm bg-white">{children}</div>;
}
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-5 pt-5">{children}</div>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-lg font-semibold" style={{ color: COLORS.azulCorp }}>
      {children}
    </h4>
  );
}
function CardContent({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-5 pb-6 ${className}`}>{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1">{children}</div>;
}
function Input({
  name,
  label,
  className = "",
  type = "text",
  required = false
}: {
  name: string;
  label: string;
  className?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        className="border rounded-xl px-3 py-2 w-full"
      />
    </div>
  );
}
function Textarea({
  name,
  label,
  rows = 4,
  required = false
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="border rounded-xl px-3 py-2 w-full"
      />
    </div>
  );
}
function SelectUF({
  uf,
  setUf
}: {
  uf: string;
  setUf: (v: string) => void;
}) {
  return (
    <div>
      <Label>Estado</Label>
      <select
        value={uf}
        onChange={(e) => setUf(e.target.value)}
        name="Estado"
        className="border rounded-xl px-3 py-2 w-full"
      >
        {UFS.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}
function SelectCidade({
  uf,
  cidade,
  setCidade
}: {
  uf: string;
  cidade: string;
  setCidade: (v: string) => void;
}) {
  const cities = useMemo(() => getCitiesForUF(uf), [uf]);
  return (
    <div>
      <Label>Cidade</Label>
      <select
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        name="Cidade"
        className="border rounded-xl px-3 py-2 w-full"
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

function NavPill({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-1 rounded-full border text-[0.9rem]"
      style={{
        backgroundColor: COLORS.bgPill,
        borderColor: COLORS.borderPill,
        color: COLORS.azulCorp
      }}
    >
      {children}
    </Link>
  );
}

function NavDropdown({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsOpen(true), 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className="px-3 py-1 rounded-full border flex items-center gap-1 cursor-pointer"
        style={{
          backgroundColor: COLORS.bgPill,
          borderColor: COLORS.borderPill,
          color: COLORS.azulCorp
        }}
      >
        {label} <ChevronDown className="w-4 h-4" />
      </div>
      {isOpen && (
        <div className="absolute bg-white border rounded-xl shadow-md mt-1 min-w-[260px] z-50">
          <div className="py-2">{children}</div>
        </div>
      )}
    </div>
  );
}
function DropdownItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 hover:bg-neutral-50 text-sm"
      style={{ color: COLORS.azulCorp }}
    >
      {children}
    </Link>
  );
}

function GeoButton({
  children,
  size = "sm",
  variant = "solid",
  onClick
}: {
  children: React.ReactNode;
  size?: "sm" | "lg";
  variant?: "solid" | "outline";
  onClick?: () => void;
}) {
  const padding = size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
  const base = "inline-block font-medium shadow-sm";
  const stylesSolid: CSSProperties = {
    backgroundColor: COLORS.azulTech,
    color: "white",
    border: `2px solid ${COLORS.azulTech}`,
    clipPath: "polygon(8% 0, 100% 0, 100% 75%, 92% 100%, 0 100%, 0 25%)",
    display: "inline-block"
  };
  const stylesOutline: CSSProperties = {
    backgroundColor: "transparent",
    color: COLORS.azulTech,
    border: `2px solid ${COLORS.azulTech}`,
    clipPath: "polygon(8% 0, 100% 0, 100% 75%, 92% 100%, 0 100%, 0 25%)",
    display: "inline-block"
  };
  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={`${base} ${padding}`}
      style={variant === "outline" ? stylesOutline : stylesSolid}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-2xl font-bold" style={{ color: COLORS.azulTech }}>
        {value}
      </div>
      <div className="text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function SolucoesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <Feature
        icon={<Wrench className="w-6 h-6" />}
        title="Manutenção"
        items={[
          "Ordens de serviço digitais",
          "Orçamentos, auditoria e aprovação",
          "Rede de oficinas credenciadas"
        ]}
      />
      <Feature
        icon={<Fuel className="w-6 h-6" />}
        title="Abastecimento"
        items={[
          "Rede de postos integrada",
          "Controle de consumo & fraudes",
          "Relatórios por centro de custo"
        ]}
      />
      <Feature
        icon={<Satellite className="w-6 h-6" />}
        title="Rastreamento"
        items={[
          "Localização e telemetria",
          "Alertas e cercas virtuais",
          "Análise de direção e rotas"
        ]}
      />
    </div>
  );
}

function Feature({
  icon,
  title,
  items
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            {icon} {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm">
          {items.map((t, i) => (
            <li key={i} className="inline-flex items-center gap-2">
              <CheckCircle2
                className="w-4 h-4"
                style={{ color: COLORS.azulTech }}
              />{" "}
              {t}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Location({
  city,
  label,
  detail
}: {
  city: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm font-semibold" style={{ color: COLORS.azulCorp }}>
        {label}
      </div>
      <div className="text-lg">{city}</div>
      {detail && <div className="text-xs text-neutral-500">{detail}</div>}
    </div>
  );
}

function Banner({ title }: { title: string }) {
  return (
    <div className="w-full h-48 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center text-center">
      <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.azulCorp }}>
        {title}
      </h1>
    </div>
  );
}

function AccessCard({ title, href }: { title: string; href: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <a
          className="inline-flex items-center gap-2 underline"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Acessar <ExternalLink className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  );
}

function TabButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-blue-700 border-blue-200"
      }`}
    >
      {children}
    </button>
  );
}

/****************
 * ROOT APP     *
 ****************/
export default function App() {
  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="gestão de frotas, manutenção, abastecimento, rastreamento, frota, oficinas credenciadas"
        />
        <html lang="pt-BR" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solucoes" element={<SolucoesPage />} />
        <Route path="/rede" element={<RedePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/obrigado" element={<ObrigadoPage />} />
        {/* Parceiros */}
        <Route path="/parceiros/credenciar" element={<ParceirosCredenciarPage />} />
        <Route path="/parceiros/fornecedores" element={<ParceirosFornecedoresPage />} />
        <Route path="/parceiros/financeiro" element={<ParceirosFinanceiroPage />} />
        {/* Clientes */}
        <Route path="/clientes/queroser" element={<ClientesQueroSerPage />} />
        <Route path="/clientes/acesso" element={<ClientesAcessoPage />} />
        <Route path="/clientes/financeiro" element={<ClientesFinanceiroPage />} />
      </Routes>

      {/* RUNTIME TESTS (não quebram build, apenas logam no console se algo errado) */}
      <RuntimeTests />
    </>
  );
}

/****************
 * RUNTIME TESTS *
 ****************/
function RuntimeTests() {
  useEffectOnce(() => {
    const assert = (cond: boolean, msg: string) => {
      if (!cond) console.error("[TEST FAILED]", msg);
    };
    // canonical builder
    assert(buildCanonical("/") === DOMAIN, "buildCanonical root should equal DOMAIN");
    assert(
      buildCanonical("/contato").endsWith("/contato"),
      "buildCanonical should append path"
    );
    assert(
      buildCanonical("sobre").endsWith("/sobre"),
      "buildCanonical should prepend slash when missing"
    );
    // schema
    const schema = buildOrganizationSchema();
    assert(schema["@type"] === "Organization", "schema type should be Organization");
    assert(
      (schema as any).contactPoint && Array.isArray((schema as any).contactPoint),
      "schema must include contactPoint array"
    );
    // UF/Cidade helpers
    assert(UFS.includes("SP"), "UFS should include SP");
    assert(getCitiesForUF("SP").length > 0, "SP should have cities");
  });
  return null;
}

function useEffectOnce(effect: () => void) {
  const [done, setDone] = useState(false);
  if (!done) {
    setDone(true);
    // eslint-disable-next-line no-console
    effect();
  }
}

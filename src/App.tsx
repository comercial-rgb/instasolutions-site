import React, { useMemo, useState, useEffect, createContext, useContext, type CSSProperties } from "react";
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
  ExternalLink,
  Globe
} from "lucide-react";

/**********************
 * LANGUAGE CONTEXT *
 **********************/
type Language = "pt" | "en";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: "pt",
  setLanguage: () => {},
  t: (key: string) => key
});

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navegação
    "nav.home": "Home",
    "nav.solutions": "Soluções",
    "nav.partners": "Parceiros",
    "nav.clients": "Sou cliente",
    "nav.network": "Rede",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.talkToTeam": "Fale com o time",
    "nav.whoWeAre": "Quem Somos",
    "nav.credential": "Quero me Credenciar",
    "nav.systemAccess": "Acesso ao sistema",
    "nav.suppliers": "Fornecedores",
    "nav.clients2": "Clientes",
    "nav.financial": "Portal Financeiro",
    "nav.beClient": "Quero ser Cliente",
    
    // Home
    "home.fleetManagement": "Gestão completa de frotas",
    "home.title": "Plataforma corporativa para gestão de frotas com módulos integrados",
    "home.subtitle": "Manutenção com rede de oficinas, abastecimento com rede de postos e rastreamento — tudo em um só lugar.",
    "home.partnersSuppliers": "+500 Parceiros e Fornecedores",
    "home.gasStationNetwork": "Rede de postos integrada",
    "home.realtimeDashboards": "Dashboards em tempo real",
    "home.workshops": "Oficinas",
    "home.coverage": "Cobertura",
    "home.integrations": "Integrações",
    "home.brazilWide": "Brasil inteiro",
    "home.costBenefit": "Excelente custo-benefício",
    "home.costBenefitDesc": "A InstaSolutions atua na intermediação de contratação de serviços e peças automotivas para empresas e instituições públicas.",
    "home.costBenefitDesc2": "Através de um software próprio e aplicativo, oferece aos clientes acesso a uma rede de credenciados que oferece seus serviços e produtos a um preço competitivo e condições de pagamento diferenciadas.",
    
    // Botões
    "button.seeSolutions": "Ver soluções",
    "button.requestDemo": "Solicitar demonstração",
    "button.credential": "Quero me credenciar",
    "button.knowSolutions": "Conheça nossas soluções",
    "button.submit": "Enviar",
    "button.send": "Enviar formulário",
    
    // Soluções
    "solutions.title": "Soluções",
    "solutions.maintenance": "Manutenção",
    "solutions.fueling": "Abastecimento",
    "solutions.tracking": "Rastreamento",
    "solutions.maintenance.item1": "Ordens de serviço digitais",
    "solutions.maintenance.item2": "Orçamentos, auditoria e aprovação",
    "solutions.maintenance.item3": "Rede de oficinas credenciadas",
    "solutions.fueling.item1": "Rede de postos integrada",
    "solutions.fueling.item2": "Controle de consumo & fraudes",
    "solutions.fueling.item3": "Relatórios por centro de custo",
    "solutions.tracking.item1": "Localização em tempo real",
    "solutions.tracking.item2": "Alertas e cercas virtuais",
    "solutions.tracking.item3": "Análise de direção e rotas",
    
    // Rede
    "network.title": "Rede nacional de atendimento",
    "network.desc1": "A InstaSolutions conecta sua frota a uma rede nacional com mais de 500 oficinas e postos credenciados, garantindo atendimento rápido, padronizado e de qualidade em qualquer região do Brasil. Cada parceiro é cuidadosamente selecionado e auditado para assegurar técnica, confiabilidade e condições comerciais competitivas.",
    "network.desc2": "Nossa rede atua integrada ao sistema de gestão de frotas, permitindo que manutenções, abastecimentos e serviços sejam registrados em tempo real, com total transparência, governança e controle dos custos. Isso reduz riscos, acelera decisões e aumenta a disponibilidade da frota.",
    "network.desc3": "Para empresas e órgãos públicos, isso significa conveniência, economia e segurança em cada atendimento. Para nossos parceiros, é a oportunidade de ampliar negócios e atender clientes qualificados.",
    "network.desc4": "Com a InstaSolutions, sua frota tem suporte em todo o Brasil — com eficiência, tecnologia e confiança.",
    "network.whereWeAre": "Onde estamos",
    "network.headquarters": "Matriz - Brasil",
    "network.branch": "Filiais",
    "network.branchHighlight": "Filial Destaque",
    "network.nationalService": "Atendimento nacional",
    "network.regionalOperation": "Operação e suporte regional",
    "network.regionalOperationMidwest": "Operação regional Centro-Oeste",
    
    // Sobre
    "about.badge": "Quem somos",
    "about.title": "Tecnologia corporativa para decisões rápidas e seguras",
    "about.p1": "Em um cenário operacional cada vez mais dinâmico, competitivo e orientado por dados, empresas que trabalham com frotas enfrentam desafios diários: manter veículos disponíveis, controlar custos, garantir transparência, acompanhar o desempenho em tempo real e, acima de tudo, tomar decisões rápidas e precisas. É justamente nesse ponto que a InstaSolutions se destaca — unindo tecnologia, inteligência operacional e uma rede nacional de credenciados para transformar a forma como organizações gerenciam seus veículos.",
    "about.p2": "Nossa missão é clara: simplificar a gestão de frotas e torná-la mais inteligente, econômica e eficiente. Para isso, desenvolvemos uma plataforma completa que integra manutenção, abastecimento e rastreamento em um único ecossistema digital, conectando gestores, fornecedores e operações em tempo real. Com dashboards intuitivos, análises avançadas e processos automatizados, proporcionamos uma visão completa da operação, permitindo que cada decisão seja tomada com base em dados confiáveis e atualizados.",
    "about.p3": "A tecnologia da InstaSolutions foi construída para oferecer agilidade, segurança e governança, atendendo tanto instituições públicas quanto empresas privadas que exigem alto desempenho e compliance absoluto. Nosso sistema reduz custos, elimina retrabalhos, padroniza processos e identifica oportunidades de melhoria em toda a cadeia operacional — desde a abertura de uma ordem de serviço até a finalização do abastecimento ou acompanhamento de um alerta de telemetria.",
    "about.p4": "Outro grande diferencial é nossa rede de mais de 500 oficinas credenciadas e postos parceiros, cuidadosamente selecionados e auditados para garantir qualidade, prazo e condições comerciais competitivas. Ao utilizar nossa plataforma, o cliente tem acesso imediato a essa rede, garantindo transparência, agilidade e segurança em todas as etapas do atendimento. Cada serviço contratado gera dados que retornam para o gestor em forma de relatórios, insights e indicadores — fortalecendo ainda mais o ciclo de melhoria contínua da frota.",
    "about.p5": "Somos movidos por inovação, mas também pela proximidade com nossos clientes. Por isso, contamos com uma equipe especializada em implantação, suporte e expansão, pronta para acompanhar cada parceiro com atenção e excelência. Seja em uma prefeitura, uma empresa de transporte, uma locadora ou uma frota pequena que está iniciando sua jornada de digitalização, oferecemos uma experiência completa, confiável e escalável.",
    "about.p6": "A InstaSolutions nasceu para ser mais do que um software:",
    "about.p6b": "somos uma solução corporativa que conecta pessoas, tecnologia e resultados. E continuamos evoluindo para que cada gestor execute suas decisões com máxima confiança, visão ampla da operação e total segurança — hoje e no futuro.",
    
    // Contato
    "contact.title": "Fale Conosco",
    "contact.email": "E-mail",
    "contact.phone": "Telefone",
    "contact.address": "Endereço",
    "contact.followUs": "Siga-nos",
    "contact.title2": "Vamos conversar",
    "contact.subtitle": "Preencha o formulário e retornaremos para agendar uma demonstração.",
    "contact.contacts": "Contatos",
    "contact.headquartersAddress": "Endereço Matriz",
    "contact.contactUs": "Entre em contato conosco",
    "contact.successMsg": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    "contact.errorMsg": "Erro ao enviar. Tente novamente.",
    
    // Formulários
    "form.name": "Nome",
    "form.email": "E-mail",
    "form.phone": "Telefone",
    "form.company": "Empresa",
    "form.cnpj": "CNPJ",
    "form.message": "Mensagem",
    "form.state": "Estado",
    "form.city": "Cidade",
    "form.segment": "Segmento de atuação",
    "form.fleetSize": "Quantidade de veículos",
    "form.tradeName": "Nome Fantasia",
    "form.companyName": "Razão social",
    "form.neighborhood": "Bairro",
    "form.address": "Endereço c/ número",
    "form.responsible": "Responsável",
    "form.cpfRg": "CPF/RG",
    "form.mobilePhone": "DDD / Celular",
    "form.landline": "DDD / Fixo",
    "form.flag": "Bandeira",
    "form.send": "Enviar",
    "form.solution": "Qual solução deseja contratar ?",
    
    // Credenciar
    "credential.title": "Venha fazer parte da rede de parceiros que mais Cresce no Brasil.",
    "credential.subtitle": "Para credenciamento preencha os dados abaixo.",
    "credential.gasStations": "Postos de combustível",
    "credential.automotive": "Linha Automotiva",
    "credential.successTitle": "Formulário enviado com sucesso!",
    "credential.successMsg": "Nossa equipe entrará em contato em até 24 horas para finalização do credenciamento. Atente-se ao telefone e e-mail informados.",
    "credential.redirecting": "Redirecionando para a página inicial...",
    
    // Cliente
    "client.title": "Venha ser InstaSolutions e descomplique sua gestão de frotas !",
    "client.desc1": "Gerenciar uma frota não precisa ser complexo. Com a InstaSolutions, você conecta sua operação a uma plataforma completa que integra manutenção, abastecimento e rastreamento em um único sistema, oferecendo controle total e decisões rápidas baseadas em dados.",
    "client.desc2": "Nossa rede nacional com mais de 500 oficinas e postos credenciados garante atendimento padronizado, econômico e confiável em qualquer região do Brasil. Tudo isso aliado a dashboards inteligentes, processos automatizados e total transparência nos custos.",
    "client.desc3": "Ao escolher a InstaSolutions, você reduz despesas, aumenta a disponibilidade da frota e simplifica o dia a dia da sua equipe com uma solução moderna, segura e pensada para empresas e instituições que exigem eficiência e performance.",
    "client.desc4": "Seja InstaSolutions e leve sua gestão de frotas a um novo nível.",
    
    // Rodapé
    "footer.institutional": "Institucional",
    "footer.partners": "Parceiros",
    "footer.solutions": "Soluções",
    "footer.rights": "Todos os direitos reservados",
    "footer.overview": "Visão geral",
    "footer.cnpj": "CNPJ",
    
    // Acesso ao sistema
    "access.welcome": "Bem vindo",
    "access.supplier": "Fornecedor",
    "access.client": "Cliente",
    "access.description": "Para acessar nosso sistema para clicar no botão \"Acessar\" abaixo e você será redirecionado para nosso site.",
    "access.generalSystem": "Acesso geral ao sistema",
    "access.fuelSystem": "Acesso combustível",
    "access.underConstruction": "Página em construção. Aguarde lançamento em breve !",
    "access.maintenanceTracking": "Acesso manutenção & rastreamento",
    
    // Página Obrigado
    "thankyou.title": "Obrigado!",
    "thankyou.message": "Recebemos sua mensagem e retornaremos em breve.",
    "thankyou.backHome": "Voltar à página inicial",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.solutions": "Solutions",
    "nav.partners": "Partners",
    "nav.clients": "I'm a client",
    "nav.network": "Network",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.talkToTeam": "Talk to the team",
    "nav.whoWeAre": "Who We Are",
    "nav.credential": "Get Accredited",
    "nav.systemAccess": "System Access",
    "nav.suppliers": "Suppliers",
    "nav.clients2": "Clients",
    "nav.financial": "Financial Portal",
    "nav.beClient": "Become a Client",
    
    // Home
    "home.fleetManagement": "Complete fleet management",
    "home.title": "Corporate platform for fleet management with integrated modules",
    "home.subtitle": "Maintenance with workshop network, fuel with gas station network and tracking — all in one place.",
    "home.partnersSuppliers": "+500 Partners and Suppliers",
    "home.gasStationNetwork": "Integrated gas station network",
    "home.realtimeDashboards": "Real-time dashboards",
    "home.workshops": "Workshops",
    "home.coverage": "Coverage",
    "home.integrations": "Integrations",
    "home.brazilWide": "Nationwide",
    "home.costBenefit": "Excellent cost-benefit",
    "home.costBenefitDesc": "InstaSolutions acts as an intermediary in the contracting of automotive services and parts for companies and public institutions.",
    "home.costBenefitDesc2": "Through proprietary software and app, it offers clients access to a network of accredited providers offering their services and products at competitive prices and differentiated payment terms.",
    
    // Buttons
    "button.seeSolutions": "See solutions",
    "button.requestDemo": "Request demo",
    "button.credential": "I want to be accredited",
    "button.knowSolutions": "Know our solutions",
    "button.submit": "Submit",
    "button.send": "Send form",
    
    // Solutions
    "solutions.title": "Solutions",
    "solutions.maintenance": "Maintenance",
    "solutions.fueling": "Fueling",
    "solutions.tracking": "Tracking",
    "solutions.maintenance.item1": "Digital service orders",
    "solutions.maintenance.item2": "Budgets, audit and approval",
    "solutions.maintenance.item3": "Accredited workshop network",
    "solutions.fueling.item1": "Integrated gas station network",
    "solutions.fueling.item2": "Consumption control & fraud prevention",
    "solutions.fueling.item3": "Reports by cost center",
    "solutions.tracking.item1": "Real-time location",
    "solutions.tracking.item2": "Alerts and virtual fences",
    "solutions.tracking.item3": "Driving and route analysis",
    
    // Network
    "network.title": "Nationwide service network",
    "network.desc1": "InstaSolutions connects your fleet to a nationwide network with over 500 accredited workshops and gas stations, ensuring fast, standardized, and quality service in any region of Brazil. Each partner is carefully selected and audited to ensure technical expertise, reliability, and competitive business terms.",
    "network.desc2": "Our network operates integrated with the fleet management system, allowing maintenance, fueling, and services to be recorded in real-time, with total transparency, governance, and cost control. This reduces risks, accelerates decisions, and increases fleet availability.",
    "network.desc3": "For companies and public agencies, this means convenience, economy, and security in every service. For our partners, it's the opportunity to expand business and serve qualified clients.",
    "network.desc4": "With InstaSolutions, your fleet has support throughout Brazil — with efficiency, technology, and trust.",
    "network.whereWeAre": "Where we are",
    "network.headquarters": "Headquarters - Brazil",
    "network.branch": "Branches",
    "network.branchHighlight": "Featured Branch",
    "network.nationalService": "National service",
    "network.regionalOperation": "Regional operation and support",
    "network.regionalOperationMidwest": "Midwest regional operation",
    
    // About
    "about.badge": "Who we are",
    "about.title": "Corporate technology for fast and secure decisions",
    "about.p1": "In an increasingly dynamic, competitive, and data-driven operational landscape, companies managing fleets face daily challenges: keeping vehicles available, controlling costs, ensuring transparency, monitoring performance in real-time and, above all, making fast and accurate decisions. This is where InstaSolutions stands out — combining technology, operational intelligence, and a nationwide network of partners to transform how organizations manage their vehicles.",
    "about.p2": "Our mission is clear: simplify fleet management and make it smarter, more economical, and efficient. To achieve this, we developed a complete platform that integrates maintenance, fueling, and tracking into a single digital ecosystem, connecting managers, suppliers, and operations in real-time. With intuitive dashboards, advanced analytics, and automated processes, we provide a complete view of operations, enabling every decision to be based on reliable and up-to-date data.",
    "about.p3": "InstaSolutions' technology was built to deliver agility, security, and governance, serving both public institutions and private companies that demand high performance and absolute compliance. Our system reduces costs, eliminates rework, standardizes processes, and identifies improvement opportunities throughout the operational chain — from opening a service order to completing fueling or tracking a telemetry alert.",
    "about.p4": "Another major advantage is our network of over 500 accredited workshops and partner gas stations, carefully selected and audited to ensure quality, timeliness, and competitive commercial conditions. By using our platform, clients have immediate access to this network, ensuring transparency, agility, and security at every stage of service. Each contracted service generates data that returns to the manager in the form of reports, insights, and indicators — further strengthening the fleet's continuous improvement cycle.",
    "about.p5": "We are driven by innovation, but also by proximity to our clients. That's why we have a specialized team in implementation, support, and expansion, ready to accompany each partner with attention and excellence. Whether in a city hall, a transport company, a rental company, or a small fleet starting its digitalization journey, we offer a complete, reliable, and scalable experience.",
    "about.p6": "InstaSolutions was born to be more than software:",
    "about.p6b": "we are a corporate solution that connects people, technology, and results. And we continue to evolve so that every manager can execute their decisions with maximum confidence, broad operational visibility, and total security — today and in the future.",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.address": "Address",
    "contact.followUs": "Follow us",
    "contact.title2": "Let's talk",
    "contact.subtitle": "Fill out the form and we will get back to you to schedule a demo.",
    "contact.contacts": "Contacts",
    "contact.headquartersAddress": "Headquarters Address",
    "contact.contactUs": "Contact us",
    "contact.successMsg": "Message sent successfully! We will contact you soon.",
    "contact.errorMsg": "Error sending. Please try again.",
    
    // Forms
    "form.name": "Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.company": "Company",
    "form.cnpj": "CNPJ",
    "form.message": "Message",
    "form.state": "State",
    "form.city": "City",
    "form.segment": "Business segment",
    "form.fleetSize": "Fleet size",
    "form.tradeName": "Trade Name",
    "form.companyName": "Company Name",
    "form.neighborhood": "Neighborhood",
    "form.address": "Address with number",
    "form.responsible": "Responsible",
    "form.cpfRg": "CPF/RG",
    "form.mobilePhone": "Area Code / Mobile",
    "form.landline": "Area Code / Landline",
    "form.flag": "Flag",
    "form.send": "Send",
    "form.solution": "Which solution would you like to hire?",
    
    // Credential
    "credential.title": "Join the fastest-growing partner network in Brazil.",
    "credential.subtitle": "Fill in the details below for accreditation.",
    "credential.gasStations": "Gas Stations",
    "credential.automotive": "Automotive Line",
    "credential.successTitle": "Form submitted successfully!",
    "credential.successMsg": "Our team will contact you within 24 hours to complete the accreditation process. Please check your phone and email.",
    "credential.redirecting": "Redirecting to home page...",
    
    // Client
    "client.title": "Become InstaSolutions and simplify your fleet management !",
    "client.desc1": "Managing a fleet doesn't have to be complex. With InstaSolutions, you connect your operation to a complete platform that integrates maintenance, fueling, and tracking in a single system, offering total control and quick data-driven decisions.",
    "client.desc2": "Our nationwide network with over 500 accredited workshops and gas stations guarantees standardized, economical, and reliable service in any region of Brazil. All this combined with intelligent dashboards, automated processes, and complete cost transparency.",
    "client.desc3": "By choosing InstaSolutions, you reduce expenses, increase fleet availability, and simplify your team's daily routine with a modern, secure solution designed for companies and institutions that demand efficiency and performance.",
    "client.desc4": "Be InstaSolutions and take your fleet management to a new level.",
    
    // Footer
    "footer.institutional": "Institutional",
    "footer.partners": "Partners",
    "footer.solutions": "Solutions",
    "footer.rights": "All rights reserved",
    "footer.overview": "Overview",
    "footer.cnpj": "CNPJ",
    
    // System Access
    "access.welcome": "Welcome",
    "access.supplier": "Supplier",
    "access.client": "Client",
    "access.description": "To access our system, click the \"Access\" button below and you will be redirected to our website.",
    "access.generalSystem": "General system access",
    "access.fuelSystem": "Fuel access",
    "access.underConstruction": "Page under construction. Coming soon!",
    "access.maintenanceTracking": "Maintenance & tracking access",
    
    // Thank You Page
    "thankyou.title": "Thank you!",
    "thankyou.message": "We have received your message and will get back to you soon.",
    "thankyou.backHome": "Back to home page",
  }
};

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  
  const t = (key: string) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

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
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <nav className="sticky top-0 bg-white/90 backdrop-blur border-b z-40 flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-[60px]" />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <NavPill to="/">{t("nav.home")}</NavPill>
          <NavPill to="/solucoes">{t("nav.solutions")}</NavPill>

          <NavDropdown label={t("nav.partners")}>
            <DropdownItem to="/parceiros/credenciar">Quero me Credenciar</DropdownItem>
            <DropdownItem to="/parceiros/fornecedores">
              Acesso ao sistema - Fornecedores
            </DropdownItem>
            <DropdownItem to="/parceiros/financeiro">Portal Financeiro</DropdownItem>
          </NavDropdown>

          <NavDropdown label={t("nav.clients")}>
            <DropdownItem to="/clientes/queroser">Quero ser Cliente</DropdownItem>
            <DropdownItem to="/clientes/acesso">Acesso ao sistema - Clientes</DropdownItem>
            <DropdownItem to="/clientes/financeiro">Portal Financeiro</DropdownItem>
          </NavDropdown>

          <NavPill to="/rede">{t("nav.network")}</NavPill>
          <NavPill to="/sobre">{t("nav.about")}</NavPill>
          <NavPill to="/contato">{t("nav.contact")}</NavPill>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">{language}</span>
          </button>
          <Link to="/contato">
            <GeoButton size="sm">{t("nav.talkToTeam")}</GeoButton>
          </Link>
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t bg-slate-800 text-white">
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 items-start">
        <div>
          <img src="/imagens/logo_rodapé.png" alt="InstaSolutions" className="h-16" style={{mixBlendMode: "screen"}} />
          <div className="text-xs text-slate-300 mt-3">
            <div>
              <span className="font-semibold">{t("footer.cnpj")}:</span> 47.611.398/0001-66
            </div>
            <div className="mt-2">
              © {new Date().getFullYear()} {ORG_NAME}. {t("footer.rights")}.
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2 text-white">{t("footer.institutional")}</div>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <Link className="hover:text-white transition" to="/sobre">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" to="/quem-somos">
                Quem Somos
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" to="/rede">
                {t("nav.network")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-white">{t("footer.solutions")}</div>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <Link className="hover:text-white transition" to="/solucoes">
                {t("footer.overview")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-white">{t("footer.partners")}</div>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <Link className="hover:text-white transition" to="/parceiros/credenciar">
                {t("nav.credential")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" to="/parceiros/fornecedores">
                {t("nav.systemAccess")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" to="/contato">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-sm text-slate-300">
            <a className="hover:text-white transition" href="#" aria-label="Instagram">
              Instagram
            </a>
            <a className="hover:text-white transition" href="#" aria-label="Facebook">
              Facebook
            </a>
            <a className="hover:text-white transition" href="#" aria-label="YouTube">
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
  const { t } = useLanguage();
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
              {t("home.title")}
            </h1>
            <p className="text-neutral-700 text-lg">
              {t("home.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/solucoes">
                <GeoButton size="lg">{t("button.seeSolutions")}</GeoButton>
              </Link>
              <Link to="/contato">
                <GeoButton size="lg" variant="outline">
                  {t("button.requestDemo")}
                </GeoButton>
              </Link>
            </div>
            <Card className="mt-6">
              <CardContent className="pt-6">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  {[
                    t("home.partnersSuppliers"),
                    t("home.gasStationNetwork"),
                    t("home.realtimeDashboards")
                  ].map((text, i) => (
                    <li key={i} className="flex flex-col items-center justify-center text-center gap-2 p-3">
                      <CheckCircle2
                        className="w-6 h-6"
                        style={{ color: COLORS.azulTech }}
                      />
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
              <Stat label={t("home.workshops")} value="500+" />
              <Stat label={t("home.coverage")} value={t("home.brazilWide")} />
              <Stat label={t("home.integrations")} value="> 30 APIs" />
            </div>
          </motion.div>
        </Section>
      </div>

      {/* MÓDULOS + CTA CONHEÇA */}
      <Section className="pb-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/parceiros/credenciar">
            <GeoButton size="lg" className="text-lg px-8 py-6">{t("button.credential")}</GeoButton>
          </Link>
          <Link to="/solucoes">
            <GeoButton size="lg" className="text-lg px-8 py-6">{t("button.knowSolutions")}</GeoButton>
          </Link>
        </div>
        <SolucoesGrid />
      </Section>

      {/* Seções descritivas */}
      <Section className="py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-bold" style={{ color: COLORS.azulCorp }}>
            {t("home.costBenefit")}
          </h3>
          <p className="mt-3 text-neutral-700">
            {t("home.costBenefitDesc")}
          </p>
          <p className="mt-2 text-neutral-700">
            {t("home.costBenefitDesc2")}
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
  const { t } = useLanguage();
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
          {t("solutions.title")}
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <TabButton active={tab === "manut"} onClick={() => setTab("manut")}>
            {t("solutions.maintenance")}
          </TabButton>
          <TabButton active={tab === "abast"} onClick={() => setTab("abast")}>
            {t("solutions.fueling")}
          </TabButton>
          <TabButton active={tab === "rast"} onClick={() => setTab("rast")}>
            {t("solutions.tracking")}
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
                  {t("solutions.maintenance")}
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2 space-y-1">
                  <li>Software moderno com acesso 24/7</li>
                  <li>Controle de saldos</li>
                  <li>Múltiplos usuários</li>
                  <li>Relatórios personalizados</li>
                  <li>Equipe de suporte</li>
                  <li>Aprovação e auditoria de orçamentos em tempo real</li>
                  <li>Histórico completo de serviços e peças utilizadas</li>
                  <li>Rede nacional com mais de 500 oficinas homologadas</li>
                  <li>Gestão de ordens de serviço com fluxos automáticos</li>
                  <li>Indicadores de performance e custos por veículo ou centro de custo</li>
                  <li>Cadastros de fornecedores e controle de garantias</li>
                  <li>Comparação automática de preços e prazos</li>
                  <li>Registro fotográfico e documental integrado</li>
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
                  {t("solutions.fueling")}
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2 space-y-1">
                  <li>Múltiplos usuários</li>
                  <li>Relatórios personalizados</li>
                  <li>Equipe de suporte</li>
                  <li>Software moderno com acesso 24/7</li>
                  <li>Rede de postos parceiros em todo o Brasil</li>
                  <li>Monitoramento de consumo e variações por veículo</li>
                  <li>Prevenção ativa de fraudes em abastecimentos</li>
                  <li>Relatórios detalhados por período, posto, motorista ou veículo</li>
                  <li>Conciliação automática de abastecimentos</li>
                  <li>Importação de notas e integração com ERP</li>
                  <li>Controle por centro de custo e regras personalizadas</li>
                  <li>Painel unificado de despesas de combustível</li>
                  <li>Aplicativo com registro instantâneo e validações geográficas</li>
                  <li>Economia</li>
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
                  {t("solutions.tracking")}
                </h3>
                <ul className="list-disc ml-6 text-neutral-700 mt-2 space-y-1">
                  <li>Monitoramento em tempo real com atualização contínua</li>
                  <li>Alertas automáticos de velocidade, rota e comportamento de direção</li>
                  <li>Cercas virtuais configuráveis para entradas e saídas de áreas</li>
                  <li>Histórico completo de trajetos, eventos e deslocamentos</li>
                  <li>Relatórios de telemetria e análise de condução</li>
                  <li>Identificação de ociosidade e desvios operacionais</li>
                  <li>Painel de manutenção preventiva baseado em quilometragem</li>
                  <li>Integração com aplicativos e sistemas de gestão</li>
                  <li>Rastreadores homologados e suporte técnico especializado</li>
                  <li>Segurança reforçada com camadas de autenticação e controle</li>
                  <li>Alertas inteligentes para manutenções preventivas</li>
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
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(`https://formsubmit.co/${EMAIL}`, { method: "POST", body: data })
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 6000);
      })
      .catch(() => alert("Erro ao enviar. Tente novamente."));
  }

  if (showSuccess) {
    return (
      <Layout>
        <Section className="py-20">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <img 
              src="/imagens/enviar_formulario.png" 
              alt="Formulário enviado com sucesso" 
              className="w-full max-w-md mb-6 rounded-2xl shadow-lg"
            />
            <p className="text-lg text-neutral-700 leading-relaxed">
              {t("credential.successMsg")}
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              {t("credential.redirecting")}
            </p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Credenciamento</title>
        <link rel="canonical" href={buildCanonical("/parceiros/credenciar")} />
      </Helmet>

      <BannerWithImage 
        title={t("credential.title")} 
        image="/imagens/rede-01.png"
      />

      <Section className="py-10">
        <p className="text-center text-lg text-neutral-700 mb-6">
          {t("credential.subtitle")}
        </p>
        <div className="flex gap-2 mb-6">
          <TabButton active={tipo === "postos"} onClick={() => setTipo("postos")}>
            {t("credential.gasStations")}
          </TabButton>
          <TabButton active={tipo === "linha"} onClick={() => setTipo("linha")}>
            {t("credential.automotive")}
          </TabButton>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="[Credenciamento] Novo parceiro" />
          <input type="hidden" name="Tipo" value={tipo} />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="CNPJ" label={t("form.cnpj")} required />
            <Input name="Razao Social" label={t("form.companyName")} required />
            <Input name="Nome Fantasia" label={t("form.tradeName")} required />
            <Input name="Bairro" label={t("form.neighborhood")} />
            <Input name="Endereco" label={t("form.address")} className="md:col-span-2" />
            <div>
              <Label>{t("form.state")}</Label>
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
            <Input name="Cidade" label={t("form.city")} />
            <Input name="Email" type="email" label={t("form.email")} required />
            <Input name="Responsavel" label={t("form.responsible")} />
            <Input name="CPF_RG" label={t("form.cpfRg")} />
            <Input name="DDD_Celular" label={t("form.mobilePhone")} />
            <Input name="DDD_Fixo" label={t("form.landline")} />
            {tipo === "postos" && (
              <div className="md:col-span-2">
                <Label>{t("form.flag")}</Label>
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
                <Label>{t("form.segment")}</Label>
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
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Acesso ao sistema</title>
        <link rel="canonical" href={buildCanonical("/parceiros/fornecedores")} />
      </Helmet>
      <Banner title={`${t("access.welcome")} ${t("access.supplier")}`} />
      <Section className="py-10">
        <p className="text-center text-neutral-700 mb-6">
          {t("access.description")}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <AccessCard
            title={t("access.generalSystem")}
            href="https://app.frotainstasolutions.com.br/"
          />
          <AccessCard
            title={t("access.fuelSystem")}
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
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Parceiros | Portal Financeiro</title>
        <link rel="canonical" href={buildCanonical("/parceiros/financeiro")} />
      </Helmet>
      <Banner title={t("access.underConstruction")} />
    </Layout>
  );
}

/************ CLIENTES ************/

function ClientesQueroSerPage() {
  const navigate = useNavigate();
  const [uf, setUf] = useState("SP");
  const { t } = useLanguage();

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
          {t("client.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 items-center mt-4">
          <div className="text-neutral-700 space-y-3">
            <p>
              {t("client.desc1")}
            </p>
            <p>
              {t("client.desc2")}
            </p>
            <p>
              {t("client.desc3")}
            </p>
            <p>
              <strong>{t("client.desc4")}</strong>
            </p>
          </div>
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
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Sou Cliente | Acesso ao sistema</title>
        <link rel="canonical" href={buildCanonical("/clientes/acesso")} />
      </Helmet>
      <Banner title={`${t("access.welcome")} ${t("access.client")}`} />
      <Section className="py-10">
        <p className="text-center text-neutral-700 mb-6">
          {t("access.description")}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <AccessCard
            title={t("access.maintenanceTracking")}
            href="https://app.frotainstasolutions.com.br/"
          />
          <AccessCard
            title={t("access.fuelSystem")}
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
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Sou Cliente | Portal Financeiro</title>
        <link rel="canonical" href={buildCanonical("/clientes/financeiro")} />
      </Helmet>
      <Banner title={t("access.underConstruction")} />
    </Layout>
  );
}

/************ REDE / SOBRE / CONTATO / OBRIGADO ************/

function RedePage() {
  const { t } = useLanguage();
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
              {t("network.title")}
            </h3>
            <div className="text-neutral-700 mt-3 space-y-3">
              <p>{t("network.desc1")}</p>
              <p>{t("network.desc2")}</p>
              <p>{t("network.desc3")}</p>
              <p><strong>{t("network.desc4")}</strong></p>
            </div>
            <div className="mt-8">
              <img
                src="/imagens/rede-01.png"
                alt="Rede de atendimento"
                className="rounded-3xl shadow-lg w-full max-w-md"
              />
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  <MapPin className="w-5 h-5 inline mr-2" /> {t("network.whereWeAre")}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <Location
                  city="Barueri/SP"
                  label={t("network.headquarters")}
                  detail={t("network.nationalService")}
                />
                <Location
                  city="Port. St. Lucie - Florida - US"
                  label={t("network.branch")}
                  detail={t("network.regionalOperation")}
                />
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-center">
                  <MapPin className="w-5 h-5 inline mr-2" /> {t("network.branchHighlight")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Location
                  city="Campo Grande/MS"
                  label={t("network.headquarters").replace("Matriz", "Filial")}
                  detail={t("network.regionalOperationMidwest")}
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
  const { t } = useLanguage();
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
            <Layers className="w-4 h-4" /> {t("about.badge")}
          </span>
          <h3
            className="text-2xl sm:text-3xl font-bold mt-3"
            style={{ color: COLORS.azulCorp }}
          >
            {t("about.title")}
          </h3>
          <div className="text-neutral-700 mt-3 space-y-3">
            <p>
              {t("about.p1")}
            </p>
            <p>
              {t("about.p2")}
            </p>
            <p>
              {t("about.p3")}
            </p>
            <p>
              {t("about.p4")}
            </p>
            <p>
              {t("about.p5")}
            </p>
            <p>
              <strong>{t("about.p6")}</strong><br />
              {t("about.p6b")}
            </p>
          </div>
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

function QuemSomosPage() {
  const title = "Quem Somos | InstaSolutions — Nossa História";
  const description = "Conheça a trajetória da InstaSolutions desde 2022 e nossa missão de transformar a gestão de frotas no Brasil.";

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={buildCanonical("/quem-somos")} />
      </Helmet>

      <Section className="py-12">
        <div className="max-w-4xl mx-auto">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 w-max"
            style={{ backgroundColor: "#E6E7F7", color: COLORS.azulCorp }}
          >
            <Layers className="w-4 h-4" /> Quem somos
          </span>
          <h2
            className="text-2xl sm:text-4xl font-bold mt-3"
            style={{ color: COLORS.azulCorp }}
          >
            Nossa História
          </h2>
          <div className="text-neutral-700 mt-6 space-y-4 leading-relaxed">
            <p>
              A história da InstaSolutions começa com uma inquietação: por que a gestão de frotas, algo tão essencial para empresas e instituições públicas, ainda era marcada por processos lentos, falta de transparência e decisões tomadas "no escuro"?
              Foi observando essa realidade no dia a dia do setor automotivo que nasceu o desejo de fazer diferente.
            </p>
            <p>
              Em 16 de setembro de 2022, em Campo Grande (MS), a empresa deu seus primeiros passos como uma jovem iniciativa focada na venda de peças. Mas, desde o início, havia algo maior nos bastidores: a convicção de que a tecnologia poderia transformar completamente a forma como as frotas eram administradas no Brasil.
            </p>
            <p>
              Ao acompanhar os desafios de clientes e parceiros, percebemos que o problema não estava apenas no fornecimento de peças — estava na falta de integração, na ausência de dados confiáveis, na dificuldade de acompanhar serviços, na burocracia e no custo elevado que muitos enfrentavam sem sequer perceber.
              Foi então que surgiu a primeira grande virada de chave: desenvolver um sistema próprio de gestão de manutenção que conectasse empresas e instituições públicas a uma rede credenciada de oficinas de forma simples, rápida e transparente.
            </p>
            <p>
              A ideia cresceu, ganhou forma e ganhou força.
              Em dois anos, aquilo que começou como um pequeno projeto com grande propósito se tornou uma empresa sólida, inovadora e em expansão nacional. Transferimos nossa matriz para Barueri (SP), um dos ecossistemas corporativos mais estratégicos do país, e levamos nossa cultura jovem e colaborativa para outras regiões com as filiais de Campo Grande (MS) e Fortaleza (CE).
            </p>
            <p>
              Hoje, atendemos mais de 20 clientes em seis estados, conectando-os a uma rede com mais de 500 oficinas credenciadas e postos parceiros. Mas mais do que números, o que realmente importa é o impacto: cada ordem de serviço aberta, cada manutenção aprovada, cada abastecimento registrado e cada frota otimizada representa tempo economizado, dinheiro poupado e operações mais seguras e eficientes.
            </p>
            <p>
              A InstaSolutions nasceu da inquietação de poucos, mas cresceu com o esforço de muitos.
              Cresceu porque ouviu seus clientes, aprendeu com o mercado e acreditou na força da inovação.
              Cresceu porque entendeu que tecnologia só faz sentido quando traz simplicidade, clareza e resultados reais.
            </p>
            <p>
              E seguimos em movimento. Seguimos expandindo nossa presença, ampliando nossa rede, aperfeiçoando nossos produtos e construindo diariamente a confiança de quem coloca a frota em nossas mãos.
            </p>
            <p className="text-lg font-semibold" style={{ color: COLORS.azulCorp }}>
              Somos a InstaSolutions — uma empresa jovem, inovadora e comprometida com a evolução contínua.<br />
              E esta é apenas a primeira parte de uma história que ainda tem muito para crescer, junto com cada cliente que confia no nosso propósito.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function ContatoPage() {
  const { t } = useLanguage();
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

      <Section className="py-12">
        <h2
          className="text-2xl sm:text-4xl font-bold text-center mb-8"
          style={{ color: COLORS.azulCorp }}
        >
          {t("contact.title2")}
        </h2>
        <p className="text-neutral-700 text-center mb-8">
          {t("contact.subtitle")}
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Imagem e Card */}
          <div className="space-y-6">
            <img
              src="/imagens/contato_foto.png"
              alt="Contato InstaSolutions"
              className="rounded-3xl shadow-lg w-full max-w-md mx-auto"
            />
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.contacts")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div>
                  <div className="font-medium">{t("contact.headquartersAddress")}</div>
                  <div>
                    Alameda Rio Negro, 1030, Edifício Stadium Corporate Alphaville,
                    Escritório 2304 - Alphaville
                  </div>
                  <div>Barueri - SP, 06454-000</div>
                </div>
                <div>
                  <div className="font-medium">{t("contact.contactUs")}</div>
                  <div>(11) 3336-6941</div>
                  <div>(67) 98218-2448 - WhatsApp</div>
                </div>
                <div>
                  <div className="font-medium">{t("contact.email")}</div>
                  <a
                    className="text-blue-700 hover:underline"
                    href={`mailto:${EMAIL}`}
                  >
                    {EMAIL}
                  </a>
                  <br />
                  <a
                    className="text-blue-700 hover:underline"
                    href="mailto:financeiro@instasolutions.com.br"
                  >
                    financeiro@instasolutions.com.br
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Formulário */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function ContactForm() {
  const [uf, setUf] = useState("SP");
  const { t } = useLanguage();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch(`https://formsubmit.co/${EMAIL}`, { method: "POST", body: data })
      .then(() => alert(t("contact.successMsg")))
      .catch(() => alert(t("contact.errorMsg")));
  }

  return (
    <form className="grid gap-4" onSubmit={handleFormSubmit}>
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="[Site] Novo contato" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${DOMAIN}/obrigado`} />
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="CNPJ" label={t("form.cnpj")} />
        <Input name="Razao Social" label={t("form.companyName")} />
        <Input name="Nome Fantasia" label={t("form.tradeName")} />
        <Input name="Bairro" label={t("form.neighborhood")} />
        <Input name="Endereco" label={t("form.address")} className="md:col-span-2" />
        <div>
          <Label>{t("form.state")}</Label>
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
        <Input name="Cidade" label={t("form.city")} />
        <Input name="Email" type="email" label={t("form.email")} required />
        <Input name="Responsavel" label={t("form.responsible")} />
        <div>
          <Label>{t("form.segment")}</Label>
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
          <Label>{t("form.fleetSize")}</Label>
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
        <Input name="DDD_Celular" label={t("form.mobilePhone")} />
        <Input name="DDD_Fixo" label={t("form.landline")} />
        <div className="md:col-span-2">
          <Label>{t("form.solution")}</Label>
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
      <GeoButton size="lg">{t("form.send")}</GeoButton>
    </form>
  );
}

function ObrigadoPage() {
  const { t } = useLanguage();
  
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
          {t("thankyou.title")}
        </h1>
        <p className="text-neutral-700 mt-2">
          {t("thankyou.message")}
        </p>
        <div className="mt-6">
          <Link to="/">
            <GeoButton size="lg">{t("thankyou.backHome")}</GeoButton>
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
  const { t } = useLanguage();
  
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <Feature
        icon={<Wrench className="w-6 h-6" />}
        title={t("solutions.maintenance")}
        items={[
          t("solutions.maintenance.item1"),
          t("solutions.maintenance.item2"),
          t("solutions.maintenance.item3")
        ]}
      />
      <Feature
        icon={<Fuel className="w-6 h-6" />}
        title={t("solutions.fueling")}
        items={[
          t("solutions.fueling.item1"),
          t("solutions.fueling.item2"),
          t("solutions.fueling.item3")
        ]}
      />
      <Feature
        icon={<Satellite className="w-6 h-6" />}
        title={t("solutions.tracking")}
        items={[
          t("solutions.tracking.item1"),
          t("solutions.tracking.item2"),
          t("solutions.tracking.item3")
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

function BannerWithImage({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) {
  return (
    <div className="w-full min-h-60 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        {image && (
          <img 
            src={image} 
            alt="Banner" 
            className="w-full h-full object-cover"
            style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
          />
        )}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
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
    <LanguageProvider>
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
        <Route path="/quem-somos" element={<QuemSomosPage />} />
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
    </LanguageProvider>
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

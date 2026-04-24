export type Language = 'pt' | 'en';

const translations = {
  pt: {
    // Navegação
    'nav.home': 'Home',
    'nav.solutions': 'Soluções',
    'nav.partners': 'Parceiros',
    'nav.clients': 'Sou cliente',
    'nav.network': 'Rede',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.talkToTeam': 'Fale com o time',
    'nav.whoWeAre': 'Quem Somos',
    'nav.credential': 'Quero me Credenciar',
    'nav.systemAccess': 'Acesso ao sistema',
    'nav.suppliers': 'Fornecedores',
    'nav.clients2': 'Clientes',
    'nav.financial': 'Portal Financeiro',
    'nav.beClient': 'Quero ser Cliente',
    'nav.skipToContent': 'Pular para o conteúdo',

    // Home
    'home.fleetManagement': 'Gestão completa de frotas',
    // TODO: Winner — validar número "18% em 90 dias" com métricas reais antes de publicar
    'hero.h1': 'Reduza até 18% do custo operacional da sua frota em 90 dias.',
    'hero.subtitle':
      'Manutenção, abastecimento e rastreamento em uma plataforma única, conectada a uma rede de 500+ oficinas e postos homologados em todo o Brasil.',
    'hero.cta.primary': 'Solicitar demonstração',
    'hero.cta.secondary': 'Ver soluções',
    'hero.cta.tertiary': 'Já sou cliente · Acessar sistema',
    'hero.trust.lgpd': 'LGPD Compliant',
    'hero.trust.integration': 'Integração ELD/ERP',
    'hero.trust.coverage': 'Cobertura nacional + USA',
    'hero.trust.network': '500+ oficinas homologadas',
    'home.title': 'Plataforma corporativa para gestão de frotas com módulos integrados',
    'home.subtitle':
      'Manutenção com rede de oficinas, abastecimento com rede de postos e rastreamento — tudo em um só lugar.',
    'home.partnersSuppliers': '+500 Parceiros e Fornecedores',
    'home.gasStationNetwork': 'Rede de postos integrada',
    'home.realtimeDashboards': 'Dashboards em tempo real',
    'home.workshops': 'Oficinas',
    'home.coverage': 'Cobertura',
    'home.integrations': 'Integrações',
    'home.brazilWide': 'Brasil inteiro',
    'home.costBenefit': 'Excelente custo-benefício',
    'home.costBenefitDesc':
      'A InstaSolutions atua na intermediação de contratação de serviços e peças automotivas para empresas e instituições públicas.',
    'home.costBenefitDesc2':
      'Através de um software próprio e aplicativo, oferece aos clientes acesso a uma rede de credenciados que oferece seus serviços e produtos a um preço competitivo e condições de pagamento diferenciadas.',

    // Stats
    'stats.workshops': '+500 oficinas',
    'stats.workshopsLabel': 'Parceiros credenciados',
    'stats.clients': '+20 clientes',
    'stats.clientsLabel': 'Corporativos atendidos',
    'stats.states': '6 estados',
    'stats.statesLabel': 'Atendidos no Brasil',
    'stats.integrations': '+30 integrações',
    'stats.integrationsLabel': 'Via API',

    // Testemunhos
    // TODO: Winner — substituir pelos 3 depoimentos reais
    'testimonials.title': 'O que nossos clientes dizem',
    'testimonials.1.quote':
      'Em 4 meses com a InstaSolutions cortamos 23% do custo com manutenção corretiva. O app do motorista e o dashboard gerencial eliminaram planilha.',
    'testimonials.1.author': 'Renata Oliveira',
    'testimonials.1.role': 'Diretora de Operações',
    'testimonials.1.company': 'Transportadora XYZ',
    'testimonials.2.quote':
      'A integração com nosso ERP foi rápida e o onboarding muito bem conduzido. Hoje temos visibilidade total da frota em tempo real.',
    'testimonials.2.author': 'Carlos Mendes',
    'testimonials.2.role': 'Gerente de Frotas',
    'testimonials.2.company': 'Locadora ABC',
    'testimonials.3.quote':
      'Usamos para nossa frota pública municipal. Reduziu fraudes no abastecimento em mais de 40% nos primeiros 60 dias.',
    'testimonials.3.author': 'Ana Paula Sousa',
    'testimonials.3.role': 'Secretária de Transportes',
    'testimonials.3.company': 'Prefeitura Municipal',

    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.1.q': 'Como funciona a rede credenciada de oficinas?',
    'faq.1.a':
      'Nossa rede conta com mais de 500 oficinas e postos homologados em todo o Brasil. Cada parceiro passa por auditoria técnica e comercial antes de entrar na rede. Ao abrir uma OS pelo sistema, o cliente escolhe a oficina mais próxima e com melhor avaliação.',
    'faq.2.q': 'Vocês atendem órgãos públicos / licitação?',
    'faq.2.a':
      'Sim! Atendemos prefeituras, secretarias e outras instituições públicas em conformidade com a Lei 14.133/2021. Possuímos experiência em contratos via dispensa, pregão eletrônico e outros instrumentos.',
    'faq.3.q': 'A plataforma integra com o nosso ERP?',
    'faq.3.a':
      'Contamos com mais de 30 integrações via API REST. Já nos conectamos com SAP, TOTVS, Oracle e outros ERPs populares. A equipe de implantação cuida de toda a configuração.',
    'faq.4.q': 'Quanto tempo leva o onboarding?',
    'faq.4.a':
      'O onboarding padrão é realizado em até 5 dias úteis para frotas de até 100 veículos. Para frotas maiores ou com integrações customizadas, o prazo é acordado no início do projeto.',
    'faq.5.q': 'Vocês atendem frotas fora do Brasil?',
    'faq.5.a':
      'Sim! Temos operação em Port Saint Lucie (FL, EUA) e estamos em processo de expansão para outros estados americanos. Entre em contato para detalhes sobre cobertura internacional.',
    'faq.6.q': 'Qual o modelo de cobrança?',
    'faq.6.a':
      'Trabalhamos com modelo SaaS por veículo/mês, com planos escaláveis de acordo com a frota e os módulos contratados. Solicite uma proposta personalizada pelo nosso formulário de contato.',

    // Botões
    'button.seeSolutions': 'Ver soluções',
    'button.requestDemo': 'Solicitar demonstração',
    'button.credential': 'Quero me credenciar',
    'button.knowSolutions': 'Conheça nossas soluções',
    'button.submit': 'Enviar',
    'button.send': 'Enviar formulário',

    // Soluções
    'solutions.title': 'Soluções',
    'solutions.maintenance': 'Manutenção',
    'solutions.fueling': 'Abastecimento',
    'solutions.tracking': 'Rastreamento',
    'solutions.maintenance.item1': 'Ordens de serviço digitais',
    'solutions.maintenance.item2': 'Orçamentos, auditoria e aprovação',
    'solutions.maintenance.item3': 'Rede de oficinas credenciadas',
    'solutions.fueling.item1': 'Rede de postos integrada',
    'solutions.fueling.item2': 'Controle de consumo & fraudes',
    'solutions.fueling.item3': 'Relatórios por centro de custo',
    'solutions.tracking.item1': 'Localização em tempo real',
    'solutions.tracking.item2': 'Alertas e cercas virtuais',
    'solutions.tracking.item3': 'Análise de direção e rotas',

    // Rede
    'network.title': 'Rede nacional de atendimento',
    'network.desc1':
      'A InstaSolutions conecta sua frota a uma rede nacional com mais de 500 oficinas e postos credenciados, garantindo atendimento rápido, padronizado e de qualidade em qualquer região do Brasil. Cada parceiro é cuidadosamente selecionado e auditado para assegurar técnica, confiabilidade e condições comerciais competitivas.',
    'network.desc2':
      'Nossa rede atua integrada ao sistema de gestão de frotas, permitindo que manutenções, abastecimentos e serviços sejam registrados em tempo real, com total transparência, governança e controle dos custos. Isso reduz riscos, acelera decisões e aumenta a disponibilidade da frota.',
    'network.desc3':
      'Para empresas e órgãos públicos, isso significa conveniência, economia e segurança em cada atendimento. Para nossos parceiros, é a oportunidade de ampliar negócios e atender clientes qualificados.',
    'network.desc4':
      'Com a InstaSolutions, sua frota tem suporte em todo o Brasil — com eficiência, tecnologia e confiança.',
    'network.whereWeAre': 'Onde estamos',
    'network.headquarters': 'Matriz - Brasil',
    'network.branch': 'Filiais',
    'network.branchHighlight': 'Filial Destaque',
    'network.nationalService': 'Atendimento nacional',
    'network.regionalOperation': 'Operação e suporte regional',
    'network.regionalOperationMidwest': 'Operação regional Centro-Oeste',

    // Sobre
    'about.badge': 'Quem somos',
    'about.title': 'Tecnologia corporativa para decisões rápidas e seguras',
    'about.p1':
      'Em um cenário operacional cada vez mais dinâmico, competitivo e orientado por dados, empresas que trabalham com frotas enfrentam desafios diários: manter veículos disponíveis, controlar custos, garantir transparência, acompanhar o desempenho em tempo real e, acima de tudo, tomar decisões rápidas e precisas. É justamente nesse ponto que a InstaSolutions se destaca — unindo tecnologia, inteligência operacional e uma rede nacional de credenciados para transformar a forma como organizações gerenciam seus veículos.',
    'about.p2':
      'Nossa missão é clara: simplificar a gestão de frotas e torná-la mais inteligente, econômica e eficiente. Para isso, desenvolvemos uma plataforma completa que integra manutenção, abastecimento e rastreamento em um único ecossistema digital, conectando gestores, fornecedores e operações em tempo real.',
    'about.p3':
      'A tecnologia da InstaSolutions foi construída para oferecer agilidade, segurança e governança, atendendo tanto instituições públicas quanto empresas privadas que exigem alto desempenho e compliance absoluto.',
    'about.p4':
      'Outro grande diferencial é nossa rede de mais de 500 oficinas credenciadas e postos parceiros, cuidadosamente selecionados e auditados para garantir qualidade, prazo e condições comerciais competitivas.',
    'about.p5':
      'Somos movidos por inovação, mas também pela proximidade com nossos clientes. Por isso, contamos com uma equipe especializada em implantação, suporte e expansão, pronta para acompanhar cada parceiro com atenção e excelência.',
    'about.p6': 'A InstaSolutions nasceu para ser mais do que um software:',
    'about.p6b':
      'somos uma solução corporativa que conecta pessoas, tecnologia e resultados. E continuamos evoluindo para que cada gestor execute suas decisões com máxima confiança, visão ampla da operação e total segurança — hoje e no futuro.',

    // Contato
    'contact.title': 'Fale Conosco',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefone',
    'contact.address': 'Endereço',
    'contact.followUs': 'Siga-nos',
    'contact.title2': 'Vamos conversar',
    'contact.subtitle': 'Preencha o formulário e retornaremos para agendar uma demonstração.',
    'contact.contacts': 'Contatos',
    'contact.headquartersAddress': 'Endereço Matriz',
    'contact.contactUs': 'Entre em contato conosco',
    'contact.successMsg': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    'contact.errorMsg': 'Erro ao enviar. Tente novamente.',
    'contact.whatsapp': 'Falar no WhatsApp',

    // Formulários
    'form.name': 'Nome',
    'form.email': 'E-mail',
    'form.phone': 'Telefone',
    'form.company': 'Empresa',
    'form.cnpj': 'CNPJ',
    'form.message': 'Mensagem',
    'form.state': 'Estado',
    'form.city': 'Cidade',
    'form.segment': 'Segmento de atuação',
    'form.fleetSize': 'Quantidade de veículos',
    'form.tradeName': 'Nome Fantasia',
    'form.companyName': 'Razão social',
    'form.neighborhood': 'Bairro',
    'form.address': 'Endereço c/ número',
    'form.responsible': 'Responsável',
    'form.cpfRg': 'CPF/RG',
    'form.mobilePhone': 'DDD / Celular',
    'form.landline': 'DDD / Fixo',
    'form.flag': 'Bandeira',
    'form.send': 'Enviar',
    'form.solution': 'Qual solução deseja contratar?',
    'form.sending': 'Enviando...',
    'form.termsCheck': 'Confirmo que concordo com os termos e processo de credenciamento da InstaSolutions.',

    // Credenciar
    'credential.title': 'Venha fazer parte da rede de parceiros que mais cresce no Brasil.',
    'credential.subtitle': 'Para credenciamento preencha os dados abaixo.',
    'credential.gasStations': 'Postos de combustível',
    'credential.automotive': 'Linha Automotiva',
    'credential.successTitle': 'Formulário enviado com sucesso!',
    'credential.successMsg':
      'Nossa equipe entrará em contato em até 24 horas para finalização do credenciamento. Atente-se ao telefone e e-mail informados.',
    'credential.redirecting': 'Redirecionando para a página inicial...',

    // Cliente
    'client.title': 'Venha ser InstaSolutions e descomplique sua gestão de frotas!',
    'client.desc1':
      'Gerenciar uma frota não precisa ser complexo. Com a InstaSolutions, você conecta sua operação a uma plataforma completa que integra manutenção, abastecimento e rastreamento em um único sistema, oferecendo controle total e decisões rápidas baseadas em dados.',
    'client.desc2':
      'Nossa rede nacional com mais de 500 oficinas e postos credenciados garante atendimento padronizado, econômico e confiável em qualquer região do Brasil.',
    'client.desc3':
      'Ao escolher a InstaSolutions, você reduz despesas, aumenta a disponibilidade da frota e simplifica o dia a dia da sua equipe com uma solução moderna, segura e pensada para empresas e instituições que exigem eficiência e performance.',
    'client.desc4': 'Seja InstaSolutions e leve sua gestão de frotas a um novo nível.',

    // Rodapé
    'footer.institutional': 'Institucional',
    'footer.partners': 'Parceiros',
    'footer.solutions': 'Soluções',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal & Contato',
    'footer.rights': 'Todos os direitos reservados',
    'footer.overview': 'Visão geral',
    'footer.cnpj': 'CNPJ',
    'footer.lgpdCompliant': 'LGPD Compliant',
    'footer.privacyPolicy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.blog': 'Blog',
    'footer.careers': 'Carreiras',

    // Acesso ao sistema
    'access.welcome': 'Bem vindo',
    'access.supplier': 'Fornecedor',
    'access.client': 'Cliente',
    'access.description':
      'Para acessar nosso sistema clique no botão "Acessar" abaixo e você será redirecionado para nosso site.',
    'access.generalSystem': 'Acesso geral ao sistema',
    'access.fuelSystem': 'Acesso combustível',
    'access.underConstruction': 'Página em construção. Aguarde lançamento em breve!',
    'access.maintenanceTracking': 'Acesso manutenção & rastreamento',
    'access.access': 'Acessar',

    // Página Obrigado
    'thankyou.title': 'Obrigado!',
    'thankyou.message': 'Recebemos sua mensagem e retornaremos em breve.',
    'thankyou.backHome': 'Voltar à página inicial',

    // Cookie Banner
    'cookie.message':
      'Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site, em conformidade com a LGPD.',
    'cookie.accept': 'Aceitar',
    'cookie.reject': 'Rejeitar',
    'cookie.preferences': 'Preferências',

    // Toast
    'toast.success': 'Sucesso!',
    'toast.error': 'Erro',
    'toast.close': 'Fechar',

    // 404
    'notfound.title': 'Página não encontrada',
    'notfound.message':
      'Não encontramos a página que você procura. Ela pode ter sido movida ou não existe mais.',
    'notfound.backHome': 'Voltar ao início',
    'notfound.goSolutions': 'Ver soluções',
    'notfound.goContact': 'Fale conosco',

    // Breadcrumbs
    'breadcrumb.home': 'Home',
  },
  en: {
    'nav.home': 'Home',
    'nav.solutions': 'Solutions',
    'nav.partners': 'Partners',
    'nav.clients': "I'm a client",
    'nav.network': 'Network',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.talkToTeam': 'Talk to the team',
    'nav.whoWeAre': 'Who We Are',
    'nav.credential': 'Get Accredited',
    'nav.systemAccess': 'System Access',
    'nav.suppliers': 'Suppliers',
    'nav.clients2': 'Clients',
    'nav.financial': 'Financial Portal',
    'nav.beClient': 'Become a Client',
    'nav.skipToContent': 'Skip to content',

    'home.fleetManagement': 'Complete fleet management',
    // TODO: Winner — validate "18% in 90 days" figure with real metrics before publishing
    'hero.h1': "Cut up to 18% of your fleet's operating cost in 90 days.",
    'hero.subtitle':
      'Maintenance, fueling and tracking on a single platform, connected to a network of 500+ certified workshops and gas stations across Brazil.',
    'hero.cta.primary': 'Request a demo',
    'hero.cta.secondary': 'See solutions',
    'hero.cta.tertiary': "I'm a client · Access system",
    'hero.trust.lgpd': 'LGPD Compliant',
    'hero.trust.integration': 'ELD/ERP Integration',
    'hero.trust.coverage': 'National + USA coverage',
    'hero.trust.network': '500+ certified workshops',
    'home.title': 'Corporate platform for fleet management with integrated modules',
    'home.subtitle':
      'Maintenance with workshop network, fuel with gas station network and tracking — all in one place.',
    'home.partnersSuppliers': '+500 Partners and Suppliers',
    'home.gasStationNetwork': 'Integrated gas station network',
    'home.realtimeDashboards': 'Real-time dashboards',
    'home.workshops': 'Workshops',
    'home.coverage': 'Coverage',
    'home.integrations': 'Integrations',
    'home.brazilWide': 'Nationwide',
    'home.costBenefit': 'Excellent cost-benefit',
    'home.costBenefitDesc':
      'InstaSolutions acts as an intermediary in the contracting of automotive services and parts for companies and public institutions.',
    'home.costBenefitDesc2':
      'Through proprietary software and app, it offers clients access to a network of accredited providers offering their services and products at competitive prices and differentiated payment terms.',

    'stats.workshops': '+500 workshops',
    'stats.workshopsLabel': 'Certified partners',
    'stats.clients': '+20 clients',
    'stats.clientsLabel': 'Corporate clients served',
    'stats.states': '6 states',
    'stats.statesLabel': 'Served in Brazil',
    'stats.integrations': '+30 integrations',
    'stats.integrationsLabel': 'Via API',

    // TODO: Winner — replace with real testimonials
    'testimonials.title': 'What our clients say',
    'testimonials.1.quote':
      'In 4 months with InstaSolutions we cut 23% of corrective maintenance costs. The driver app and management dashboard eliminated spreadsheets.',
    'testimonials.1.author': 'Renata Oliveira',
    'testimonials.1.role': 'Operations Director',
    'testimonials.1.company': 'XYZ Transport Co.',
    'testimonials.2.quote':
      'The ERP integration was fast and the onboarding was very well managed. We now have full real-time fleet visibility.',
    'testimonials.2.author': 'Carlos Mendes',
    'testimonials.2.role': 'Fleet Manager',
    'testimonials.2.company': 'ABC Rental',
    'testimonials.3.quote':
      'We use it for our municipal public fleet. It reduced fueling fraud by more than 40% in the first 60 days.',
    'testimonials.3.author': 'Ana Paula Sousa',
    'testimonials.3.role': 'Transportation Secretary',
    'testimonials.3.company': 'Municipal Government',

    'faq.title': 'Frequently Asked Questions',
    'faq.1.q': 'How does the certified workshop network work?',
    'faq.1.a':
      'Our network has over 500 certified workshops and gas stations across Brazil. Each partner undergoes technical and commercial auditing before joining the network.',
    'faq.2.q': 'Do you serve public agencies / bidding processes?',
    'faq.2.a':
      'Yes! We serve city halls, secretariats and other public institutions in compliance with Law 14,133/2021.',
    'faq.3.q': 'Does the platform integrate with our ERP?',
    'faq.3.a':
      'We have over 30 REST API integrations. We already connect with SAP, TOTVS, Oracle and other popular ERPs.',
    'faq.4.q': 'How long does onboarding take?',
    'faq.4.a':
      'Standard onboarding is completed in up to 5 business days for fleets of up to 100 vehicles.',
    'faq.5.q': 'Do you serve fleets outside Brazil?',
    'faq.5.a':
      'Yes! We have operations in Port Saint Lucie, FL (USA) and are expanding to other US states.',
    'faq.6.q': 'What is the pricing model?',
    'faq.6.a':
      'We work on a SaaS per vehicle/month model, with scalable plans according to fleet size and contracted modules.',

    'button.seeSolutions': 'See solutions',
    'button.requestDemo': 'Request demo',
    'button.credential': 'I want to be accredited',
    'button.knowSolutions': 'Know our solutions',
    'button.submit': 'Submit',
    'button.send': 'Send form',

    'solutions.title': 'Solutions',
    'solutions.maintenance': 'Maintenance',
    'solutions.fueling': 'Fueling',
    'solutions.tracking': 'Tracking',
    'solutions.maintenance.item1': 'Digital service orders',
    'solutions.maintenance.item2': 'Budgets, audit and approval',
    'solutions.maintenance.item3': 'Accredited workshop network',
    'solutions.fueling.item1': 'Integrated gas station network',
    'solutions.fueling.item2': 'Consumption control & fraud prevention',
    'solutions.fueling.item3': 'Reports by cost center',
    'solutions.tracking.item1': 'Real-time location',
    'solutions.tracking.item2': 'Alerts and virtual fences',
    'solutions.tracking.item3': 'Driving and route analysis',

    'network.title': 'Nationwide service network',
    'network.desc1':
      'InstaSolutions connects your fleet to a nationwide network with over 500 accredited workshops and gas stations, ensuring fast, standardized, and quality service in any region of Brazil.',
    'network.desc2':
      'Our network operates integrated with the fleet management system, allowing maintenance, fueling, and services to be recorded in real-time, with total transparency, governance, and cost control.',
    'network.desc3':
      'For companies and public agencies, this means convenience, economy, and security in every service. For our partners, it\'s the opportunity to expand business and serve qualified clients.',
    'network.desc4':
      'With InstaSolutions, your fleet has support throughout Brazil — with efficiency, technology, and trust.',
    'network.whereWeAre': 'Where we are',
    'network.headquarters': 'Headquarters - Brazil',
    'network.branch': 'Branches',
    'network.branchHighlight': 'Featured Branch',
    'network.nationalService': 'National service',
    'network.regionalOperation': 'Regional operation and support',
    'network.regionalOperationMidwest': 'Midwest regional operation',

    'about.badge': 'Who we are',
    'about.title': 'Corporate technology for fast and secure decisions',
    'about.p1':
      'In an increasingly dynamic, competitive, and data-driven operational landscape, companies managing fleets face daily challenges: keeping vehicles available, controlling costs, ensuring transparency, monitoring performance in real-time and, above all, making fast and accurate decisions.',
    'about.p2':
      'Our mission is clear: simplify fleet management and make it smarter, more economical, and efficient. To achieve this, we developed a complete platform that integrates maintenance, fueling, and tracking into a single digital ecosystem.',
    'about.p3':
      "InstaSolutions' technology was built to deliver agility, security, and governance, serving both public institutions and private companies that demand high performance and absolute compliance.",
    'about.p4':
      'Another major advantage is our network of over 500 accredited workshops and partner gas stations, carefully selected and audited to ensure quality, timeliness, and competitive commercial conditions.',
    'about.p5':
      'We are driven by innovation, but also by proximity to our clients. That\'s why we have a specialized team in implementation, support, and expansion, ready to accompany each partner with attention and excellence.',
    'about.p6': 'InstaSolutions was born to be more than software:',
    'about.p6b':
      'we are a corporate solution that connects people, technology, and results. And we continue to evolve so that every manager can execute their decisions with maximum confidence, broad operational visibility, and total security — today and in the future.',

    'contact.title': 'Contact Us',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.followUs': 'Follow us',
    'contact.title2': "Let's talk",
    'contact.subtitle': 'Fill out the form and we will get back to you to schedule a demo.',
    'contact.contacts': 'Contacts',
    'contact.headquartersAddress': 'Headquarters Address',
    'contact.contactUs': 'Contact us',
    'contact.successMsg': 'Message sent successfully! We will contact you soon.',
    'contact.errorMsg': 'Error sending. Please try again.',
    'contact.whatsapp': 'Chat on WhatsApp',

    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.company': 'Company',
    'form.cnpj': 'CNPJ',
    'form.message': 'Message',
    'form.state': 'State',
    'form.city': 'City',
    'form.segment': 'Business segment',
    'form.fleetSize': 'Fleet size',
    'form.tradeName': 'Trade Name',
    'form.companyName': 'Company Name',
    'form.neighborhood': 'Neighborhood',
    'form.address': 'Address with number',
    'form.responsible': 'Responsible',
    'form.cpfRg': 'CPF/RG',
    'form.mobilePhone': 'Area Code / Mobile',
    'form.landline': 'Area Code / Landline',
    'form.flag': 'Flag',
    'form.send': 'Send',
    'form.solution': 'Which solution would you like to hire?',
    'form.sending': 'Sending...',
    'form.termsCheck': 'I confirm that I agree to the terms and accreditation process of InstaSolutions.',

    'credential.title': 'Join the fastest-growing partner network in Brazil.',
    'credential.subtitle': 'Fill in the details below for accreditation.',
    'credential.gasStations': 'Gas Stations',
    'credential.automotive': 'Automotive Line',
    'credential.successTitle': 'Form submitted successfully!',
    'credential.successMsg':
      'Our team will contact you within 24 hours to complete the accreditation process. Please check your phone and email.',
    'credential.redirecting': 'Redirecting to home page...',

    'client.title': 'Become InstaSolutions and simplify your fleet management!',
    'client.desc1':
      "Managing a fleet doesn't have to be complex. With InstaSolutions, you connect your operation to a complete platform that integrates maintenance, fueling, and tracking in a single system.",
    'client.desc2':
      'Our nationwide network with over 500 accredited workshops and gas stations guarantees standardized, economical, and reliable service in any region of Brazil.',
    'client.desc3':
      'By choosing InstaSolutions, you reduce expenses, increase fleet availability, and simplify your team\'s daily routine with a modern, secure solution designed for companies and institutions that demand efficiency and performance.',
    'client.desc4': 'Be InstaSolutions and take your fleet management to a new level.',

    'footer.institutional': 'Institutional',
    'footer.partners': 'Partners',
    'footer.solutions': 'Solutions',
    'footer.company': 'Company',
    'footer.legal': 'Legal & Contact',
    'footer.rights': 'All rights reserved',
    'footer.overview': 'Overview',
    'footer.cnpj': 'CNPJ',
    'footer.lgpdCompliant': 'LGPD Compliant',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',

    'access.welcome': 'Welcome',
    'access.supplier': 'Supplier',
    'access.client': 'Client',
    'access.description':
      'To access our system, click the "Access" button below and you will be redirected to our website.',
    'access.generalSystem': 'General system access',
    'access.fuelSystem': 'Fuel access',
    'access.underConstruction': 'Page under construction. Coming soon!',
    'access.maintenanceTracking': 'Maintenance & tracking access',
    'access.access': 'Access',

    'thankyou.title': 'Thank you!',
    'thankyou.message': 'We have received your message and will get back to you soon.',
    'thankyou.backHome': 'Back to home page',

    'cookie.message':
      'We use cookies to improve your experience and analyze site traffic, in compliance with LGPD.',
    'cookie.accept': 'Accept',
    'cookie.reject': 'Reject',
    'cookie.preferences': 'Preferences',

    'toast.success': 'Success!',
    'toast.error': 'Error',
    'toast.close': 'Close',

    'notfound.title': 'Page not found',
    'notfound.message':
      "We couldn't find the page you're looking for. It may have been moved or no longer exists.",
    'notfound.backHome': 'Back to home',
    'notfound.goSolutions': 'See solutions',
    'notfound.goContact': 'Contact us',

    'breadcrumb.home': 'Home',
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

export default translations;

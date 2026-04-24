export const DOMAIN = 'https://frotainstasolutions.com.br';
export const ORG_NAME = 'InstaSolutions Produtos e Gestão Empresarial';
export const EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL || 'comercial@instasolutions.com.br';
export const WHATSAPP = import.meta.env.VITE_WHATSAPP || '5511333669410';
export const APP_URL_GERAL = import.meta.env.VITE_APP_URL_GERAL || 'https://app.frotainstasolutions.com.br/';
export const APP_URL_COMBUSTIVEL = import.meta.env.VITE_APP_URL_COMBUSTIVEL || 'https://front.instasolutionscomb.com.br/login';
export const GA_ID = import.meta.env.VITE_GA_ID || '';

export const COLORS = {
  azulTech: '#005BED',
  azulCorp: '#251C59',
  bgPill: '#F3F6FF',
  borderPill: '#D6E2FF',
} as const;

export const PHONE_DISPLAY = '(11) 3336-6941';

export const UFS: string[] = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
  'PB','PR','PE','PI','RJ','RN','RO','RS','RR','SC','SE','SP','TO',
];

export const CITIES_BY_UF: Record<string, string[]> = {
  AC: ['Rio Branco','Cruzeiro do Sul','Sena Madureira','Tarauacá','Feijó'],
  AL: ['Maceió','Arapiraca','Palmeira dos Índios','Rio Largo','Penedo'],
  AP: ['Macapá','Santana','Laranjal do Jari','Oiapoque','Mazagão'],
  AM: ['Manaus','Parintins','Itacoatiara','Manacapuru','Coari'],
  BA: ['Salvador','Feira de Santana','Vitória da Conquista','Camaçari','Itabuna','Juazeiro','Lauro de Freitas','Ilhéus','Jequié','Teixeira de Freitas'],
  CE: ['Fortaleza','Caucaia','Juazeiro do Norte','Maracanaú','Sobral','Crato','Itapipoca','Maranguape','Iguatu','Quixadá'],
  DF: ['Brasília','Taguatinga','Ceilândia','Samambaia','Planaltina'],
  ES: ['Vitória','Vila Velha','Serra','Cariacica','Viana','Cachoeiro de Itapemirim','Linhares','São Mateus','Colatina','Guarapari'],
  GO: ['Goiânia','Aparecida de Goiânia','Anápolis','Rio Verde','Luziânia','Águas Lindas de Goiás','Valparaíso de Goiás','Trindade','Formosa','Novo Gama'],
  MA: ['São Luís','Imperatriz','São José de Ribamar','Timon','Caxias','Codó','Paço do Lumiar','Açailândia','Bacabal','Balsas'],
  MT: ['Cuiabá','Várzea Grande','Rondonópolis','Sinop','Tangará da Serra','Cáceres','Sorriso','Lucas do Rio Verde','Barra do Garças','Primavera do Leste'],
  MS: ['Campo Grande','Dourados','Três Lagoas','Corumbá','Ponta Porã','Sidrolândia','Aquidauana','Nova Andradina','Maracaju','Naviraí'],
  MG: ['Belo Horizonte','Uberlândia','Contagem','Juiz de Fora','Betim','Montes Claros','Ribeirão das Neves','Uberaba','Governador Valadares','Ipatinga'],
  PA: ['Belém','Ananindeua','Santarém','Marabá','Castanhal','Parauapebas','Itaituba','Cametá','Bragança','Abaetetuba'],
  PB: ['João Pessoa','Campina Grande','Santa Rita','Patos','Bayeux','Sousa','Cajazeiras','Guarabira','Mamanguape','Cabedelo'],
  PR: ['Curitiba','Londrina','Maringá','Ponta Grossa','Cascavel','São José dos Pinhais','Foz do Iguaçu','Colombo','Guarapuava','Paranaguá'],
  PE: ['Recife','Jaboatão dos Guararapes','Olinda','Caruaru','Petrolina','Paulista','Cabo de Santo Agostinho','Camaragibe','Garanhuns','Vitória de Santo Antão'],
  PI: ['Teresina','Parnaíba','Picos','Piripiri','Floriano','Campo Maior','Barras','Altos','Esperantina','Pedro II'],
  RJ: ['Rio de Janeiro','São Gonçalo','Duque de Caxias','Nova Iguaçu','Niterói','Belford Roxo','Campos dos Goytacazes','São João de Meriti','Petrópolis','Volta Redonda'],
  RN: ['Natal','Mossoró','Parnamirim','São Gonçalo do Amarante','Macaíba','Ceará-Mirim','Caicó','Assu','Currais Novos','Nova Cruz'],
  RS: ['Porto Alegre','Caxias do Sul','Pelotas','Canoas','Santa Maria','Gravataí','Viamão','Novo Hamburgo','São Leopoldo','Rio Grande'],
  RO: ['Porto Velho','Ji-Paraná','Ariquemes','Vilhena','Cacoal','Jaru','Rolim de Moura','Guajará-Mirim','Pimenta Bueno','Buritis'],
  RR: ['Boa Vista','Rorainópolis','Caracaraí','Alto Alegre','Mucajaí'],
  SC: ['Florianópolis','Joinville','Blumenau','São José','Chapecó','Criciúma','Itajaí','Jaraguá do Sul','Lages','Palhoça'],
  SE: ['Aracaju','Nossa Senhora do Socorro','Lagarto','Itabaiana','Estância','São Cristóvão','Tobias Barreto','Simão Dias','Propriá','Barra dos Coqueiros'],
  SP: ['São Paulo','Guarulhos','Campinas','São Bernardo do Campo','Santo André','Osasco','São José dos Campos','Ribeirão Preto','Sorocaba','Santos','Barueri','Mauá','São José do Rio Preto','Mogi das Cruzes','Diadema'],
  TO: ['Palmas','Araguaína','Gurupi','Porto Nacional','Paraíso do Tocantins','Colinas do Tocantins','Guaraí','Araguatins','Miracema do Tocantins','Tocantinópolis'],
};

export function getCitiesForUF(uf: string): string[] {
  return CITIES_BY_UF[uf] || ['Cidade'];
}

export const APP_DOWNLOAD_URLS = {
  combustiveis: {
    android: 'https://play.google.com/store/apps/details?id=br.com.instasolutions.combustiveis',
    ios: 'https://apps.apple.com/br/app/instasolutions-combust%C3%ADveis/id6760682249?l=en-GB',
    label: 'Combustíveis',
  },
} as const;

export const SEGMENTOS_ATUACAO = [
  'Aquisição de peças','Aquisição de pneu','Auto peças & Distribuidora','Auto elétrica',
  'Ar-condicionado','Borracharia','Consessionária','Despachante ou Comércio de placas',
  'Funilaria e pintura','Lavagem automotiva','Troca de óleo Express','Oficina mecânica',
  'Centro Automotivo','Vidros em geral','Reforma de pneu','Guincho','Tapeçaria',
  'Vistoria veicular e Inspeção veicular','Chaveiro','Posto de Molas','Outro',
];

export const SEGMENTOS_CLIENTE = ['Transportadora','Órgão Público','Locadora','Microempresa','Outro'];
export const TAMANHO_FROTA = ['1-25','26-100','101-500','500+'];
export const SOLUCOES = ['Manutenção','Combustível','Rastreamento','Sistema completo','Personalizado'];
export const BANDEIRAS = ['SHELL','ALE','IPIRANGA','PROPRIA','PETROBAS','RAÍZEN','OUTROS'];

// TODO: Winner — substituir pelos URLs reais das redes sociais
export const SOCIAL = {
  linkedin: '',
  instagram: '',
  youtube: '',
} as const;

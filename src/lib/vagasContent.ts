import type { Language } from './translations';

/**
 * Conteúdo das vagas — edite este arquivo para publicar novas posições.
 *
 * - Coloque imagens em `public/imagens/vagas/` e use caminhos como `/imagens/vagas/nome.jpg`.
 * - Se `imageSrc` estiver vazio ou a imagem falhar ao carregar, um cartão padrão é exibido.
 * - Defina `active: false` para ocultar uma vaga sem remover do arquivo.
 */
export interface LocalizedCopy {
  pt: string;
  en: string;
}

/**
 * Conteúdo visual da página de carreiras (hero + compartilhamento).
 * Troque `heroImageSrc` pelo caminho de uma imagem em `public/` (ex.: `/imagens/vagas/hero-carreiras.jpg`).
 * Deixe vazio (`''`) para manter apenas título centralizado sem faixa com foto.
 */
export const VAGAS_PAGE = {
  heroImageSrc: '/imagens/vagas/hero-carreiras.jpg',
  heroImageAlt: {
    pt: 'Ambiente colaborativo e tecnologia para gestão de frotas — InstaSolutions',
    en: 'Collaborative workspace and fleet-management technology — InstaSolutions',
  },
} as const;

export interface JobOpening {
  /** Identificador único (usado na URL ?vaga=...) */
  id: string;
  /** Caminho público da imagem ou string vazia para placeholder */
  imageSrc: string;
  title: LocalizedCopy;
  /** Ex.: "Barueri · SP · Híbrido" */
  location?: LocalizedCopy;
  excerpt: LocalizedCopy;
  body: LocalizedCopy[];
  requirements?: LocalizedCopy[];
  active?: boolean;
}

export const VAGAS: JobOpening[] = [
  {
    id: 'desenvolvedor-full-stack',
    imageSrc: '/imagens/vagas/desenvolvedor-full-stack.jpg',
    title: {
      pt: 'Desenvolvedor(a) Full Stack',
      en: 'Full Stack Developer',
    },
    location: {
      pt: 'Barueri · SP · Híbrido',
      en: 'Barueri · SP · Hybrid',
    },
    excerpt: {
      pt: 'Atue em produto SaaS de gestão de frotas, com stack moderna e time colaborativo.',
      en: 'Work on our fleet-management SaaS product with a modern stack and a collaborative team.',
    },
    body: [
      {
        pt: 'Buscamos pessoas que gostem de entregar valor com qualidade, participem de decisões técnicas e evoluam nossas integrações e APIs.',
        en: 'We look for people who enjoy shipping quality work, take part in technical decisions, and evolve our integrations and APIs.',
      },
      {
        pt: 'Você terá contato com frontend e backend, boas práticas de segurança e ambiente ágil.',
        en: 'You will work across frontend and backend, security best practices, and an agile environment.',
      },
    ],
    requirements: [
      {
        pt: 'Experiência com React e TypeScript',
        en: 'Experience with React and TypeScript',
      },
      {
        pt: 'Conforto com APIs REST e versionamento (Git)',
        en: 'Comfort with REST APIs and Git',
      },
      {
        pt: 'Boa comunicação e autonomia',
        en: 'Strong communication and autonomy',
      },
    ],
    active: true,
  },
  {
    id: 'customer-success',
    imageSrc: '/imagens/vagas/customer-success.jpg',
    title: {
      pt: 'Especialista em Sucesso do Cliente',
      en: 'Customer Success Specialist',
    },
    location: {
      pt: 'Barueri · SP',
      en: 'Barueri · SP',
    },
    excerpt: {
      pt: 'Garanta adoção, resultados e relacionamento com clientes corporativos e rede de parceiros.',
      en: 'Drive adoption, outcomes, and relationships with corporate clients and partner networks.',
    },
    body: [
      {
        pt: 'Você será ponte entre clientes, produto e operações, acompanhando indicadores e propondo melhorias.',
        en: 'You will connect clients, product, and operations, tracking metrics and proposing improvements.',
      },
    ],
    requirements: [
      {
        pt: 'Experiência em CS ou consultoria B2B',
        en: 'Experience in CS or B2B consulting',
      },
      {
        pt: 'Organização e visão de processos',
        en: 'Organization and process mindset',
      },
    ],
    active: true,
  },
];

export function pickLocalized(copy: LocalizedCopy, lang: Language): string {
  const v = lang === 'en' ? copy.en : copy.pt;
  return (v && v.trim()) || copy.pt;
}

export function getActiveJobs(): JobOpening[] {
  return VAGAS.filter((j) => j.active !== false);
}

export function getJobById(id: string): JobOpening | undefined {
  return VAGAS.find((j) => j.id === id);
}

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

/**
 * ─── COMO ADICIONAR UMA VAGA REAL ────────────────────────────────────────────
 *
 * 1. Copie o bloco de exemplo abaixo e cole dentro do array VAGAS (antes do `]`).
 * 2. Defina um `id` único em kebab-case (ex.: 'analista-de-ti').
 * 3. Coloque a imagem em `public/imagens/vagas/` e aponte em `imageSrc`
 *    — deixe `''` para exibir o placeholder padrão (ícone de maleta).
 * 4. Preencha `title`, `location`, `excerpt`, `body` e `requirements` em PT e EN.
 * 5. Certifique-se de que `active: true` esteja definido.
 * 6. Salve o arquivo — a vaga aparecerá automaticamente em /vagas.
 *
 * Para DESATIVAR uma vaga sem apagá-la, mude `active` para `false`.
 *
 * Exemplo:
 * ─────────────────────────────────────────────────────────────────────────────
 * {
 *   id: 'analista-de-ti',
 *   imageSrc: '/imagens/vagas/analista-de-ti.jpg',  // ou '' para placeholder
 *   title: { pt: 'Analista de TI', en: 'IT Analyst' },
 *   location: { pt: 'Barueri · SP · Híbrido', en: 'Barueri · SP · Hybrid' },
 *   excerpt: {
 *     pt: 'Resumo curto exibido no card da vaga.',
 *     en: 'Short summary shown on the job card.',
 *   },
 *   body: [
 *     { pt: 'Parágrafo 1 da descrição completa.', en: 'Full description paragraph 1.' },
 *     { pt: 'Parágrafo 2 (adicione quantos quiser).', en: 'Paragraph 2.' },
 *   ],
 *   requirements: [
 *     { pt: 'Requisito 1', en: 'Requirement 1' },
 *     { pt: 'Requisito 2', en: 'Requirement 2' },
 *   ],
 *   active: true,
 * },
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const VAGAS: JobOpening[] = [];

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

import { createClient } from '@supabase/supabase-js';
import type { JobOpening } from './vagasContent';

const url = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

export const supabase = url && key ? createClient(url, key) : null;

export interface VagaRow {
  id: string;
  title_pt: string;
  title_en: string;
  location_pt: string;
  location_en: string;
  excerpt_pt: string;
  excerpt_en: string;
  body: Array<{ pt: string; en: string }>;
  requirements: Array<{ pt: string; en: string }>;
  image_src: string;
  active: boolean;
  created_at: string;
}

export interface CandidaturaRow {
  id: string;
  vaga_id: string | null;
  vaga_titulo: string | null;
  nome_completo: string;
  email: string;
  celular: string;
  estado: string | null;
  cidade: string | null;
  linkedin: string | null;
  portfolio_url: string | null;
  mensagem: string;
  cv_path: string | null;
  idioma: string | null;
  created_at: string;
}

export function vagaRowToJobOpening(row: VagaRow): JobOpening {
  return {
    id: row.id,
    imageSrc: row.image_src,
    title: { pt: row.title_pt, en: row.title_en },
    location: row.location_pt ? { pt: row.location_pt, en: row.location_en } : undefined,
    excerpt: { pt: row.excerpt_pt, en: row.excerpt_en },
    body: row.body || [],
    requirements: row.requirements || [],
    active: row.active,
  };
}

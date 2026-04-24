export type { Language, TranslationKey } from '../lib/translations';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

export interface FAQItemType {
  question: string;
  answer: string;
}

export interface TestimonialType {
  quote: string;
  author: string;
  role: string;
  company: string;
}

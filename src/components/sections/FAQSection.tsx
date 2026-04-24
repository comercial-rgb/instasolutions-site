import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { COLORS } from '../../lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const { t } = useLanguage();

  const defaultItems: FAQItem[] = [
    { question: t('faq.1.q'), answer: t('faq.1.a') },
    { question: t('faq.2.q'), answer: t('faq.2.a') },
    { question: t('faq.3.q'), answer: t('faq.3.a') },
    { question: t('faq.4.q'), answer: t('faq.4.a') },
    { question: t('faq.5.q'), answer: t('faq.5.a') },
    { question: t('faq.6.q'), answer: t('faq.6.a') },
  ];

  const faqs = items || defaultItems;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: COLORS.azulCorp }}>
        {t('faq.title')}
      </h2>
      <div className="max-w-3xl mx-auto space-y-2">
        {faqs.map((item, i) => (
          <details
            key={i}
            className="group border rounded-xl overflow-hidden"
            style={{ borderColor: COLORS.borderPill }}
          >
            <summary
              className="flex items-center justify-between px-5 py-4 cursor-pointer select-none font-medium text-sm list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
              style={{ color: COLORS.azulCorp }}
            >
              <span>{item.question}</span>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4"
                style={{ backgroundColor: COLORS.bgPill, color: COLORS.azulTech }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm text-neutral-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

import React, { createContext, useContext, useState } from 'react';
import translations, { type Language, type TranslationKey } from '../lib/translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'pt',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: TranslationKey): string =>
    (translations[language] as Record<string, string>)[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

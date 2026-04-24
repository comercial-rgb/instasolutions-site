import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/Button';
import { COLORS } from '../../lib/constants';
import { ShieldCheck } from 'lucide-react';

interface ConsentData {
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'insta_cookie_consent';

export function getConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentData) : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      // Delay to avoid flash on first load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function save(analytics: boolean) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ analytics, timestamp: new Date().toISOString() }),
    );
    setVisible(false);
    if (analytics && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl shadow-xl border bg-white p-4"
      style={{ borderColor: COLORS.borderPill }}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: COLORS.azulTech }} />
        <div className="flex-1">
          <p className="text-sm text-neutral-700 leading-relaxed">{t('cookie.message')}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Button size="sm" variant="primary" onClick={() => save(true)}>
              {t('cookie.accept')}
            </Button>
            <Button size="sm" variant="outline" onClick={() => save(false)}>
              {t('cookie.reject')}
            </Button>
            {/* TODO: Winner — implementar modal de preferências granulares de cookies */}
            {/* <Button size="sm" variant="ghost" onClick={() => {}}>
              {t('cookie.preferences')}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

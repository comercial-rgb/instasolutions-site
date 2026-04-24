import React, { useState } from 'react';
import { Fuel, ShieldCheck, ExternalLink } from 'lucide-react';
import { APP_DOWNLOAD_URLS, COLORS } from '../../lib/constants';

interface AppDownloadBannerProps {
  system: keyof typeof APP_DOWNLOAD_URLS;
}

export function AppDownloadBanner({ system }: AppDownloadBannerProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const app = APP_DOWNLOAD_URLS[system];
  if (!app) return null;

  const isMobile =
    typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function copyUrl(url: string, platform: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(platform);
      setTimeout(() => setCopied(null), 3000);
    });
  }

  return (
    <div className="mt-8 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
      <div
        className="p-6"
        style={{ background: `linear-gradient(135deg, ${COLORS.azulCorp} 0%, ${COLORS.azulTech} 100%)` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Fuel className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg leading-tight">
              Baixe o App — {app.label}
            </h4>
            <p className="text-white/80 text-sm">
              InstaSolutions {app.label} — disponível para Android e iOS
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={app.android}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/12 border border-white/25 rounded-xl px-5 py-3 text-white no-underline flex-1 min-w-[200px] transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Baixar no Google Play"
          >
            <GooglePlayIcon />
            <div>
              <div className="text-[11px] opacity-80 leading-none">Disponível no</div>
              <div className="text-base font-semibold leading-tight">Google Play</div>
            </div>
          </a>
          <a
            href={app.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/12 border border-white/25 rounded-xl px-5 py-3 text-white no-underline flex-1 min-w-[200px] transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Baixar na App Store"
          >
            <AppleIcon />
            <div>
              <div className="text-[11px] opacity-80 leading-none">Baixar na</div>
              <div className="text-base font-semibold leading-tight">App Store</div>
            </div>
          </a>
        </div>

        {!isMobile && (
          <div className="mt-4 space-y-2">
            <p className="text-white/70 text-xs">
              No computador? Copie o link e compartilhe via mensagem ou e-mail:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => copyUrl(app.android, 'android')}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs cursor-pointer transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {copied === 'android' ? '✓ Link copiado!' : 'Copiar link Android'}
              </button>
              <button
                onClick={() => copyUrl(app.ios, 'ios')}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs cursor-pointer transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {copied === 'ios' ? '✓ Link copiado!' : 'Copiar link iOS'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 py-3 bg-amber-50 border-t-2 border-amber-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Informativo para Postos (iOS):</strong> Postos parceiros em dispositivos iOS utilizam apenas
          QR-Code para identificação. A tecnologia NFC está disponível exclusivamente para Android.
        </p>
      </div>
    </div>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

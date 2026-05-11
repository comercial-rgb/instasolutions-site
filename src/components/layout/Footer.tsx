import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Fuel } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { COLORS, ORG_NAME, EMAIL } from '../../lib/constants';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  // TODO: Winner — substituir pelos URLs reais das redes sociais
  const socials = [
    { label: 'LinkedIn', href: '', icon: LinkedInIcon },
    { label: 'Instagram', href: '', icon: InstagramIcon },
    { label: 'YouTube', href: '', icon: YouTubeIcon },
  ];

  return (
    <footer className="border-t" style={{ backgroundColor: COLORS.bgPill, borderColor: COLORS.borderPill }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {/* Col 1 — Brand */}
        <div>
          <img src="/imagens/logo-rodape.png" alt="InstaSolutions" className="h-14 mb-3" onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }} />
          <p className="text-xs leading-relaxed" style={{ color: COLORS.azulCorp }}>
            Plataforma SaaS B2B de gestão de frotas.
          </p>
          <div className="text-xs mt-3 space-y-1" style={{ color: COLORS.azulCorp }}>
            <div><span className="font-semibold">{t('footer.cnpj')}:</span> 47.611.398/0001-66</div>
            <div>Alameda Rio Negro, 1030, Ed. Stadium Corporate Alphaville, Sala 2304</div>
            <div>Barueri – SP, 06454-000</div>
            <div>
              <a href="tel:+551133366941" className="hover:underline">(11) 3336-6941</a>
            </div>
            <div>
              <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a>
            </div>
          </div>
        </div>

        {/* Col 2 — Produto */}
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: COLORS.azulCorp }}>
            {t('footer.solutions')}
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/solucoes">{t('footer.overview')}</FooterLink>
            <FooterLink to="/rede">{t('nav.network')}</FooterLink>
          </ul>

          <h3 className="font-semibold text-sm mt-5 mb-3" style={{ color: COLORS.azulCorp }}>
            {t('footer.partners')}
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/parceiros/credenciar">{t('nav.credential')}</FooterLink>
            <FooterLink to="/parceiros/fornecedores">{t('nav.systemAccess')}</FooterLink>
          </ul>
        </div>

        {/* Col 3 — Empresa */}
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: COLORS.azulCorp }}>
            {t('footer.company')}
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/sobre">{t('nav.about')}</FooterLink>
            <FooterLink to="/quem-somos">{t('nav.whoWeAre')}</FooterLink>
            {/* TODO: Winner — adicionar /blog quando existir */}
            <li className="text-neutral-400 cursor-default">{t('footer.blog')} (em breve)</li>
            <FooterLink to="/vagas">{t('footer.careers')}</FooterLink>
          </ul>

          {/* App links */}
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.azulTech }}>
              <Fuel className="w-3.5 h-3.5 inline mr-1" style={{ verticalAlign: '-2px' }} />
              App Combustíveis
            </div>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://play.google.com/store/apps/details?id=br.com.instasolutions.combustiveis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
                style={{ color: COLORS.azulCorp }}
              >
                <GooglePlayIcon /> Google Play
              </a>
              <a
                href="https://apps.apple.com/br/app/instasolutions-combust%C3%ADveis/id6760682249?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
                style={{ color: COLORS.azulCorp }}
              >
                <AppleIcon /> App Store
              </a>
            </div>
          </div>
        </div>

        {/* Col 4 — Legal & Contato */}
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: COLORS.azulCorp }}>
            {t('footer.legal')}
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/politica-de-privacidade">{t('footer.privacyPolicy')}</FooterLink>
            {/* TODO: Winner — criar página /termos */}
            <li className="text-neutral-400 cursor-default">{t('footer.terms')} (em breve)</li>
            <FooterLink to="/contato">{t('nav.contact')}</FooterLink>
          </ul>

          {/* Social links */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.azulCorp }}>
              {t('contact.followUs')}
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: COLORS.azulTech, color: 'white' }}
                  >
                    <Icon />
                  </a>
                ) : (
                  /* TODO: Winner — adicionar URL real de {label} */
                  <span
                    key={label}
                    title={`${label} — TODO: Winner adicionar URL`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center opacity-40 cursor-default"
                    style={{ backgroundColor: COLORS.azulTech, color: 'white' }}
                  >
                    <Icon />
                  </span>
                ),
              )}
            </div>
          </div>

          {/* LGPD badge */}
          <div className="mt-4 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" style={{ color: COLORS.azulTech }} />
            <span className="text-xs font-medium" style={{ color: COLORS.azulCorp }}>
              {t('footer.lgpdCompliant')}
            </span>
          </div>
          {/* TODO: Winner — adicionar selo ISO 27001 quando obtido */}
        </div>
      </div>

      {/* Sub footer */}
      <div
        className="border-t py-4 text-center text-xs"
        style={{ borderColor: COLORS.borderPill, color: COLORS.azulCorp }}
      >
        © {year} {ORG_NAME}. {t('footer.rights')}.
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="hover:underline transition-colors"
        style={{ color: COLORS.azulCorp }}
      >
        {children}
      </Link>
    </li>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7s-.3-2-1.2-2.7c-1.2-1.2-2.4-1.2-3-1.3C16.4 3 12 3 12 3s-4.4 0-6.8.1c-.6.1-1.8.1-3 1.3C1.3 5 1 7 1 7S.7 9.3.7 11.5v2.1C.7 15.7 1 18 1 18s.3 2 1.2 2.7c1.2 1.2 2.7 1.1 3.4 1.2C7.6 22 12 22 12 22s4.4 0 6.8-.2c.6-.1 1.8-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7S23.3 15.7 23.3 13.5v-2C23.3 9.3 23 7 23 7zm-14 7.5V9l6 2.7-6 2.8z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

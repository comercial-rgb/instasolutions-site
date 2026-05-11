import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { NavPill } from '../navigation/NavPill';
import { NavDropdown, DropdownItem } from '../navigation/NavDropdown';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';
import { COLORS } from '../../lib/constants';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded-lg focus:shadow-lg focus:text-blue-700 focus:font-medium"
      >
        {t('nav.skipToContent')}
      </a>

      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-40" style={{ borderColor: COLORS.borderPill }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 gap-4">
          {/* Logo */}
          <Link to="/" aria-label="InstaSolutions — Página inicial">
            <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-12 sm:h-14" />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-2 flex-wrap">
            <NavPill to="/">{t('nav.home')}</NavPill>
            <NavPill to="/solucoes">{t('nav.solutions')}</NavPill>

            <NavDropdown label={t('nav.partners')} matchPaths={['/parceiros']}>
              <DropdownItem to="/parceiros/credenciar">{t('nav.credential')}</DropdownItem>
              <DropdownItem to="/parceiros/fornecedores">{t('nav.systemAccess')} — {t('nav.suppliers')}</DropdownItem>
              <DropdownItem to="/parceiros/financeiro">{t('nav.financial')}</DropdownItem>
            </NavDropdown>

            <NavDropdown label={t('nav.clients')} matchPaths={['/clientes']}>
              <DropdownItem to="/clientes/queroser">{t('nav.beClient')}</DropdownItem>
              <DropdownItem to="/clientes/acesso">{t('nav.systemAccess')} — {t('nav.clients2')}</DropdownItem>
              <DropdownItem to="/clientes/financeiro">{t('nav.financial')}</DropdownItem>
            </NavDropdown>

            <NavPill to="/rede">{t('nav.network')}</NavPill>
            <NavPill to="/sobre">{t('nav.about')}</NavPill>
            <NavPill to="/quem-somos">{t('nav.whoWeAre')}</NavPill>
            <NavPill to="/vagas">{t('nav.jobs')}</NavPill>
            <NavPill to="/contato">{t('nav.contact')}</NavPill>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switch */}
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              aria-pressed={language === 'en'}
              aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{ color: COLORS.azulCorp }}
            >
              <Globe className="w-3.5 h-3.5" />
              {language}
            </button>

            {/* CTA button — hidden on mobile (mobile menu has it) */}
            <Link to="/contato" className="hidden sm:block">
              <Button size="sm" variant="primary">
                {t('nav.talkToTeam')}
              </Button>
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

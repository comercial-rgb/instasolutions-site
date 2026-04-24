import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { Button } from '../ui/Button';
import { COLORS } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileLink({ to, children, onClose }: { to: string; children: React.ReactNode; onClose: () => void }) {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onClose}
      className="block px-4 py-3 text-base font-medium rounded-xl transition-colors"
      style={{
        backgroundColor: isActive ? COLORS.bgPill : 'transparent',
        color: isActive ? COLORS.azulTech : COLORS.azulCorp,
      }}
    >
      {children}
    </Link>
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const [partnersOpen, setPartnersOpen] = React.useState(false);
  const [clientsOpen, setClientsOpen] = React.useState(false);

  useLockBodyScroll(isOpen);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus trap: focus first element when open
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length) focusable[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white shadow-xl max-h-screen overflow-y-auto"
        style={{ borderBottom: `3px solid ${COLORS.azulTech}` }}
      >
        <div className="px-4 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/" onClick={onClose}>
              <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-12" />
            </Link>
          </div>

          {/* Nav Links */}
          <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
            <MobileLink to="/" onClose={onClose}>{t('nav.home')}</MobileLink>
            <MobileLink to="/solucoes" onClose={onClose}>{t('nav.solutions')}</MobileLink>
            <MobileLink to="/rede" onClose={onClose}>{t('nav.network')}</MobileLink>
            <MobileLink to="/sobre" onClose={onClose}>{t('nav.about')}</MobileLink>
            <MobileLink to="/quem-somos" onClose={onClose}>{t('nav.whoWeAre')}</MobileLink>
            <MobileLink to="/contato" onClose={onClose}>{t('nav.contact')}</MobileLink>

            {/* Parceiros accordion */}
            <div>
              <button
                onClick={() => setPartnersOpen((v) => !v)}
                aria-expanded={partnersOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-colors"
                style={{ color: COLORS.azulCorp }}
              >
                {t('nav.partners')}
                <ChevronDown className={`w-4 h-4 transition-transform ${partnersOpen ? 'rotate-180' : ''}`} />
              </button>
              {partnersOpen && (
                <div className="ml-4 flex flex-col gap-1 mt-1">
                  <MobileLink to="/parceiros/credenciar" onClose={onClose}>{t('nav.credential')}</MobileLink>
                  <MobileLink to="/parceiros/fornecedores" onClose={onClose}>{t('nav.systemAccess')}</MobileLink>
                  <MobileLink to="/parceiros/financeiro" onClose={onClose}>{t('nav.financial')}</MobileLink>
                </div>
              )}
            </div>

            {/* Clientes accordion */}
            <div>
              <button
                onClick={() => setClientsOpen((v) => !v)}
                aria-expanded={clientsOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-colors"
                style={{ color: COLORS.azulCorp }}
              >
                {t('nav.clients')}
                <ChevronDown className={`w-4 h-4 transition-transform ${clientsOpen ? 'rotate-180' : ''}`} />
              </button>
              {clientsOpen && (
                <div className="ml-4 flex flex-col gap-1 mt-1">
                  <MobileLink to="/clientes/queroser" onClose={onClose}>{t('nav.beClient')}</MobileLink>
                  <MobileLink to="/clientes/acesso" onClose={onClose}>{t('nav.systemAccess')}</MobileLink>
                  <MobileLink to="/clientes/financeiro" onClose={onClose}>{t('nav.financial')}</MobileLink>
                </div>
              )}
            </div>
          </nav>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/contato" onClick={onClose}>
              <Button variant="primary" size="lg" className="w-full">
                {t('hero.cta.primary')}
              </Button>
            </Link>
            <Link to="/clientes/acesso" onClick={onClose}>
              <Button variant="outline" size="lg" className="w-full">
                {t('hero.cta.tertiary')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

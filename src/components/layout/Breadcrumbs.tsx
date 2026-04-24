import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItemType } from '../../types';
import { COLORS } from '../../lib/constants';

interface BreadcrumbsProps {
  items?: BreadcrumbItemType[];
}

const AUTO_BREADCRUMBS: Record<string, BreadcrumbItemType[]> = {
  '/solucoes': [{ label: 'Soluções' }],
  '/rede': [{ label: 'Rede' }],
  '/sobre': [{ label: 'Sobre' }],
  '/quem-somos': [{ label: 'Quem Somos' }],
  '/contato': [{ label: 'Contato' }],
  '/parceiros/credenciar': [{ label: 'Parceiros', href: '/parceiros/credenciar' }, { label: 'Credenciar' }],
  '/parceiros/fornecedores': [{ label: 'Parceiros' }, { label: 'Fornecedores' }],
  '/parceiros/financeiro': [{ label: 'Parceiros' }, { label: 'Financeiro' }],
  '/clientes/queroser': [{ label: 'Clientes' }, { label: 'Quero ser Cliente' }],
  '/clientes/acesso': [{ label: 'Clientes' }, { label: 'Acesso ao Sistema' }],
  '/clientes/financeiro': [{ label: 'Clientes' }, { label: 'Financeiro' }],
  '/politica-de-privacidade': [{ label: 'Política de Privacidade' }],
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();
  const breadcrumbs = items || AUTO_BREADCRUMBS[location.pathname] || [];

  if (breadcrumbs.length === 0 || location.pathname === '/') return null;

  const all = [{ label: 'Home', href: '/' }, ...breadcrumbs];

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <ol className="flex items-center gap-1.5 text-xs flex-wrap">
        {all.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-neutral-400" aria-hidden="true" />}
            {item.href && i < all.length - 1 ? (
              <Link
                to={item.href}
                className="hover:underline"
                style={{ color: COLORS.azulTech }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={i === all.length - 1 ? 'page' : undefined}
                className={i === all.length - 1 ? 'font-medium' : ''}
                style={{ color: i === all.length - 1 ? COLORS.azulCorp : 'rgb(115 115 115)' }}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

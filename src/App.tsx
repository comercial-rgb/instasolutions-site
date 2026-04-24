import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { Layout } from './components/layout/Layout';

// Eager load for home page (critical path)
import HomePage from './pages/HomePage';

// Lazy load all other pages for code splitting
const SolucoesPage = lazy(() => import('./pages/SolucoesPage'));
const RedePage = lazy(() => import('./pages/RedePage'));
const SobrePage = lazy(() => import('./pages/SobrePage'));
const QuemSomosPage = lazy(() => import('./pages/QuemSomosPage'));
const ContatoPage = lazy(() => import('./pages/ContatoPage'));
const ObrigadoPage = lazy(() => import('./pages/ObrigadoPage'));
const PoliticaPrivacidadePage = lazy(() => import('./pages/PoliticaPrivacidadePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Parceiros
const CredenciarPage = lazy(() => import('./pages/parceiros/CredenciarPage'));
const FornecedoresPage = lazy(() => import('./pages/parceiros/FornecedoresPage'));
const ParceirosFinanceiroPage = lazy(() => import('./pages/parceiros/FinanceiroPage'));

// Clientes
const QueroSerPage = lazy(() => import('./pages/clientes/QueroSerPage'));
const AcessoPage = lazy(() => import('./pages/clientes/AcessoPage'));
const ClientesFinanceiroPage = lazy(() => import('./pages/clientes/FinanceiroPage'));

export default function App() {
  return (
    <ToastProvider>
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="solucoes" element={<SolucoesPage />} />
          <Route path="rede" element={<RedePage />} />
          <Route path="sobre" element={<SobrePage />} />
          <Route path="quem-somos" element={<QuemSomosPage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route path="obrigado" element={<ObrigadoPage />} />
          <Route path="politica-de-privacidade" element={<PoliticaPrivacidadePage />} />
          {/* Parceiros */}
          <Route path="parceiros/credenciar" element={<CredenciarPage />} />
          <Route path="parceiros/fornecedores" element={<FornecedoresPage />} />
          <Route path="parceiros/financeiro" element={<ParceirosFinanceiroPage />} />
          {/* Clientes */}
          <Route path="clientes/queroser" element={<QueroSerPage />} />
          <Route path="clientes/acesso" element={<AcessoPage />} />
          <Route path="clientes/financeiro" element={<ClientesFinanceiroPage />} />
          {/* 404 catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
    </ToastProvider>
  );
}

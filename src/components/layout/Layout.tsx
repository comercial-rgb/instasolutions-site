import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { Breadcrumbs } from './Breadcrumbs';
import { Spinner } from '../ui/Spinner';
import { ToastContainer } from '../ui/Toast';
import { useToast } from '../../hooks/useToast';

export function Layout() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />
      <Breadcrumbs />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<Spinner fullPage />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

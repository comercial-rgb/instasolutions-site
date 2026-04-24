import React from 'react';

export function Spinner({ fullPage = false, size = 'md' }: { fullPage?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <svg
      className={`animate-spin ${sizes[size]} text-blue-600`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z"
      />
    </svg>
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white/80 z-50"
        role="status"
        aria-label="Carregando"
      >
        {spinner}
      </div>
    );
  }

  return (
    <span role="status" aria-label="Carregando">
      {spinner}
    </span>
  );
}

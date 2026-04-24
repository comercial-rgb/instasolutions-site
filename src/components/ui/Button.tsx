import React from 'react';
import { COLORS } from '../../lib/constants';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants: Record<ButtonVariant, string> = {
    primary: `bg-[${COLORS.azulTech}] text-white hover:opacity-90 focus-visible:ring-[${COLORS.azulTech}]`,
    outline: `bg-transparent border-2 text-[${COLORS.azulTech}] border-[${COLORS.azulTech}] hover:bg-[${COLORS.azulTech}]/5 focus-visible:ring-[${COLORS.azulTech}]`,
    ghost: `bg-transparent text-[${COLORS.azulCorp}] hover:bg-[${COLORS.bgPill}] focus-visible:ring-[${COLORS.azulCorp}]`,
  };

  const variantStyle: Record<ButtonVariant, React.CSSProperties> = {
    primary: { backgroundColor: COLORS.azulTech, color: 'white' },
    outline: { backgroundColor: 'transparent', color: COLORS.azulTech, border: `2px solid ${COLORS.azulTech}` },
    ghost: { backgroundColor: 'transparent', color: COLORS.azulCorp },
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${className}`}
      style={variantStyle[variant]}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
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
      )}
      {children}
    </button>
  );
}

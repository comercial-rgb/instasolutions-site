import React, { forwardRef } from 'react';
import { COLORS } from '../../lib/constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-describedby={error ? errorId : hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={`border rounded-xl px-3 py-2 w-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-neutral-300 focus:ring-blue-300 focus:border-blue-400'
          }`}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

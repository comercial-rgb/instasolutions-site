import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : undefined}
          rows={props.rows || 4}
          className={`border rounded-xl px-3 py-2 w-full text-sm resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-neutral-300 focus:ring-blue-300 focus:border-blue-400'
          }`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

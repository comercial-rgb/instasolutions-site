import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, id, className = '', ...props }, ref) => {
    const inputId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <select
          ref={ref}
          id={inputId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={`border rounded-xl px-3 py-2 w-full text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-400 focus:ring-red-300'
              : 'border-neutral-300 focus:ring-blue-300 focus:border-blue-400'
          }`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

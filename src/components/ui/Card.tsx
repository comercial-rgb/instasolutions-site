import React from 'react';
import { COLORS } from '../../lib/constants';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white shadow-sm ${className}`} style={{ borderColor: COLORS.borderPill }}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-5 pt-5 pb-2">{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={`text-lg font-semibold ${className}`} style={{ color: COLORS.azulCorp }}>
      {children}
    </h4>
  );
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
}

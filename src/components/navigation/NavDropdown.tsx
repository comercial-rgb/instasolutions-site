import React, { useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { COLORS } from '../../lib/constants';

interface DropdownItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function DropdownItem({ to, children, onClick }: DropdownItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2.5 hover:bg-neutral-50 text-sm transition-colors rounded-lg"
      style={{ color: COLORS.azulCorp }}
    >
      {children}
    </Link>
  );
}

interface NavDropdownProps {
  label: string;
  children: React.ReactNode;
  matchPaths?: string[];
}

export function NavDropdown({ label, children, matchPaths = [] }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isActive = matchPaths.some((p) => location.pathname.startsWith(p));

  const open = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    closeTimeout.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`px-3 py-1.5 rounded-full border flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
        style={{
          backgroundColor: isActive ? COLORS.azulTech : COLORS.bgPill,
          borderColor: isActive ? COLORS.azulTech : COLORS.borderPill,
          color: isActive ? 'white' : COLORS.azulCorp,
        }}
        onFocus={open}
        onBlur={close}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1.5 bg-white border rounded-xl shadow-lg min-w-[240px] z-50 py-1"
          style={{ borderColor: COLORS.borderPill }}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {children}
        </div>
      )}
    </div>
  );
}

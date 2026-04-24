import React from 'react';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../lib/constants';

interface NavPillProps {
  to: string;
  children: React.ReactNode;
}

export function NavPill({ to, children }: NavPillProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
          isActive ? 'text-white' : 'hover:opacity-80'
        }`
      }
      style={({ isActive }) => ({
        backgroundColor: isActive ? COLORS.azulTech : COLORS.bgPill,
        borderColor: isActive ? COLORS.azulTech : COLORS.borderPill,
        color: isActive ? 'white' : COLORS.azulCorp,
      })}
    >
      {children}
    </NavLink>
  );
}

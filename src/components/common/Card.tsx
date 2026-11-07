import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'purple' | 'blue' | 'cyan' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  onClick,
}) => {
  const glowClass = {
    purple: 'glow-card-purple',
    blue: 'glow-card-blue',
    cyan: 'glow-card-cyan',
    none: '',
  }[glow];

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200/80 bg-[#131929]/70 dark:bg-[#131929]/70 light:bg-white backdrop-blur-md transition-all duration-200 ${glowClass} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

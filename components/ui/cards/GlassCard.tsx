import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  blur?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hover = true,
  glow = false,
  blur = true,
  padding = 'md',
  className = '',
  onClick,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={[
        'relative rounded-3xl',
        'bg-[rgba(255,255,255,0.04)]',
        blur ? 'backdrop-blur-md' : '',
        'border border-[rgba(255,255,255,0.08)]',
        'shadow-[0_4px_24px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]',
        'transition-[transform,box-shadow,background-color] duration-300',
        hover ? 'hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)]' : '',
        glow ? 'hover:shadow-[0_8px_32px_rgba(0,87,224,0.2),0_0_0_1px_rgba(0,87,224,0.3)]' : '',
        paddingStyles[padding],
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {/* Top inner highlight line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;

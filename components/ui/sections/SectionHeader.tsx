import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  icon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  gradient = false,
  icon,
  align = 'center',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={`
        flex flex-col gap-1 mb-6
        ${alignmentStyles[align]}
        ${className}
      `}
    >
      {/* Icon if provided */}
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(0,87,224,0.1)] border border-[rgba(0,87,224,0.3)] text-[#0057E0] mb-2 animate-[fadeInUp_0.6s_ease-out]">
          {icon}
        </div>
      )}

      {/* Title */}
      <h2
        className={`
          text-[clamp(24px,2.75vw,38px)] font-semibold
          ${gradient
            ? 'bg-gradient-to-r from-white via-[#0057E0] to-white bg-clip-text text-transparent'
            : 'text-white'
          }
          animate-[fadeInUp_0.8s_ease-out]
          tracking-tight
        `}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[clamp(14px,1.75vw,20px)] text-white/70 max-w-2xl animate-[fadeInUp_0.8s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
          {subtitle}
        </p>
      )}

      {/* Decorative underline */}
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#0057E0] to-transparent animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]"></div>
    </div>
  );
};

export default SectionHeader;

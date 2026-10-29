import React, { useState } from 'react';

export const BRAND_LOGO_URL = 'https://i.imgur.com/iuJiEuD.jpeg';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
  subtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
  subtitle = 'Humanitarian Support Foundation',
}) => {
  const [imgError, setImgError] = useState(false);

  const containerSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base font-bold',
    md: 'text-base sm:text-lg font-extrabold',
    lg: 'text-xl sm:text-2xl font-extrabold',
  };

  const subtitleSizes = {
    sm: 'text-[9.5px]',
    md: 'text-[10.5px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Diamond Stones Logo Image with crisp contrast framing for legibility */}
      <div
        className={`${containerSizes[size]} relative shrink-0 flex items-center justify-center rounded-2xl bg-white p-1 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md ${
          light
            ? 'border border-white/40 shadow-md ring-2 ring-white/20'
            : 'border border-slate-200/90 shadow-sm'
        }`}
      >
        {!imgError ? (
          <img
            src={BRAND_LOGO_URL}
            alt="Diamond Stones Logo"
            className="w-full h-full object-contain rounded-xl"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#0B6B45] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
            DS
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span
          className={`tracking-tight leading-tight uppercase font-['Montserrat',sans-serif] ${titleSizes[size]} ${
            light ? 'text-white' : 'text-[#102C57]'
          }`}
        >
          Diamond Stones
        </span>
        {showSubtitle && (
          <span
            style={{
              fontSize: '7px',
              fontWeight: 'bold',
              lineHeight: '5px',
              fontFamily: 'Montserrat, sans-serif',
              textDecorationLine: 'none',
              marginTop: '0px',
            }}
            className={`uppercase tracking-wider ${
              light ? 'text-[#A7F3D0]' : 'text-[#0B6B45]'
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

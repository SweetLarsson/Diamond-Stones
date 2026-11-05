import React, { useState, useEffect } from 'react';

export const BRAND_LOGO_URL = 'https://i.imgur.com/hSxcMA9.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
}

const SUBTITLES = [
  'Humanitarian Support Foundation',
  'Women in Distress Initiative',
];

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  // Transitions with a fade effect between the two subtitles every 5 seconds
  useEffect(() => {
    if (!showSubtitle) return;
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showSubtitle]);

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

      <div className="flex flex-col min-w-0">
        <span
          className={`tracking-tight leading-tight uppercase font-['Montserrat',sans-serif] ${titleSizes[size]} ${
            light ? 'text-white' : 'text-[#102C57]'
          }`}
        >
          Diamond Stones
        </span>
        {showSubtitle && (
          <div className="relative h-[13px] w-[215px] sm:w-[230px] overflow-visible mt-0.5">
            {SUBTITLES.map((text, idx) => {
              const isActive = idx === subtitleIndex;
              return (
                <span
                  key={text}
                  style={{
                    fontSize: size === 'sm' ? '6.8px' : '7.6px',
                    fontWeight: 700,
                    lineHeight: '13px',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.025em',
                  }}
                  className={`absolute left-0 top-0 whitespace-nowrap uppercase pr-2 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  } ${
                    light
                      ? idx === 0
                        ? 'text-[#A7F3D0]'
                        : 'text-[#93C5FD]'
                      : idx === 0
                      ? 'text-[#0B6B45]'
                      : 'text-[#2563EB]'
                  }`}
                >
                  {text}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

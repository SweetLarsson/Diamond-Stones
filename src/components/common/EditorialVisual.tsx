import React, { useState } from 'react';
import {
  HeartHandshake,
  Utensils,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Users,
  Stethoscope,
  Activity,
} from 'lucide-react';
import { DIAMOND_STONES_PHOTOS } from '../../data/images';

interface EditorialVisualProps {
  type: 'medical' | 'feeding' | 'dstep' | 'orphanage' | 'women' | 'community';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  title?: string;
  imageUrl?: string;
  caption?: string;
  className?: string;
}

export const EditorialVisual: React.FC<EditorialVisualProps> = ({
  type,
  aspectRatio = '4:3',
  title,
  imageUrl,
  caption,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  const configs = {
    medical: {
      gradient: 'from-[#0B6B45] via-[#10A66A] to-[#102C57]',
      photo: DIAMOND_STONES_PHOTOS.medicalSupport.url,
      icon: Stethoscope,
      secondaryIcon: Activity,
      label: 'Healthcare Relief & Hospital Support',
      tagline: 'Lifting medical burdens with care & dignity',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 150 H150 L170 110 L190 190 L210 130 L230 170 L250 150 H350"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="200" cy="80" r="30" stroke="white" strokeWidth="3" />
        </svg>
      ),
    },
    feeding: {
      gradient: 'from-[#102C57] via-[#0B6B45] to-[#2563EB]',
      photo: DIAMOND_STONES_PHOTOS.feedingTheStreet.url,
      icon: Utensils,
      secondaryIcon: HeartHandshake,
      label: 'Community Feeding & Flood Relief',
      tagline: 'Emergency nourishment for vulnerable families',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 180 C120 220 280 220 320 180"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="180" r="8" fill="white" />
        </svg>
      ),
    },
    dstep: {
      gradient: 'from-[#0B6B45] via-[#2563EB] to-[#102C57]',
      photo: DIAMOND_STONES_PHOTOS.dstepVocational.url,
      icon: Sparkles,
      secondaryIcon: Users,
      label: 'D-STEP Skills & Livelihood Program',
      tagline: 'Hands-on trade skills for economic independence',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="200,60 230,120 295,130 248,175 259,240 200,210 141,240 152,175 105,130 170,120"
            stroke="white"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      ),
    },
    orphanage: {
      gradient: 'from-[#102C57] via-[#2563EB] to-[#0B6B45]',
      photo: DIAMOND_STONES_PHOTOS.orphanageVisit.url,
      icon: BookOpen,
      secondaryIcon: HeartHandshake,
      label: 'Orphanage Visits & Child Welfare',
      tagline: 'Education, care, and joyful community support',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M140 210 V130 L200 80 L260 130 V210 H140 Z"
            stroke="white"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    women: {
      gradient: 'from-[#0B6B45] via-[#10A66A] to-[#2563EB]',
      photo: DIAMOND_STONES_PHOTOS.womenEmpowerment.url,
      icon: ShieldCheck,
      secondaryIcon: Sparkles,
      label: 'Women in Distress Initiative (DS-WIDI)',
      tagline: 'Restoring dignity, safety, and hope for women',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="130" r="25" stroke="white" strokeWidth="2.5" />
        </svg>
      ),
    },
    community: {
      gradient: 'from-[#102C57] via-[#0B6B45] to-[#10A66A]',
      photo: DIAMOND_STONES_PHOTOS.humanitarianDistribution.url,
      icon: Users,
      secondaryIcon: ShieldCheck,
      label: 'Humanitarian Foundation (DISH-SF)',
      tagline: 'Practical community action and disaster recovery',
      svgElements: (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="100" r="28" stroke="white" strokeWidth="3" />
        </svg>
      ),
    },
  }[type];

  const sourceImage = imageUrl || configs.photo;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl bg-gradient-to-br ${configs.gradient} p-6 flex flex-col justify-between text-white shadow-md group ${className}`}
      role="img"
      aria-label={title || configs.label}
    >
      {/* Real Humanitarian Photographic Layer */}
      {sourceImage && !imageError && (
        <img
          src={sourceImage}
          alt={title || configs.label}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Gradient Atmospheric Overlays to gradiently tell visual stories */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/95 via-[#102C57]/45 to-[#0B6B45]/30 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B6B45]/30 via-transparent to-[#2563EB]/40 mix-blend-overlay pointer-events-none" />

      {/* Decorative SVG Geometric Underlay (visible as texture or fallback) */}
      {configs.svgElements}

      {/* Center Narrative Headline & Caption */}
      <div className="relative z-10 my-auto text-center px-4 py-2">
        <h4 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-lg leading-snug">
          {title || configs.tagline}
        </h4>
        {caption && (
          <p className="text-[11px] sm:text-xs text-white/90 mt-1 max-w-sm mx-auto font-medium drop-shadow line-clamp-2">
            {caption}
          </p>
        )}
      </div>

      {/* Bottom Trust Seal */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/20 text-[10px] sm:text-[11px] text-white/90 font-medium">
        <span className="tracking-wide drop-shadow-sm">Rivers State, Nigeria · Est. 2013</span>
      </div>
    </div>
  );
};

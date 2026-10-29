import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BrandLogo } from '../common/BrandLogo';
import { PageType } from '../../types';
import { X, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom SVG Menu icon with unequal dashes, where the center dash is the longest
const UnequalMenuIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Top dash - shorter */}
    <line x1="5.5" y1="6" x2="18.5" y2="6" />
    {/* Center dash - the longest */}
    <line x1="2" y1="12" x2="22" y2="12" />
    {/* Bottom dash - shorter */}
    <line x1="5.5" y1="18" x2="18.5" y2="18" />
  </svg>
);

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
}

interface NavItem {
  label: string;
  page: PageType;
  children?: {
    label: string;
    description: string;
    page: PageType;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSupportModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Accordion state: null initially (all collapsed); opening one forces all others shut
  const [expandedMobileTab, setExpandedMobileTab] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure tabs stay initially collapsed when the menu drawer opens/closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setExpandedMobileTab(null);
    }
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // Exactly 5 Top Navigation Tabs
  const navTabs: NavItem[] = [
    {
      label: 'Home',
      page: 'home',
    },
    {
      label: 'About Us',
      page: 'about',
      children: [
        {
          label: 'About Us',
          description: 'Our origin, foundation & CARES values',
          page: 'about',
        },
        {
          label: 'Facilitators',
          description: 'Meet our state, zonal & international coordinators',
          page: 'facilitators',
        },
      ],
    },
    {
      label: 'Our Impact',
      page: 'impact',
      children: [
        {
          label: 'Our Impact',
          description: 'Audited figures, metrics & evidence',
          page: 'impact',
        },
        {
          label: 'Programmes',
          description: '6 core humanitarian relief initiatives',
          page: 'programmes',
        },
        {
          label: 'Stories',
          description: 'Verified field narratives & impact cases',
          page: 'stories',
        },
      ],
    },
    {
      label: 'Chapters',
      page: 'chapters',
    },
    {
      label: 'Contact',
      page: 'contact',
      children: [
        {
          label: 'Contact',
          description: 'Direct inquiries & administrative hotline',
          page: 'contact',
        },
        {
          label: 'Get Involved',
          description: '8 participation pathways & volunteering',
          page: 'get-involved',
        },
      ],
    },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mutually-exclusive accordion toggle for expandable tabs (About Us, Our Impact, Contact)
  const handleMobileTabToggle = (item: NavItem) => {
    const hasChildren = !!item.children && item.children.length > 0;
    if (hasChildren) {
      // If currently open, collapse it; otherwise open it and force all other tabs shut!
      setExpandedMobileTab((prev) => (prev === item.label ? null : item.label));
    } else {
      handleNavClick(item.page);
    }
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isTabActive = (item: NavItem): boolean => {
    if (currentPage === item.page) return true;
    if (item.children) {
      return item.children.some((child) => child.page === currentPage);
    }
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left focus:outline-none group shrink-0"
          aria-label="Diamond Stones Home"
        >
          <BrandLogo size="md" showSubtitle={true} />
        </button>

        {/* Zone 2: Navigation Links (Desktop) - 5 Primary Tabs with Animated Hover & Selection */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-[#243247]">
          {navTabs.map((item) => {
            const isActive = isTabActive(item);
            const hasChildren = !!item.children && item.children.length > 0;
            const isOpen = activeDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    if (!hasChildren) {
                      handleNavClick(item.page);
                    } else {
                      handleNavClick(item.page);
                    }
                  }}
                  className={`relative px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 inline-flex items-center gap-1.5 focus:outline-none ${
                    isActive
                      ? 'text-[#0B6B45] font-bold'
                      : 'text-[#243247]/80 hover:text-[#0B6B45]'
                  }`}
                  aria-expanded={hasChildren ? isOpen : undefined}
                >
                  {/* Sliding Animated Active Background Pill with Fade Effect */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#E7F7EF] rounded-full -z-10 border border-[#10A66A]/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0B6B45]' : 'text-slate-400'
                      }`}
                    />
                  )}
                </button>

                {/* Submenu Dropdown with Smooth Fade and Slide Transitions */}
                {hasChildren && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-0 top-full pt-2 w-64 z-50"
                      >
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100/90 p-2.5 space-y-1 overflow-hidden">
                          {item.children!.map((child) => {
                            const isChildActive = currentPage === child.page;
                            return (
                              <button
                                key={child.page}
                                onClick={() => handleNavClick(child.page)}
                                className={`w-full text-left p-3 rounded-2xl transition-all duration-150 flex flex-col ${
                                  isChildActive
                                    ? 'bg-[#E7F7EF] text-[#0B6B45]'
                                    : 'text-[#243247] hover:bg-slate-50'
                                }`}
                              >
                                <span className="text-xs font-bold flex items-center justify-between">
                                  <span>{child.label}</span>
                                  {isChildActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B45]" />
                                  )}
                                </span>
                                <span className="text-[11px] text-[#66758A] mt-0.5 leading-snug">
                                  {child.description}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop Only: Support Our Work button (hidden on smaller screens < lg) */}
          <button
            onClick={onOpenSupportModal}
            className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] focus:ring-offset-2"
            style={{
              width: '200px',
              height: '40px',
              background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
            }}
          >
            <Heart className="w-4 h-4 fill-white/20 [&_path]:[width:auto]" />
            <span className="whitespace-nowrap">Support Our Work</span>
          </button>

          {/* Mobile Only: Menu Drawer Trigger Button with unequal dashes, center dash longest */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-700 hover:text-[#0B6B45] hover:bg-slate-100/90 active:bg-[#E7F7EF] rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] focus:ring-offset-1 border border-slate-200/80 shadow-xs"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700 transition-transform duration-200" />
            ) : (
              <UnequalMenuIcon className="w-6 h-6 text-slate-800 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Drawer Navigation Portaled to document.body (Ensures complete visibility above all page elements) */}
    {typeof document !== 'undefined' &&
      createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-[999] lg:hidden flex justify-end"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-[#102C57]/65 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 27, stiffness: 290 }}
                className="relative w-full sm:w-[390px] max-w-[88vw] h-full bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#F7FAFC]/80 shrink-0">
                  <BrandLogo size="sm" showSubtitle={true} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-800 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-colors shadow-xs"
                    aria-label="Close menu drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Visible menu items list */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 overscroll-contain">
                  <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Menu Navigation
                  </div>

                  {navTabs.map((item) => {
                    const isActive = isTabActive(item);
                    const hasChildren = !!item.children && item.children.length > 0;
                    const isExpanded = expandedMobileTab === item.label;

                    return (
                      <div
                        key={item.label}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isExpanded
                            ? 'bg-white border-[#0B6B45]/30 shadow-md ring-1 ring-[#0B6B45]/15'
                            : 'bg-white border-slate-100 shadow-xs hover:border-slate-200'
                        }`}
                      >
                        {/* Parent Tab Button: toggles expansion if has children; navigates if no children */}
                        <button
                          type="button"
                          onClick={() => handleMobileTabToggle(item)}
                          className={`w-full text-left px-4 py-3.5 text-sm font-bold transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-[#E7F7EF] text-[#0B6B45]'
                              : 'text-[#102C57] hover:bg-slate-50'
                          }`}
                          aria-expanded={hasChildren ? isExpanded : undefined}
                        >
                          <span className="flex items-center gap-2.5">
                            {isActive && (
                              <span className="w-2 h-2 rounded-full bg-[#0B6B45] ring-4 ring-[#0B6B45]/20 shrink-0" />
                            )}
                            <span>{item.label}</span>
                          </span>

                          {hasChildren ? (
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ease-out ${
                                isExpanded ? 'rotate-180 text-[#0B6B45]' : 'text-slate-400'
                              }`}
                            />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {/* Collapsible / Expandable Child Items: mutually exclusive, initially collapsed */}
                        {hasChildren && (
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                key={`accordion-${item.label}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                className="overflow-hidden bg-slate-50/70 border-t border-slate-100"
                              >
                                <div className="p-2 space-y-1.5">
                                  {item.children!.map((child) => {
                                    const isChildActive = currentPage === child.page;
                                    return (
                                      <button
                                        key={child.page}
                                        type="button"
                                        onClick={() => handleNavClick(child.page)}
                                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                                          isChildActive
                                            ? 'bg-white text-[#0B6B45] font-bold shadow-xs border border-[#0B6B45]/30'
                                            : 'text-[#475569] hover:bg-white hover:text-[#102C57] hover:shadow-2xs'
                                        }`}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1.5 font-semibold">
                                            {isChildActive && (
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B45] shrink-0" />
                                            )}
                                            <span>{child.label}</span>
                                          </div>
                                          <p className="text-[11px] text-[#66758A] mt-0.5 leading-snug line-clamp-1">
                                            {child.description}
                                          </p>
                                        </div>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer in Drawer */}
                <div className="p-4 border-t border-slate-100 bg-[#F7FAFC]/80 shrink-0">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSupportModal();
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
                    style={{
                      background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                    }}
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Support Our Work</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
  </>
);
};

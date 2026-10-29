import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { PageType } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  Shield,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenPrivacyModal: () => void;
  onOpenSupportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacyModal,
  onOpenSupportModal,
}) => {
  const currentYear = 2026;

  const handleLinkClick = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102C57] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pre-Footer Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-10 mb-16 relative overflow-hidden bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB] shadow-xl text-white">
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              Your Support Can Help Restore Dignity and Hope
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              Whether through funding, volunteering, professional expertise, medical assistance, training, equipment, or partnership, your contribution can help Diamond Stones extend meaningful support to individuals and communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => handleLinkClick('get-involved')}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#102C57] hover:bg-[#E7F7EF] shadow transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Partner With Us
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-all duration-200"
              >
                Contact Diamond Stones
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Background */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10A66A] rounded-2xl transition-all duration-200 hover:opacity-95 active:scale-[0.98] inline-block"
              aria-label="Diamond Stones - Return to Home"
            >
              <BrandLogo size="md" light={true} />
            </button>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              Diamond Stones is a Nigerian nonprofit organization founded by Irene James-Nnaji. Originating in Rivers State in 2013 as a charity group, it has evolved into a dedicated humanitarian platform restoring dignity, providing relief, and fostering sustainable community resilience.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">DS-WIDI:</strong> Diamond Stones Women in Distress Initiative (Est. 2018)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#69B9F5] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">DISH-SF:</strong> Diamond Stones Humanitarian Support Foundation (Est. 2025)
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('facilitators')}
                  className="hover:text-white transition-colors text-left"
                >
                  Facilitators
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('impact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('programmes')}
                  className="hover:text-white transition-colors text-left"
                >
                  Programmes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('stories')}
                  className="hover:text-white transition-colors text-left"
                >
                  Stories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contacts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('get-involved')}
                  className="hover:text-white transition-colors text-left"
                >
                  Get Involved
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Verified Contacts
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400">Telephone Line:</div>
                  <a
                    href="tel:+2348037727388"
                    className="font-bold text-white hover:text-[#69B9F5] transition-colors"
                  >
                    +234-803-772-7388
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#69B9F5] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400">Direct Email:</div>
                  <a
                    href="mailto:ireneneky21@gmail.com"
                    className="font-bold text-white hover:text-[#69B9F5] transition-colors break-all"
                  >
                    ireneneky21@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400">Headquarters / Origin:</div>
                  <p className="text-white font-bold text-[14px] font-['Montserrat',sans-serif]">Rivers State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Safeguarding Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2020 Diamond Stones. All rights reserved. Operating DS-WIDI & DISH-SF.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy & Beneficiary Safeguarding
            </button>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

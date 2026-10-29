import React from 'react';
import { Modal } from '../common/Modal';
import { Facilitator, PageType } from '../../types';
import {
  MapPin,
  Award,
  CheckCircle2,
  Share2,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface FacilitatorBioModalProps {
  facilitator: Facilitator | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: PageType) => void;
}

export const FacilitatorBioModal: React.FC<FacilitatorBioModalProps> = ({
  facilitator,
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!facilitator) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={facilitator.name}
      subtitle={facilitator.role}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-[#243247]">
        {/* Top Profile Summary Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#E6F5F5] via-[#DCF1FF]/60 to-white border border-[#469673]/30 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            <img
              src={facilitator.image}
              alt={facilitator.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover object-top shadow-md border-2 border-white ring-2 ring-[#0B6B45]/20"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#0B6B45] text-white p-1.5 rounded-full shadow-md" title="Verified Facilitator">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCF1FF] text-[#102C57] border border-[#102C57]/15">
              <MapPin className="w-3.5 h-3.5 text-[#0B6B45]" />
              <span>{facilitator.zoneOrChapter}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#102C57]">
              {facilitator.name}
            </h3>

            {facilitator.subtitle && (
              <p className="text-xs sm:text-sm text-[#0B6B45] font-semibold">
                {facilitator.subtitle}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
              {facilitator.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-slate-700 border border-slate-200/80 shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials / Key Highlights */}
        {facilitator.credentials && facilitator.credentials.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#102C57]">
              <Award className="w-4 h-4 text-[#0B6B45]" />
              <span>Credentials & Strategic Portfolios</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#243247]">
              {facilitator.credentials.map((cred, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Full Biography Paragraphs */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#102C57] border-b border-slate-200 pb-2">
            Detailed Biography & Leadership Profile
          </h4>
          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
            {facilitator.bioParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Contact Note / Regional Liaison */}
        {facilitator.contactNote && (
          <div className="p-4 rounded-2xl bg-[#DCF1FF]/50 border border-[#2563EB]/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <p className="text-xs text-[#102C57]">
              <strong>Regional Liaison Note:</strong> {facilitator.contactNote}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Diamond Stones Humanitarian Support Foundation Leadership
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0B6B45] text-white hover:bg-[#085335] shadow-sm transition-all duration-200"
              >
                <span>Connect With Chapter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

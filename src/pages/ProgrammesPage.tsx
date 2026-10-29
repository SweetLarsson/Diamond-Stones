import React, { useState, useMemo } from 'react';
import { PageType, Programme } from '../types';
import { storageService } from '../services/storageService';
import { EditorialVisual } from '../components/common/EditorialVisual';
import { Modal } from '../components/common/Modal';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  Search,
  Filter,
  CheckCircle2,
  Heart,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgrammesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: (category?: string) => void;
  selectedProgrammeInit?: Programme | null;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({
  onNavigate,
  onOpenSupportModal,
  selectedProgrammeInit = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProgramme, setActiveModalProgramme] = useState<Programme | null>(
    selectedProgrammeInit
  );

  const programmes = storageService.getProgrammes();

  const categories = [
    'All',
    'Women Empowerment',
    'Medical & Health Support',
    'Food & Humanitarian Assistance',
    'Skills Acquisition & Livelihood',
    'Orphanage Support',
    'Community Development',
  ];

  const filteredProgrammes = useMemo(() => {
    return programmes.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.beneficiaries.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [programmes, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* 1. HEADER (With Blurred Background Photo & High-Legibility Contrast) */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-[#EEF5FF] border-b border-slate-200">
        {/* Blurred Background Picture */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <motion.img
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.55 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={DIAMOND_STONES_PHOTOS.dstepVocational.url}
            alt=""
            className="w-full h-full object-cover object-center filter blur-[1px]"
            loading="eager"
          />
          {/* Layered translucent scrims ensuring writings are completely legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-white/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF5FF]/60 via-transparent to-[#F7FAFC]" />
          {/* Subtle ambient glow aura */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#10A66A]/15 to-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                },
              }}
              className="lg:col-span-7 space-y-4 text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102C57] tracking-tight leading-tight">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Targeted
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  Interventions
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Verified Outcomes
                </motion.span>
              </h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
                }}
                className="text-xs text-[#1E293B] italic leading-[24px] font-normal"
                style={{
                  fontStyle: 'italic',
                  fontSize: '12px',
                  lineHeight: '24px',
                  fontWeight: 'normal',
                }}
              >
                From hospital medical relief and emergency flood feeding to vocational transformation (D-STEP) and women’s distress care, explore how Diamond Stones serves communities across Nigeria and Ghana.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group">
                <img
                  src={DIAMOND_STONES_PHOTOS.dstepVocational.url}
                  alt={DIAMOND_STONES_PHOTOS.dstepVocational.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    D-STEP Skills Acquisition
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Hands-on trade instruction enabling economic self-reliance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS (Soft Green Background) with Animated Tabs */}
      <section className="bg-[#E7F7EF] py-10 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programmes or beneficiary groups..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Total Results Count */}
              <div className="text-xs text-[#66758A] font-semibold self-start md:self-auto">
                Showing <span className="text-[#102C57] font-bold">{filteredProgrammes.length}</span> of{' '}
                {programmes.length} verified programmes
              </div>
            </div>

            {/* Category Filter Tabs with Smooth Spring Motion Animation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2.5 rounded-xl whitespace-nowrap font-bold transition-colors duration-200 ${
                      isSelected
                        ? 'text-white'
                        : 'text-[#243247] bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="programme-category-tab"
                        className="absolute inset-0 bg-[#0B6B45] rounded-xl -z-10 shadow-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAMMES DIRECTORY (Neutral Light Background) */}
      <section className="bg-[#F7FAFC] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProgrammes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102C57]">No programmes found</h3>
              <p className="text-xs text-[#66758A]">
                We could not find any programmes matching your search. Try resetting your search terms or selecting &quot;All&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#E7F7EF] text-[#0B6B45]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProgrammes.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <EditorialVisual
                      type={prog.visualType}
                      aspectRatio="16:9"
                      title={prog.title}
                    />

                    <div className="p-6 sm:p-7">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6B45]">
                        {prog.category}
                      </span>

                      <h3 className="text-lg font-bold text-[#102C57] mt-1 line-clamp-2">
                        {prog.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#66758A] mt-2 line-clamp-3 leading-relaxed">
                        {prog.shortDescription}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                        <div>
                          <span className="font-bold text-[#102C57]">Target Beneficiaries: </span>
                          <span className="text-[#66758A]">{prog.beneficiaries}</span>
                        </div>

                        {prog.verifiedOutcome && (
                          <div className="p-2.5 rounded-xl bg-[#E7F7EF] border border-[#10A66A]/20 text-[#0B6B45] font-medium text-[11px]">
                            <strong>Verified Outcome: </strong>
                            {prog.verifiedOutcome}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 flex gap-2">
                    <button
                      onClick={() => setActiveModalProgramme(prog)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#102C57] bg-slate-100 hover:bg-[#E7F7EF] hover:text-[#0B6B45] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenSupportModal(prog.title)}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B6B45] hover:bg-[#10A66A] transition-all flex items-center justify-center gap-1 shadow-xs"
                      title="Support this specific programme"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white/20" />
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. HOSPITAL & EMERGENCY RELIEF SPOTLIGHT (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Support Our Indigent Patient & Nutrition Drives
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  38 hospital interventions and 200 humanitarian missions have already cleared debts for indigent mothers, supplied crucial pharmaceuticals, and nourished families in distress.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenSupportModal('Hospital Patient Bill Relief Fund')}
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#0B6B45] hover:bg-[#10A66A] text-white transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Sponsor Patient Clearances</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <img
                    src={DIAMOND_STONES_PHOTOS.medicalSupport.url}
                    alt={DIAMOND_STONES_PHOTOS.medicalSupport.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Detail Modal */}
      {activeModalProgramme && (
        <Modal
          isOpen={!!activeModalProgramme}
          onClose={() => setActiveModalProgramme(null)}
          title={activeModalProgramme.title}
          subtitle={activeModalProgramme.category}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <EditorialVisual
              type={activeModalProgramme.visualType}
              aspectRatio="16:9"
              title={activeModalProgramme.title}
            />

            <div>
              <h4 className="text-sm font-bold text-[#102C57] uppercase tracking-wider mb-2">
                Programme Overview
              </h4>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                {activeModalProgramme.fullDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200">
              <h4 className="text-xs font-bold text-[#102C57] uppercase tracking-wider mb-1">
                Target Beneficiaries
              </h4>
              <p className="text-xs sm:text-sm text-[#243247]">
                {activeModalProgramme.beneficiaries}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#102C57] uppercase tracking-wider mb-3">
                Key Interventions & Activities
              </h4>
              <ul className="space-y-2">
                {activeModalProgramme.keyInterventions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243247]">
                    <CheckCircle2 className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeModalProgramme.verifiedOutcome && (
              <div className="p-4 rounded-2xl bg-[#E7F7EF] border border-[#10A66A]/30 text-xs sm:text-sm text-[#0B6B45]">
                <strong className="block font-bold mb-0.5">Verified Organizational Outcome:</strong>
                <span>{activeModalProgramme.verifiedOutcome}</span>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-[#102C57] uppercase tracking-wider mb-3">
                Ways You Can Support This Programme
              </h4>
              <ul className="space-y-2">
                {activeModalProgramme.waysToSupport.map((way, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#66758A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                    <span>{way}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const title = activeModalProgramme.title;
                  setActiveModalProgramme(null);
                  onOpenSupportModal(title);
                }}
                className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                }}
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support This Programme</span>
              </button>

              <button
                onClick={() => {
                  setActiveModalProgramme(null);
                  onNavigate('contact');
                }}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#102C57] bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Inquire Directly
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

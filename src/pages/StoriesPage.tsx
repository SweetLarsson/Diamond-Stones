import React, { useState } from 'react';
import { PageType, Story } from '../types';
import { storageService } from '../services/storageService';
import { EditorialVisual } from '../components/common/EditorialVisual';
import { Modal } from '../components/common/Modal';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  Search,
  Filter,
  CheckCircle2,
  Share2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface StoriesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
  selectedStoryInit?: Story | null;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  onNavigate,
  onOpenSupportModal,
  selectedStoryInit = null,
}) => {
  const stories = storageService.getStories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStoryModal, setActiveStoryModal] = useState<Story | null>(selectedStoryInit);
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);

  const categories = [
    'All',
    'Humanitarian & Flood Relief',
    'Medical & Healthcare Support',
    'Skills & Livelihoods',
  ];

  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.supportProvided.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === 'All' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCat;
  });

  const handleShare = (story: Story) => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.reportedOutcome,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${story.title} - Diamond Stones Humanitarian Story: ${window.location.href}`);
      setCopiedStoryId(story.id);
      setTimeout(() => setCopiedStoryId(null), 2500);
    }
  };

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
            src={DIAMOND_STONES_PHOTOS.orphanageVisit.url}
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
                  Stories of
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  Resilience
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  And Hope
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
                Respectful documentation of crisis relief, hospital interventions, and transformative vocational journeys achieved through community compassion.
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
                  src={DIAMOND_STONES_PHOTOS.orphanageVisit.url}
                  alt={DIAMOND_STONES_PHOTOS.orphanageVisit.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    Child Care Outreach
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Delivering learning supplies, care, and joyful community support.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SAFEGUARDING ETHICAL NOTICE (Soft Green Background) */}
      <section className="bg-[#E7F7EF] py-8 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 rounded-2xl bg-white border border-[#10A66A]/30 text-xs text-[#0B6B45] flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#0B6B45] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">Beneficiary Safeguarding & Dignity Standard</span>
              <p className="mt-0.5 text-[#243247]/90 text-xs leading-relaxed">
                To safeguard the dignity and privacy of survivors and vulnerable individuals, personal identifiers are kept confidential. All published field outcomes reflect verified organizational interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEARCH & CATEGORY FILTER BAR (Pure White Background) with Animated Tabs */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories by keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
              />
            </div>

            {/* Animated Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs w-full md:w-auto">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2.5 rounded-xl whitespace-nowrap font-bold transition-colors duration-200 ${
                      isSelected ? 'text-white' : 'text-[#243247] bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="stories-category-tab"
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

      {/* 4. FEATURED STORY SHOWCASE (Deep Navy Blue Background) with Real Photo & Gradient Story */}
      {filteredStories.length > 0 && (
        <section className="bg-[#102C57] text-white py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
                  <img
                    src={DIAMOND_STONES_PHOTOS.floodRelief.url}
                    alt={filteredStories[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-[#102C57]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2.5 py-1 rounded-full text-white">
                      Field Report · Riverine Relief
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-4 text-white">
                  <div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-tight">
                      {filteredStories[0].title}
                    </h2>

                    <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-200">
                      <p>
                        <strong className="text-white">Situation: </strong>
                        {filteredStories[0].situation}
                      </p>
                      <p>
                        <strong className="text-white">Intervention: </strong>
                        {filteredStories[0].supportProvided}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStoryModal(filteredStories[0])}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B6B45] hover:bg-[#10A66A] transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <span>Read Full Narrative</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleShare(filteredStories[0])}
                      className="p-2.5 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 transition-all text-xs flex items-center gap-1.5"
                      title="Share story link"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copiedStoryId === filteredStories[0].id ? 'Copied' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. STORIES DIRECTORY GRID (Neutral Light Gray Background) */}
      <section className="bg-[#F7FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <EditorialVisual
                    type={story.visualType}
                    aspectRatio="16:9"
                    title={story.title}
                  />

                  <div className="mt-5 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6B45]">
                      {story.category}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-[#102C57] leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-xs text-[#66758A] line-clamp-3 leading-relaxed">
                      {story.situation}
                    </p>

                    <div className="p-3 rounded-xl bg-[#F7FAFC] border border-slate-100 text-xs text-[#243247]">
                      <strong className="text-[#0B6B45] block text-[11px] font-bold mb-0.5">
                        Reported Outcome:
                      </strong>
                      <span className="text-xs text-[#66758A]">{story.reportedOutcome}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStoryModal(story)}
                    className="text-xs font-bold text-[#0B6B45] hover:text-[#10A66A] flex items-center gap-1"
                  >
                    <span>Read Story</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShare(story)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                    title="Share story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      {activeStoryModal && (
        <Modal
          isOpen={!!activeStoryModal}
          onClose={() => setActiveStoryModal(null)}
          title={activeStoryModal.title}
          subtitle={activeStoryModal.category}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <EditorialVisual
              type={activeStoryModal.visualType}
              aspectRatio="16:9"
              title={activeStoryModal.title}
            />

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B6B45] mb-1">
                  The Background & Context
                </h4>
                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                  {activeStoryModal.situation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C57] mb-1">
                  Diamond Stones Humanitarian Action
                </h4>
                <p className="text-xs sm:text-sm text-[#243247] leading-relaxed">
                  {activeStoryModal.supportProvided}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#E7F7EF] border border-[#10A66A]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B6B45] mb-1">
                  Documented Outcome
                </h4>
                <p className="text-xs sm:text-sm text-[#0B6B45] font-semibold leading-relaxed">
                  {activeStoryModal.reportedOutcome}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C57] mb-2">
                  Full Narrative Overview
                </h4>
                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                  {activeStoryModal.fullNarrative}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-[11px] text-[#66758A] italic">
                Reported by Diamond Stones Field Operations Directorate
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveStoryModal(null);
                    onOpenSupportModal();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B6B45] hover:bg-[#10A66A] transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/20" />
                  <span>Support Similar Relief</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { PageType, Facilitator } from '../types';
import { FACILITATORS_DATA } from '../data/facilitatorsData';
import { FacilitatorBioModal } from '../components/modals/FacilitatorBioModal';
import {
  Users,
  Search,
  Filter,
  MapPin,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'motion/react';

interface FacilitatorsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
}

export const FacilitatorsPage: React.FC<FacilitatorsPageProps> = ({
  onNavigate,
  onOpenSupportModal,
}) => {
  const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'state' | 'zonal' | 'national' | 'ghana'>('all');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Cycle through all facilitator images every 5 seconds with a 5% subtle blur
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % FACILITATORS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenBio = (facilitator: Facilitator) => {
    setSelectedFacilitator(facilitator);
    setIsBioModalOpen(true);
  };

  const filteredFacilitators = useMemo(() => {
    return FACILITATORS_DATA.filter((facilitator) => {
      // Filter by category
      if (activeFilter === 'state') {
        if (!facilitator.role.toLowerCase().includes('state coordinator')) return false;
      } else if (activeFilter === 'zonal') {
        if (!facilitator.role.toLowerCase().includes('zonal')) return false;
      } else if (activeFilter === 'national') {
        if (!facilitator.role.toLowerCase().includes('national') && !facilitator.role.toLowerCase().includes('secretary') && !facilitator.role.toLowerCase().includes('pro')) return false;
      } else if (activeFilter === 'ghana') {
        if (!facilitator.zoneOrChapter.toLowerCase().includes('ghana')) return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = facilitator.name.toLowerCase().includes(query);
        const matchesRole = facilitator.role.toLowerCase().includes(query);
        const matchesZone = facilitator.zoneOrChapter.toLowerCase().includes(query);
        const matchesTags = facilitator.tags.some((t) => t.toLowerCase().includes(query));
        const matchesBio = facilitator.bioParagraphs.some((p) => p.toLowerCase().includes(query));
        return matchesName || matchesRole || matchesZone || matchesTags || matchesBio;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="w-full">
      {/* 1. HERO / LANDING SECTION WITH CYCLING 5-SECOND BACKGROUND BLURRED BY 5% */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-[#DCF1FF] border-b border-[#2563EB]/15">
        {/* Background images cycling every 5 seconds, blurred by 5% */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {FACILITATORS_DATA.map((fac, idx) => (
            <div
              key={fac.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-full object-cover object-top sm:object-[center_25%] filter blur-[1.5px] scale-[1.02]"
                style={{ filter: 'blur(1.5px)' }}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Subtle gradient wash so headline/subtitle are readable on the left while photos are visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#DCF1FF]/95 via-[#DCF1FF]/70 to-[#DCF1FF]/25 sm:to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl bg-white/40 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-4 sm:p-0 rounded-3xl sm:rounded-none">
            {/* Header with Facilitators broken to the next line and highlighted with gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#102C57] tracking-tight leading-tight">
              Meet our
              <br />
              <span className="bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB] bg-clip-text text-transparent inline-block">
                Facilitators
              </span>
            </h1>

            {/* Subtitle with applied CSS: Montserrat, italic, 12px, 20px line-height */}
            <p
              className="mt-4 text-slate-800 font-medium max-w-xl"
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                lineHeight: '20px',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Dedicated coordinators, educators, and transformational advocates driving grassroots humanitarian relief, women’s empowerment, and community resilience across Nigeria and West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section className="py-8 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Facilitators' },
                { id: 'state', label: 'State Coordinators' },
                { id: 'zonal', label: 'Zonal Leadership' },
                { id: 'national', label: 'National Secretariat & PRO' },
                { id: 'ghana', label: 'Ghana International' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeFilter === btn.id
                      ? 'bg-[#102C57] text-white shadow-sm'
                      : 'bg-[#F7FAFC] text-slate-600 hover:bg-[#E0F1FF] hover:text-[#102C57] border border-slate-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search facilitators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] focus:border-transparent bg-[#F7FAFC] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FACILITATORS GRID */}
      <section className="py-14 sm:py-18 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFacilitators.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#102C57]">No facilitators found</h3>
              <p className="text-xs text-slate-500 mt-1">
                No matching profiles found for "{searchQuery}". Try clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-[#0B6B45] text-white hover:bg-[#085335] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredFacilitators.map((facilitator, idx) => (
                <motion.div
                  key={facilitator.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#469673]"
                >
                  {/* Photo Container - Clean portrait image without any overlay eyebrows */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                    <img
                      src={facilitator.image}
                      alt={facilitator.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#102C57] leading-tight group-hover:text-[#0B6B45] transition-colors">
                            {facilitator.name}
                          </h3>
                          <span className="shrink-0 p-1 rounded-full bg-[#0B6B45]/10 text-[#0B6B45]" title="Verified Coordinator">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#0B6B45] mt-1">
                          {facilitator.role}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-slate-500">
                          <MapPin className="w-3 h-3 text-[#0B6B45]" />
                          <span>{facilitator.zoneOrChapter}</span>
                        </div>
                      </div>

                      {facilitator.subtitle && (
                        <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                          {facilitator.subtitle}
                        </p>
                      )}

                      {/* Bio snippet */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {facilitator.bioParagraphs[0]}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {facilitator.tags.slice(0, 3).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#DCF1FF]/60 text-[#102C57] border border-[#102C57]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenBio(facilitator)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6B45] hover:text-[#085335] group/btn transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Full Bio</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate('contact')}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-[#DCF1FF] text-[#102C57] transition-colors"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. FACILITATOR CULTURE & GRASSROOTS LEADERSHIP */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57]">
              How Our Facilitators Work
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              Every chapter and zonal coordinator serves with deep accountability, ethical stewardship, and genuine compassion for the communities we empower.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#E6F5F5] border border-[#469673]/30">
              <div className="w-10 h-10 rounded-2xl bg-[#0B6B45] text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#102C57]">Grassroots Presence</h3>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                Facilitators live and work within the communities they coordinate, ensuring relief actions address genuine local realities and respect community culture.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#E0F1FF] border border-[#2563EB]/20">
              <div className="w-10 h-10 rounded-2xl bg-[#102C57] text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#102C57]">Transparent Stewardship</h3>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                Every outreach, medical intervention, and vocational cohort is documented with audited participant registries, verifiable receipts, and field reports.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#DCF1FF] border border-[#102C57]/20">
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#102C57]">Capacity & Mentorship</h3>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                Beyond relief supplies, our facilitators provide structured D-STEP training, marriage guidance, prayer altars, and small business mentoring for enduring resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION: JOIN AS A VOLUNTEER FACILITATOR */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#102C57] via-[#0B6B45] to-[#10A66A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Interested in Leading or Facilitating a Chapter?
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            We are continuously expanding our humanitarian chapters across Nigerian states and West Africa. If you share our dedication to restoring dignity and providing compassionate relief, we welcome your partnership.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('get-involved')}
              className="px-7 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#102C57] hover:bg-[#E7F7EF] shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Apply as a Volunteer Leader</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3 rounded-full text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-all duration-200"
            >
              Contact Secretariat
            </button>
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      <FacilitatorBioModal
        facilitator={selectedFacilitator}
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};

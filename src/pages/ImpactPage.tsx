import React, { useState } from 'react';
import { PageType, ImpactMetric } from '../types';
import { storageService } from '../services/storageService';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  FileText,
  AlertCircle,
  HelpCircle,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ImpactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  onNavigate,
  onOpenSupportModal,
}) => {
  const metrics = storageService.getMetrics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMetrics = selectedCategory === 'all'
    ? metrics
    : metrics.filter((m) => m.category === selectedCategory);

  const filterTabs = [
    { id: 'all', label: 'All Indicators (11)' },
    { id: 'overview', label: 'Reach & Chapters' },
    { id: 'humanitarian', label: 'Humanitarian & Outreach' },
    { id: 'medical', label: 'Healthcare & Medical' },
    { id: 'empowerment', label: 'Women & Livelihood' },
    { id: 'education', label: 'Educational Support' },
    { id: 'welfare', label: 'Member Welfare' },
  ];

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
            src={DIAMOND_STONES_PHOTOS.feedingTheStreet.url}
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
                  Our
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  Documented
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Impact
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
                Transparently presenting our organizational achievements, verifiable interventions, and documented beneficiaries across Nigeria and Ghana.
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
                  src={DIAMOND_STONES_PHOTOS.feedingTheStreet.url}
                  alt={DIAMOND_STONES_PHOTOS.feedingTheStreet.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    Field Relief Census
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    ~2,000 individuals & ~700 families verified across active operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. METHODOLOGY STANDARD (Soft Green Background) */}
      <section className="bg-[#E7F7EF] py-10 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white border border-[#10A66A]/30 text-xs sm:text-sm text-[#0B6B45] space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0B6B45]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Reporting Methodology & Non-Aggregation Policy</span>
            </div>
            <p className="text-[#243247]/90 leading-relaxed text-xs">
              Figures presented reflect official organizational records provided by field directors and coordinators across our 6 chapters. Each metric represents a distinct, monitored indicator. In accordance with honest nonprofit accounting, Diamond Stones does not sum separate indicators into an arbitrary single total.
            </p>
            <p className="text-[#66758A] text-[11px] italic pt-1">
              Note: Figures reflect organizational records provided and may cover different reporting periods. Cumulative primary individuals supported since inception stands at approximately 2,000.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS (Pure White Background) with Animated Tabs */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {filterTabs.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-xl whitespace-nowrap font-bold transition-colors duration-200 ${
                    isSelected
                      ? 'text-white'
                      : 'text-[#243247] bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="impact-filter-tab"
                      className="absolute inset-0 bg-[#0B6B45] rounded-xl -z-10 shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN IMPACT METRICS (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Discrete Impact Indicators
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMetrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/15 hover:bg-white/15 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#10A66A]">
                      {metric.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                      {metric.reportingPeriod}
                    </span>
                  </div>

                  <div
                    className="text-3xl sm:text-4xl font-extrabold text-white font-['Montserrat',sans-serif] tabular-nums tracking-tight my-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {metric.isApproximate && (
                      <span className="text-xl mr-1 text-[#69B9F5]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        ~
                      </span>
                    )}
                    {metric.value.toLocaleString()}
                    {metric.suffix && (
                      <span className="text-xl ml-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {metric.suffix}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                    {metric.label}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {metric.sourceNote}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-[#10A66A] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Field Record</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARATIVE MASTER TABLE (Neutral Gray Background) */}
      <section className="bg-[#F7FAFC] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 bg-[#F7FAFC] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#102C57]">
                  Master Indicator Reference Table
                </h3>
                <p className="text-xs text-[#66758A]">
                  Comprehensive verification registry supplied by organizational leadership.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F7FAFC] text-[#243247] uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6">Impact Area</th>
                    <th className="py-3.5 px-6 text-right">Reported Figure</th>
                    <th className="py-3.5 px-6">Measurement Mode</th>
                    <th className="py-3.5 px-6">Reporting Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-[#243247]">
                  {metrics.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#102C57]">
                        {row.label}
                      </td>
                      <td
                        className="py-3.5 px-6 text-right font-bold tabular-nums text-[#0B6B45] font-['Montserrat',sans-serif]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {row.isApproximate ? `~${row.value.toLocaleString()}` : row.value.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-6 text-xs text-[#66758A]">
                        {row.isApproximate ? 'Estimated Field Census' : 'Discrete Intervention Count'}
                      </td>
                      <td className="py-3.5 px-6 text-xs text-[#66758A]">
                        {row.reportingPeriod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDIES DEEP DIVE (Soft Green Background) with Real Photos */}
      <section className="bg-[#E7F7EF] py-20 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] tracking-tight mt-1">
              Examining Real Interventions
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-2">
              These verified case reports illustrate how Diamond Stones deploys resources directly to points of urgent crisis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study A */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
              <div className="rounded-2xl overflow-hidden h-48 relative">
                <img
                  src={DIAMOND_STONES_PHOTOS.medicalSupport.url}
                  alt="Hospital Support Outreach"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow">
                  Hospital Bill Clearance & Essential Medications
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B45]">
                  Case Study A · Healthcare Relief
                </span>
                <span className="text-[10px] bg-[#E7F7EF] text-[#0B6B45] font-bold px-2.5 py-0.5 rounded-full">
                  38 Recorded Interventions
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C57]">
                Emergency Hospital Debt Relief & Prescription Support
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-slate-100">
                  <strong className="block text-[#102C57] mb-1 font-bold">Situation:</strong>
                  <p className="text-[#66758A]">
                    Patients in public healthcare facilities were unable to pay their outstanding medical bills or afford essential prescribed drugs. In multiple instances, mothers and vulnerable individuals were unable to obtain discharge.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-slate-100">
                  <strong className="block text-[#102C57] mb-1 font-bold">Support Provided:</strong>
                  <p className="text-[#66758A]">
                    Diamond Stones teams settled outstanding hospital bills directly with hospital administration, provided life-saving pharmaceutical supplies, and distributed basic toiletries for hygiene.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#E7F7EF] border border-[#10A66A]/30 text-[#0B6B45]">
                  <strong className="block font-bold mb-1">Outcome:</strong>
                  <p className="font-medium">
                    The intervention directly lifted the financial distress of recovering patients, enabling them to complete their medical treatment and reunite with their families.
                  </p>
                </div>
              </div>
            </div>

            {/* Case Study B */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
              <div className="rounded-2xl overflow-hidden h-48 relative">
                <img
                  src={DIAMOND_STONES_PHOTOS.floodRelief.url}
                  alt="Flood Nutrition Relief"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow">
                  Over 2,000 Fed in Riverine Flood Emergency
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Case Study B · Disaster Nutrition Relief
                </span>
                <span className="text-[10px] bg-[#EEF5FF] text-[#2563EB] font-bold px-2.5 py-0.5 rounded-full">
                  Emergency Response
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C57]">
                Flood-Affected Riverine Community Emergency Food Relief
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-slate-100">
                  <strong className="block text-[#102C57] mb-1 font-bold">Situation:</strong>
                  <p className="text-[#66758A]">
                    Severe seasonal flooding submerged agricultural land and riverine settlements, cutting off access to food supplies. Residents struggled to survive, with some forced to beg along roadways to meet basic nutritional needs.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-slate-100">
                  <strong className="block text-[#102C57] mb-1 font-bold">Support Provided:</strong>
                  <p className="text-[#66758A]">
                    Diamond Stones mobilized volunteer relief contingents to coordinate on-the-ground food assistance, distributing bulk grain parcels, clean drinking water packs, and hot meals directly to displaced families.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EEF5FF] border border-[#2563EB]/30 text-[#2563EB]">
                  <strong className="block font-bold mb-1">Reported Outcome:</strong>
                  <p className="font-medium">
                    The organization reports that over 2,000 vulnerable individuals were fed and supported, restoring dignity and relieving acute hunger during the crisis peak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ACTION CALL STRIP (Forest Emerald Gradient Background) */}
      <section className="bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#102C57] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white">Help Expand Our Verified Impact</h3>
            <p className="text-xs sm:text-sm text-slate-100 mt-1">
              Your contribution goes directly into tracked, verifiable community interventions.
            </p>
          </div>
          <button
            onClick={onOpenSupportModal}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#102C57] hover:bg-[#E7F7EF] transition-all shrink-0 shadow-lg"
          >
            Support Our Work
          </button>
        </div>
      </section>
    </div>
  );
};

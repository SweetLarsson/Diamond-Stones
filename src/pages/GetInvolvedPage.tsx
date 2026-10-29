import React, { useState, useRef, useCallback } from 'react';
import { PageType } from '../types';
import { storageService } from '../services/storageService';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  Heart,
  Users,
  Building,
  Stethoscope,
  GraduationCap,
  Package,
  MapPin,
  Briefcase,
  CheckCircle2,
  Send,
  ShieldCheck,
  Phone,
  ChevronUp,
  ChevronDown,
  Check,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CustomSelect } from '../components/common/CustomSelect';

interface GetInvolvedPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  onOpenSupportModal,
}) => {
  const [selectedPathway, setSelectedPathway] = useState<string>(
    'Volunteer Your Time & Skills'
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    chapter: 'Rivers Chapter (Port Harcourt)',
    skillsAndExpertise: '',
    availability: 'Flexible / Weekends',
    notes: '',
  });

  const chapterOptions = [
    'Rivers Chapter (Port Harcourt)',
    'Delta Chapter (Delta State)',
    'Edo Chapter (Benin)',
    'Osun Chapter (Osun State)',
    'Abuja Chapter (FCT)',
    'Ghana Chapter (Accra)',
    { label: 'National / Remote Outreach', value: 'National / Remote' },
  ];

  const availabilityOptions = [
    'Flexible / Weekends',
    'Monthly Outreaches Only',
    'Quarterly Assemblies',
    'On-Call Emergency Crisis Relief',
    'One-Time Sponsorship / In-Kind Grant',
  ];

  const pathways = [
    {
      id: 'volunteers',
      title: 'Volunteer Your Time & Skills',
      icon: Users,
      desc: 'Join on-the-ground outreach teams for hospital visitations, emergency food packing, and community mentorship.',
      color: 'from-[#0B6B45] to-[#10A66A]',
    },
    {
      id: 'donors',
      title: 'Donors & Financial Supporters',
      icon: Heart,
      desc: 'Provide verified financial backing for emergency medical clearance, flood nutrition packages, and skills kits.',
      color: 'from-[#10A66A] to-[#2563EB]',
    },
    {
      id: 'corporate',
      title: 'Corporate & Institutional Partners',
      icon: Building,
      desc: 'Collaborate through Corporate Social Responsibility (CSR), joint community programs, and institutional funding.',
      color: 'from-[#102C57] to-[#2563EB]',
    },
    {
      id: 'medical',
      title: 'Medical Support Providers',
      icon: Stethoscope,
      desc: 'Physicians, clinics, and pharmacies offering subsidized care, essential medicines, and clinical advice for patients.',
      color: 'from-[#0B6B45] to-[#102C57]',
    },
    {
      id: 'trainers',
      title: 'Trainers & Vocational Coaches',
      icon: GraduationCap,
      desc: 'Instructors in fashion, catering, crafts, and business basics to empower D-STEP cohort participants.',
      color: 'from-[#2563EB] to-[#10A66A]',
    },
    {
      id: 'equipment',
      title: 'Equipment & Material Contributors',
      icon: Package,
      desc: 'Donate trade starter kits, sewing machines, educational textbooks, non-perishable food, and hospital toiletries.',
      color: 'from-[#102C57] to-[#0B6B45]',
    },
    {
      id: 'venues',
      title: 'Venue & Logistics Supporters',
      icon: MapPin,
      desc: 'Offer training halls, community meeting spaces, warehousing, or vehicles for disaster relief distributions.',
      color: 'from-[#0B6B45] to-[#2563EB]',
    },
    {
      id: 'employment',
      title: 'Employment & Business Partners',
      icon: Briefcase,
      desc: 'Offer apprenticeships, jobs, or micro-retail contracts to D-STEP graduates and recovering mothers.',
      color: 'from-[#2563EB] to-[#102C57]',
    },
  ];

  const total = pathways.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIdx = (prev - 1 + total) % total;
      setSelectedPathway(pathways[nextIdx].title);
      setFormSubmitted(false);
      return nextIdx;
    });
  }, [total, pathways]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIdx = (prev + 1) % total;
      setSelectedPathway(pathways[nextIdx].title);
      setFormSubmitted(false);
      return nextIdx;
    });
  }, [total, pathways]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setSelectedPathway(pathways[index].title);
      setFormSubmitted(false);
    },
    [pathways]
  );

  const scrollToForm = () => {
    const el = document.getElementById('application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(activeIndex);
    }
  };

  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 280) return;
    if (Math.abs(e.deltaY) > 20) {
      lastWheelTime.current = now;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please complete all required fields (Name, Email, and Phone).');
      return;
    }
    setFormError('');

    storageService.addVolunteer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      supportType: selectedPathway,
      chapter: formData.chapter,
      skillsAndExpertise: formData.skillsAndExpertise || 'General support',
      availability: formData.availability,
      notes: formData.notes,
    });

    setFormSubmitted(true);
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
            src={DIAMOND_STONES_PHOTOS.humanitarianDistribution.url}
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
                  Together, We
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  Make a Greater
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Difference
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
                Every meaningful intervention begins with people who care. Explore 8 distinct ways to participate in Diamond Stones’ humanitarian mission.
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
                  src={DIAMOND_STONES_PHOTOS.humanitarianDistribution.url}
                  alt={DIAMOND_STONES_PHOTOS.humanitarianDistribution.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    Relief Mobilization
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Hands-on distribution of nutrition packs & welfare support.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. EIGHT PARTICIPATION PATHWAYS (Pure White Background) with 3D Vertical Carousel */}
      <section className="bg-white py-20 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B6B45]">
              Choose Your Support Channel
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] mt-1">
              8 Tailored Participation Pathways
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-1">
              Use the vertical 3D carousel to browse and select your pathway below.
            </p>
          </div>

          {/* Vertical 3D Carousel Stage */}
          <div
            className="relative w-full max-w-2xl mx-auto h-[480px] sm:h-[500px] flex items-center justify-center select-none"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Vertical 3D Carousel of 8 Participation Pathways"
          >
            {/* Exactly 8 div children: div:nth-of-type(1) through div:nth-of-type(8) */}
            {pathways.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedPathway === item.title;

              let diff = index - activeIndex;
              while (diff > total / 2) diff -= total;
              while (diff < -total / 2) diff += total;

              const isCurrent = diff === 0;
              const absDiff = Math.abs(diff);

              const translateY = diff * 88;
              const translateZ = -absDiff * 95;
              const rotateX = diff * -12;
              const scale = Math.max(0.72, 1 - absDiff * 0.11);
              const opacity = isCurrent ? 1 : absDiff === 1 ? 0.75 : absDiff === 2 ? 0.35 : 0;
              const zIndex = 40 - absDiff * 10;
              const isClickable = absDiff <= 2;

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    y: translateY,
                    z: translateZ,
                    rotateX: rotateX,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    mass: 0.8,
                  }}
                  style={{
                    zIndex,
                    transformStyle: 'preserve-3d',
                    pointerEvents: isClickable ? 'auto' : 'none',
                  }}
                  drag={isCurrent ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -40 || info.velocity.y < -300) {
                      handleNext();
                    } else if (info.offset.y > 40 || info.velocity.y > 300) {
                      handlePrev();
                    }
                  }}
                  onClick={() => {
                    if (!isCurrent) {
                      handleSelect(index);
                    } else {
                      setSelectedPathway(item.title);
                      setFormSubmitted(false);
                    }
                  }}
                  className={`absolute w-[92%] sm:w-[86%] md:w-[80%] max-w-[560px] cursor-pointer rounded-3xl p-6 sm:p-7 border transition-shadow duration-300 backdrop-blur-md ${
                    isCurrent
                      ? isSelected
                        ? 'bg-white border-[#0B6B45] ring-2 ring-[#0B6B45]/25 shadow-[0_20px_45px_-12px_rgba(11,107,69,0.28)]'
                        : 'bg-white border-slate-200/90 ring-1 ring-slate-900/5 shadow-[0_20px_45px_-12px_rgba(16,44,87,0.2)]'
                      : 'bg-white/90 border-slate-200/70 shadow-md hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Top Bar with Icon, Pathway Index, and Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-sm shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B6B45] bg-[#E7F7EF] px-2.5 py-0.5 rounded-full inline-block">
                          Pathway {String(index + 1).padStart(2, '0')} of 08
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#102C57] mt-0.5 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#0B6B45] text-white shadow-xs'
                          : 'border border-slate-300 text-transparent'
                      }`}
                      title={isSelected ? 'Selected pathway' : 'Click to select'}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-3.5">
                    {item.desc}
                  </p>

                  {/* Footer Actions */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#10A66A]' : 'bg-slate-300'
                        }`}
                      />
                      <span className={isSelected ? 'text-[#0B6B45]' : 'text-slate-500'}>
                        {isSelected ? 'Currently Selected for Registration' : 'Available Channel'}
                      </span>
                    </div>

                    {isCurrent ? (
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToForm();
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0B6B45] text-white hover:bg-[#085034] shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Continue to Form</span>
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(index);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#102C57] text-white hover:bg-[#0B6B45] shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Select Pathway</span>
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">
                        Click to Bring to Front
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Vertical Navigation Buttons - rendered as buttons inside the stage */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -right-2 sm:-right-6 top-1/3 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 shadow-lg hover:shadow-xl hover:bg-[#EEF5FF] text-[#102C57] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group z-50 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
              aria-label="Previous pathway"
              title="Previous pathway (Arrow Up)"
            >
              <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-2 sm:-right-6 bottom-1/3 translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 shadow-lg hover:shadow-xl hover:bg-[#EEF5FF] text-[#102C57] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group z-50 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
              aria-label="Next pathway"
              title="Next pathway (Arrow Down)"
            >
              <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>

          {/* Quick Selector Pills Below Carousel */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Pathway {String(activeIndex + 1).padStart(2, '0')} of 08</span>
              <span>·</span>
              <span>Click any tab to rotate the 3D stack:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {pathways.map((p, idx) => {
                const isActive = idx === activeIndex;
                const isSelected = p.title === selectedPathway;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#102C57] text-white shadow-sm scale-105'
                        : isSelected
                        ? 'bg-[#E7F7EF] text-[#0B6B45] border border-[#10A66A]/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    aria-label={`Go to pathway ${idx + 1}: ${p.title}`}
                  >
                    <span className="text-[10px] opacity-75">{idx + 1}.</span>
                    <span className="truncate max-w-[120px] sm:max-w-none">{p.title}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10A66A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE APPLICATION FORM (Soft Green Background) */}
      <section id="application-form" className="bg-[#E7F7EF] py-20 border-b border-[#10A66A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#102C57] mt-1">
                Participate as:{' '}
                <span className="text-[#0B6B45]">{selectedPathway}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#66758A] mt-1">
                Fill out your details below. Our national operations team and chapter leaders will review and respond promptly.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#102C57]">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-[#66758A] max-w-md mx-auto leading-relaxed">
                  Your application for <strong className="text-[#102C57]">{selectedPathway}</strong> has been logged in our coordinator registry. We will contact you at{' '}
                  <span className="font-semibold text-[#102C57]">{formData.email}</span> /{' '}
                  <span className="font-semibold text-[#102C57]">{formData.phone}</span>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      chapter: 'Rivers Chapter (Port Harcourt)',
                      skillsAndExpertise: '',
                      availability: 'Flexible / Weekends',
                      notes: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#E7F7EF] text-[#0B6B45] hover:bg-[#0B6B45] hover:text-white transition-all"
                >
                  Submit another pathway application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Adaeze Nwachukwu"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="adaeze@example.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1.5">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234-80X-XXX-XXXX"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1.5">
                      Preferred Chapter Affiliation
                    </label>
                    <CustomSelect
                      value={formData.chapter}
                      onChange={(val) => setFormData({ ...formData, chapter: val })}
                      options={chapterOptions}
                      ariaLabel="Preferred Chapter Affiliation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1.5">
                    Your Skills, Background, or Proposed Support Offering
                  </label>
                  <input
                    type="text"
                    value={formData.skillsAndExpertise}
                    onChange={(e) => setFormData({ ...formData, skillsAndExpertise: e.target.value })}
                    placeholder="e.g. Registered Nurse / Tailoring Trainer / Food Distribution Volunteer"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1.5">
                    Availability / Frequency
                  </label>
                  <CustomSelect
                    value={formData.availability}
                    onChange={(val) => setFormData({ ...formData, availability: val })}
                    options={availabilityOptions}
                    ariaLabel="Availability / Frequency"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1.5">
                    Additional Notes or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any extra details regarding items you wish to donate, specific hospital programs, or CSR objectives..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Participation Application</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#66758A] pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B6B45] shrink-0" />
                  <span>Your contact details are encrypted in our verified registry and treated with strict confidentiality.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. FINANCIAL CONTRIBUTIONS SPOTLIGHT (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="text-xl font-bold text-white">
                Prefer to Make a Direct Financial Contribution?
              </h4>
              <p className="text-xs sm:text-sm text-slate-200">
                Access verified institutional bank accounts for direct hospital bill clearance and food parcel sponsorships.
              </p>
            </div>
            <button
              onClick={onOpenSupportModal}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#0B6B45] hover:bg-[#10A66A] text-white transition-all shrink-0 shadow-md"
            >
              View Account Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { PageType, Programme, Story } from '../types';
import { storageService } from '../services/storageService';
import { EditorialVisual } from '../components/common/EditorialVisual';
import { DIAMOND_STONES_PHOTOS, ALL_PHOTOS_GALLERY, PhotoAsset } from '../data/images';
import {
  Heart,
  ArrowRight,
  Shield,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Mail,
  Send,
  AlertCircle,
  Building,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
  onSelectProgramme?: (programme: Programme) => void;
  onSelectStory?: (story: Story) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSupportModal,
  onSelectProgramme,
  onSelectStory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Gallery active tab state
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');

  // Cycle through all event photos every 5 seconds across the landing background, matching Facilitators page
  const [currentHeroBgIndex, setCurrentHeroBgIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBgIndex((prev) => (prev + 1) % ALL_PHOTOS_GALLERY.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const metrics = storageService.getMetrics();
  const programmes = storageService.getProgrammes();
  const chapters = storageService.getChapters();
  const stories = storageService.getStories();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please provide a valid email address to subscribe.',
      });
      return;
    }

    const res = storageService.addSubscriber(newsletterEmail, newsletterName);
    if (res.success) {
      setNewsletterStatus({ type: 'success', message: res.message });
      setNewsletterEmail('');
      setNewsletterName('');
    } else {
      setNewsletterStatus({ type: 'error', message: res.message });
    }
  };

  const createMissionCards = [
    {
      letter: 'C',
      word: 'Compassion',
      desc: 'Demonstrate genuine concern and empathy towards people experiencing vulnerability and difficult circumstances.',
    },
    {
      letter: 'R',
      word: 'Resilience',
      desc: 'Help individuals and communities develop the strength and capacity to recover, heal, and rebuild.',
    },
    {
      letter: 'E',
      word: 'Empower',
      desc: 'Provide support, resources, and opportunities that enable beneficiaries to improve their circumstances.',
    },
    {
      letter: 'A',
      word: 'Action',
      desc: 'Move beyond good intentions to practical intervention and meaningful community support.',
    },
    {
      letter: 'T',
      word: 'Transforming Lives',
      desc: 'Work towards sustainable, positive, and enduring changes in the lives of individuals and families.',
    },
    {
      letter: 'E',
      word: 'Elevate',
      desc: 'Promote dignity, hope, and an improved quality of life for every beneficiary we reach.',
    },
  ];

  const caresValues = [
    {
      letter: 'C',
      title: 'Collaboration',
      desc: 'Work with individuals, organizations, communities, and stakeholders to strengthen sustainable impact.',
    },
    {
      letter: 'A',
      title: 'Accountability',
      desc: 'Practise responsible stewardship of resources, commitments, and organizational responsibilities.',
    },
    {
      letter: 'R',
      title: 'Respect',
      desc: 'Treat every person with dignity regardless of their circumstances, background, or social standing.',
    },
    {
      letter: 'E',
      title: 'Excellence',
      desc: 'Approach programmes, interventions, and duties with professionalism and high standards of quality.',
    },
    {
      letter: 'S',
      title: 'Service',
      desc: 'Serve people and communities with humbleness, prioritizing those experiencing acute vulnerability.',
    },
  ];

  const galleryCategories = [
    'All',
    'Humanitarian Outreach',
    'Food Relief',
    'Women in Distress',
    'Medical Relief',
    'Child Welfare',
    'D-STEP Program',
    'Disaster Relief',
  ];

  const filteredPhotos = ALL_PHOTOS_GALLERY.filter((photo) =>
    selectedGalleryCategory === 'All' ? true : photo.category === selectedGalleryCategory
  );

  return (
    <div className="w-full">
      {/* SECTION 1: HERO (With Cycling Event Photos Background & High-Legibility Contrast) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[#EEF5FF] border-b border-slate-200/60">
        {/* Background event images cycling every 5 seconds, blurred by 5% just as on Facilitators page */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {ALL_PHOTOS_GALLERY.map((photo, idx) => (
            <div
              key={photo.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentHeroBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover object-center filter blur-[1.5px] scale-[1.02]"
                style={{ filter: 'blur(1.5px)' }}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Layered translucent white & pale-blue scrims ensuring writings are completely legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/40 sm:to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF5FF]/60 via-transparent to-[#F7FAFC]" />
          {/* Subtle ambient glow aura */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#10A66A]/15 to-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Content */}
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
              className="lg:col-span-7 space-y-6 text-left"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#102C57] tracking-tight leading-[1.14]">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Building Stronger
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Lives through
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  Compassion
                </motion.span>
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
                }}
                className="text-xs text-[#1E293B] font-normal italic text-left leading-[24px] mb-[20px] max-w-2xl"
                style={{
                  fontSize: '12px',
                  textAlign: 'left',
                  fontStyle: 'italic',
                  lineHeight: '24px',
                  marginBottom: '20px',
                  fontWeight: 'normal',
                }}
              >
                Diamond Stones supports women, vulnerable individuals, families, and communities through humanitarian assistance, empowerment programmes, and practical community interventions that restore dignity and create opportunities for a better tomorrow.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={onOpenSupportModal}
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                  }}
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>Support Our Work</span>
                </button>

                <button
                  onClick={() => onNavigate('impact')}
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-[#102C57] bg-white border border-slate-200 hover:bg-[#EEF5FF] hover:border-[#2563EB]/40 shadow-sm transition-all duration-200 flex items-center gap-2"
                >
                  <span>Explore Our Impact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Layered Hero Composition with Real Photos Transitioning in Sync */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <div className="relative w-full h-80 sm:h-96">
                  {ALL_PHOTOS_GALLERY.map((photo, idx) => (
                    <div
                      key={photo.url}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === currentHeroBgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Story Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-[#102C57]/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0B6B45]/40 via-transparent to-[#2563EB]/30 pointer-events-none" />

                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                          <span className="w-2 h-2 rounded-full bg-[#10A66A] animate-pulse" />
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-[11px] font-semibold text-[#10A66A] tracking-wider uppercase">
                          {photo.tag}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mt-0.5 text-white drop-shadow-md">
                          {photo.title}
                        </h3>
                        <p className="text-xs text-white/90 drop-shadow line-clamp-2 mt-1">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Indicator Dots */}
                <div className="absolute bottom-2.5 right-4 flex items-center gap-1.5 z-20">
                  {ALL_PHOTOS_GALLERY.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentHeroBgIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === currentHeroBgIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ORGANIZATIONAL SNAPSHOT (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20 border-b border-white/10 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0B6B45]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Organizational Snapshot
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
              Figures reflect verified records provided across our 6 active chapters in Nigeria and Ghana. Each indicator is individually audited and maintained with non-aggregation integrity.
            </p>
          </div>

          {/* Impact Numbers Grid with Glowing Emerald & Sky Accents */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:bg-white/15 transition-all shadow-md group"
              >
                <div className="text-[10px] font-bold text-[#10A66A] uppercase tracking-wider mb-1">
                  {metric.category}
                </div>

                <div
                  className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat',sans-serif] tabular-nums tracking-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {metric.isApproximate && (
                    <span className="text-sm mr-1 text-[#69B9F5]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      ~
                    </span>
                  )}
                  {metric.value.toLocaleString()}
                  {metric.suffix && (
                    <span className="text-lg ml-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {metric.suffix}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-100 mt-1 line-clamp-2">
                  {metric.label}
                </h4>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{metric.reportingPeriod}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400 italic">
              * Figures reflect organizational records provided and may cover different reporting periods. Cumulative primary individuals supported stands at approximately 2,000.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT DIAMOND STONES (Crisp White Background) */}
      <section className="bg-white py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Container with Real Photo & Gradient Vignette */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#F7FAFC] relative group">
                <img
                  src={DIAMOND_STONES_PHOTOS.founderStory.url}
                  alt={DIAMOND_STONES_PHOTOS.founderStory.title}
                  className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-sm sm:text-base font-bold mt-1 text-white">
                    Irene James-Nnaji · Founder & CEO
                  </h4>
                  <p className="text-[11px] text-slate-200 line-clamp-2">
                    Founded in 2013 in Rivers State, Nigeria to bring practical compassion and dignity.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] tracking-tight">
                A Community United by Values and Strength
              </h2>

              <p className="text-sm sm:text-base text-[#66758A] leading-relaxed">
                Diamond Stones began in 2013 as a charity group in Rivers State, Nigeria, responding directly to the urgent needs of people facing difficult life circumstances. Through sustained community engagement and compassionate relief, the initiative evolved into a formal nonprofit organization with two registered arms.
              </p>

              <p className="text-sm sm:text-base text-[#66758A] leading-relaxed">
                The name <strong className="text-[#102C57]">Diamond Stones</strong> represents a <em>“colony of values and strength united with the same focus.”</em> It reflects the deep conviction that individuals who share foundational values can unite to withstand adversity, restore dignity, and create enduring change.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#102C57] text-white hover:bg-[#0B6B45] shadow transition-all duration-200 flex items-center gap-2"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TWO ORGANIZATIONAL ARMS (Soft Green Background) */}
      <section className="bg-[#dcf1ff] py-20 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] mt-1 tracking-tight">
              Our Two Organizational Arms
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-2 font-medium">
              Operating as complementary initiatives under the Diamond Stones identity to serve specialized humanitarian needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: DS-WIDI */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#E7F7EF] text-[#0B6B45]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#102C57]">
                        DS-WIDI
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0B6B45] bg-[#E7F7EF] px-2.5 py-1 rounded-full">
                    Women in Distress
                  </span>
                </div>

                <div className="my-4 rounded-2xl overflow-hidden h-40 relative">
                  <img
                    src={DIAMOND_STONES_PHOTOS.womenEmpowerment.url}
                    alt="DS-WIDI Women Empowerment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow">
                    Women’s Recovery & Empowerment Circle
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#102C57]">
                  Diamond Stones Women in Distress Initiative
                </h4>

                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mt-2">
                  Focuses specifically on supporting women experiencing distress, abuse, sexual violence, widowhood, abandonment, early marriage, loss of dignity, and other vulnerable circumstances.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-[#243247]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10A66A]" />
                    <span>Confidential trauma support & recovery circles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10A66A]" />
                    <span>Widow welfare assistance & micro-seed grants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10A66A]" />
                    <span>Advocacy for human dignity and physical protection</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 relative z-10">
                <button
                  onClick={() => onNavigate('programmes')}
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#0B6B45] bg-[#E7F7EF] hover:bg-[#0B6B45] hover:text-white transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore DS-WIDI Initiatives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: DISH-SF */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#EEF5FF] text-[#2563EB]">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#102C57]">
                        DISH-SF
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#2563EB] bg-[#EEF5FF] px-2.5 py-1 rounded-full">
                    Humanitarian Foundation
                  </span>
                </div>

                <div className="my-4 rounded-2xl overflow-hidden h-40 relative">
                  <img
                    src={DIAMOND_STONES_PHOTOS.humanitarianDistribution.url}
                    alt="DISH-SF Community Outreach"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow">
                    Community Food Aid & Relief Distribution
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#102C57]">
                  Diamond Stones Humanitarian Support Foundation
                </h4>

                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mt-2">
                  Provides a broader humanitarian platform for supporting vulnerable individuals, children, men, families, and communities through practical assistance, disaster relief, and empowerment.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-[#243247]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Emergency flood relief and street nutrition drives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Hospital bill clearance and medicine provision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Orphanage educational welfare and care support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 relative z-10">
                <button
                  onClick={() => onNavigate('programmes')}
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#2563EB] bg-[#EEF5FF] hover:bg-[#2563EB] hover:text-white transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore DISH-SF Programmes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR PROGRAMMES (Neutral Light Gray Background) */}
      <section className="bg-[#F7FAFC] py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] mt-1 tracking-tight">
                Our Core Programmes
              </h2>
              <p className="text-xs sm:text-sm text-[#66758A] mt-1 font-medium">
                Targeted, dignified humanitarian programmes serving people across Nigeria and Ghana.
              </p>
            </div>

            <button
              onClick={() => onNavigate('programmes')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B6B45] hover:text-[#10A66A] shrink-0"
            >
              <span>Explore All Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.slice(0, 6).map((prog) => (
              <div
                key={prog.id}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <EditorialVisual
                    type={prog.visualType}
                    aspectRatio="16:9"
                    title={prog.title}
                  />

                  <div className="p-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B6B45]">
                      {prog.category}
                    </div>

                    <h3 className="text-base font-bold text-[#102C57] mt-1 line-clamp-2">
                      {prog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#66758A] mt-2 line-clamp-3 leading-relaxed">
                      {prog.shortDescription}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#243247]">
                      <span className="font-semibold text-[#102C57]">Beneficiaries: </span>
                      <span className="text-[#66758A]">{prog.beneficiaries}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      if (onSelectProgramme) onSelectProgramme(prog);
                      onNavigate('programmes');
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-[#102C57] bg-slate-100 hover:bg-[#E7F7EF] hover:text-[#0B6B45] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: VISION & MISSION CREATE (Emerald-Navy Gradient Background) */}
      <section className="bg-gradient-to-br from-[#0B6B45] via-[#10A66A] to-[#102C57] text-white py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Vision Block */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Our Vision
            </h2>
            <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed italic">
              “To provide support and resources to help women and communities rebuild their lives, elevating with compassion, resilience, and hope for a better tomorrow.”
            </p>
          </div>

          {/* Mission CREATE Grid */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">
                Our Mission — CREATE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createMissionCards.map((card) => (
                <div
                  key={card.word}
                  className="rounded-2xl p-6 bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10A66A] to-[#69B9F5] text-white font-extrabold text-xl flex items-center justify-center shadow-md mb-3">
                    {card.letter}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {card.word}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CORE VALUES CARES (Pale Blue Background) */}
      <section className="bg-[#dcf1ff] py-20 border-b border-[#2563EB]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] mt-1 tracking-tight">
              Our Core Values — CARES
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-2 font-medium">
              Five core pillars guiding our conduct, stewardship, and human relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {caresValues.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#dcf1ff] text-[#102C57] font-extrabold text-xl flex items-center justify-center mb-4">
                    {v.letter}
                  </div>
                  <h4 className="text-base font-bold text-[#102C57] mb-2">
                    {v.title}
                  </h4>
                  <p className="text-xs text-[#66758A] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FEATURED IMPACT STORIES (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                Featured Impact Stories
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Respectful narratives reflecting genuine community interventions and verified outcomes.
              </p>
            </div>

            <button
              onClick={() => onNavigate('stories')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#69B9F5] hover:text-white shrink-0"
            >
              <span>View All Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.slice(0, 2).map((story) => (
              <div
                key={story.id}
                className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <EditorialVisual
                    type={story.visualType}
                    aspectRatio="16:9"
                    title={story.title}
                  />

                  <div className="mt-5">
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {story.title}
                    </h3>

                    <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-200">
                      <p>
                        <strong className="text-white">Situation: </strong>
                        <span className="text-slate-300">{story.situation}</span>
                      </p>
                      <p>
                        <strong className="text-white">Support Provided: </strong>
                        <span className="text-slate-300">{story.supportProvided}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 italic">
                    Organizational report
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectStory) onSelectStory(story);
                      onNavigate('stories');
                    }}
                    className="text-xs font-bold text-[#69B9F5] hover:text-white flex items-center gap-1"
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CHAPTERS OVERVIEW (Soft Green Background) */}
      <section className="bg-[#e0f1ff] py-20 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] mt-1 tracking-tight">
              Our Active Chapters
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-2 font-medium">
              Chapters coordinate local engagements, quarterly meetings, and charity outreaches across Nigeria and Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
              <div
                key={ch.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B6B45]">
                      <MapPin className="w-4 h-4 text-[#10A66A]" />
                      <span>{ch.country}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E7F7EF] text-[#0B6B45] px-2 py-0.5 rounded-full">
                      {ch.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102C57]">
                    {ch.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mb-2">
                    {ch.location}
                  </p>

                  <p className="text-xs text-[#66758A] line-clamp-3 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#66758A]">
                    Quarterly Assemblies
                  </span>
                  <button
                    onClick={() => onNavigate('chapters')}
                    className="text-xs font-bold text-[#0B6B45] hover:text-[#10A66A] flex items-center gap-1"
                  >
                    <span>Chapter Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: VISUAL STORIES IN ACTION GALLERY (Pure White Background) */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] tracking-tight">
              Documenting Real Field Relief
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A]">
              Authentic visual documentation of compassionate outreaches, food distributions, and hospital assistance across active chapters.
            </p>
          </div>

          {/* Animated Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {galleryCategories.map((cat) => {
              const isSelected = selectedGalleryCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors duration-200 ${
                    isSelected ? 'text-white' : 'text-[#243247] bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="gallery-active-tab"
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

          {/* Photo Cards Grid with Gradient Story Scrims */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.url}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group relative flex flex-col justify-end min-h-[300px]"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Story Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/95 via-[#102C57]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B6B45]/30 via-transparent to-[#2563EB]/30 pointer-events-none" />

                  <div className="relative z-10 p-6 text-white space-y-1">
                    <h4 className="text-base font-bold text-white drop-shadow-md pt-2">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-white/90 drop-shadow line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 11: GET INVOLVED (Navy & Emerald Gradient Background) */}
      <section className="bg-gradient-to-br from-[#102C57] via-[#0B6B45] to-[#102C57] text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
              Together, We Can Make a Greater Difference
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              Every meaningful intervention begins with people who care. Join Diamond Stones in strengthening humanitarian support, empowering vulnerable people, and building more resilient communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Donate or Provide Financial Support',
              'Volunteer Your Time & Skills',
              'Partner With Our Programmes',
              'Provide Medical Assistance',
              'Support Training & Development',
              'Donate Equipment or Materials',
              'Provide a Venue for Programmes',
              'Offer Employment Opportunities',
            ].map((pathway) => (
              <button
                key={pathway}
                onClick={() => onNavigate('get-involved')}
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-all group shadow-sm"
              >
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#69B9F5] flex items-center justify-between">
                  <span>{pathway}</span>
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0 ml-1" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex justify-end">
            <button
              onClick={() => onNavigate('get-involved')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#102C57] hover:bg-[#E7F7EF] transition-all shadow"
            >
              Start Your Participation
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 12: NEWSLETTER OR UPDATES (Pale Blue Background) */}
      <section className="bg-[#ffffff] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-[30px] border border-solid border-[#469673] bg-white p-8 sm:p-10 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#102C57]">
              Stay Connected to the Change
            </h3>

            <p className="text-xs sm:text-sm text-[#66758A] max-w-md mx-auto">
              Receive verified updates on our quarterly community outreaches, D-STEP progress, and emergency relief mobilization.
            </p>

            {newsletterStatus.type === 'success' ? (
              <div className="p-4 rounded-2xl bg-[#E7F7EF] text-[#0B6B45] border border-[#10A66A]/30 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{newsletterStatus.message}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
                {newsletterStatus.type === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{newsletterStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                  />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your Email Address *"
                    className="px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe for Updates</span>
                </button>

                <p className="text-[11px] text-[#66758A]">
                  We respect your privacy. Unsubscribe at any time. No spam or commercial data sharing.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

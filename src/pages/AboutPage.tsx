import React from 'react';
import { PageType } from '../types';
import { initialLeadershipRoles } from '../data/initialData';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  Shield,
  Heart,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenSupportModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenSupportModal,
}) => {
  const createFramework = [
    {
      letter: 'C',
      title: 'Compassion',
      desc: 'Demonstrating genuine empathy, warmth, and active concern towards individuals and families navigating hardship.',
    },
    {
      letter: 'R',
      title: 'Resilience',
      desc: 'Equipping vulnerable persons and communities with inner strength and structural capabilities to overcome adversity.',
    },
    {
      letter: 'E',
      title: 'Empower',
      desc: 'Providing vocational skills, tools, and social opportunities that enable individuals to become self-reliant.',
    },
    {
      letter: 'A',
      title: 'Action',
      desc: 'Translating empathy into prompt, concrete, and measurable relief on the ground in hospital wards and communities.',
    },
    {
      letter: 'T',
      title: 'Transforming Lives',
      desc: 'Fostering generational, enduring positive changes in the lives of vulnerable women, children, and households.',
    },
    {
      letter: 'E',
      title: 'Elevate',
      desc: 'Restoring human dignity, moral standing, and self-worth to those who have felt marginalized or forgotten.',
    },
  ];

  const caresValues = [
    {
      letter: 'C',
      title: 'Collaboration',
      desc: 'Partnering with community elders, healthcare providers, institutions, and supporters to expand sustainable impact.',
    },
    {
      letter: 'A',
      title: 'Accountability',
      desc: 'Exercising strict stewardship, transparent documentation, and ethical responsibility in all operations.',
    },
    {
      letter: 'R',
      title: 'Respect',
      desc: 'Honoring the inherent worth of every human being regardless of social, economic, or life circumstances.',
    },
    {
      letter: 'E',
      title: 'Excellence',
      desc: 'Conducting every outreach, distribution, and training cohort with professional diligence and quality standards.',
    },
    {
      letter: 'S',
      title: 'Service',
      desc: 'Selflessly dedicating our time, resources, and hearts to lift those who need assistance most.',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HEADER (With Blurred Background Photo & High-Legibility Contrast) */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#EEF5FF] border-b border-slate-200">
        {/* Blurred Background Picture */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <motion.img
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.55 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={DIAMOND_STONES_PHOTOS.outreachTeam.url}
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
            className="max-w-3xl space-y-4 text-left"
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102C57] tracking-tight leading-tight">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block"
              >
                Creating Hope.
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block"
              >
                Restoring{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]">
                  Dignity.
                </span>
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block"
              >
                Rebuilding Strength.
              </motion.span>
            </h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
              }}
              className="text-xs text-[#1E293B] italic leading-[24px]"
              style={{
                fontSize: '12px',
                lineHeight: '24px',
                fontStyle: 'italic',
              }}
            >
              Founded by Irene James-Nnaji in 2013 in Rivers State, Nigeria, Diamond Stones brings together passionate humanitarians dedicated to lifting women, children, and vulnerable families out of distress.
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* 2. FOUNDER & CEO PROFILE (Pure White Background) */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7FAFC] rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
              {/* Founder Portrait Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                  <img
                    src="https://i.imgur.com/9A7HPFe.jpeg"
                    alt="Irene James-Nnaji — Founder & Chief Executive Officer (CEO), Diamond Stones"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] text-white px-3 py-1 rounded-full mb-1">
                      Founder & CEO
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                      Irene James-Nnaji
                    </h3>
                    <p className="text-xs text-white/90">
                      Diamond Stones Humanitarian Platform
                    </p>
                  </div>
                </div>

                {/* Professional Qualifications Pills */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-sm">
                  <span className="text-[11px] font-bold text-[#0B6B45] bg-[#E7F7EF] border border-[#10A66A]/20 px-3 py-1 rounded-full">
                    Civil Engineer
                  </span>
                  <span className="text-[11px] font-bold text-[#102C57] bg-[#EEF5FF] border border-[#2563EB]/20 px-3 py-1 rounded-full">
                    HSE Professional
                  </span>
                  <span className="text-[11px] font-bold text-[#0B6B45] bg-[#E7F7EF] border border-[#10A66A]/20 px-3 py-1 rounded-full">
                    Humanitarian Leader
                  </span>
                </div>
              </div>

              {/* Biography & Mission Statement Column (No Eyebrow) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] tracking-tight">
                    Irene James-Nnaji
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-[#0B6B45] mt-1">
                    Chief Executive Officer (CEO), Diamond Stones
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
                  <p className="text-justify" style={{ textAlign: 'justify' }}>
                    Irene James-Nnaji is a Civil Engineer and a Health, Safety and Environment (HSE) professional with a strong passion for humanitarian service and community development. She is a dedicated professional who combines her technical background with a deep commitment to making a positive difference in the lives of others.
                  </p>

                  <p className="text-justify" style={{ textAlign: 'justify' }}>
                    A lover of God, Irene is driven by her faith and a genuine desire to help humanity, particularly vulnerable individuals and communities in need of support. Her passion for service extends beyond her professional responsibilities, as she has supported several charitable initiatives and humanitarian causes, both within and outside the Diamond Stones organisation.
                  </p>

                  <p className="text-justify" style={{ textAlign: 'justify' }}>
                    As Chief Executive Officer of Diamond Stones, Irene is committed to advancing the organisation’s vision of providing support and resources to women and communities, helping them rebuild their lives with compassion, resilience, and hope for a better tomorrow.
                  </p>
                </div>

                {/* Core Pillars / Values highlight */}
                <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-[#102C57] block">Compassion</span>
                    <span className="text-[11px] text-[#66758A]">Faith-driven service for distressed persons</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-[#102C57] block">Resilience</span>
                    <span className="text-[11px] text-[#66758A]">Technical diligence & structural empowerment</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-[#102C57] block">Hope</span>
                    <span className="text-[11px] text-[#66758A]">Rebuilding lives for a better tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE MEANING OF DIAMOND STONES (Pale Blue Background) */}
      <section className="bg-[#e6f4ff] py-20 border-b border-[#2563EB]/20" style={{ backgroundColor: '#e6f4ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-[#10A66A]/30 shadow-md">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#102C57] tracking-tight">
                The Meaning of “Diamond Stones”
              </h2>
              <p className="text-sm sm:text-base text-[#66758A] leading-relaxed">
                In the words of our founding charter, <strong className="text-[#102C57]">Diamond Stones</strong> represents:
              </p>
              <blockquote className="text-lg sm:text-2xl font-bold italic text-[#0B6B45] pl-4 border-l-4 border-[#0B6B45]">
                “A colony of values and strength united with the same focus.”
              </blockquote>
              <p
                className="text-xs sm:text-sm text-[#66758A] leading-relaxed pt-2 text-left"
                style={{ textAlign: 'left' }}
              >
                Like diamonds formed under immense natural pressure, the individuals we serve possess extraordinary inherent beauty and resilience despite experiencing devastating life pressures. When like-minded people form a unified colony grounded in shared values, their collective strength becomes unbreakable, turning hardship into enduring light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE TWO REGISTERED ARMS (Neutral Light Background) with Dual Photo Vignettes */}
      <section className="bg-[#F7FAFC] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] tracking-tight mt-1">
              Two Complementary Registered Arms
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mt-2 leading-relaxed">
              To deliver focused impact with regulatory compliance, Diamond Stones operates through two specialized entities registered with Nigeria’s Corporate Affairs Commission (CAC).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DS-WIDI */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
              <div className="rounded-2xl overflow-hidden h-44 relative mb-2">
                <img
                  src={DIAMOND_STONES_PHOTOS.womenEmpowerment.url}
                  alt="DS-WIDI Women Empowerment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow">
                  Vocational & Psychosocial Empowerment Circle
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#102C57]">
                Diamond Stones Women in Distress Initiative (DS-WIDI)
              </h3>
              <p
                className="text-xs sm:text-sm text-[#66758A] leading-relaxed text-justify"
                style={{ textAlign: 'justify' }}
              >
                DS-WIDI is dedicated exclusively to the welfare, rehabilitation, and protection of women facing acute distress, abuse, abandonment, early forced marriage, or the sudden loss of a spouse. It operates trauma peer-support circles, micro-enterprise seed funds for widows, and safe intervention referrals.
              </p>
            </div>

            {/* DISH-SF */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
              <div className="rounded-2xl overflow-hidden h-44 relative mb-2">
                <img
                  src={DIAMOND_STONES_PHOTOS.floodRelief.url}
                  alt="DISH-SF Community Flood Relief"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow">
                  Coastal Community Flood Relief Operation
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#102C57]">
                Diamond Stones Humanitarian Support Foundation (DISH-SF)
              </h3>
              <p
                className="text-xs sm:text-sm text-[#66758A] leading-relaxed text-justify"
                style={{ textAlign: 'justify' }}
              >
                DISH-SF provides a broader humanitarian platform serving vulnerable individuals, children, men, families, and communities. It handles disaster responses such as seasonal flood relief, hospital medication outreach, school support, and community development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CREATE MISSION & CARES VALUES (Forest Emerald & Navy Gradient Background) */}
      <section className="bg-gradient-to-br from-[#0B6B45] via-[#10A66A] to-[#102C57] text-white py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Our Mission — CREATE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createFramework.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#E7F7EF] text-[#0B6B45] font-extrabold flex items-center justify-center text-lg mb-3">
                    {item.letter}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-slate-100 leading-relaxed text-justify"
                    style={{ textAlign: 'justify' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Core Values — CARES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {caresValues.map((v) => (
                <div
                  key={v.title}
                  className="p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#EEF5FF] text-[#2563EB] font-extrabold flex items-center justify-center text-sm mb-3">
                      {v.letter}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {v.title}
                    </h4>
                    <p
                      className="text-xs text-slate-100 leading-relaxed text-left"
                      style={{ textAlign: 'left' }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. ORGANIZATIONAL STRUCTURE (Pale Blue Background) */}
      <section className="bg-[#EEF5FF] py-20 border-b border-[#2563EB]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] tracking-tight mt-1">
                Organizational Structure
              </h2>
              <p className="text-xs sm:text-sm text-[#66758A] mt-2 leading-relaxed">
                Our governance model ensures strategic oversight, accountability, and agile grassroots delivery across all regional chapters.
              </p>
            </div>
            <button
              onClick={() => onNavigate('facilitators')}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#0B6B45] text-white hover:bg-[#085335] shadow-xs transition-all duration-200"
            >
              <span>Meet our Facilitators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialLeadershipRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0B6B45] bg-[#E7F7EF] px-2 py-0.5 rounded-full inline-block mb-3">
                    {role.department}
                  </span>
                  <h3 className="text-base font-bold text-[#102C57]">
                    {role.title}
                  </h3>
                  <p
                    className="text-xs text-[#66758A] mt-2 leading-relaxed text-left"
                    style={{ textAlign: 'left' }}
                  >
                    {role.description}
                  </p>
                </div>

                {role.currentHolder && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-[#243247]">
                    <span className="text-[#66758A]">Office: </span>
                    <span className="font-semibold text-[#102C57]">{role.currentHolder}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RELATIONSHIP WITH TICC (Soft Green Background) */}
      <section className="bg-[#E7F7EF] py-16 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#10A66A]/30 p-8 sm:p-10 shadow-sm">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57] tracking-tight">
                Relationship with The Inner Court Church (TICC)
              </h2>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                Diamond Stones and The Inner Court Church (TICC) share values and a similar vision for supporting vulnerable women and rebuilding lives within the community.
              </p>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                TICC provides charitable support and moral encouragement to the initiative, while <strong className="text-[#102C57]">Diamond Stones remains administratively independent</strong>. This harmonious relationship allows both entities to collaborate on community welfare while maintaining distinct governance and operational autonomy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMITMENT TO ACCOUNTABILITY & CTA (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Our Unwavering Commitment to Accountability
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                Every donation, grant, and volunteer hour entrusted to Diamond Stones is directed with integrity toward verified field interventions. We maintain documented logs of beneficiaries, medical clearances, and food distribution.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={onOpenSupportModal}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#102C57] hover:bg-[#E7F7EF] transition-all shadow"
              >
                Support Our Work
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-all"
              >
                Contact Us Directly
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

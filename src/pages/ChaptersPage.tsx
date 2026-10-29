import React, { useState } from 'react';
import { PageType, Chapter } from '../types';
import { storageService } from '../services/storageService';
import { Modal } from '../components/common/Modal';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Send,
  Search,
  MessageSquare,
  Shield,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ChaptersPageProps {
  onNavigate: (page: PageType) => void;
  onContactWithChapter?: (chapterName: string) => void;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = ({
  onNavigate,
  onContactWithChapter,
}) => {
  const chapters = storageService.getChapters();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalChapter, setActiveModalChapter] = useState<Chapter | null>(null);
  const [enquiryModalChapter, setEnquiryModalChapter] = useState<Chapter | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const filteredChapters = chapters.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryModalChapter) return;

    storageService.addEnquiry({
      fullName: enquiryForm.fullName,
      email: enquiryForm.email,
      phone: enquiryForm.phone || undefined,
      category: 'Chapter Enquiry',
      subject: enquiryForm.subject || `Enquiry for ${enquiryModalChapter.name}`,
      message: enquiryForm.message,
      chapter: enquiryModalChapter.name,
    });

    setEnquirySuccess(true);
    setEnquiryForm({ fullName: '', email: '', phone: '', subject: '', message: '' });
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
                  Active
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Chapters
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
                Diamond Stones operates through 6 active chapters across Nigeria and Ghana, coordinating quarterly member assemblies, grassroots charity outreaches, hospital visits, and community relief.
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
                  src={DIAMOND_STONES_PHOTOS.outreachTeam.url}
                  alt={DIAMOND_STONES_PHOTOS.outreachTeam.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    6 Active Chapters
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Rivers, Delta, Edo, Osun, Abuja, and Ghana (Accra).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL HEADQUARTERS HUB (Soft Green Background) */}
      <section className="bg-[#E7F7EF] py-12 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#10A66A]/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h3 className="text-lg font-bold text-[#102C57]">
                Origin: Rivers State, Nigeria (2013)
              </h3>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                Official Headquarters Status:{' '}
                <span className="font-semibold text-[#102C57]">
                  [Headquarters/Base Address to Be Confirmed]
                </span>
                . All regional chapters operate under the unified oversight of the central secretariat and founder Irene James-Nnaji.
              </p>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#E7F7EF] text-[#0B6B45] hover:bg-[#0B6B45] hover:text-white transition-all shrink-0 shadow-xs"
            >
              Review Governance Structure
            </button>
          </div>
        </div>
      </section>

      {/* 3. SEARCH & CHAPTER DIRECTORY (Pure White Background) */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C57]">
                Chapter Directory
              </h2>
              <p className="text-xs sm:text-sm text-[#66758A]">
                Discover local volunteer meetings and quarterly chapter assemblies.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, city, or country..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-[#F7FAFC]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChapters.map((ch) => (
              <div
                key={ch.id}
                className="bg-[#F7FAFC] rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B6B45]">
                      <MapPin className="w-4 h-4 text-[#10A66A]" />
                      <span>{ch.country}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B6B45] bg-[#E7F7EF] px-2.5 py-0.5 rounded-full">
                      {ch.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#102C57] mt-3">
                    {ch.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mb-3">
                    {ch.location}
                  </p>

                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed line-clamp-3">
                    {ch.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    <div className="flex items-start gap-2 text-xs text-[#243247]">
                      <Calendar className="w-3.5 h-3.5 text-[#0B6B45] shrink-0 mt-0.5" />
                      <span className="text-[#66758A]">{ch.meetingSchedule}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalChapter(ch)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#102C57] bg-white border border-slate-200 hover:bg-[#E7F7EF] hover:text-[#0B6B45] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Chapter Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setEnquirySuccess(false);
                      setEnquiryModalChapter(ch);
                    }}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B6B45] hover:bg-[#10A66A] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    title="Submit enquiry to this chapter"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGIONAL RELIEF SPOTLIGHT (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Join Your Local Chapter Fellowship & Outreaches
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  Whether in Port Harcourt, Delta, Benin, Osun, Abuja, or Accra, our chapters welcome volunteers, community partners, and sponsors for local humanitarian initiatives.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('get-involved')}
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#0B6B45] hover:bg-[#10A66A] text-white transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Register With Your Chapter</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <img
                    src={DIAMOND_STONES_PHOTOS.humanitarianDistribution.url}
                    alt={DIAMOND_STONES_PHOTOS.humanitarianDistribution.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Detail Modal */}
      {activeModalChapter && (
        <Modal
          isOpen={!!activeModalChapter}
          onClose={() => setActiveModalChapter(null)}
          title={activeModalChapter.name}
          subtitle={`${activeModalChapter.location}, ${activeModalChapter.country}`}
          maxWidth="xl"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B6B45] mb-1">
                Regional Mission & Focus
              </h4>
              <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                {activeModalChapter.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C57]">
                Key Chapter Activities & Outreaches
              </h4>
              <ul className="space-y-2">
                {activeModalChapter.activities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#243247]">
                    <CheckCircle2 className="w-4 h-4 text-[#10A66A] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#102C57] block mb-1">Meeting Schedule:</span>
                <span className="text-[#66758A]">{activeModalChapter.meetingSchedule}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#102C57] block mb-1">Contact Protocol:</span>
                <span className="text-[#66758A]">{activeModalChapter.contactChannel}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const ch = activeModalChapter;
                  setActiveModalChapter(null);
                  setEnquirySuccess(false);
                  setEnquiryModalChapter(ch);
                }}
                className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact This Chapter</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Chapter Enquiry Modal */}
      {enquiryModalChapter && (
        <Modal
          isOpen={!!enquiryModalChapter}
          onClose={() => setEnquiryModalChapter(null)}
          title={`Enquire with ${enquiryModalChapter.name}`}
          subtitle={`Location: ${enquiryModalChapter.location}, ${enquiryModalChapter.country}`}
          maxWidth="lg"
        >
          {enquirySuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#102C57]">Enquiry Submitted Successfully</h4>
              <p className="text-xs sm:text-sm text-[#66758A] max-w-sm mx-auto">
                Your message has been routed to the {enquiryModalChapter.name} leadership desk. We will respond promptly to your provided contact.
              </p>
              <button
                onClick={() => setEnquiryModalChapter(null)}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0B6B45] text-white"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <p className="text-xs text-[#66758A]">
                Submit your enquiry, meeting interest, or local collaboration proposal for this chapter.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#243247] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryForm.fullName}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                  placeholder="e.g. Samuel K. Mensah"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    placeholder="+234-80X-XXX-XXXX"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243247] mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryForm.subject}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                  placeholder={`e.g. Joining quarterly meetings in ${enquiryModalChapter.location}`}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243247] mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  placeholder="Share your interest, questions, or volunteer availability..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                }}
              >
                <Send className="w-4 h-4" />
                <span>Submit Chapter Enquiry</span>
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

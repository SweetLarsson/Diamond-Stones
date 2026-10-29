import React, { useState } from 'react';
import { PageType } from '../types';
import { storageService } from '../services/storageService';
import { DIAMOND_STONES_PHOTOS } from '../data/images';
import { CustomSelect } from '../components/common/CustomSelect';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  initialCategory?: string;
  initialChapter?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  initialCategory = 'General Enquiry',
  initialChapter,
}) => {
  const settings = storageService.getSettings();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: initialCategory,
    chapter: initialChapter || 'National Operations / All Chapters',
    subject: '',
    message: '',
    consent: false,
  });

  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const enquiryCategories = [
    'General Enquiry',
    'Volunteering',
    'Donations and Financial Support',
    'Programme Partnership',
    'Medical Support',
    'Training and Professional Expertise',
    'Chapter Enquiry',
    'Equipment and Materials',
    'Employment Opportunities',
    'Business Partnership',
    'Other',
  ];

  const chapterOptions = [
    'National Operations / All Chapters',
    'Rivers Chapter (Port Harcourt)',
    'Delta Chapter (Delta State)',
    'Edo Chapter (Benin)',
    'Osun Chapter (Osun State)',
    'Abuja Chapter (Abuja FCT)',
    'Ghana Chapter (Accra)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your full name.' });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormStatus({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }
    if (!formData.subject.trim()) {
      setFormStatus({ type: 'error', message: 'Please provide a subject line for your message.' });
      return;
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      setFormStatus({
        type: 'error',
        message: 'Your message must be at least 15 characters long.',
      });
      return;
    }
    if (!formData.consent) {
      setFormStatus({
        type: 'error',
        message: 'Please consent to our privacy policy to proceed with enquiry submission.',
      });
      return;
    }

    // Persist to storage
    storageService.addEnquiry({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      category: formData.category,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      chapter: formData.chapter,
    });

    setFormStatus({
      type: 'success',
      message:
        'Thank you! Your enquiry has been received and routed to our administrative team. We will review and respond to your email promptly.',
    });

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      category: 'General Enquiry',
      chapter: 'National Operations / All Chapters',
      subject: '',
      message: '',
      consent: false,
    });
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
            src={DIAMOND_STONES_PHOTOS.founderStory.url}
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
                  Connect
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B45] via-[#10A66A] to-[#2563EB]"
                >
                  With Diamond
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="block"
                >
                  Stones
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
                Whether inquiring about humanitarian programmes, volunteer coordination, emergency relief partnerships, or chapter assemblies, our team is here to assist.
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
                  src={DIAMOND_STONES_PHOTOS.founderStory.url}
                  alt={DIAMOND_STONES_PHOTOS.founderStory.title}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B6B45] px-2 py-0.5 rounded-full">
                    Direct Coordination
                  </span>
                  <p className="text-xs font-bold text-white mt-1">
                    Connecting volunteers, partners, and communities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED CONTACT DETAILS (Soft Green Background) */}
      <section className="bg-[#E7F7EF] py-16 border-b border-[#10A66A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#10A66A]/30 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#66758A] uppercase tracking-wider block">
                Telephone Line
              </span>
              <a
                href={`tel:${settings.phone}`}
                className="text-base font-bold text-[#102C57] hover:text-[#0B6B45] transition-colors block"
              >
                {settings.phone}
              </a>
              <p className="text-xs text-[#66758A] pt-1">
                Direct coordinator hotline (Mon–Sat).
              </p>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#10A66A]/30 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#2563EB] flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#66758A] uppercase tracking-wider block">
                Direct Email
              </span>
              <a
                href={`mailto:${settings.email}`}
                className="text-sm font-bold text-[#102C57] hover:text-[#2563EB] transition-colors break-all block"
              >
                {settings.email}
              </a>
              <p className="text-xs text-[#66758A] pt-1">
                Official proposals and enquiries.
              </p>
            </div>

            {/* Headquarters Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#10A66A]/30 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#66758A] uppercase tracking-wider block">
                Operational Base
              </span>
              <p className="text-xs text-[#66758A] pt-1">
                Rivers State, Nigeria
              </p>
            </div>

            {/* Facebook Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#10A66A]/30 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#2563EB] flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#66758A] uppercase tracking-wider block">
                Founder Facebook Identity
              </span>
              <p className="text-sm font-bold text-[#102C57]">
                {settings.facebookName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKING ENQUIRY FORM (Pure White Background) */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7FAFC] rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#102C57] mb-1">
              Send an Official Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#66758A] mb-6">
              Complete the validated form below to route your message to our national secretariat.
            </p>

            {formStatus.type === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#102C57]">Message Dispatched</h3>
                <p className="text-xs sm:text-sm text-[#66758A] max-w-md mx-auto leading-relaxed">
                  {formStatus.message}
                </p>
                <button
                  onClick={() => setFormStatus({ type: 'idle', message: '' })}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#E7F7EF] text-[#0B6B45]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formStatus.type === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Chinelo Okonkwo"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="chinelo@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234-80X-XXX-XXXX"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#243247] mb-1">
                      Enquiry Category *
                    </label>
                    <CustomSelect
                      value={formData.category}
                      onChange={(val) => setFormData({ ...formData, category: val })}
                      options={enquiryCategories}
                      ariaLabel="Enquiry Category"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Related Chapter (Optional)
                  </label>
                  <CustomSelect
                    value={formData.chapter}
                    onChange={(val) => setFormData({ ...formData, chapter: val })}
                    options={chapterOptions}
                    ariaLabel="Related Chapter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your inquiry..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your question, proposal, or support offering..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white resize-none"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0B6B45] focus:ring-[#0B6B45]"
                  />
                  <label htmlFor="consentCheckbox" className="text-xs text-[#66758A] leading-relaxed cursor-pointer">
                    I consent to Diamond Stones processing my contact information solely for responding to this enquiry in accordance with our safeguarding and privacy standards.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Official Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. EMERGENCY SAFEGUARDING ADVISORY (Deep Navy Blue Background) */}
      <section className="bg-[#102C57] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h4 className="text-xl sm:text-2xl font-bold text-white">
            Need Urgent Assistance or Reporting Domestic Distress?
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            If you or someone you know is in immediate crisis, facing domestic violence, or requires urgent survivor refuge, please call our confidential human coordination desk directly at{' '}
            <a href="tel:08037727388" className="font-bold text-[#10A66A] underline">
              08037727388
            </a>{' '}
            instead of submitting an online message.
          </p>
        </div>
      </section>
    </div>
  );
};

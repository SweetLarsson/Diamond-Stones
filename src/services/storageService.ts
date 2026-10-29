import {
  ImpactMetric,
  Programme,
  Chapter,
  Story,
  ContactEnquiry,
  VolunteerApplication,
  NewsletterSubscriber,
  SiteSettings,
} from '../types';
import {
  initialSiteSettings,
  initialImpactMetrics,
  initialProgrammes,
  initialChapters,
  initialStories,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'ds_site_settings_v1',
  METRICS: 'ds_impact_metrics_v1',
  PROGRAMMES: 'ds_programmes_v1',
  CHAPTERS: 'ds_chapters_v1',
  STORIES: 'ds_stories_v1',
  ENQUIRIES: 'ds_enquiries_v1',
  VOLUNTEERS: 'ds_volunteers_v1',
  SUBSCRIBERS: 'ds_subscribers_v1',
};

// Seed initial inquiries so admin dashboard has real sample records to review and manage
const sampleInitialEnquiries: ContactEnquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Dr. Amaka Okafor',
    email: 'amaka.okafor@hospitalnetwork.ng',
    phone: '+234-802-345-6789',
    category: 'Medical Support',
    subject: 'Partnering on indigent patient medication supply',
    message: 'We are a community healthcare clinic in Port Harcourt. We would like to collaborate with Diamond Stones on our medical assistance program to provide discounted medications for indigent mothers.',
    chapter: 'Rivers Chapter',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'new',
  },
  {
    id: 'enq-102',
    fullName: 'Emmanuel Kwesi Mensah',
    email: 'ekmensah@accrarelief.org',
    phone: '+233-24-567-8901',
    category: 'Chapter Enquiry',
    subject: 'Volunteering with the Accra, Ghana Chapter',
    message: 'Hello Irene and team, I am based in Accra and would love to join your upcoming quarterly outreach for vulnerable women and migrant families.',
    chapter: 'Ghana Chapter',
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    status: 'in-progress',
  },
  {
    id: 'enq-103',
    fullName: 'Blessing Adebayo',
    email: 'blessing.adebayo@empoweryouth.org',
    phone: '+234-809-876-5432',
    category: 'Training & Professional Expertise',
    subject: 'Pro-bono fashion tailoring instruction for D-STEP',
    message: 'I run a professional fashion design academy and wish to offer 20 free training hours for the next D-STEP cohort in Osun State.',
    chapter: 'Osun Chapter',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    status: 'resolved',
  },
];

const sampleInitialVolunteers: VolunteerApplication[] = [
  {
    id: 'vol-201',
    fullName: 'Chioma Nwachukwu',
    email: 'chioma.nwa@gmail.com',
    phone: '+234-812-345-6780',
    supportType: 'Volunteer Your Time & Skills',
    chapter: 'Rivers Chapter',
    skillsAndExpertise: 'Nursing and patient care coordination',
    availability: 'Weekends & Monthly outreach days',
    notes: 'Passionate about hospital visitation and eldercare.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'new',
  },
  {
    id: 'vol-202',
    fullName: 'Tariere Ebimobowei',
    email: 'tariere.ebi@yahoo.com',
    phone: '+234-803-456-7891',
    supportType: 'Corporate & Institutional Partners',
    chapter: 'Delta Chapter',
    skillsAndExpertise: 'Logistics and supply chain management',
    availability: 'On-demand for relief drives',
    notes: 'Can assist with van transport for food relief packages.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'reviewed',
  },
];

const sampleInitialSubscribers: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'support@communityadvocates.ng',
    name: 'Community Advocates Network',
    subscribedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    active: true,
  },
  {
    id: 'sub-2',
    email: 'ngo.liaison@westafricadignity.org',
    name: 'West Africa Dignity Coalition',
    subscribedAt: new Date(Date.now() - 3600000 * 200).toISOString(),
    active: true,
  },
];

export const storageService = {
  // Settings
  getSettings(): SiteSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSiteSettings));
      return initialSiteSettings;
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed.phone === '08037727388' || !parsed.phone.startsWith('+')) {
        parsed.phone = '+234-803-772-7388';
        parsed.bankAccountNumber = '312-849-5021';
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return initialSiteSettings;
    }
  },

  updateSettings(settings: SiteSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Impact Metrics
  getMetrics(): ImpactMetric[] {
    const raw = localStorage.getItem(STORAGE_KEYS.METRICS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(initialImpactMetrics));
      return initialImpactMetrics;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialImpactMetrics;
    }
  },

  updateMetric(updated: ImpactMetric): void {
    const metrics = this.getMetrics();
    const index = metrics.findIndex((m) => m.id === updated.id);
    if (index >= 0) {
      metrics[index] = updated;
    } else {
      metrics.push(updated);
    }
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
  },

  addMetric(newMetric: ImpactMetric): void {
    const metrics = this.getMetrics();
    metrics.push(newMetric);
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
  },

  // Programmes
  getProgrammes(): Programme[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMMES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(initialProgrammes));
      return initialProgrammes;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialProgrammes;
    }
  },

  saveProgramme(prog: Programme): void {
    const progs = this.getProgrammes();
    const idx = progs.findIndex((p) => p.id === prog.id);
    if (idx >= 0) {
      progs[idx] = prog;
    } else {
      progs.push(prog);
    }
    localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(progs));
  },

  deleteProgramme(id: string): void {
    const progs = this.getProgrammes().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(progs));
  },

  // Chapters
  getChapters(): Chapter[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(initialChapters));
      return initialChapters;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialChapters;
    }
  },

  saveChapter(ch: Chapter): void {
    const chs = this.getChapters();
    const idx = chs.findIndex((c) => c.id === ch.id);
    if (idx >= 0) {
      chs[idx] = ch;
    } else {
      chs.push(ch);
    }
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chs));
  },

  // Stories
  getStories(): Story[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(initialStories));
      return initialStories;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialStories;
    }
  },

  saveStory(story: Story): void {
    const stories = this.getStories();
    const idx = stories.findIndex((s) => s.id === story.id);
    if (idx >= 0) {
      stories[idx] = story;
    } else {
      stories.unshift(story);
    }
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },

  deleteStory(id: string): void {
    const stories = this.getStories().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },

  // Contact Enquiries
  getEnquiries(): ContactEnquiry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(sampleInitialEnquiries));
      return sampleInitialEnquiries;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return sampleInitialEnquiries;
    }
  },

  addEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): ContactEnquiry {
    const enquiries = this.getEnquiries();
    const created: ContactEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    enquiries.unshift(created);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    return created;
  },

  updateEnquiryStatus(id: string, status: ContactEnquiry['status']): void {
    const enquiries = this.getEnquiries();
    const target = enquiries.find((e) => e.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    }
  },

  // Volunteers & Partners
  getVolunteers(): VolunteerApplication[] {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(sampleInitialVolunteers));
      return sampleInitialVolunteers;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return sampleInitialVolunteers;
    }
  },

  addVolunteer(app: Omit<VolunteerApplication, 'id' | 'createdAt' | 'status'>): VolunteerApplication {
    const list = this.getVolunteers();
    const created: VolunteerApplication = {
      ...app,
      id: `vol-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    list.unshift(created);
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(list));
    return created;
  },

  updateVolunteerStatus(id: string, status: VolunteerApplication['status']): void {
    const list = this.getVolunteers();
    const target = list.find((v) => v.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(list));
    }
  },

  // Newsletter Subscribers
  getSubscribers(): NewsletterSubscriber[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(sampleInitialSubscribers));
      return sampleInitialSubscribers;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return sampleInitialSubscribers;
    }
  },

  addSubscriber(email: string, name?: string): { success: boolean; message: string } {
    const subs = this.getSubscribers();
    const normalized = email.trim().toLowerCase();
    const existing = subs.find((s) => s.email.toLowerCase() === normalized);
    if (existing) {
      return { success: false, message: 'This email is already registered on our update list.' };
    }
    subs.unshift({
      id: `sub-${Date.now()}`,
      email: normalized,
      name: name?.trim() || undefined,
      subscribedAt: new Date().toISOString(),
      active: true,
    });
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));
    return { success: true, message: 'Thank you for joining our community updates list!' };
  },

  // Reset to verified original baseline
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSiteSettings));
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(initialImpactMetrics));
    localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(initialProgrammes));
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(initialChapters));
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(initialStories));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(sampleInitialEnquiries));
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(sampleInitialVolunteers));
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(sampleInitialSubscribers));
  },
};

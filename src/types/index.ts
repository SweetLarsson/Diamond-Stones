export type PageType = 
  | 'home' 
  | 'about' 
  | 'facilitators'
  | 'programmes' 
  | 'impact' 
  | 'chapters' 
  | 'stories' 
  | 'get-involved' 
  | 'contact';

export interface Facilitator {
  id: string;
  name: string;
  role: string;
  zoneOrChapter: string;
  subtitle?: string;
  image: string;
  bioParagraphs: string[];
  tags: string[];
  credentials?: string[];
  contactNote?: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isApproximate?: boolean;
  category: 'overview' | 'humanitarian' | 'medical' | 'empowerment' | 'education' | 'welfare';
  reportingPeriod: string;
  sourceNote: string;
}

export interface Programme {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  beneficiaries: string;
  keyInterventions: string[];
  status: 'active' | 'archived';
  visualType: 'medical' | 'feeding' | 'dstep' | 'orphanage' | 'women' | 'community';
  verifiedOutcome?: string;
  waysToSupport: string[];
}

export interface Chapter {
  id: string;
  name: string;
  location: string;
  country: string;
  status: 'active' | 'forming';
  description: string;
  activities: string[];
  meetingSchedule: string;
  contactChannel: string;
}

export interface Story {
  id: string;
  title: string;
  category: string;
  date: string;
  situation: string;
  supportProvided: string;
  reportedOutcome: string;
  fullNarrative: string;
  isVerifiedReport: boolean;
  consentConfirmed: boolean;
  visualType: 'medical' | 'feeding' | 'dstep' | 'orphanage' | 'women' | 'community';
}

export interface LeadershipRole {
  id: string;
  title: string;
  department: string;
  description: string;
  currentHolder?: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
  chapter?: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  supportType: string;
  chapter: string;
  skillsAndExpertise: string;
  availability: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  active: boolean;
}

export interface SiteSettings {
  organizationName: string;
  founder: string;
  origin: string;
  headquartersPlaceholder: string;
  phone: string;
  email: string;
  facebookName: string;
  facebookConfirmedUrl?: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankSortCode?: string;
}

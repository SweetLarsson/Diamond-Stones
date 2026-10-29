export interface PhotoAsset {
  url: string;
  title: string;
  caption: string;
  category: string;
  tag: string;
}

export const BRAND_LOGO_URL = 'https://i.imgur.com/iuJiEuD.jpeg';

export const DIAMOND_STONES_PHOTOS = {
  hero: {
    url: 'https://i.imgur.com/PFxPGBn.jpeg',
    title: 'Diamond Stones Community Outreach',
    caption: 'Field relief and compassionate community engagement in southern Nigeria.',
    category: 'Humanitarian Outreach',
    tag: 'Community Hope',
  },
  outreachTeam: {
    url: 'https://i.imgur.com/walLqsF.jpeg',
    title: 'Volunteer Relief Contingent',
    caption: 'Dedicated volunteers mobilizing food packs and essential healthcare supplies.',
    category: 'Field Volunteers',
    tag: 'Compassion In Action',
  },
  feedingTheStreet: {
    url: 'https://i.imgur.com/YZXCEYM.jpeg',
    title: 'Feeding the Street & Relief Nutrition',
    caption: 'Direct food package distribution to vulnerable families and community elders.',
    category: 'Food Relief',
    tag: 'Relief Nutrition',
  },
  womenEmpowerment: {
    url: 'https://i.imgur.com/pjT7whj.jpeg',
    title: 'DS-WIDI Women Empowerment Circle',
    caption: 'Restoring dignity, social protection, and micro-trade support for distressed women and widows.',
    category: 'Women in Distress',
    tag: 'DS-WIDI (Est. 2018)',
  },
  medicalSupport: {
    url: 'https://i.imgur.com/pcqTV6u.jpeg',
    title: 'Hospital Support & Patient Relief',
    caption: 'Settling outstanding discharge medical bills and supplying vital prescription medications.',
    category: 'Medical Relief',
    tag: 'Healthcare Aid',
  },
  humanitarianDistribution: {
    url: 'https://i.imgur.com/ehCPVTW.jpeg',
    title: 'Community Aid & Goods Distribution',
    caption: 'Delivering essential hygiene materials, foodstuffs, and emergency relief supplies.',
    category: 'Emergency Aid',
    tag: 'Community Relief',
  },
  orphanageVisit: {
    url: 'https://i.imgur.com/rvjDESZ.jpeg',
    title: 'Child Welfare & Orphanage Support',
    caption: 'Visiting residential care centres to provide stationery, nutrition, and encouragement.',
    category: 'Child Welfare',
    tag: 'Future Hope',
  },
  founderStory: {
    url: 'https://i.imgur.com/SDznkVS.jpeg',
    title: 'Founder Irene James-Nnaji & Field Coordinators',
    caption: 'Direct servant leadership guiding chapter initiatives from Rivers State across Nigeria and Ghana.',
    category: 'Leadership & Vision',
    tag: 'Founder & Team',
  },
  founderPortrait: {
    url: 'https://i.imgur.com/9A7HPFe.jpeg',
    title: 'Irene James-Nnaji — Founder & CEO',
    caption: 'Civil Engineer, HSE Professional, and Chief Executive Officer of Diamond Stones.',
    category: 'Leadership & Vision',
    tag: 'Founder & CEO',
  },
  dstepVocational: {
    url: 'https://i.imgur.com/JVFT1qi.jpeg',
    title: 'D-STEP Skills Acquisition Cohort',
    caption: 'Hands-on trade instruction and empowerment equipment enabling economic self-reliance.',
    category: 'D-STEP Program',
    tag: 'Skill Acquisition',
  },
  floodRelief: {
    url: 'https://i.imgur.com/u9iMdqe.jpeg',
    title: 'Riverine Community Flood Relief Outreach',
    caption: 'Emergency feeding and clean water intervention reaching over 2,000 flood-affected individuals.',
    category: 'Disaster Relief',
    tag: 'DISH-SF (Est. 2025)',
  },
};

export const ALL_PHOTOS_GALLERY: PhotoAsset[] = [
  DIAMOND_STONES_PHOTOS.hero,
  DIAMOND_STONES_PHOTOS.outreachTeam,
  DIAMOND_STONES_PHOTOS.feedingTheStreet,
  DIAMOND_STONES_PHOTOS.womenEmpowerment,
  DIAMOND_STONES_PHOTOS.medicalSupport,
  DIAMOND_STONES_PHOTOS.humanitarianDistribution,
  DIAMOND_STONES_PHOTOS.orphanageVisit,
  DIAMOND_STONES_PHOTOS.founderStory,
  DIAMOND_STONES_PHOTOS.dstepVocational,
  DIAMOND_STONES_PHOTOS.floodRelief,
];

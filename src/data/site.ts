export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface Night {
  id: string;
  days: Weekday[];
  dayLabel: string;
  title: string;
  time?: string;
  host?: string;
  description: string;
  offers?: string[];
  /** Weekend only: spans two columns and carries the photo. */
  featured?: boolean;
}

export interface StudentDeal {
  price: string;
  label: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  summary: string;
  includesLabel: string;
  includes: string[];
  delivery?: string;
  popular?: boolean;
}

export interface OpeningHours {
  days: string;
  hours: string;
  schemaDays: string[];
  opens: string;
  closes: string;
}

export interface HeroHighlight {
  label: string;
  detail: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

/**
 * Background loop for the hero. Leave both empty until a real edit exists;
 * the hero renders poster-only and no <video> element in that case.
 * Drop encoded files into public/video/ and set the paths here to enable it.
 */
export interface HeroVideo {
  mp4?: string;
  webm?: string;
}

/** Prefix public-root paths so GitHub Pages can serve from /filthys/. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  if (path.startsWith('#')) return `${base}${path}`;
  return `${base}${path.replace(/^\//, '')}`;
}

export const site = {
  name: "Filthy's",
  legalName: "Filthy's",
  url: 'https://www.filthysbar.co.uk',
  email: 'bookings@filthysbar.co.uk',
  telephone: '07840 366566',
  description:
    "Newcastle's home of live music. A one-of-a-kind bar on the Bigg Market with live acts every night, signature cocktails, and nights that run until 3am.",
  founderName: 'Bigg Market',
  streetAddress: '3–4 Bigg Market',
  addressLocality: 'Newcastle upon Tyne',
  addressRegion: 'Tyne and Wear',
  postalCode: 'NE1 1UW',
  addressCountry: 'GB',
  areaServed: 'Newcastle upon Tyne',
  priceRange: '£',
  sameAs: [
    'https://www.instagram.com/filthysnewcastle/',
    'https://www.facebook.com/FilthysNewcastle/',
    'https://twitter.com/filthysncl',
  ],
  ogImage: '/img/og-image.png',
  locale: 'en_GB',
  gaMeasurementId: '',
  heroSubtitle: "Newcastle's home of live music",
  heroIntro:
    'Welcome to a one of a kind bar and club that delivers memorable nights out, the greatest in up-and-coming musical talent, excellent service and a fantastic range of signature cocktails.',
  heroSeoHeadline: "Filthy's — Newcastle's home of live music",
  heroPrimaryCta: { label: "What's on tonight", href: '#whats-on' } as HeroCta,
  heroSecondaryCta: { label: 'Book a table', href: '#contact' } as HeroCta,
  nightsHeadline: "What's on.",
  nightsSubhead: 'Live music every night, with deals for students and industry through the week.',
  dealsHeadline: 'Student prices, five nights a week.',
  dealsSubhead:
    'Student deals every week, Sunday to Thursday, alongside live music every night.',
  dealsSchedule: 'Every week · Sunday – Thursday',
  contactHeadline: 'Book a table.',
  contactSubhead:
    'Parties of 10 or more can reserve a table. For anything else, drop in or send a message.',
  contactNote: 'Parties of 10 or more',
  contactFormLead: 'Tell us the date, time, and party size. Smaller groups, just come down.',
} as const;

export const heroVideo: HeroVideo = {
  // Pexels #9481012 (K) — live band + crowd, free licence. Swap for Filthy's footage when it exists.
  mp4: '/video/hero.mp4',
  webm: '',
};

export const heroHighlights: HeroHighlight[] = [
  { label: '7 nights', detail: 'Live music every night of the week' },
  { label: '3am', detail: 'Late licence on the Bigg Market' },
  { label: 'Open mic', detail: 'Tuesdays from 10pm, free pint if you play' },
];

export const openingHours: OpeningHours[] = [
  {
    days: 'Monday – Thursday',
    hours: '7pm – 3am',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '19:00',
    closes: '03:00',
  },
  {
    days: 'Friday',
    hours: '5pm – 3am',
    schemaDays: ['Friday'],
    opens: '17:00',
    closes: '03:00',
  },
  {
    days: 'Saturday',
    hours: '1pm – 3am',
    schemaDays: ['Saturday'],
    opens: '13:00',
    closes: '03:00',
  },
  {
    days: 'Sunday',
    hours: '7pm – 3am',
    schemaDays: ['Sunday'],
    opens: '19:00',
    closes: '03:00',
  },
];

export const nights: Night[] = [
  {
    id: 'midweek-live',
    days: ['monday', 'wednesday'],
    dayLabel: 'Mon & Wed',
    title: 'Live music',
    time: '10pm – midnight',
    description: 'Live acts on stage midweek, with industry prices at the bar.',
    offers: ['£3 selected bottles', '2 house doubles £8', 'House wine £12'],
  },
  {
    id: 'open-mic',
    days: ['tuesday'],
    dayLabel: 'Tuesday',
    title: 'Open mic',
    time: '10pm – 2am',
    host: 'Connor Pattison',
    description:
      'Bring a guitar, a song to sing, or just a love of live music. All musicians welcome.',
    offers: ['Free pint if you play'],
  },
  {
    id: 'live-lounge',
    days: ['thursday'],
    dayLabel: 'Thursday',
    title: 'Live Lounge',
    time: '10pm – 2am',
    host: 'Stevie Stoker',
    description:
      'The best local music talent on stage. Kick the weekend off early with live music and drinks deals.',
    offers: ['Student deals', 'Industry deals'],
  },
  {
    id: 'weekend',
    days: ['friday', 'saturday'],
    dayLabel: 'Fri & Sat',
    title: 'Live music',
    // TODO: confirm with venue
    time: '8pm – 3am',
    description:
      'Resident DJs playing indie, rock and acoustic, plus live sets from Keiran Taylor, Patrick Kelly, Connor Pattison, Paige Temperly and more.',
    offers: ['Resident DJs', 'Live sets'],
    featured: true,
  },
  {
    id: 'industry',
    days: ['sunday'],
    dayLabel: 'Sunday',
    title: 'Industry night',
    time: '10pm – midnight',
    description: 'A wind-down for everyone who works the Bigg Market, with live music from 10pm.',
    offers: ['25% off selected drinks'],
  },
];

export const studentDeals: StudentDeal[] = [
  { price: '£8', label: '2× house doubles + mixers' },
  { price: '£3', label: 'Selected bottles' },
  { price: '£12', label: 'Bottles of house wine' },
];

export const plans: PricingPlan[] = [
  {
    id: 'student',
    name: 'Student deals',
    price: 'Sun–Thu',
    summary: 'Midweek prices for students, every week Sunday to Thursday.',
    includesLabel: 'Includes',
    includes: ['2x house doubles + mixers for £8', 'Selected bottles for £3', 'Bottles of house wine for £12'],
    popular: true,
  },
  {
    id: 'industry',
    name: 'Industry night',
    price: 'Sundays',
    summary: 'A night for friends in the trade, with live music to match.',
    includesLabel: 'Includes',
    includes: ['25% off selected drinks', 'Live music 10pm–midnight'],
  },
  {
    id: 'industry-midweek',
    name: 'Industry midweek',
    price: 'Mon & Wed',
    summary: 'Drinks offers alongside live music on Monday and Wednesday.',
    includesLabel: 'Includes',
    includes: ['£3 selected bottled beer', '2x house doubles for £8', 'House wine £12'],
    delivery: 'Live music 10pm–midnight',
  },
];

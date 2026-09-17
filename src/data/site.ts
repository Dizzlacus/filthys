export interface Review {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface Service {
  name: string;
  description: string;
  icon?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  href: string;
  tags: string[];
  status: string;
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
  ogImage: '/img/og-image.svg',
  locale: 'en_GB',
  gaMeasurementId: '',
  heroHeadline: "Newcastle's home of live music",
  heroSubhead:
    'A one-of-a-kind bar and club on the Bigg Market. Up-and-coming talent, signature cocktails, and nights that run until 3am.',
  heroCta: 'Book a table',
  aboutHeadline: 'Live music, seven nights a week.',
  aboutParagraphs: [
    "Filthy's is a late-night live music bar at the top of the Bigg Market — a quirky, music-first room with an eclectic interior and a stage you can see from almost anywhere inside.",
    'Come for the open mic, stay for the residents, or just grab a cocktail and let the night run. Students and industry get midweek deals; weekends are indie, rock, and acoustic until 3am.',
    'Table reservations are for parties of 10 or more. Smaller groups, just come down — we will make room.',
  ],
  contactHeadline: 'Book a table or say hello.',
  contactSubhead:
    'Parties of 10 or more can reserve a table. For anything else, drop in or send a message.',
  servicesHeadline: "What's on.",
  servicesSubhead: 'Live music every night, with deals for students and industry through the week.',
  portfolioHeadline: 'The residents.',
  portfolioSubhead:
    'The musicians and hosts who keep Filthy\'s loud. Weekend nights also bring resident DJs playing indie, rock, and acoustic.',
  reviewsHeadline: 'What people say.',
  reviewsSubhead: 'A loud Geordie room that wants the music to go well — and the drinks to keep up.',
} as const;

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

export const services: Service[] = [
  {
    name: 'Live music · Mon & Wed',
    description:
      'Live music 7 days a week. Industry offer: £3 selected bottled beer, 2x house doubles for £8, house wine £12. 10pm–midnight.',
    icon: '/img/svg/icon-web-dev.svg',
  },
  {
    name: 'Open mic · Tuesday',
    description:
      'Hosted by local musician Connor Pattison. All musicians welcome — play and you get a free pint. 10pm–2am.',
    icon: '/img/svg/icon-collaboration.svg',
  },
  {
    name: 'Live Lounge · Thursday',
    description:
      'Stevie Stoker hosts Live Lounge with the best local talent, plus student and industry drinks deals to kick the weekend off. 10pm–2am.',
    icon: '/img/svg/icon-uiux.svg',
  },
  {
    name: 'Weekends · Fri & Sat',
    description:
      'Resident DJs playing indie, rock, and acoustic, plus live sets from Keiran Taylor, Patrick Kelly, Connor Pattison, Paige Temperly and more. 8pm–3am.',
    icon: '/img/svg/icon-innovation.svg',
  },
  {
    name: 'Industry night · Sunday',
    description: '25% off selected drinks and live music from 10pm–midnight. A proper wind-down for the trade.',
    icon: '/img/svg/icon-excellence.svg',
  },
];

export const portfolio: PortfolioItem[] = [
  {
    title: 'Connor Pattison',
    description: 'Hosts the Tuesday open mic and plays the weekend live rooms.',
    href: '#contact',
    tags: ['Open mic', 'Live'],
    status: 'Resident',
  },
  {
    title: 'Stevie Stoker',
    description: 'Hosts Live Lounge every Thursday with local music talent.',
    href: '#contact',
    tags: ['Live Lounge', 'Host'],
    status: 'Resident',
  },
  {
    title: 'Weekend residents',
    description: 'Keiran Taylor, Patrick Kelly, Paige Temperly and more, plus DJs spinning indie, rock, and acoustic.',
    href: '#contact',
    tags: ['Indie', 'Rock', 'Acoustic'],
    status: 'Fri & Sat',
  },
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

export const reviews: Review[] = [
  {
    quote: '"Proper live music bar. The open mic is the one to be at if you play in town."',
    name: 'Jamie',
    role: 'Open mic regular',
    rating: 5,
  },
  {
    quote: '"Cocktails, late nights, and a room that actually cares about the bands. Bigg Market staple."',
    name: 'Alex',
    role: 'Weekend regular',
    rating: 5,
  },
  {
    quote: '"Student deals through the week and live music every night. Hard to beat for a midweek session."',
    name: 'Sam',
    role: 'Student night',
    rating: 5,
  },
];

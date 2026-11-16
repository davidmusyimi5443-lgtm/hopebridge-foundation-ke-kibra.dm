/**
 * HopeBridge Foundation — site content fixtures.
 *
 * Everything in this file is SAMPLE / DEMONSTRATION content. It is the single
 * source the public pages read from, so a later milestone can replace these
 * exports with records loaded from Netlify Database (managed via the admin
 * dashboard) without touching page components.
 *
 * Do not publish invented credentials, partnerships or impact figures:
 * values in `impactStats` are deliberate placeholders until verified data
 * from audited reports is entered.
 */

export type ProgramSlug =
  | 'education'
  | 'healthcare'
  | 'food'
  | 'empowerment'
  | 'community'

export const org = {
  name: 'HopeBridge Foundation',
  tagline: 'Building Hope. Changing Lives.',
  mission:
    'To transform lives by supporting vulnerable communities through education, healthcare, food assistance, youth empowerment and sustainable community development.',
  vision:
    'A world where every family has the opportunity, dignity and resources to build a secure and hopeful future.',
  // Editable placeholders — replace with the organisation's real details.
  contact: {
    email: 'info@hopebridge.example',
    phone: '+254 700 000 000',
    phoneHref: 'tel:+254700000000',
    whatsapp: '+254 700 000 000',
    address: 'P.O. Box 00000-00100, Nairobi, Kenya',
    hours: 'Monday – Friday, 8:30 am – 5:00 pm EAT',
  },
  social: [
    { name: 'Facebook', href: 'https://facebook.com/' },
    { name: 'Instagram', href: 'https://instagram.com/' },
    { name: 'X (Twitter)', href: 'https://x.com/' },
    { name: 'LinkedIn', href: 'https://linkedin.com/' },
    { name: 'YouTube', href: 'https://youtube.com/' },
  ],
} as const

export type Program = {
  slug: ProgramSlug
  title: string
  short: string
  description: string
  image: string
  focus: string[]
  howToHelp: string
}

export const programs: Program[] = [
  {
    slug: 'education',
    title: 'Education & Scholarships',
    short: 'Keeping children in school and opening doors to higher learning.',
    description:
      'We help learners from low-income households stay in school through scholarships, school supplies, mentorship and support for under-resourced classrooms. Our focus is on transition points where students are most at risk of dropping out — from primary to secondary school, and from secondary school to college.',
    image: 'education.png',
    focus: [
      'Secondary and tertiary scholarships',
      'School supplies, uniforms and sanitary kits',
      'Mentorship and career guidance',
      'Classroom and library improvements',
    ],
    howToHelp: 'Sponsor a scholarship or donate learning materials.',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare & Medical Outreach',
    short: 'Bringing essential care to communities far from clinics.',
    description:
      'Working alongside qualified local health workers, we organise medical outreach camps, maternal and child health sessions, and health education in communities with limited access to clinics. Referrals connect patients to public health facilities for follow-up care.',
    image: 'healthcare.png',
    focus: [
      'Mobile medical outreach camps',
      'Maternal and child health support',
      'Health and hygiene education',
      'Referrals and follow-up care',
    ],
    howToHelp: 'Fund an outreach camp or volunteer as a medical professional.',
  },
  {
    slug: 'food',
    title: 'Food & Emergency Assistance',
    short: 'Responding quickly when families face hunger or crisis.',
    description:
      'During droughts, floods and other emergencies we coordinate food parcels, clean water and essential household items for affected families, prioritising children, older people and people living with disabilities. Between emergencies we support school feeding and kitchen gardens.',
    image: 'food.png',
    focus: [
      'Emergency food parcels',
      'Clean water and hygiene kits',
      'School feeding support',
      'Kitchen gardens for food security',
    ],
    howToHelp: 'Give to the emergency fund so we can respond quickly.',
  },
  {
    slug: 'empowerment',
    title: 'Youth & Women Empowerment',
    short: 'Skills, savings and confidence to build independent livelihoods.',
    description:
      'Vocational training, digital skills, entrepreneurship coaching and savings groups help young people and women earn an income and lead change in their communities. Participants receive ongoing mentorship as they start or grow small businesses.',
    image: 'youth.png',
    focus: [
      'Vocational and digital skills training',
      'Entrepreneurship and business coaching',
      'Village savings and loan groups',
      'Leadership and life-skills mentorship',
    ],
    howToHelp: 'Sponsor a trainee or mentor a young entrepreneur.',
  },
  {
    slug: 'community',
    title: 'Community Development',
    short: 'Community-led projects that last for generations.',
    description:
      'We partner with local leaders to plan and deliver projects communities identify as priorities — water points, sanitation, climate-smart agriculture and tree planting. Every project includes local ownership and maintenance plans so the benefits endure.',
    image: 'community.png',
    focus: [
      'Water points and sanitation',
      'Climate-smart agriculture',
      'Tree planting and environmental care',
      'Community-led planning',
    ],
    howToHelp: 'Fund a community project or join a planting day.',
  },
]

export type Project = {
  title: string
  location: string
  program: ProgramSlug
  summary: string
  image: string
  raised: number
  goal: number
}

/** Sample featured projects. Funding progress figures are illustrative. */
export const featuredProjects: Project[] = [
  {
    title: 'Clean Water for Mwingi Villages',
    location: 'Kitui County, Kenya',
    program: 'community',
    summary:
      'Installing a borehole, storage tank and community taps so families no longer walk hours for water.',
    image: 'community.png',
    raised: 620000,
    goal: 1500000,
  },
  {
    title: 'Bright Futures Scholarship Fund',
    location: 'Nairobi & Machakos, Kenya',
    program: 'education',
    summary:
      'Covering secondary school fees, uniforms and mentorship for learners at risk of dropping out.',
    image: 'education.png',
    raised: 410000,
    goal: 1000000,
  },
  {
    title: 'Community Medical Outreach Camps',
    location: 'Turkana County, Kenya',
    program: 'healthcare',
    summary:
      'Bringing screenings, maternal care and health education to communities far from clinics.',
    image: 'healthcare.png',
    raised: 280000,
    goal: 800000,
  },
]

/**
 * Impact statistics are intentionally placeholders. Replace `value` with
 * verified figures (e.g. from an audited annual report) via the admin
 * dashboard before launch.
 */
export const impactStats = [
  { label: 'Students supported', value: null as number | null },
  { label: 'Patients reached through outreach', value: null as number | null },
  { label: 'Families receiving food assistance', value: null as number | null },
  { label: 'Community projects completed', value: null as number | null },
]

export const testimonials = [
  {
    quote:
      'The scholarship meant I could finish secondary school. Now I am studying to become a teacher so I can give back to children like me.',
    name: 'Faith W.',
    role: 'Scholarship recipient',
    location: 'Machakos',
  },
  {
    quote:
      'Before the water point, my daughters spent their mornings fetching water. Now they are in class on time and I have time for my farm.',
    name: 'Mama Grace',
    role: 'Community member',
    location: 'Kitui',
  },
  {
    quote:
      'The tailoring training and savings group helped me open my own shop. I now employ two young women from my village.',
    name: 'Amina H.',
    role: 'Empowerment programme graduate',
    location: 'Mombasa',
  },
]

export const news = [
  {
    slug: 'school-term-scholarships',
    title: 'New scholarship cohort begins the school term',
    date: '2026-10-28',
    category: 'Education',
    excerpt:
      'A new group of learners has joined the Bright Futures programme, supported by mentors from the local community.',
    image: 'gallery-3.png',
  },
  {
    slug: 'medical-camp-turkana',
    title: 'Medical outreach camp held in northern Kenya',
    date: '2026-10-09',
    category: 'Healthcare',
    excerpt:
      'Volunteer clinicians and community health workers provided screenings and maternal health sessions over three days.',
    image: 'gallery-4.png',
  },
  {
    slug: 'tree-planting-day',
    title: 'Volunteers and farmers plant seedlings together',
    date: '2026-09-21',
    category: 'Community',
    excerpt:
      'A community planting day brought families, schools and volunteers together to restore a hillside.',
    image: 'gallery-2.png',
  },
]

export const coreValues = [
  {
    title: 'Dignity',
    text: 'We treat every person as a partner, not a recipient, and tell their stories with respect and consent.',
  },
  {
    title: 'Integrity',
    text: 'We are honest about what we do, how we spend funds and what we still need to learn.',
  },
  {
    title: 'Community ownership',
    text: 'Local people set priorities and lead projects, so results last beyond our involvement.',
  },
  {
    title: 'Compassion',
    text: 'We act with empathy, especially for those most often left behind.',
  },
  {
    title: 'Accountability',
    text: 'We measure, report and welcome scrutiny from donors, partners and the communities we serve.',
  },
  {
    title: 'Sustainability',
    text: 'We favour long-term solutions that protect people and the environment.',
  },
]

/** Sample leadership profiles — replace with real team members. */
export const team = [
  {
    name: 'Dr. Naomi Achieng',
    role: 'Executive Director',
    bio: 'Public health practitioner with experience leading community health programmes in East Africa.',
    initials: 'NA',
  },
  {
    name: 'Samuel Kiprono',
    role: 'Director of Programmes',
    bio: 'Oversees programme design, monitoring and evaluation across all focus areas.',
    initials: 'SK',
  },
  {
    name: 'Lucy Wanjiru',
    role: 'Head of Finance & Compliance',
    bio: 'Leads financial management, internal controls and donor reporting.',
    initials: 'LW',
  },
  {
    name: 'David Otieno',
    role: 'Partnerships & Development Lead',
    bio: 'Builds relationships with partners, sponsors and supporters around the world.',
    initials: 'DO',
  },
]

export const galleryCategories = ['All', 'Community', 'Outreach', 'Events'] as const
export type GalleryCategory = (typeof galleryCategories)[number]

export const gallery: {
  image: string
  title: string
  category: Exclude<GalleryCategory, 'All'>
}[] = [
  { image: 'hero.png', title: 'The walk to school', category: 'Community' },
  { image: 'gallery-4.png', title: 'Maternal health clinic day', category: 'Outreach' },
  { image: 'gallery-1.png', title: 'Community sports day', category: 'Events' },
  { image: 'community.png', title: 'A new water point', category: 'Community' },
  { image: 'healthcare.png', title: 'Medical outreach camp', category: 'Outreach' },
  { image: 'gallery-3.png', title: 'Vocational training graduation', category: 'Events' },
  { image: 'gallery-2.png', title: 'Tree planting with farmers', category: 'Community' },
  { image: 'food.png', title: 'Emergency food distribution', category: 'Outreach' },
  { image: 'gallery-6.png', title: "Women's savings group", category: 'Community' },
  { image: 'gallery-5.png', title: 'Digital skills lab', category: 'Events' },
  { image: 'youth.png', title: 'Tailoring workshop', category: 'Outreach' },
  { image: 'education.png', title: 'Reading together', category: 'Community' },
]

export const donationAmounts = {
  KES: [1000, 2500, 5000, 10000],
  USD: [25, 50, 100, 250],
} as const
export type Currency = keyof typeof donationAmounts

/** What a gift can help with — framed as examples, not guarantees. */
export const giftExamples: Record<Currency, Record<number, string>> = {
  KES: {
    1000: 'Can help provide school supplies for a learner',
    2500: 'Can help provide a food parcel for a family',
    5000: 'Can help fund health screenings at an outreach camp',
    10000: 'Can contribute towards a term of secondary school fees',
  },
  USD: {
    25: 'Can help provide school supplies for a learner',
    50: 'Can help provide a food parcel for a family',
    100: 'Can help fund health screenings at an outreach camp',
    250: 'Can contribute towards a term of secondary school fees',
  },
}

export const campaigns = [
  {
    title: 'Back-to-School Drive',
    text: 'Help learners start the new term with uniforms, books and fees covered.',
  },
  {
    title: 'Drought Response Appeal',
    text: 'Support emergency food and water for families affected by failed rains.',
  },
  {
    title: 'Run for Hope',
    text: 'Take on a run, walk or cycle challenge and invite friends to sponsor you.',
  },
]

export function formatMoney(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === 'KES' ? 'en-KE' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

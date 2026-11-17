/**
 * SINGLE SOURCE OF TRUTH for website text.
 *
 * Edit taglines, prices, services, audience pathways and FAQs here.
 * Nothing else needs to change: every page reads from this file.
 *
 * Arabic rule: always write Arabic with full tashkeel, and give the
 * Egyptian Franco-Arab spelling next to it (3 = ع, 2 = ء, 7 = ح).
 */

export type World = "fusha" | "egyptian" | "quranic";

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export const brand = {
  nameArabic: "لِتَعَارَفُوا",
  nameLatin: "Li-ta'arafu",
  tagline: "To know one another.",
  verseReference: "Qur'an 49:13",
  description:
    "Living Arabic classes, courses and books that teach Fusha, everyday Egyptian Arabic and the Qur'an's most common words together, one root at a time.",
  /** Shown in the contact section and footer when filled in, e.g. "hello@yourdomain.com". */
  contactEmail: "",
  /**
   * WhatsApp number in international format, digits only (no "+", spaces
   * or dashes), e.g. "3725551234". Replace the placeholder before launch.
   */
  whatsappNumber: "[YOUR_WHATSAPP_NUMBER]",
};

/** wa.me link, optionally with a pre-filled message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${brand.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const navLinks = [
  { label: "Tracks", href: "/#tracks" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Who It's For", href: "/#who-its-for" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

/** Label of the main call to action in the header. */
export const primaryCta = "Book Free Assessment";

/* ------------------------------------------------------------------ */
/* Hero + newsletter                                                   */
/* ------------------------------------------------------------------ */

export const hero = {
  overline: "Living Arabic · Egyptian · Fusha · Qur'an",
  headline:
    "Making Arabic learning materials in every language possible on Earth.",
  subheadline:
    "Currently in English, with more languages coming soon. Many people come to Egypt to learn Fusha, only to find out nobody speaks it in real life—outside of official news and movie subtitles, everyone speaks dialect. Whether you want Fusha for university, Islamic studies, or personal interest, or you want to speak real Egyptian, we're happy to help.",
  primaryButton: "Book a Free 30-Min Level Assessment",
  primaryNote: "Free until the end of the year · Reg. €10",
  secondaryButton: "Message on WhatsApp",
  whatsappMessage:
    "Salam! I'm interested in Arabic classes and have a quick question.",
  trustStrip: [
    "Weekly roots & flashcards",
    "Full tashkeel & Franco-Arab",
    "Small groups, max 5 students",
    "Student progress portal",
  ],
};

/**
 * Learner goals. Used by the newsletter dropdown and the sign-up form.
 * `value` is what gets saved in the database, so keep values stable and
 * only change the labels.
 */
export const learnerGoals = [
  { value: "heritage", label: "I want to reconnect with my family's Arabic" },
  { value: "partner", label: "My partner or their family speaks Arabic" },
  { value: "egypt", label: "I'm moving to or spending time in Egypt" },
  {
    value: "university",
    label: "I'm studying Arabic or Middle Eastern studies at university",
  },
  { value: "parent", label: "I'm a parent looking for my child (ages 8–18)" },
  { value: "quran", label: "I want to understand the Qur'an's vocabulary" },
  { value: "curious", label: "I'm just curious about Arabic" },
] as const;

export type LearnerGoal = (typeof learnerGoals)[number]["value"];

export const newsletter = {
  prompt:
    "Get a new newsletter every week, packed with fresh roots, ready-to-use flashcards, and real lesson & homework examples.",
  emailLabel: "Email address",
  emailPlaceholder: "Your email address",
  goalLabel: "What brings you to Arabic?",
  goalPlaceholder: "Choose the closest fit",
  cta: "Send me weekly roots & flashcards →",
  microcopy:
    "Free every week, zero spam. Includes new roots, digital flashcards, real lesson & homework previews, plus early access to our books and courses.",
  successTitle: "You're on the list.",
  successBody:
    "Your first root is on its way. Check your inbox, and your spam folder just in case.",
};

/* ------------------------------------------------------------------ */
/* Choose your track                                                   */
/* ------------------------------------------------------------------ */

export const tracksSection = {
  overline: "Choose your track",
  header: "Three tracks. Pick the Arabic you actually need.",
  cta: "Start with a free assessment →",
};

/**
 * The three bookable tracks. `value` is passed to the booking modal so
 * the right track is pre-selected.
 */
export const tracks: {
  value: string;
  world: World;
  title: string;
  body: string;
}[] = [
  {
    value: "Egyptian Dialect",
    world: "egyptian",
    title: "Egyptian Dialect",
    body: "Speak the Arabic people actually use at home, in cafés, and with friends. We use both Arabic script and Franco-Arab so you can start talking from day one without waiting months to master reading.",
  },
  {
    value: "Fusha Arabic",
    world: "fusha",
    title: "Fusha Arabic",
    body: "Learn Modern Standard Arabic for reading, writing, media, or formal speaking—whether you need it for university, research, or personal interest. Seeing how Fusha shares roots with Egyptian dialect makes both much easier to grasp.",
  },
  {
    value: "Qur'anic Arabic",
    world: "quranic",
    title: "Qur'anic Arabic",
    body: "Understand what you're reciting without getting buried in heavy grammar books. Because the Qur'an is written in classical Fusha—and is the most important piece of literature in the Arabic language—studying Fusha naturally connects you to its roots and expressions too.",
  },
];

/** Track choices offered inside the booking modal. */
export const bookingTrackOptions = [
  ...tracks.map((track) => track.value),
  "Combined tracks",
  "Not sure yet",
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  overline: "How it works",
  header: "One root. Three worlds.",
  intro:
    "Classroom Arabic, dinner-table Arabic, and the Arabic of the Qur'an all grow from the same three-letter roots. Learn a root once and you start recognising it everywhere.",
  worlds: [
    {
      world: "fusha" as World,
      label: "Fusha",
      title: "The source code",
      body: "The Arabic of books, news, and formal speech across the region.",
    },
    {
      world: "egyptian" as World,
      label: "Egyptian Arabic",
      title: "The remix",
      body: "Everyday spoken Arabic, widely understood thanks to Egyptian film and music.",
    },
    {
      world: "quranic" as World,
      label: "Qur'anic meaning",
      title: "The deep root",
      body: "High-frequency Qur'anic words, explained in plain English.",
    },
  ],
  steps: [
    {
      title: "Start with one root",
      body: "Three letters unlock a whole family of words.",
    },
    {
      title: "Follow it through three worlds",
      body: "See it on the page, hear it on a Cairo street, recognise it in a verse.",
    },
    {
      title: "Use it with real people",
      body: "Every lesson ends with something you can say that same day.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Interactive root preview                                            */
/* ------------------------------------------------------------------ */

export const sampleSection = {
  overline: "Try it yourself",
  header: "Pick a root and watch it live three lives.",
  subheader: "Explore a root below, then flip a sample flashcard.",
  flashcardsTitle: "Flip a sample flashcard",
  flashcardsHint: "Three cards from the weekly pack. Tap a card to turn it over.",
  newsletterTitle: "Want a fresh root every week?",
  newsletterBody:
    "Join the free weekly newsletter for new roots and ready-to-use flashcards.",
};

/* ------------------------------------------------------------------ */
/* Who it's for (audience cards, not bookable)                         */
/* ------------------------------------------------------------------ */

export const audiencesSection = {
  overline: "Who it's for",
  header: "Everyone comes to Arabic for someone. Sound familiar?",
};

/**
 * Audience cards.
 *
 * - `image`  path to a real photo inside /public (16:10 works best).
 *            Leave empty to show the neutral placeholder.
 * - `logo`   optional badge shown on the top-left of the image area.
 */
export const audiences: {
  slug: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  logo?: { src: string; alt: string };
}[] = [
  {
    slug: "partners",
    title: "Partners & Egypt-Bound Learners",
    body: "Tired of your partner translating every joke at family dinner—or heading to Cairo and realizing textbook Arabic doesn't work in a taxi? Learn real, everyday Egyptian so you can actually join the conversation.",
    image: "",
    imageAlt: "",
  },
  {
    slug: "heritage",
    title: "Heritage Adults & Diaspora Families",
    body: "You understand Arabic when relatives speak, but freeze when it's your turn to reply—or you want your kids to stay connected to their roots without boring weekend drills. We build lessons around real family conversations.",
    image: "",
    imageAlt: "",
  },
  {
    slug: "tallinn-university",
    title: "Tallinn University Students (Middle Eastern & Arabic Studies)",
    body: "Studying Middle Eastern & Arabic Studies in Tallinn where good study materials are hard to find? Get structured practice, exam prep, and custom-built study guides and flashcards tailored to your coursework—plus 10% off all classes with code TLU10.",
    image: "",
    imageAlt: "",
    logo: { src: "/images/tlu-logo.svg", alt: "Tallinn University" },
  },
  {
    slug: "quran",
    title: "Qur'anic Readers & Curious Minds",
    body: "You can read the Arabic letters smoothly, but the meaning still drifts past you. Instead of memorizing long vocabulary lists, learn the high-frequency roots that unlock verses you already know by heart.",
    image: "",
    imageAlt: "",
  },
];

/* ------------------------------------------------------------------ */
/* Classes & pricing                                                   */
/* ------------------------------------------------------------------ */

export const pricingSection = {
  overline: "Classes & pricing",
  header: "Simple pricing. Start with a free assessment.",
  subheader:
    "Choose a monthly package for the best per-class rate, or pay by the class. Every option is available for Egyptian Dialect, Fusha, or Qur'anic Arabic.",
  /** Shown next to every discounted price. */
  promoLabel: "Until the end of the year",
  monthlyLabel: "Monthly Packages",
  byClassLabel: "By-Class",
};

/**
 * Bookable services: everything the booking modal and /api/book accept.
 *
 * - `priceEur`        the price charged right now (0 shows as "Free")
 * - `regularPriceEur` the normal price, shown struck through.
 *                     Set to `null` when there is no promotion.
 * - `calendarKey`     which calendar link from lib/siteConfig.ts to offer
 *
 * `slug` is saved with every booking, so do not rename existing slugs.
 */
export const services = [
  {
    slug: "assessment",
    title: "30-Minute Level Assessment",
    shortTitle: "Level assessment",
    priceEur: 0,
    regularPriceEur: 10 as number | null,
    unit: "",
    calendarKey: "assessment",
  },
  {
    slug: "one-on-one-4",
    title: "1:1 Private Classes · 4 classes a month",
    shortTitle: "1:1 private · 4 classes / month",
    priceEur: 105,
    regularPriceEur: null as number | null,
    unit: "/ month",
    calendarKey: "oneOnOne",
  },
  {
    slug: "one-on-one-8",
    title: "1:1 Private Classes · 8 classes a month",
    shortTitle: "1:1 private · 8 classes / month",
    priceEur: 200,
    regularPriceEur: null as number | null,
    unit: "/ month",
    calendarKey: "oneOnOne",
  },
  {
    slug: "one-on-one",
    title: "1:1 Private Class · single class",
    shortTitle: "1:1 private · single class",
    priceEur: 30,
    regularPriceEur: null as number | null,
    unit: "/ class",
    calendarKey: "oneOnOne",
  },
  {
    slug: "small-group-monthly",
    title: "Small-Group Cohort · 4 classes a month",
    shortTitle: "Small group · 4 classes / month",
    priceEur: 35,
    regularPriceEur: null as number | null,
    unit: "/ month",
    calendarKey: "group",
  },
  {
    slug: "small-group",
    title: "Small-Group Cohort · single class",
    shortTitle: "Small group · single class",
    priceEur: 10,
    regularPriceEur: null as number | null,
    unit: "/ class",
    calendarKey: "group",
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceSlug = Service["slug"];

/** "Free" for a zero price, otherwise "€30". */
export function priceLabel(priceEur: number) {
  return priceEur === 0 ? "Free" : `€${priceEur}`;
}

/** The universal first step, shown above the pricing cards in both views. */
export const assessmentOffer = {
  serviceSlug: "assessment" as ServiceSlug,
  badge: "Your first step",
  title: "30-Minute Level Assessment",
  price: "FREE",
  regularPrice: "€10",
  description:
    "Tailored to whichever track you want to explore—Egyptian Dialect, Fusha, or Qur'anic Arabic—plus a personal learning roadmap.",
  cta: "Book Free Assessment",
};

type PlanOption = {
  /** Which entry in `services` the button books. */
  serviceSlug: ServiceSlug;
  price: string;
  unit: string;
  detail: string;
  cta: string;
};

/** The two pricing cards. Each has a monthly view and a by-class view. */
export const pricingPlans: {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  monthly: PlanOption[];
  byClass: PlanOption[];
}[] = [
  {
    id: "private",
    title: "1:1 Private Classes",
    subtitle: "Choose Egyptian, Fusha, or Qur'an",
    features: [
      "100% tailored curriculum",
      "Weekly root sheets",
      "Flashcards",
      "Student portal tracking",
    ],
    monthly: [
      {
        serviceSlug: "one-on-one-4",
        price: "€105",
        unit: "/ month",
        detail: "4 classes · €26.25/class",
        cta: "Book 4 classes",
      },
      {
        serviceSlug: "one-on-one-8",
        price: "€200",
        unit: "/ month",
        detail: "8 classes · €25/class",
        cta: "Book 8 classes",
      },
    ],
    byClass: [
      {
        serviceSlug: "one-on-one",
        price: "€30",
        unit: "/ class",
        detail: "60 min",
        cta: "Book a 1:1 class",
      },
    ],
  },
  {
    id: "group",
    title: "Small-Group Cohort (Max 5 Students)",
    subtitle: "Grouped by track & level",
    features: [
      "Goal-matched cohorts (Egyptian, Fusha, or Qur'an)",
      "Active speaking airtime",
    ],
    monthly: [
      {
        serviceSlug: "small-group-monthly",
        price: "€35",
        unit: "/ month",
        detail: "4 classes · €8.75/class",
        cta: "Reserve a group spot",
      },
    ],
    byClass: [
      {
        serviceSlug: "small-group",
        price: "€10",
        unit: "/ class",
        detail: "60 min",
        cta: "Reserve a group spot",
      },
    ],
  },
];

/** Discount strip under the pricing cards. `code` is highlighted in the body. */
export const discounts: { title: string; body: string; code?: string }[] = [
  {
    title: "Combine Two Tracks — Save 10%",
    body: "Pair any two monthly tracks (such as Fusha + Qur'an or Egyptian + Qur'an) and get 10% off your combined monthly total.",
  },
  {
    title: "Tallinn University Student Discount",
    body: "Enrolled in Middle Eastern & Arabic Studies at Tallinn University? Use code TLU10 at booking for 10% off any package or single class.",
    code: "TLU10",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  overline: "Contact",
  header: "Have a quick question? Just ask.",
  intro:
    "WhatsApp is the fastest way to reach us. Prefer writing it down? Use the form and we'll get back to you.",
  whatsappButton: "Message on WhatsApp",
  floatingLabel: "Chat with us on WhatsApp",
  emailNote: "Prefer email? Write to us at",
  emailNoteFallback:
    "Prefer email? Leave your address in the form and we'll reply there.",
  form: {
    nameLabel: "Name",
    contactLabel: "Email or WhatsApp",
    contactPlaceholder: "you@example.com or +372…",
    trackLabel: "Track of interest",
    trackPlaceholder: "Choose a track",
    submit: "Send Message",
    successTitle: "Message sent.",
    successBody: "Thank you! We'll get back to you shortly.",
  },
};

/** Track choices in the contact form. Values are sent to /api/contact. */
export const contactTracks = [
  "Egyptian",
  "Fusha",
  "Qur'an",
  "Combined",
  "Tallinn University Student",
] as const;

export const bookingModal = {
  intro:
    "Tell us when you're usually free and we'll confirm a time by email, normally within a day.",
  calendarPrompt: "Prefer to pick a slot yourself?",
  calendarButton: "Open the booking calendar ↗",
  schedulePlaceholder: "e.g. Weekday evenings after 18:00, or Saturday mornings",
  trackLabel: "Track",
  discountLabel: "Discount code",
  discountPlaceholder: "e.g. TLU10",
  notesPlaceholder:
    "Your level, your goals, your child's age, or anything else that helps us prepare",
  submit: "Request this session",
  successTitle: "Request received.",
  successBody:
    "We'll email you to confirm a time. Nothing is charged until your session is confirmed.",
  successSignedIn: "This session now appears in your dashboard as pending.",
  successGuest:
    "Create a free student account with this same email and the booking will appear in your dashboard automatically.",
};

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export const faqSection = {
  overline: "Good questions",
  header: "Before you book",
};

export const faqs = [
  {
    question: "I'm a complete beginner. Is this for me?",
    answer:
      "Yes. Start with the 30-minute level assessment. We'll find out what you already know (often more than you think), talk through why you want Arabic, and suggest a first step that fits how you learn.",
  },
  {
    question: "Why do you start with Egyptian Arabic?",
    answer:
      "Decades of cinema, music, and everyday storytelling have made Egyptian the most widely understood way of speaking across the Arab world. It gives you warmth and intimacy with people; Fusha, which you learn alongside it, gives you reach across the whole region.",
  },
  {
    question: "Do I need to read Arabic script first?",
    answer:
      "No. Every Arabic word we teach comes with full tashkeel (the short-vowel marks) and Egyptian Franco-Arab spelling, the way Egyptians actually text. You can start speaking straight away and pick up the script as you go.",
  },
  {
    question: "What are the 3, 2 and 7 doing inside the words?",
    answer:
      "That's Franco-Arab. Arabic has sounds English letters can't show, so Egyptians borrow numbers that look like the Arabic letters: 3 for ع, 2 for the glottal stop ء, and 7 for ح. No academic dots or dashes to decode.",
  },
  {
    question: "Is the Qur'anic content only for Muslims?",
    answer:
      "Everyone is welcome. We explain high-frequency Qur'anic vocabulary clearly and accurately as language, in everyday English. It is never preachy or sectarian, and you can focus only on Fusha and spoken Egyptian if you prefer.",
  },
  {
    question: "How do booking and payment work?",
    answer:
      "Send a booking request with the times that usually suit you. We reply by email to confirm a slot and share payment details. Nothing is charged until your session is confirmed.",
  },
  {
    question: "What is the student portal?",
    answer:
      "A free account where you can see your booked and past classes, your video meeting links, your progress, and a running list of every root and topic you've covered, with the homework that went with it.",
  },
  {
    question: "How long until I can actually hold a conversation?",
    answer:
      "We don't promise fluency in 30 days. With steady weekly learning, most people feel a real, noticeable difference in everyday conversation within about a year, and small wins (a greeting that lands, a joke you catch) from the very first weeks.",
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  verseArabic:
    "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
  verseEnglish:
    "“O people, We created you from a male and a female, and made you nations and tribes so that you may know one another.”",
  signoffArabic: "مَعَ السَّلَامَة",
  signoffFranco: "ma3a s-salaama",
  signoffMeaning: "go with safety",
};

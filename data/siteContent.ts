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
  /** Shown in the footer when filled in, e.g. "hello@yourdomain.com". */
  contactEmail: "",
};

export const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Sample Lesson & Flashcards", href: "/#sample-lesson" },
  { label: "Who It's For", href: "/#who-its-for" },
  { label: "Classes & Pricing", href: "/#classes" },
];

/* ------------------------------------------------------------------ */
/* Hero + newsletter                                                   */
/* ------------------------------------------------------------------ */

export const hero = {
  overline: "Living Arabic · Fusha · Egyptian · Qur'an",
  headline: "One root. Three worlds. Arabic made for real life.",
  subheadline:
    "Most classes wall off Fusha from how people actually talk, leaving you stuck in the middle. We teach Fusha, everyday Egyptian Arabic, and the Qur'an's most common words together, one root at a time. Classes, courses, and books built for different learning styles and every language.",
  trustStrip: [
    "Weekly roots & flashcards",
    "Real lesson & homework previews",
    "Full tashkeel & Franco-Arab",
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
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  overline: "How it works",
  header: "Arabic is one language. We teach it that way.",
  intro:
    "You learn one kind of Arabic in a classroom, hear a completely different one around the dinner table, and meet a third when you open the Qur'an. Most schools treat those as three separate subjects. We treat them as one family growing from the same roots.",
  worlds: [
    {
      world: "fusha" as World,
      label: "Fusha",
      title: "The source code",
      body: "The Arabic of books, headlines, poetry and song lyrics. It travels everywhere in the region, and everyday speech is built on top of it.",
    },
    {
      world: "egyptian" as World,
      label: "Egyptian Arabic",
      title: "The remix",
      body: "Spoken, living Arabic. Decades of cinema and music have made Egyptian the most widely understood way of speaking across the Arab world.",
    },
    {
      world: "quranic" as World,
      label: "Qur'anic meaning",
      title: "The deep root",
      body: "High-frequency Qur'anic words explained in plain English, with no heavy jargon and no watered-down meanings.",
    },
  ],
  steps: [
    {
      title: "Start with one root",
      body: "Every lesson opens with three letters. Learn them once and you hold the key to a whole family of words.",
    },
    {
      title: "Follow it through three worlds",
      body: "See the same root on the page, hear it on a Cairo street, and recognise it in a verse you may already know by heart.",
    },
    {
      title: "Use it with real people",
      body: "Grammar serves relationships, not the other way around. Every lesson ends with something you can say to someone that day.",
    },
  ],
  clickMoment: {
    title: "We build toward the “click”",
    body: "Around 6 to 12 months in, learners hit a moment where they hear a casual street phrase, recognise its Fusha root straight away, and connect it to a Qur'anic verse. No promises of fluency in 30 days: our honest promise is real, noticeable connection within about a year of steady learning.",
  },
};

/* ------------------------------------------------------------------ */
/* Section headers for the sample area                                 */
/* ------------------------------------------------------------------ */

export const sampleSection = {
  overline: "Sample lesson & flashcards",
  header:
    "See how one root lives three lives, and preview what's inside every lesson.",
  subheader:
    "Almost every Arabic word grows out of a three-letter root. Learn that root once, and you start hearing it in books, on Cairo streets, and in the Qur'an. Explore a root below, flip a sample flashcard, or peek at real lesson and homework material.",
  flashcardsTitle: "Flip a sample flashcard",
  flashcardsHint: "Three cards from the weekly pack. Tap a card to turn it over.",
  peekTitle: "Peek inside a lesson & homework",
  showcaseCta:
    "Want fresh roots, flashcards, and lesson & homework examples every week?",
  showcaseButton: "Subscribe free →",
};

/* ------------------------------------------------------------------ */
/* Audience pathways                                                   */
/* ------------------------------------------------------------------ */

export const pathwaysSection = {
  overline: "Who it's for",
  header: "Everyone comes to Arabic for someone. Find your path.",
};

export const pathways: {
  slug: string;
  audience: string;
  world: World;
  headline: string;
  painPoint: string;
  howWeHelp: string;
  cta: string;
  /** Which service the button opens in the booking modal. */
  serviceSlug: string;
}[] = [
  {
    slug: "heritage",
    audience: "Heritage Adults",
    world: "egyptian",
    headline: "Your Arabic isn't gone. It's waiting.",
    painPoint:
      "You catch more than you can say. You smile along at family dinners, freeze the second someone asks you a question, and feel like a guest inside your own family's language.",
    howWeHelp:
      "We start from the sounds you already grew up hearing, real Egyptian and family dialect, and gently connect them to Fusha and the script, so you can talk with your relatives and feel at home in your voice.",
    cta: "Reconnect with your roots →",
    serviceSlug: "assessment",
  },
  {
    slug: "partners",
    audience: "Partners & Egypt-Bound Learners",
    world: "fusha",
    headline: "Be in on the joke at the family table.",
    painPoint:
      "Your partner translates everything for you, or your in-laws switch to English to be polite. Or you're heading to Cairo for work and life, and stiff phrasebooks fall flat five minutes off the plane.",
    howWeHelp:
      "Real spoken Egyptian for real situations (family dinners, taxis, the office, the neighbourhood 2ahwa), paired with the cultural context behind what people say and enough Fusha to read menus, signs, and messages.",
    cta: "Start speaking Egyptian →",
    serviceSlug: "one-on-one",
  },
  {
    slug: "students",
    audience: "University & Academic Students (18–70)",
    world: "fusha",
    headline: "Make your Fusha work in the real world.",
    painPoint:
      "You can break down an editorial article on paper, yet you can't follow a two-minute conversation on the street. Your research, study abroad, or degree needs both, and most departments only teach one.",
    howWeHelp:
      "Sharp, structured Fusha tutoring tailored to your coursework and exams, taught side by side with spoken Egyptian so your academic Arabic connects to living culture.",
    cta: "Get academic support →",
    serviceSlug: "homework-check",
  },
  {
    slug: "youth",
    audience: "Diaspora Youth (Ages 8–18) · For Parents",
    world: "quranic",
    headline: "Arabic they'll actually want to speak.",
    painPoint:
      "Weekend classes feel like extra homework, their vocabulary shrinks every year, and you don't want them losing touch with who they are.",
    howWeHelp:
      "Lively, age-appropriate lessons built around stories, games, music, and real conversations they can have with their cousins, teaching them to read, write, and speak with confidence.",
    cta: "Find a class for my child →",
    serviceSlug: "small-group",
  },
  {
    slug: "quran",
    audience: "Qur'anic Vocabulary Learners",
    world: "quranic",
    headline: "Understand what you're reciting.",
    painPoint:
      "You can read the Arabic script smoothly, yet the meaning drifts past you. Heavy tafseer volumes feel overwhelming, and side-by-side translations never show you how the Arabic words themselves work.",
    howWeHelp:
      "Short, plain-English mini-courses built around the Qur'an's highest-frequency roots. Because a small core of roots makes up most of the text, every lesson unlocks verses you already know by heart.",
    cta: "Start understanding the Qur'an →",
    serviceSlug: "one-on-one",
  },
];

/* ------------------------------------------------------------------ */
/* Classes & pricing                                                   */
/* ------------------------------------------------------------------ */

export const pricingSection = {
  overline: "Classes & pricing",
  header: "Start learning your way. Book a session or join a small group.",
  subheader:
    "Honest, transparent pricing, with special year-end rates available through the end of the year. Create a free student account anytime to track your booked classes, progress, and covered topics.",
  /** Shown next to every discounted price. */
  promoLabel: "Until the end of the year",
};

/**
 * Bookable services.
 *
 * - `priceEur`        the price charged right now
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
    priceEur: 5,
    regularPriceEur: 10 as number | null,
    unit: "",
    badge: "Best first step",
    copy: "Not sure where to begin? Sit down for a relaxed 30-minute 1:1 chat so we can gauge your current level across Fusha, spoken Egyptian, or Qur'anic reading, talk through your goals, and map out the clearest next step for your learning style.",
    cta: "Book 30-min assessment (€5) →",
    calendarKey: "assessment",
  },
  {
    slug: "one-on-one",
    title: "1:1 Tailored Private Classes",
    shortTitle: "1:1 private class",
    priceEur: 30,
    regularPriceEur: 40 as number | null,
    unit: "/ class",
    badge: "Year-end offer",
    copy: "Private lessons built 100% around your goals, pace, and learning style, whether you want spoken Egyptian for family and travel, structured Fusha, Qur'anic roots, or all three woven together. Flexible scheduling across time zones for ages 8 to 70.",
    cta: "Book a 1:1 class (€30) →",
    calendarKey: "oneOnOne",
  },
  {
    slug: "small-group",
    title: "Small-Group Classes (Max 5 Students)",
    shortTitle: "Small-group class",
    priceEur: 10,
    regularPriceEur: 15 as number | null,
    unit: "/ person",
    badge: "Max 5 students",
    copy: "Learn together and start speaking sooner in tight-knit groups capped at just 5 students. Cohorts are matched by goal and level (heritage learners, partners, students, or youth) so everyone gets plenty of airtime, real conversation, and shared momentum.",
    cta: "Reserve a group spot (€10) →",
    calendarKey: "group",
  },
  {
    slug: "homework-check",
    title: "University Homework Check (Arabic & Middle Eastern Studies)",
    shortTitle: "University homework check",
    priceEur: 15,
    regularPriceEur: null as number | null,
    unit: "/ session",
    badge: "For uni students",
    copy: "Studying Arabic or Middle Eastern Studies at university and want a sharp second pair of eyes before you submit? Get targeted feedback on your grammar, vocalization (tashkeel), translation nuances, and Fusha style, helping you spot mistakes and understand the why behind every correction.",
    cta: "Book a homework check (€15) →",
    calendarKey: "homework",
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceSlug = Service["slug"];

export const comingSoon = {
  title: "Upcoming Books & Self-Paced Mini-Courses",
  status: "In development",
  badge: "Coming soon",
  copy: "We are currently developing original books and bite-sized digital courses designed for different learning styles, putting Fusha, Egyptian Arabic, and Qur'anic meaning side by side on every page. Join the weekly newsletter to get first dibs and subscriber launch discounts when they drop.",
  cta: "Join the early-access list ↑",
};

export const bookingModal = {
  intro:
    "Tell us when you're usually free and we'll confirm a time by email, normally within a day.",
  calendarPrompt: "Prefer to pick a slot yourself?",
  calendarButton: "Open the booking calendar ↗",
  schedulePlaceholder: "e.g. Weekday evenings after 18:00, or Saturday mornings",
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

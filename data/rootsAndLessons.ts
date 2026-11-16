/**
 * Roots, flashcards, sample lessons and sample homework.
 *
 * To add a new weekly root: copy one object inside `roots`, change the
 * text, and save. It appears as a new tab on the home page automatically.
 * The same goes for `flashcards`, `lessonExcerpt` and `homeworkExcerpt`.
 *
 * House rules for every entry:
 *   - `ar`      Arabic with FULL tashkeel
 *   - `franco`  Egyptian Franco-Arab (3 = ع, 2 = ء / spoken ق, 7 = ح,
 *               q = Fusha ق, kh, gh, sh, long vowels aa / ee / oo)
 *   - no academic dots or macrons anywhere
 */

export type ArabicEntry = {
  ar: string;
  franco: string;
  meaning: string;
  /** Optional usage tip shown in smaller text. */
  note?: string;
  /** Optional verse reference such as "49:13" (Qur'anic entries). */
  reference?: string;
};

export type RootWorld = {
  entries: ArabicEntry[];
  /** Label of the closing note, e.g. "Pattern note" or "Culture note". */
  noteLabel: string;
  note: string;
};

export type Root = {
  id: string;
  /** Root letters, right-to-left order as written: ["ع", "ر", "ف"]. */
  letters: [string, string, string];
  franco: string;
  gloss: string;
  coreIdea: string;
  fusha: RootWorld;
  egyptian: RootWorld;
  quranic: RootWorld;
};

export const roots: Root[] = [
  {
    id: "3rf",
    letters: ["ع", "ر", "ف"],
    franco: "3 - R - F",
    gloss: "knowing, recognizing",
    coreIdea:
      "Recognizing someone or something, and becoming familiar with them.",
    fusha: {
      entries: [
        {
          ar: "عَرَفَ / يَعْرِفُ",
          franco: "3arafa / ya3rifu",
          meaning: "he knew, recognized / he knows",
        },
        {
          ar: "مَعْرِفَة",
          franco: "ma3rifa",
          meaning: "knowledge, acquaintance",
        },
        {
          ar: "تَعَارَفَ",
          franco: "ta3aarafa",
          meaning: "to get to know one another",
        },
        {
          ar: "تَعَارُف",
          franco: "ta3aaruf",
          meaning: "getting acquainted, introductions",
        },
        {
          ar: "اِعْتَرَفَ",
          franco: "i3tarafa",
          meaning: "to admit, acknowledge",
        },
        {
          ar: "عُرْف",
          franco: "3urf",
          meaning: "custom, what a community recognizes as normal",
        },
      ],
      noteLabel: "Pattern note",
      note: "Adding the ta-aa shape (tafaa3ala) turns an action into something two people do together. ta3aarafa literally means knowing each other. That's where our name comes from.",
    },
    egyptian: {
      entries: [
        {
          ar: "عِرِفْت",
          franco: "3irift",
          meaning: "I found out / I knew",
        },
        {
          ar: "إِنْتَ عَارِف…؟",
          franco: "inta 3aaref…?",
          meaning: "Do you know…?",
          note: "Use inti 3arfa when talking to a woman.",
        },
        {
          ar: "مَعْرَفْش",
          franco: "ma3rafsh",
          meaning: "I don't know",
          note: "Easily one of the top five phrases you'll hear in Egypt.",
        },
        {
          ar: "اِتْعَرَّفْنَا",
          franco: "it3arrafna",
          meaning: "We got to know each other / we met",
        },
        {
          ar: "دَه مَعْرِفَة",
          franco: "da ma3rifa",
          meaning: "He's someone I know / an acquaintance",
        },
      ],
      noteLabel: "How it shifts",
      note: "Fusha 3arafa softens into 3irif in Cairo. The short vowels move around, but the three root consonants (3 - R - F) never budge.",
    },
    quranic: {
      entries: [
        {
          ar: "لِتَعَارَفُوا",
          franco: "li-ta3aarafoo",
          reference: "49:13",
          meaning: "“so that you may know one another.”",
          note: "Human diversity isn't framed as a barrier. It's an invitation to get to know each other.",
        },
        {
          ar: "الْمَعْرُوف",
          franco: "al-ma3roof",
          reference: "e.g. 3:104",
          meaning: "literally “what is recognized”",
          note: "The kind of decency and goodness any human heart naturally recognizes as right.",
        },
      ],
      noteLabel: "In one line",
      note: "In the Qur'an, knowing is never just trivia. It's about knowing people and recognizing what is good.",
    },
  },
  {
    id: "ktb",
    letters: ["ك", "ت", "ب"],
    franco: "K - T - B",
    gloss: "writing",
    coreIdea:
      "Writing something down, and by extension what is recorded, settled, or meant to be.",
    fusha: {
      entries: [
        {
          ar: "كَتَبَ / يَكْتُبُ",
          franco: "kataba / yaktubu",
          meaning: "he wrote / he writes",
        },
        { ar: "كِتَاب", franco: "kitaab", meaning: "book" },
        { ar: "كَاتِب", franco: "kaatib", meaning: "writer, author" },
        {
          ar: "مَكْتَب",
          franco: "maktab",
          meaning: "desk, office",
          note: "The place where writing happens.",
        },
        {
          ar: "مَكْتَبَة",
          franco: "maktaba",
          meaning: "library, bookshop",
        },
        {
          ar: "مَكْتُوب",
          franco: "maktoob",
          meaning: "written; a letter",
        },
      ],
      noteLabel: "Pattern note",
      note: "Put ma- in front of a root and you get the place where that action happens. maktab is where you write, just like madrasa is where you study (root D - R - S).",
    },
    egyptian: {
      entries: [
        {
          ar: "بِيِكْتِب",
          franco: "biyiktib",
          meaning: "he's writing / he writes",
        },
        {
          ar: "اِكْتِبْ لِي رَقْمَك",
          franco: "iktib-li ra2mak",
          meaning: "Write down your number for me",
        },
        {
          ar: "مَكْتُوب",
          franco: "maktoob",
          meaning: "It was meant to be",
          note: "Literally “it's written”. Said about fate, love, and life's twists.",
        },
        {
          ar: "كَتْب الْكِتَاب",
          franco: "katb il-kitaab",
          meaning: "The marriage-contract ceremony",
          note: "Literally “writing the book”.",
        },
        {
          ar: "الْمَكْتَبَة",
          franco: "il-maktaba",
          meaning: "The bookshop / stationery store",
        },
      ],
      noteLabel: "Culture note",
      note: "In Egypt, katb il-kitaab is one of the happiest celebrations in a family's life. A root about putting pen to paper became the everyday phrase for a lifelong commitment.",
    },
    quranic: {
      entries: [
        {
          ar: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
          franco: "dhaalika l-kitaabu laa rayba feeh",
          reference: "2:2",
          meaning: "“This is the Book, about which there is no doubt.”",
          note: "Throughout the text, the Qur'an refers to itself simply as al-Kitaab, The Book.",
        },
        {
          ar: "كُتِبَ عَلَيْكُمُ الصِّيَامُ",
          franco: "kutiba 3alaykumu s-siyaam",
          reference: "2:183",
          meaning: "“Fasting has been prescribed for you”",
          note: "Literally “written upon you”.",
        },
      ],
      noteLabel: "In one line",
      note: "When the Qur'an says something is “written,” it means it is settled and binding, which echoes right back in the Egyptian expression maktoob.",
    },
  },
  {
    id: "slm",
    letters: ["س", "ل", "م"],
    franco: "S - L - M",
    gloss: "safety, peace, wholeness",
    coreIdea:
      "Being safe, whole, and unharmed, and passing that peace on to someone else.",
    fusha: {
      entries: [
        {
          ar: "سَلِمَ",
          franco: "salima",
          meaning: "to be safe, sound, unharmed",
        },
        { ar: "سَلَام", franco: "salaam", meaning: "peace; greeting" },
        {
          ar: "سَلِيم",
          franco: "saleem",
          meaning: "sound, whole, healthy",
        },
        {
          ar: "سَلَّمَ",
          franco: "sallama",
          meaning: "to greet; to hand over safely",
        },
        {
          ar: "أَسْلَمَ",
          franco: "2aslama",
          meaning: "to entrust or submit oneself wholly",
        },
        {
          ar: "إِسْلَام / مُسْلِم",
          franco: "2islaam / muslim",
          meaning: "wholehearted peace and submission / one who lives in it",
        },
      ],
      noteLabel: "Pattern note",
      note: "Doubling the middle letter (sallama) often means causing that state for someone else: making someone feel safe becomes greeting them warmly.",
    },
    egyptian: {
      entries: [
        {
          ar: "سَلَامُو عَلِيكُو",
          franco: "salaamu 3aleeku",
          meaning: "Hello",
          note: "Everyday Cairo pronunciation.",
        },
        {
          ar: "مَعَ السَّلَامَة",
          franco: "ma3a s-salaama",
          meaning: "Goodbye",
          note: "Literally “go with safety”.",
        },
        {
          ar: "سَلَام!",
          franco: "salaam!",
          meaning: "Bye!",
          note: "Quick and casual.",
        },
        {
          ar: "تِسْلَم إِيدَك",
          franco: "tislam eedak",
          meaning: "Thank you / bless your hands",
          note: "Said when someone cooks, makes tea, or helps you. Say eedik to a woman.",
        },
        {
          ar: "سَلِّم لِي عَلَى مَامَا",
          franco: "sallim-li 3ala maama",
          meaning: "Say hi to your mom for me",
        },
        {
          ar: "سَلَامْتَك",
          franco: "salamtak",
          meaning: "Get well soon / hope you're okay",
          note: "Literally “your safety”. Say salamtik to a woman.",
        },
      ],
      noteLabel: "Culture note",
      note: "Egyptians weave this root into conversation dozens of times a day. Every goodbye, thank-you, and get-well wish is literally wishing the other person safety.",
    },
    quranic: {
      entries: [
        {
          ar: "السَّلَامُ",
          franco: "as-Salaam",
          reference: "59:23",
          meaning: "One of God's names: The Source of Peace",
          note: "Completely free of any flaw or harm.",
        },
        {
          ar: "بِقَلْبٍ سَلِيمٍ",
          franco: "bi-qalbin saleem",
          reference: "26:89",
          meaning: "Coming to God “with a sound heart”",
          note: "A heart that is whole, clear, and uncorrupted.",
        },
        {
          ar: "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ",
          franco: "salaamun qawlan min rabbin ra7eem",
          reference: "36:58",
          meaning: "“Peace: a word from a Merciful Lord.”",
        },
      ],
      noteLabel: "In one line",
      note: "In the Qur'an, salaam goes far deeper than “hello”. It means wholeness and safety, and every street greeting in Cairo carries a quiet echo of it.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Flashcards (the flip-card deck on the home page)                    */
/* ------------------------------------------------------------------ */

export type Flashcard = {
  id: string;
  ar: string;
  franco: string;
  /** Root letters shown on the front, e.g. "س - ل - م". */
  rootLetters: string;
  world: "fusha" | "egyptian" | "quranic";
  meaning: string;
  tip: string;
};

export const flashcards: Flashcard[] = [
  {
    id: "tislam-eedak",
    ar: "تِسْلَم إِيدَك",
    franco: "tislam eedak",
    rootLetters: "س - ل - م",
    world: "egyptian",
    meaning: "“Bless your hands”",
    tip: "A warm Egyptian thank-you after someone cooks, pours tea, or helps you. Say tislam eedik to a woman.",
  },
  {
    id: "ma3rafsh",
    ar: "مَعْرَفْش",
    franco: "ma3rafsh",
    rootLetters: "ع - ر - ف",
    world: "egyptian",
    meaning: "“I don't know”",
    tip: "Honestly the single most useful word in the country. Say it with a shrug and a smile and you already sound at home.",
  },
  {
    id: "maktoob",
    ar: "مَكْتُوب",
    franco: "maktoob",
    rootLetters: "ك - ت - ب",
    world: "fusha",
    meaning: "“Written”, and “meant to be”",
    tip: "In Fusha it means written, or a letter. On the street it is what people say about fate, love, and life's twists: it's written.",
  },
];

/* ------------------------------------------------------------------ */
/* Sample lesson excerpt                                               */
/* ------------------------------------------------------------------ */

export type LessonLine = {
  world: "fusha" | "egyptian" | "quranic";
  setting: string;
  ar: string;
  franco: string;
  english: string;
  /** Capitals mark the stressed syllable, like an audio cue on paper. */
  stress: string;
  note: string;
};

export const lessonExcerpt: {
  title: string;
  rootLetters: string;
  intro: string;
  lines: LessonLine[];
} = {
  title: "How One Phrase Bridges Three Worlds",
  rootLetters: "ع - ر - ف",
  intro:
    "From Lesson 1. Follow one root out of a news bulletin, into a Cairo café, and on to a verse.",
  lines: [
    {
      world: "fusha",
      setting: "In the news",
      ar: "عَرَفَ الْعَالَمُ الْخَبَرَ",
      franco: "3arafa l-3aalamu l-khabar",
      english: "The world learned the news.",
      stress: "3A-ra-fa",
      note: "Fusha keeps every short vowel. Newsreaders pronounce all three: 3a-ra-fa.",
    },
    {
      world: "egyptian",
      setting: "In a Cairo café",
      ar: "لَأ، مَعْرَفْش",
      franco: "la2, ma3rafsh",
      english: "No, I don't know.",
      stress: "ma3-RAFSH",
      note: "ma- at the front and -sh at the end wrap the verb to make it negative. The root sits untouched in the middle.",
    },
    {
      world: "quranic",
      setting: "In the Qur'an (49:13)",
      ar: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
      franco: "wa-ja3alnaakum shu3ooban wa-qabaa2ila li-ta3aarafoo",
      english:
        "“…and We made you nations and tribes so that you may know one another.”",
      stress: "li-ta-3AA-ra-foo",
      note: "The same three letters, now in the “with each other” pattern. Knowing becomes something people do together.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Sample homework excerpt                                             */
/* ------------------------------------------------------------------ */

export type HomeworkTask = {
  label: string;
  prompt: string;
  /** Arabic shown under the prompt. */
  items: { ar: string; franco: string }[];
  /** Hidden until the learner taps "Show answer". Leave out for open tasks. */
  answer?: string;
};

export const homeworkExcerpt: {
  title: string;
  intro: string;
  tasks: HomeworkTask[];
} = {
  title: "5-Minute Root Workout",
  intro:
    "Homework is short, practical, and built around things you can say to someone today.",
  tasks: [
    {
      label: "Spot the root",
      prompt: "Find the three root letters hiding inside both of these words.",
      items: [
        { ar: "مَكْتَبَة", franco: "maktaba" },
        { ar: "مَكْتُوب", franco: "maktoob" },
      ],
      answer:
        "ك - ت - ب (K - T - B). The ma- at the front is the pattern, not the root.",
    },
    {
      label: "Switch worlds",
      prompt:
        "How would you say “I don't know” to a friend in Cairo using this root?",
      items: [{ ar: "ع - ر - ف", franco: "3 - R - F" }],
      answer: "مَعْرَفْش (ma3rafsh)",
    },
    {
      label: "Voice-note prompt",
      prompt:
        "Record a 15-second voice note introducing yourself, and finish with this phrase. It means “it's an honour to meet you.”",
      items: [{ ar: "اِتْشَرَّفْنَا", franco: "itsharrafna" }],
    },
  ],
};

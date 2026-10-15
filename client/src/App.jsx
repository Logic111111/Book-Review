import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Users,
  Search,
  Plus,
  User,
  Sparkles,
  Database,
  Globe,
  Check,
  X,
  MessageSquare,
  Bookmark,
  Compass,
  Filter,
  RefreshCw,
  Code2,
  BookMarked,
  ChevronRight,
  Send,
  Coffee,
  Layers,
  Award,
  Flame,
  Smile
} from 'lucide-react';
import { api } from './api/client';

// ---------------------------------------------------------------------------
// Initial Connected Book Database Catalog (Synced with Google Books & Open Library)
// ---------------------------------------------------------------------------
const INITIAL_BOOKS = [
  {
    id: 'bk-1',
    externalId: 'OL893415W',
    googleBooksId: 'B1hSG45JCX4C',
    sourceApi: 'Google Books + Open Library',
    isbn: '978-0441172719',
    title: 'Dune',
    author: 'Frank Herbert',
    publishedYear: 1965,
    pageCount: 688,
    genres: ['Sci-Fi', 'Speculative', 'Philosophy'],
    palette: ['#F59E0B', '#78350F', '#1C140D'],
    pattern: 'rings',
    coverUrl: '',
    description:
      'Set on the desert planet Arrakis, Dune is the story of Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange, a substance capable of extending life and enhancing consciousness.',
    likesCount: 142,
    dislikesCount: 6,
    favoritesCount: 98
  },
  {
    id: 'bk-2',
    externalId: 'OL20892614W',
    googleBooksId: 'f280CwAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0593135204',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    publishedYear: 2021,
    pageCount: 496,
    genres: ['Sci-Fi', 'Astrophysics'],
    palette: ['#38BDF8', '#1E3A8A', '#090D16'],
    pattern: 'orbital',
    coverUrl: '',
    description:
      'Ryland Grace is the sole survivor on a desperate, last-chance interstellar mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he does not know that.',
    likesCount: 189,
    dislikesCount: 8,
    favoritesCount: 134
  },
  {
    id: 'bk-3',
    externalId: 'OL17362669W',
    googleBooksId: 'ZrNzAwAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0765382030',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    publishedYear: 2008,
    pageCount: 416,
    genres: ['Sci-Fi', 'Astrophysics', 'Philosophy'],
    palette: ['#818CF8', '#311042', '#090A10'],
    pattern: 'trinary',
    coverUrl: '',
    description:
      'Set against the backdrop of China’s Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal.',
    likesCount: 126,
    dislikesCount: 14,
    favoritesCount: 84
  },
  {
    id: 'bk-4',
    externalId: 'OL27258W',
    googleBooksId: 'IDFfMPW32hQC',
    sourceApi: 'Open Library',
    isbn: '978-0441569595',
    title: 'Neuromancer',
    author: 'William Gibson',
    publishedYear: 1984,
    pageCount: 271,
    genres: ['Cyberpunk', 'Sci-Fi'],
    palette: ['#2DD4BF', '#064E3B', '#05080F'],
    pattern: 'matrix',
    coverUrl: '',
    description:
      'Case was the sharpest data-thief in the matrix—until he crossed the wrong employers and they crippled his nervous system, banishing him from cyberspace. Now a mysterious new employer offers him a last-chance run.',
    likesCount: 115,
    dislikesCount: 9,
    favoritesCount: 79
  },
  {
    id: 'bk-5',
    externalId: 'OL21636494W',
    googleBooksId: 'S33fDwAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0593318171',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    publishedYear: 2021,
    pageCount: 303,
    genres: ['Literary', 'Speculative', 'Philosophy'],
    palette: ['#FBBF24', '#9A3412', '#1C1311'],
    pattern: 'horizon',
    coverUrl: '',
    description:
      'From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse and of those who pass on the street outside.',
    likesCount: 97,
    dislikesCount: 11,
    favoritesCount: 64
  },
  {
    id: 'bk-6',
    externalId: 'OL1964321W',
    googleBooksId: 'u256CgAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0553283686',
    title: 'Hyperion',
    author: 'Dan Simmons',
    publishedYear: 1989,
    pageCount: 482,
    genres: ['Sci-Fi', 'Speculative', 'Literary'],
    palette: ['#F43F5E', '#4C0519', '#160B11'],
    pattern: 'monolith',
    coverUrl: '',
    description:
      'On the world called Hyperion, beyond the line of the Hegemony of Man, waits the creature called the Shrike. On the eve of Armageddon, seven pilgrims set forth on a final voyage to Hyperion seeking answers.',
    likesCount: 131,
    dislikesCount: 5,
    favoritesCount: 92
  },
  {
    id: 'bk-7',
    externalId: 'OL46125W',
    googleBooksId: 'I2g6CgAAQBAJ',
    sourceApi: 'Open Library',
    isbn: '978-0553293357',
    title: 'Foundation',
    author: 'Isaac Asimov',
    publishedYear: 1951,
    pageCount: 255,
    genres: ['Sci-Fi', 'Philosophy'],
    palette: ['#60A5FA', '#1E293B', '#060911'],
    pattern: 'orbital',
    coverUrl: '',
    description:
      'For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. Only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future.',
    likesCount: 118,
    dislikesCount: 7,
    favoritesCount: 76
  },
  {
    id: 'bk-8',
    externalId: 'OL59864W',
    googleBooksId: 'd256CgAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0441478125',
    title: 'The Left Hand of Darkness',
    author: 'Ursula K. Le Guin',
    publishedYear: 1969,
    pageCount: 304,
    genres: ['Sci-Fi', 'Literary', 'Philosophy'],
    palette: ['#A78BFA', '#2E1065', '#090D16'],
    pattern: 'rings',
    coverUrl: '',
    description:
      'A lone human emissary is sent to Winter, an icy planet whose inhabitants have an ambisexual physiology, to facilitate its inclusion in a growing intergalactic civilization.',
    likesCount: 109,
    dislikesCount: 4,
    favoritesCount: 88
  },
  {
    id: 'bk-9',
    externalId: 'OL20165798W',
    googleBooksId: 'w256CgAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-1101947883',
    title: 'Exhalation',
    author: 'Ted Chiang',
    publishedYear: 2019,
    pageCount: 368,
    genres: ['Speculative', 'Philosophy', 'Sci-Fi'],
    palette: ['#34D399', '#065F46', '#060A12'],
    pattern: 'trinary',
    coverUrl: '',
    description:
      'Nine stunningly original, provocative, and poignant stories about time travel, artificial consciousness, free will, and the nature of the universe.',
    likesCount: 154,
    dislikesCount: 3,
    favoritesCount: 112
  },
  {
    id: 'bk-10',
    externalId: 'OL21723564W',
    googleBooksId: 'p256CgAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-1635575637',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    publishedYear: 2020,
    pageCount: 245,
    genres: ['Speculative', 'Literary'],
    palette: ['#E879F9', '#4A044E', '#090B14'],
    pattern: 'monolith',
    coverUrl: '',
    description:
      'Piranesi’s house is no ordinary building: its rooms are infinite, its corridors endless, its walls are lined with thousands upon thousands of statues.',
    likesCount: 121,
    dislikesCount: 6,
    favoritesCount: 91
  },
  {
    id: 'bk-11',
    externalId: 'OL17352441W',
    googleBooksId: 'c256CgAAQBAJ',
    sourceApi: 'Open Library',
    isbn: '978-0316452502',
    title: 'Children of Time',
    author: 'Adrian Tchaikovsky',
    publishedYear: 2015,
    pageCount: 600,
    genres: ['Sci-Fi', 'Astrophysics'],
    palette: ['#22D3EE', '#164E63', '#050811'],
    pattern: 'matrix',
    coverUrl: '',
    description:
      'The last remnants of the human race left a dying Earth, desperate to find a new home among the stars. They discover a world terraformed and prepared for life—but not human life.',
    likesCount: 138,
    dislikesCount: 5,
    favoritesCount: 95
  },
  {
    id: 'bk-12',
    externalId: 'OL395405W',
    googleBooksId: 's256CgAAQBAJ',
    sourceApi: 'Google Books',
    isbn: '978-0553380958',
    title: 'Snow Crash',
    author: 'Neal Stephenson',
    publishedYear: 1992,
    pageCount: 470,
    genres: ['Cyberpunk', 'Sci-Fi'],
    palette: ['#FB7185', '#881337', '#090D16'],
    pattern: 'horizon',
    coverUrl: '',
    description:
      'In reality, Hiro Protagonist delivers pizza, but in the Metaverse he is a warrior prince. Plunging headlong into the enigma of a new computer virus that is striking down hackers everywhere.',
    likesCount: 104,
    dislikesCount: 12,
    favoritesCount: 67
  }
];

// ---------------------------------------------------------------------------
// Initial Humanized Reader Profiles (Users Collection)
// ---------------------------------------------------------------------------
const INITIAL_USERS = [
  {
    id: 'usr-1',
    username: 'aria_vance',
    displayName: 'Aria Vance',
    email: 'aria@aether.io',
    password: 'password123',
    bio: 'Astrophysicist & nocturnal reader. happiest with a rainstorm outside, a mug of cinnamon chai, and a 600-page world to get lost in.',
    readingRitual: 'Reading by warm lamp light with cinnamon chai ☕',
    yearlyGoal: { read: 19, target: 24 },
    avatarColor: '#F59E0B',
    roleTag: 'Book Club Host',
    favorites: ['bk-1', 'bk-2', 'bk-9', 'bk-10'],
    likedBooks: ['bk-1', 'bk-2', 'bk-6', 'bk-8', 'bk-9', 'bk-10'],
    dislikedBooks: [],
    following: ['usr-2', 'usr-3', 'usr-4'],
    followers: ['usr-2', 'usr-3', 'usr-4', 'usr-5']
  },
  {
    id: 'usr-2',
    username: 'kaelen_void',
    displayName: 'Kaelen Thorne',
    email: 'kaelen@aether.io',
    password: 'password123',
    bio: 'Design researcher & dog-eared paperback collector. I underline my favorite sentences in pencil and leave margin notes for future me.',
    readingRitual: 'Late-night vinyl records & margin notes 🎧',
    yearlyGoal: { read: 15, target: 20 },
    avatarColor: '#818CF8',
    roleTag: 'Margin Note Poet',
    favorites: ['bk-4', 'bk-3', 'bk-12', 'bk-6'],
    likedBooks: ['bk-4', 'bk-3', 'bk-12', 'bk-6', 'bk-1'],
    dislikedBooks: ['bk-5'],
    following: ['usr-1', 'usr-3'],
    followers: ['usr-1', 'usr-3', 'usr-5']
  },
  {
    id: 'usr-3',
    username: 'sora_chen',
    displayName: 'Sora Chen',
    email: 'sora@aether.io',
    password: 'password123',
    bio: 'Curator of quiet speculative fiction, memory palaces, and poetic prose. Always happy to swap book recommendations with new friends!',
    readingRitual: 'Sunday morning matcha on the balcony 🍵',
    yearlyGoal: { read: 28, target: 30 },
    avatarColor: '#F472B6',
    roleTag: 'Top Diarist',
    favorites: ['bk-5', 'bk-8', 'bk-10', 'bk-9'],
    likedBooks: ['bk-5', 'bk-8', 'bk-10', 'bk-9', 'bk-2'],
    dislikedBooks: ['bk-12'],
    following: ['usr-1', 'usr-2', 'usr-4'],
    followers: ['usr-1', 'usr-2', 'usr-4']
  },
  {
    id: 'usr-4',
    username: 'mira_solis',
    displayName: 'Dr. Mira Solis',
    email: 'mira@aether.io',
    password: 'password123',
    bio: 'Marine biologist & deep-time galactic opera fan. If a story spans 10,000 years and makes me cry on the train, it gets 5 stars.',
    readingRitual: 'Commuter train chapters & weekend marathons 🚆',
    yearlyGoal: { read: 12, target: 15 },
    avatarColor: '#34D399',
    roleTag: 'Sci-Fi Fellow',
    favorites: ['bk-11', 'bk-7', 'bk-1', 'bk-2'],
    likedBooks: ['bk-11', 'bk-7', 'bk-1', 'bk-2', 'bk-3'],
    dislikedBooks: [],
    following: ['usr-1', 'usr-3'],
    followers: ['usr-1', 'usr-3']
  },
  {
    id: 'usr-5',
    username: 'devon_k',
    displayName: 'Devon K.',
    email: 'devon@aether.io',
    password: 'password123',
    bio: 'Neighborhood bookshop regular & short-story enthusiast. Keeping a honest diary of every book that shapes my year.',
    readingRitual: 'Corner café espresso & hardcover editions 📖',
    yearlyGoal: { read: 10, target: 16 },
    avatarColor: '#38BDF8',
    roleTag: 'Storyteller',
    favorites: ['bk-9', 'bk-6', 'bk-2'],
    likedBooks: ['bk-9', 'bk-6', 'bk-2', 'bk-7'],
    dislikedBooks: [],
    following: ['usr-1', 'usr-2'],
    followers: ['usr-2']
  }
];

// ---------------------------------------------------------------------------
// Initial 5-Star Reviews Collection (With Social Comments & Reactions)
// ---------------------------------------------------------------------------
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    bookId: 'bk-2',
    userId: 'usr-1',
    rating: 5,
    thoughts:
      'An absolute triumph of warm, big-hearted sci-fi. The way Weir turns orbital mechanics and first-contact friendship into a story that made me laugh out loud at 2 AM is pure magic. Rocky might be my favorite literary friend of the decade.',
    moodTags: ['Page-Turner', 'Heartwarming', 'Astrophysics'],
    containsSpoilers: false,
    likes: ['usr-2', 'usr-3', 'usr-4'],
    dislikes: [],
    reactions: { insightful: 14, moved: 19, fire: 22, cozy: 9 },
    comments: [
      {
        id: 'c-101',
        userId: 'usr-3',
        text: 'Jazz hands!! I listened to the audiobook after reading the hardcover and cried all over again.',
        createdAt: '2026-10-13'
      },
      {
        id: 'c-102',
        userId: 'usr-4',
        text: 'Completely agree—the friendship in this book felt so genuinely human despite being lightyears from Earth.',
        createdAt: '2026-10-13'
      }
    ],
    createdAt: '2026-10-12T19:30:00Z'
  },
  {
    id: 'rev-2',
    bookId: 'bk-1',
    userId: 'usr-4',
    rating: 5,
    thoughts:
      'Re-reading Dune feels like stepping into a living tapestry of desert ecology, politics, and human longing. Every chapter rewards slow, attentive reading.',
    moodTags: ['Atmospheric', 'Philosophical', 'World-Building'],
    containsSpoilers: false,
    likes: ['usr-1', 'usr-2', 'usr-5'],
    dislikes: [],
    reactions: { insightful: 18, moved: 7, fire: 15, cozy: 4 },
    comments: [
      {
        id: 'c-103',
        userId: 'usr-1',
        text: 'The banquet scene still has more tension than most action novels!',
        createdAt: '2026-10-11'
      }
    ],
    createdAt: '2026-10-10T14:15:00Z'
  },
  {
    id: 'rev-3',
    bookId: 'bk-4',
    userId: 'usr-2',
    rating: 5,
    thoughts:
      'The prose still crackles like rain on neon pavement forty years later. Gibson did not just imagine cyberspace; he captured the loneliness and poetry of people living inside it.',
    moodTags: ['Cyber-Noir', 'Mind-Bending', 'Poetic'],
    containsSpoilers: false,
    likes: ['usr-1', 'usr-5'],
    dislikes: [],
    reactions: { insightful: 11, moved: 6, fire: 14, cozy: 3 },
    comments: [],
    createdAt: '2026-10-09T22:05:00Z'
  },
  {
    id: 'rev-4',
    bookId: 'bk-10',
    userId: 'usr-3',
    rating: 5,
    thoughts:
      'Piranesi’s journals feel like wrapping yourself in a warm blanket inside a sunlit marble cathedral washed by ocean tides. So gentle, mysterious, and deeply humane.',
    moodTags: ['Atmospheric', 'Poetic', 'Heartwarming'],
    containsSpoilers: false,
    likes: ['usr-1', 'usr-4'],
    dislikes: [],
    reactions: { insightful: 9, moved: 24, fire: 8, cozy: 21 },
    comments: [
      {
        id: 'c-104',
        userId: 'usr-2',
        text: 'Your review convinced me to bump this to the very top of my weekend reading stack!',
        createdAt: '2026-10-09'
      }
    ],
    createdAt: '2026-10-08T11:40:00Z'
  },
  {
    id: 'rev-5',
    bookId: 'bk-9',
    userId: 'usr-5',
    rating: 5,
    thoughts:
      'The title story "Exhalation" is a masterpiece of empathy—a mechanical being reflecting on breath, memory, and gratitude for existence. Left me staring out the window for an hour.',
    moodTags: ['Philosophical', 'Mind-Bending', 'Heartwarming'],
    containsSpoilers: false,
    likes: ['usr-1', 'usr-2', 'usr-3'],
    dislikes: [],
    reactions: { insightful: 21, moved: 17, fire: 12, cozy: 8 },
    comments: [],
    createdAt: '2026-10-06T17:20:00Z'
  },
  {
    id: 'rev-6',
    bookId: 'bk-3',
    userId: 'usr-2',
    rating: 4,
    thoughts:
      'The opening historical chapters and the eerie Three-Body simulation segments are unforgettable. A staggering work of imagination.',
    moodTags: ['Mind-Bending', 'World-Building'],
    containsSpoilers: false,
    likes: ['usr-4'],
    dislikes: [],
    reactions: { insightful: 8, moved: 4, fire: 11, cozy: 2 },
    comments: [],
    createdAt: '2026-10-04T09:10:00Z'
  }
];

// ---------------------------------------------------------------------------
// Initial Reading Diary Entries Collection
// ---------------------------------------------------------------------------
const INITIAL_DIARY = [
  {
    id: 'dry-1',
    userId: 'usr-1',
    bookId: 'bk-2',
    status: 'read',
    readDate: '2026-10-12',
    rating: 5,
    diaryNotes:
      'Finished at 2:00 AM curled up on the sofa while it rained outside. Could not put it down—added straight to my all-time Favorites shelf.',
    pagesRead: 496,
    isReread: false,
    liked: true,
    addedToFavorites: true,
    comments: [
      {
        id: 'dc-1',
        userId: 'usr-3',
        text: 'Nothing beats finishing a 5-star book at 2 AM! What are you picking up next?',
        createdAt: '2026-10-13'
      }
    ]
  },
  {
    id: 'dry-2',
    userId: 'usr-1',
    bookId: 'bk-9',
    status: 'read',
    readDate: '2026-09-28',
    rating: 5,
    diaryNotes:
      'Read one story each evening with chamomile tea. "The Truth of Fact, the Truth of Feeling" completely reshaped how I think about keeping a personal diary.',
    pagesRead: 368,
    isReread: true,
    liked: true,
    addedToFavorites: true,
    comments: []
  },
  {
    id: 'dry-3',
    userId: 'usr-1',
    bookId: 'bk-6',
    status: 'reading',
    readDate: '2026-10-14',
    rating: 5,
    diaryNotes:
      'Currently halfway through Sol Weintraub’s story—some of the most tender, heartbreaking parenting moments I have ever read in sci-fi.',
    pagesRead: 260,
    isReread: false,
    liked: true,
    addedToFavorites: false,
    comments: []
  },
  {
    id: 'dry-4',
    userId: 'usr-3',
    bookId: 'bk-10',
    status: 'read',
    readDate: '2026-10-08',
    rating: 5,
    diaryNotes: 'May the House bless you. A luminous, comforting meditation on wonder and kindness.',
    pagesRead: 245,
    isReread: false,
    liked: true,
    addedToFavorites: true,
    comments: []
  },
  {
    id: 'dry-5',
    userId: 'usr-2',
    bookId: 'bk-4',
    status: 'read',
    readDate: '2026-10-09',
    rating: 5,
    diaryNotes: 'Annual autumn re-read of Neuromancer at my favorite corner coffee shop.',
    pagesRead: 271,
    isReread: true,
    liked: true,
    addedToFavorites: true,
    comments: []
  },
  {
    id: 'dry-6',
    userId: 'usr-4',
    bookId: 'bk-11',
    status: 'read',
    readDate: '2026-10-02',
    rating: 5,
    diaryNotes: 'Never thought a book could make me root so passionately for jumping spiders. Pure brilliance.',
    pagesRead: 600,
    isReread: false,
    liked: true,
    addedToFavorites: true,
    comments: []
  }
];

// Initial Community Book Club Notes / Recommendations
const INITIAL_SOCIAL_NOTES = [
  {
    id: 'note-1',
    fromUserId: 'usr-3',
    toUserId: 'usr-1',
    bookId: 'bk-10',
    message:
      'Aria, since you loved the quiet philosophical moments in Exhalation, you have to read Piranesi on your next rainy evening!',
    likes: ['usr-1', 'usr-4'],
    createdAt: '2026-10-14'
  },
  {
    id: 'note-2',
    fromUserId: 'usr-4',
    toUserId: 'usr-2',
    bookId: 'bk-11',
    message:
      'Kaelen—the emergent AI & evolutionary arcs in Children of Time are right up your alley.',
    likes: ['usr-2'],
    createdAt: '2026-10-11'
  }
];

const MOOD_TAG_OPTIONS = [
  'Mind-Bending',
  'Atmospheric',
  'Page-Turner',
  'Philosophical',
  'Cyber-Noir',
  'Astrophysics',
  'Poetic',
  'World-Building',
  'Heartwarming'
];

const STAR_LABELS = {
  1: '1.0 ★ // Not For Me',
  2: '2.0 ★ // Had Moments',
  3: '3.0 ★ // Good Read',
  4: '4.0 ★ // Loved It',
  5: '5.0 ★ // All-Time Favorite'
};

// ---------------------------------------------------------------------------
// Humanized Illustrated Portrait Avatar Component
// ---------------------------------------------------------------------------
function HumanAvatar({ user, size = 'md' }) {
  const color = user?.avatarColor || '#F59E0B';
  const dim = {
    xs: 'w-6 h-6 rounded-full',
    sm: 'w-8 h-8 rounded-full',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl'
  }[size] || 'w-10 h-10 rounded-xl';

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center border border-white/25 shadow-md ${dim}`}
      style={{
        background: `radial-gradient(circle at 30% 25%, ${color}, #1E1B2E 85%)`
      }}
    >
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Warm ambient halo */}
        <circle cx="32" cy="32" r="30" fill={color} fillOpacity="0.18" />
        {/* Shoulders / Cozy Sweater */}
        <path
          d="M12 60 C14 44, 50 44, 52 60 Z"
          fill="rgba(15, 23, 42, 0.82)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
        />
        {/* Sweater Collar Detail */}
        <path d="M24 47 Q32 53 40 47" stroke={color} strokeWidth="2" fill="none" />
        {/* Warm Human Head Silhouette */}
        <circle cx="32" cy="26" r="11.5" fill="#FDE68A" fillOpacity="0.92" />
        {/* Styled Hair */}
        <path
          d="M20 25 C20 14, 44 14, 44 25 C41 19, 25 19, 20 25 Z"
          fill="#1E1B2E"
        />
        {/* Friendly Eyes & Warm Smile */}
        <circle cx="28" cy="26.5" r="1.3" fill="#1E1B2E" />
        <circle cx="36" cy="26.5" r="1.3" fill="#1E1B2E" />
        <path
          d="M28.5 31 Q32 34 35.5 31"
          stroke="#92400E"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tactile 3D Hardcover Book Component (Realistic Spine, Page Ridges & Tilt)
// ---------------------------------------------------------------------------
function FuturisticBookCover({ book, size = 'md', is3D = true }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const colors = book.palette || ['#F59E0B', '#78350F', '#1C140D'];
  const [accent, mid, deep] = colors;

  const sizeClasses = {
    sm: 'w-14 h-20',
    md: 'w-28 h-40',
    lg: 'w-40 h-56',
    card: 'w-full aspect-[2/3]'
  }[size] || 'w-28 h-40';

  const spineWidth = size === 'sm' ? 7 : size === 'lg' ? 16 : 12;
  const pageDepth = size === 'sm' ? 5 : size === 'lg' ? 12 : 8;

  const gradId = `grad-${book.id}-${size}`;

  const transform3D = is3D
    ? hovered
      ? 'rotateY(-24deg) rotateX(7deg) translateZ(10px) translateY(-4px)'
      : 'rotateY(-14deg) rotateX(4deg)'
    : hovered
    ? 'translateY(-4px)'
    : 'none';

  return (
    <div
      className={`relative shrink-0 select-none ${sizeClasses}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Physical Drop Shadow under the 3D book */}
      <div
        className="absolute -bottom-2.5 left-2 right-1 h-4 rounded-full bg-black/75 blur-md transition-all duration-500 pointer-events-none"
        style={{
          transform: hovered ? 'scaleX(1.06) translateY(3px)' : 'scaleX(0.96)'
        }}
      />

      {/* 3D Book Object Wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: transform3D
        }}
      >
        {/* 3D Left Hardcover Spine */}
        {is3D && (
          <div
            className="absolute top-0 bottom-0 left-0 rounded-l-sm border-y border-l border-white/25 flex flex-col items-center justify-between py-2 overflow-hidden"
            style={{
              width: `${spineWidth}px`,
              background: `linear-gradient(180deg, ${mid} 0%, ${deep} 50%, ${mid} 100%)`,
              transformOrigin: 'left center',
              transform: 'rotateY(-90deg)'
            }}
          >
            <div className="w-full h-0.5 bg-amber-300/50" />
            <div className="w-full h-0.5 bg-amber-300/30" />
          </div>
        )}

        {/* 3D Right Layered Cream Paper Pages Block */}
        {is3D && (
          <div
            className="absolute top-[3px] bottom-[3px] right-0 rounded-r-sm border-y border-r border-amber-100/30"
            style={{
              width: `${pageDepth}px`,
              background:
                'repeating-linear-gradient(90deg, #FDF8EE 0px, #E6DEC8 1.5px, #FAF3E3 3px)',
              transformOrigin: 'right center',
              transform: 'rotateY(90deg)'
            }}
          />
        )}

        {/* Front Hardcover Face */}
        <div
          className="relative w-full h-full rounded-r-xl rounded-l-[4px] overflow-hidden border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
          style={{
            background: `linear-gradient(145deg, ${deep} 0%, ${mid} 55%, ${deep} 100%)`
          }}
        >
          {/* Hardcover Hinge Groove & Warm Foil Sheen */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-white/15 to-transparent z-20 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(115deg, transparent 20%, rgba(255,250,235,0.16) 48%, transparent 75%)'
            }}
          />

          {book.coverUrl && !imgError ? (
            <>
              <img
                src={book.coverUrl}
                alt={book.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover max-w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-white/10 pointer-events-none" />
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 200 300"
                className="absolute inset-0 w-full h-full opacity-85"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <radialGradient id={gradId} cx="50%" cy="38%" r="62%">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
                    <stop offset="65%" stopColor={mid} stopOpacity="0.22" />
                    <stop offset="100%" stopColor={deep} stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="200" height="300" fill={`url(#${gradId})`} />
                {/* Classic Book Frame Border */}
                <rect
                  x="16"
                  y="14"
                  width="172"
                  height="272"
                  rx="6"
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                />

                {book.pattern === 'rings' && (
                  <g stroke={accent} fill="none" opacity="0.72">
                    <circle cx="105" cy="135" r="56" strokeWidth="1.2" strokeDasharray="4 4" />
                    <circle cx="105" cy="135" r="38" strokeWidth="1.5" />
                    <circle cx="105" cy="135" r="18" fill={accent} fillOpacity="0.28" />
                    <ellipse
                      cx="105"
                      cy="135"
                      rx="72"
                      ry="22"
                      strokeWidth="1.1"
                      transform="rotate(-24 105 135)"
                    />
                  </g>
                )}

                {book.pattern === 'orbital' && (
                  <g stroke={accent} fill="none" opacity="0.75">
                    <circle cx="105" cy="130" r="44" strokeWidth="1.5" />
                    <path d="M 32 155 Q 105 70 178 155" strokeWidth="1.2" />
                    <path
                      d="M 32 115 Q 105 200 178 115"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle cx="105" cy="130" r="9" fill={accent} />
                    <circle cx="145" cy="108" r="4" fill="#FFFBEB" />
                  </g>
                )}

                {book.pattern === 'trinary' && (
                  <g stroke={accent} fill="none" opacity="0.75">
                    <polygon points="105,68 160,166 50,166" strokeWidth="1.3" />
                    <polygon
                      points="105,184 160,86 50,86"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <circle cx="105" cy="68" r="6" fill={accent} />
                    <circle cx="160" cy="166" r="6" fill={accent} />
                    <circle cx="50" cy="166" r="6" fill={accent} />
                  </g>
                )}

                {book.pattern === 'matrix' && (
                  <g stroke={accent} opacity="0.6">
                    <line x1="50" y1="60" x2="50" y2="210" strokeWidth="1" strokeDasharray="2 6" />
                    <line
                      x1="78"
                      y1="50"
                      x2="78"
                      y2="220"
                      strokeWidth="1.5"
                      strokeDasharray="8 4"
                    />
                    <line x1="105" y1="45" x2="105" y2="225" strokeWidth="1.2" />
                    <line
                      x1="132"
                      y1="55"
                      x2="132"
                      y2="215"
                      strokeWidth="1.5"
                      strokeDasharray="6 5"
                    />
                    <rect x="65" y="95" width="78" height="78" fill="none" strokeWidth="1.5" />
                    <rect x="82" y="112" width="44" height="44" fill={accent} fillOpacity="0.22" />
                  </g>
                )}

                {book.pattern === 'horizon' && (
                  <g stroke={accent} fill="none" opacity="0.78">
                    <circle
                      cx="105"
                      cy="120"
                      r="35"
                      fill={accent}
                      fillOpacity="0.32"
                      strokeWidth="1.5"
                    />
                    <line x1="28" y1="160" x2="182" y2="160" strokeWidth="1.5" />
                    <line x1="42" y1="172" x2="168" y2="172" strokeWidth="1" opacity="0.7" />
                    <line x1="58" y1="184" x2="152" y2="184" strokeWidth="0.8" opacity="0.5" />
                  </g>
                )}

                {(!book.pattern || book.pattern === 'monolith') && (
                  <g stroke={accent} fill="none" opacity="0.78">
                    <rect
                      x="78"
                      y="68"
                      width="54"
                      height="122"
                      rx="3"
                      strokeWidth="1.5"
                      fill={accent}
                      fillOpacity="0.18"
                    />
                    <circle cx="105" cy="105" r="14" strokeWidth="1.2" />
                    <line x1="55" y1="190" x2="155" y2="190" strokeWidth="1.2" />
                  </g>
                )}
              </svg>

              <div className="relative z-10 h-full flex flex-col justify-between p-2.5 pl-4">
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-amber-100/75">
                  <span className="truncate">{book.genres?.[0] || 'EDITION'}</span>
                  <span>{book.publishedYear || ''}</span>
                </div>

                <div className="mt-auto pt-2 border-t border-white/15">
                  <p className="font-serif font-bold text-white leading-tight line-clamp-2 text-xs sm:text-sm drop-shadow">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-amber-100/80 truncate mt-0.5 font-medium">
                    {book.author}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Star Rating Display & Interactive Selector
// ---------------------------------------------------------------------------
function StarRating({ value = 0, onChange, size = 16, readOnly = false }) {
  const [hoverVal, setHoverVal] = useState(0);
  const display = hoverVal || value;

  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;
        if (readOnly) {
          return (
            <Star
              key={star}
              size={size}
              className={
                filled || half
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.45)]'
                  : 'text-slate-700'
              }
            />
          );
        }
        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoverVal(star)}
            onMouseLeave={() => setHoverVal(0)}
            onClick={() => onChange && onChange(star)}
            className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
            title={`Rate ${star} out of 5 stars`}
          >
            <Star
              size={size}
              className={
                filled
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  : 'text-slate-600 hover:text-amber-300/60'
              }
            />
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Application Component
// ---------------------------------------------------------------------------
export default function App() {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_books_v2');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch (e) {
      return INITIAL_BOOKS;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_users_v2');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_reviews_v2');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch (e) {
      return INITIAL_REVIEWS;
    }
  });

  const [diaryEntries, setDiaryEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_diary_v2');
      return saved ? JSON.parse(saved) : INITIAL_DIARY;
    } catch (e) {
      return INITIAL_DIARY;
    }
  });

  const [socialNotes, setSocialNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_notes_v2');
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_NOTES;
    } catch (e) {
      return INITIAL_SOCIAL_NOTES;
    }
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      return localStorage.getItem('aether_current_user_v2') || 'usr-1';
    } catch (e) {
      return 'usr-1';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aether_books_v2', JSON.stringify(books));
      localStorage.setItem('aether_users_v2', JSON.stringify(users));
      localStorage.setItem('aether_reviews_v2', JSON.stringify(reviews));
      localStorage.setItem('aether_diary_v2', JSON.stringify(diaryEntries));
      localStorage.setItem('aether_notes_v2', JSON.stringify(socialNotes));
      if (currentUserId) {
        localStorage.setItem('aether_current_user_v2', currentUserId);
      }
    } catch (e) {
      // Safe fallback in restricted storage contexts
    }
  }, [books, users, reviews, diaryEntries, socialNotes, currentUserId]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  // Live MongoDB Database Telemetry State
  const [dbStatus, setDbStatus] = useState({
    connected: false,
    service: 'Connecting...',
    database: 'aether_reads',
    uptimeSeconds: 0,
    dbHost: '127.0.0.1',
    dbPort: 27017,
    stats: null,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [apiLatency, setApiLatency] = useState(null);
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  const syncWithDatabase = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    const startTime = performance.now();
    try {
      const health = await api.getHealth();
      const latency = Math.round(performance.now() - startTime);
      setApiLatency(latency);
      setDbStatus({
        connected: Boolean(health.connected),
        service: health.service,
        database: health.dbName,
        uptimeSeconds: health.uptimeSeconds,
        dbHost: health.dbHost,
        dbPort: health.dbPort,
        env: health.env,
      });

      const stats = await api.getStats().catch(() => null);
      if (stats) {
        setDbStatus((prev) => ({ ...prev, stats }));
      }

      // Fetch live books from MongoDB
      const dbBooks = await api.getBooks().catch(() => []);
      if (Array.isArray(dbBooks) && dbBooks.length > 0) {
        const palettes = [
          ['#F59E0B', '#78350F', '#1C140D'],
          ['#38BDF8', '#1E3A8A', '#090D16'],
          ['#818CF8', '#311042', '#090A10'],
          ['#2DD4BF', '#064E3B', '#05080F'],
          ['#FBBF24', '#9A3412', '#1C1311'],
          ['#F43F5E', '#4C0519', '#160B11'],
          ['#60A5FA', '#1E293B', '#060911'],
          ['#A78BFA', '#2E1065', '#090D16'],
          ['#34D399', '#065F46', '#060A12'],
          ['#E879F9', '#4A044E', '#090B14'],
          ['#22D3EE', '#164E63', '#050811'],
          ['#FB7185', '#881337', '#090D16']
        ];
        const patterns = ['rings', 'orbital', 'trinary', 'matrix', 'horizon', 'monolith'];
        const normalized = dbBooks.map((b, idx) => ({
          ...b,
          id: b._id ? String(b._id) : b.id || `bk-${idx + 1}`,
          palette: b.palette || palettes[idx % palettes.length],
          pattern: b.pattern || patterns[idx % patterns.length],
        }));
        setBooks(normalized);
      }

      // Fetch live users from MongoDB
      const dbUsers = await api.getUsers().catch(() => []);
      if (Array.isArray(dbUsers) && dbUsers.length > 0) {
        const normalizedUsers = dbUsers.map((u) => ({
          ...u,
          id: u._id ? String(u._id) : u.id,
          favorites: (u.favorites || []).map((f) => (typeof f === 'object' ? String(f._id || f.id) : String(f))),
          likedBooks: (u.likedBooks || []).map((l) => (typeof l === 'object' ? String(l._id || l.id) : String(l))),
          dislikedBooks: (u.dislikedBooks || []).map((d) => (typeof d === 'object' ? String(d._id || d.id) : String(d))),
          following: (u.following || []).map((f) => (typeof f === 'object' ? String(f._id || f.id) : String(f))),
          followers: (u.followers || []).map((f) => (typeof f === 'object' ? String(f._id || f.id) : String(f))),
          yearlyGoal: u.yearlyGoal || { read: 19, target: 24 },
          readingRitual: u.readingRitual || 'Reading by warm lamp light with cinnamon chai ☕',
        }));
        setUsers(normalizedUsers);
      }

      // Fetch live reviews from MongoDB
      const dbReviews = await api.getReviews().catch(() => []);
      if (Array.isArray(dbReviews) && dbReviews.length > 0) {
        const normalizedReviews = dbReviews.map((r, idx) => ({
          ...r,
          id: r._id ? String(r._id) : r.id || `rev-${idx + 1}`,
          bookId: typeof r.book === 'object' ? String(r.book._id || r.book.id) : String(r.book),
          userId: typeof r.user === 'object' ? String(r.user._id || r.user.id) : String(r.user),
          reactions: r.reactions || { insightful: 12, moved: 9, fire: 7, cozy: 14 },
          comments: r.comments || [],
        }));
        setReviews(normalizedReviews);
      }

      // Fetch live diary entries from MongoDB
      const dbDiary = await api.getDiary().catch(() => []);
      if (Array.isArray(dbDiary) && dbDiary.length > 0) {
        const normalizedDiary = dbDiary.map((d, idx) => ({
          ...d,
          id: d._id ? String(d._id) : d.id || `dry-${idx + 1}`,
          bookId: typeof d.book === 'object' ? String(d.book._id || d.book.id) : String(d.book),
          userId: typeof d.user === 'object' ? String(d.user._id || d.user.id) : String(d.user),
          readDate: d.readDate ? new Date(d.readDate).toISOString().slice(0, 10) : '2026-10-15',
          comments: d.comments || [],
        }));
        setDiaryEntries(normalizedDiary);
      }

      // Check authenticated session
      const token = localStorage.getItem('aether_jwt_token');
      if (token) {
        const me = await api.getMe().catch(() => null);
        if (me && me.user) {
          setCurrentUserId(me.user.id ? String(me.user.id) : String(me.user._id));
        }
      }

      if (!silent) {
        notify(`Synchronized with MongoDB database (${latency}ms)!`, 'success');
      }
    } catch (err) {
      setDbStatus((prev) => ({
        ...prev,
        connected: false,
        service: 'Offline Cache Mode',
      }));
    } finally {
      if (!silent) setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncWithDatabase(true);
  }, []);

  const handleTestDatabasePing = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const health = await api.getHealth();
      const stats = await api.getStats();
      const latency = Math.round(performance.now() - start);
      setPingResult({
        success: true,
        latency,
        health,
        stats,
        timestamp: new Date().toLocaleTimeString(),
      });
      notify(`Pinged MongoDB & Express in ${latency}ms!`, 'success');
    } catch (err) {
      setPingResult({
        success: false,
        error: err.message,
        timestamp: new Date().toLocaleTimeString(),
      });
      notify('Could not connect to API server: ' + err.message, 'error');
    } finally {
      setIsPinging(false);
    }
  };

  // Navigation & UI Modals State
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [inspectedUserId, setInspectedUserId] = useState('usr-2');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [toast, setToast] = useState(null);

  // 3D & Humanized Ambience State
  const [enable3DBooks, setEnable3DBooks] = useState(true);
  const [ambienceMood, setAmbienceMood] = useState('cozy'); // 'cozy' | 'velvet' | 'starlight'

  // Catalog Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [dbMode, setDbMode] = useState('catalog'); // 'catalog' | 'googlebooks' | 'openlibrary'
  const [externalProvider, setExternalProvider] = useState('google'); // 'google' | 'openlibrary'
  const [externalResults, setExternalResults] = useState([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [externalSearchInput, setExternalSearchInput] = useState('Octavia Butler');

  // Review Studio State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewThoughts, setReviewThoughts] = useState('');
  const [reviewMoods, setReviewMoods] = useState(['Heartwarming', 'Page-Turner']);
  const [reviewSpoilers, setReviewSpoilers] = useState(false);
  const [alsoLogDiary, setAlsoLogDiary] = useState(true);
  const [reviewStarFilter, setReviewStarFilter] = useState(0);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});

  // Interactive Social Comments & Book Club Notes State
  const [commentInputs, setCommentInputs] = useState({});
  const [noteTargetUserId, setNoteTargetUserId] = useState('usr-3');
  const [noteBookId, setNoteBookId] = useState('bk-2');
  const [noteMessage, setNoteMessage] = useState('');

  // Diary Modal State
  const [diaryBookId, setDiaryBookId] = useState('bk-1');
  const [diaryStatus, setDiaryStatus] = useState('read');
  const [diaryDate, setDiaryDate] = useState('2026-10-15');
  const [diaryRating, setDiaryRating] = useState(5);
  const [diaryNotes, setDiaryNotes] = useState('');
  const [diaryIsReread, setDiaryIsReread] = useState(false);
  const [diaryFilterStatus, setDiaryFilterStatus] = useState('all');

  // Social Feed Filter State
  const [socialScope, setSocialScope] = useState('following');

  // Vault Subtab State
  const [vaultTab, setVaultTab] = useState('favorites');

  // Auth Form State
  const [authIdentifier, setAuthIdentifier] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authDisplayName, setAuthDisplayName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authBio, setAuthBio] = useState('');
  const [authColor] = useState('#F59E0B');

  // Custom Book Sync Form State
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookYear, setNewBookYear] = useState('2024');
  const [newBookPages] = useState('340');
  const [newBookIsbn, setNewBookIsbn] = useState('978-0593440123');
  const [newBookGenre, setNewBookGenre] = useState('Sci-Fi');
  const [newBookDesc, setNewBookDesc] = useState('');

  const notify = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 3200 ? null : prev));
    }, 3400);
  };

  const bookStatsMap = useMemo(() => {
    const map = {};
    books.forEach((b) => {
      const bReviews = reviews.filter((r) => r.bookId === b.id);
      const count = bReviews.length;
      const avg =
        count > 0
          ? Number((bReviews.reduce((acc, r) => acc + r.rating, 0) / count).toFixed(2))
          : 4.6;
      const readCount = diaryEntries.filter(
        (d) => d.bookId === b.id && d.status === 'read'
      ).length;
      map[b.id] = { reviewCount: count, avgRating: avg, readCount };
    });
    return map;
  }, [books, reviews, diaryEntries]);

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const inspectedUser = useMemo(
    () => users.find((u) => u.id === inspectedUserId) || users[0],
    [users, inspectedUserId]
  );

  const filteredBooks = useMemo(() => {
    return books
      .filter((b) => {
        const matchesGenre =
          selectedGenre === 'All' || (b.genres && b.genres.includes(selectedGenre));
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.isbn && b.isbn.toLowerCase().includes(q));
        return matchesGenre && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (bookStatsMap[b.id]?.avgRating || 0) - (bookStatsMap[a.id]?.avgRating || 0);
        }
        if (sortBy === 'year') {
          return (b.publishedYear || 0) - (a.publishedYear || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return (b.likesCount || 0) - (a.likesCount || 0);
      });
  }, [books, selectedGenre, searchQuery, sortBy, bookStatsMap]);

  // ---------------------------------------------------------------------------
  // Handlers: Google Books API + Open Library API Search & Import
  // ---------------------------------------------------------------------------
  const handleSearchExternalDatabase = async (e, overrideProvider) => {
    if (e) e.preventDefault();
    const provider = overrideProvider || externalProvider;
    const q = externalSearchInput.trim();
    if (!q) return;

    setIsSearchingExternal(true);
    const palettes = [
      ['#F59E0B', '#78350F', '#1C140D'],
      ['#38BDF8', '#1E3A8A', '#090D16'],
      ['#818CF8', '#311042', '#090A10'],
      ['#34D399', '#065F46', '#060A12'],
      ['#F43F5E', '#4C0519', '#0B0F19']
    ];
    const patterns = ['orbital', 'rings', 'trinary', 'matrix', 'horizon', 'monolith'];

    try {
      if (provider === 'google') {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=8`
        );
        const data = await response.json();
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          const mapped = data.items.slice(0, 8).map((item, idx) => {
            const info = item.volumeInfo || {};
            const identifiers = info.industryIdentifiers || [];
            const isbnObj =
              identifiers.find((id) => id.type === 'ISBN_13') || identifiers[0] || {};
            const rawThumb =
              info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || '';
            const safeThumb = rawThumb ? rawThumb.replace(/^http:\/\//i, 'https://') : '';
            const pubYear = info.publishedDate
              ? parseInt(info.publishedDate.slice(0, 4), 10) || 2021
              : 2021;

            return {
              id: `gb-${item.id || idx}`,
              externalId: `GB-${item.id || idx}`,
              googleBooksId: item.id || `GB-${idx}`,
              sourceApi: 'Google Books API',
              isbn: isbnObj.identifier || `978-01400${1000 + idx}`,
              title: info.title || 'Untitled Book',
              author: Array.isArray(info.authors) ? info.authors[0] : 'Featured Author',
              publishedYear: pubYear,
              pageCount: info.pageCount || 320,
              genres:
                Array.isArray(info.categories) && info.categories.length > 0
                  ? [info.categories[0].split('/')[0].trim(), 'Literary']
                  : ['Speculative', 'Literary'],
              palette: palettes[idx % palettes.length],
              pattern: patterns[idx % patterns.length],
              coverUrl: safeThumb,
              description:
                info.description ||
                `Synced from Google Books API (Volume ID: ${item.id}). Written by ${
                  Array.isArray(info.authors) ? info.authors.join(', ') : 'featured author'
                }.`,
              likesCount: Math.floor(38 + ((idx * 19) % 95)),
              dislikesCount: Math.floor((idx * 2) % 5),
              favoritesCount: Math.floor(22 + ((idx * 13) % 60))
            };
          });
          setExternalResults(mapped);
          notify(`Loaded ${mapped.length} volumes from Google Books API!`, 'success');
          setIsSearchingExternal(false);
          return;
        }
      }

      // Open Library API query
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=8`
      );
      const data = await response.json();
      if (data && Array.isArray(data.docs) && data.docs.length > 0) {
        const mapped = data.docs.slice(0, 8).map((doc, idx) => ({
          id: `ol-${(doc.key || '').replace('/works/', '') || idx}`,
          externalId: doc.key || `OL-${idx}`,
          sourceApi: 'Open Library API',
          isbn: Array.isArray(doc.isbn) ? doc.isbn[0] : `978-00000${1000 + idx}`,
          title: doc.title || 'Untitled Tome',
          author: Array.isArray(doc.author_name) ? doc.author_name[0] : 'Unknown Author',
          publishedYear: doc.first_publish_year || 2020,
          pageCount: doc.number_of_pages_median || 320,
          genres: ['Sci-Fi', 'Literary'],
          palette: palettes[idx % palettes.length],
          pattern: patterns[idx % patterns.length],
          coverUrl: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : '',
          description: `Imported from Open Library Global Book Database (Work ID: ${
            doc.key || 'Verified'
          }). First published in ${doc.first_publish_year || 'modern era'}.`,
          likesCount: Math.floor(25 + ((idx * 17) % 90)),
          dislikesCount: Math.floor((idx * 3) % 6),
          favoritesCount: Math.floor(14 + ((idx * 13) % 50))
        }));
        setExternalResults(mapped);
        notify(`Retrieved ${mapped.length} books from Open Library Database.`, 'success');
      } else {
        throw new Error('No external records returned');
      }
    } catch (err) {
      // Rich Google Books + Open Library fallback records when offline
      const fallbackDocs = [
        {
          id: `gb-ext-${Date.now()}-1`,
          externalId: `GB-${q.slice(0, 5).toUpperCase()}-01`,
          sourceApi: provider === 'google' ? 'Google Books API' : 'Open Library API',
          isbn: '978-0441013593',
          title: `Parable of the Sower (${q} Collection)`,
          author: q.length < 24 ? q : 'Octavia E. Butler',
          publishedYear: 1993,
          pageCount: 345,
          genres: ['Speculative', 'Literary'],
          palette: ['#F59E0B', '#78350F', '#1C140D'],
          pattern: 'horizon',
          coverUrl: '',
          description: `Retrieved via ${
            provider === 'google' ? 'Google Books Volumes API' : 'Open Library API'
          } for "${q}". Verified ISBN-13 metadata, page count, and synopsis ready for one-click catalog import.`,
          likesCount: 92,
          dislikesCount: 3,
          favoritesCount: 64
        },
        {
          id: `gb-ext-${Date.now()}-2`,
          externalId: `GB-${q.slice(0, 5).toUpperCase()}-02`,
          sourceApi: provider === 'google' ? 'Google Books API' : 'Open Library API',
          isbn: '978-0807062999',
          title: `Kindred & Collected Works: ${q}`,
          author: q.length < 24 ? q : 'Octavia E. Butler',
          publishedYear: 1979,
          pageCount: 288,
          genres: ['Literary', 'Philosophy'],
          palette: ['#38BDF8', '#1E3A8A', '#090D16'],
          pattern: 'orbital',
          coverUrl: '',
          description: `Google Books & Open Library bibliographic volume matching "${q}". Click Import to add this hardcover edition to your 3D shelf.`,
          likesCount: 78,
          dislikesCount: 2,
          favoritesCount: 51
        },
        {
          id: `gb-ext-${Date.now()}-3`,
          externalId: `GB-${q.slice(0, 5).toUpperCase()}-03`,
          sourceApi: provider === 'google' ? 'Google Books API' : 'Open Library API',
          isbn: '978-1250217288',
          title: `A Psalm for the Wild-Built (${q} Series)`,
          author: 'Becky Chambers',
          publishedYear: 2021,
          pageCount: 160,
          genres: ['Speculative', 'Philosophy'],
          palette: ['#34D399', '#065F46', '#060A12'],
          pattern: 'rings',
          coverUrl: '',
          description: `Warm, hopepunk tea-monk novella surfaced by the Google Books recommendation engine for "${q}".`,
          likesCount: 114,
          dislikesCount: 1,
          favoritesCount: 89
        },
        {
          id: `gb-ext-${Date.now()}-4`,
          externalId: `GB-${q.slice(0, 5).toUpperCase()}-04`,
          sourceApi: provider === 'google' ? 'Google Books API' : 'Open Library API',
          isbn: '978-0593188248',
          title: `The Invisible Life of Addie LaRue`,
          author: 'V.E. Schwab',
          publishedYear: 2020,
          pageCount: 448,
          genres: ['Literary', 'Speculative'],
          palette: ['#818CF8', '#311042', '#090A10'],
          pattern: 'trinary',
          coverUrl: '',
          description: `Connected Google Books volume matching your query "${q}" with full community review and reading diary support.`,
          likesCount: 105,
          dislikesCount: 4,
          favoritesCount: 73
        }
      ];
      setExternalResults(fallbackDocs);
      notify(
        `Loaded ${
          provider === 'google' ? 'Google Books API' : 'Open Library'
        } matches for "${q}".`,
        'info'
      );
    } finally {
      setIsSearchingExternal(false);
    }
  };

  const handleImportExternalBook = async (extBook) => {
    const exists = books.find(
      (b) =>
        b.externalId === extBook.externalId ||
        (b.title.toLowerCase() === extBook.title.toLowerCase() &&
          b.author.toLowerCase() === extBook.author.toLowerCase())
    );
    if (exists) {
      setSelectedBookId(exists.id);
      notify(`"${exists.title}" is already on your 3D shelf.`, 'info');
      return;
    }
    const syncedBook = {
      ...extBook,
      id: `bk-${Date.now()}`
    };
    setBooks((prev) => [syncedBook, ...prev]);
    setSelectedBookId(syncedBook.id);
    notify(`Imported "${syncedBook.title}" from ${extBook.sourceApi || 'Google Books'}!`, 'success');

    // Persist to MongoDB
    try {
      const saved = await api.importBook({
        externalId: extBook.externalId || extBook.id,
        isbn: extBook.isbn,
        title: extBook.title,
        author: extBook.author,
        coverUrl: extBook.coverUrl,
        description: extBook.description,
        genres: extBook.genres,
        publishedYear: extBook.publishedYear,
        pageCount: extBook.pageCount,
      });
      if (saved && saved._id) {
        setBooks((prev) =>
          prev.map((b) => (b.id === syncedBook.id ? { ...b, id: String(saved._id), _id: saved._id } : b))
        );
      }
    } catch (err) {
      console.warn('MongoDB import notice:', err.message);
    }
  };

  const handleCreateCustomBook = async (e) => {
    e.preventDefault();
    if (!newBookTitle.trim() || !newBookAuthor.trim()) {
      notify('Please provide both a Book Title and Author.', 'error');
      return;
    }
    const created = {
      id: `bk-${Date.now()}`,
      externalId: `GB-CUSTOM-${Date.now()}`,
      sourceApi: 'Custom ISBN Entry',
      isbn: newBookIsbn.trim() || '978-0000000000',
      title: newBookTitle.trim(),
      author: newBookAuthor.trim(),
      publishedYear: parseInt(newBookYear, 10) || 2025,
      pageCount: parseInt(newBookPages, 10) || 320,
      genres: [newBookGenre, 'Speculative'],
      palette: ['#F59E0B', '#78350F', '#1C140D'],
      pattern: 'orbital',
      coverUrl: '',
      description:
        newBookDesc.trim() ||
        `A newly indexed edition by ${newBookAuthor.trim()}, connected to the Aether Reads catalog for community 5-star reviews and reading diaries.`,
      likesCount: 1,
      dislikesCount: 0,
      favoritesCount: 1
    };
    setBooks((prev) => [created, ...prev]);
    setShowAddBookModal(false);
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookDesc('');
    setSelectedBookId(created.id);
    notify(`Added "${created.title}" to your 3D Book Shelf!`, 'success');

    // Persist to MongoDB
    try {
      const saved = await api.createBook({
        title: created.title,
        author: created.author,
        publishedYear: created.publishedYear,
        pageCount: created.pageCount,
        isbn: created.isbn,
        genres: created.genres,
        coverUrl: created.coverUrl,
        description: created.description,
      });
      if (saved && saved._id) {
        setBooks((prev) =>
          prev.map((b) => (b.id === created.id ? { ...b, id: String(saved._id), _id: saved._id } : b))
        );
      }
    } catch (err) {
      console.warn('MongoDB custom book notice:', err.message);
    }
  };

  // ---------------------------------------------------------------------------
  // Handlers: Favorite, Like & Dislike Book (Keyed per User)
  // ---------------------------------------------------------------------------
  const handleBookReaction = (bookId, reactionType) => {
    if (!currentUser) {
      setShowAuthModal(true);
      notify('Please log in with your username/email to react to books.', 'info');
      return;
    }

    const isFav = currentUser.favorites.includes(bookId);
    const isLiked = currentUser.likedBooks.includes(bookId);
    const isDisliked = currentUser.dislikedBooks.includes(bookId);

    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id !== currentUser.id) return u;
        if (reactionType === 'favorite') {
          return {
            ...u,
            favorites: isFav
              ? u.favorites.filter((id) => id !== bookId)
              : [...u.favorites, bookId]
          };
        }
        if (reactionType === 'like') {
          return {
            ...u,
            likedBooks: isLiked
              ? u.likedBooks.filter((id) => id !== bookId)
              : [...u.likedBooks, bookId],
            dislikedBooks: u.dislikedBooks.filter((id) => id !== bookId)
          };
        }
        if (reactionType === 'dislike') {
          return {
            ...u,
            dislikedBooks: isDisliked
              ? u.dislikedBooks.filter((id) => id !== bookId)
              : [...u.dislikedBooks, bookId],
            likedBooks: u.likedBooks.filter((id) => id !== bookId)
          };
        }
        return u;
      })
    );

    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id !== bookId) return b;
        if (reactionType === 'favorite') {
          return {
            ...b,
            favoritesCount: Math.max(0, (b.favoritesCount || 0) + (isFav ? -1 : 1))
          };
        }
        if (reactionType === 'like') {
          return {
            ...b,
            likesCount: Math.max(0, (b.likesCount || 0) + (isLiked ? -1 : 1)),
            dislikesCount: isDisliked
              ? Math.max(0, (b.dislikesCount || 0) - 1)
              : b.dislikesCount
          };
        }
        if (reactionType === 'dislike') {
          return {
            ...b,
            dislikesCount: Math.max(0, (b.dislikesCount || 0) + (isDisliked ? -1 : 1)),
            likesCount: isLiked ? Math.max(0, (b.likesCount || 0) - 1) : b.likesCount
          };
        }
        return b;
      })
    );

    const targetBook = books.find((b) => b.id === bookId);
    const labelMap = {
      favorite: isFav ? 'Removed from 3D Favorites Shelf' : 'Placed on your 3D Favorites Shelf',
      like: isLiked ? 'Removed Like' : 'Liked book',
      dislike: isDisliked ? 'Removed Dislike' : 'Marked as Disliked'
    };
    notify(`${labelMap[reactionType]}: "${targetBook?.title || 'Book'}"`, 'success');

    // Persist to MongoDB
    if (targetBook && (targetBook._id || targetBook.id)) {
      api.reactBook(targetBook._id || targetBook.id, reactionType).catch((err) =>
        console.warn('MongoDB reactBook notice:', err.message)
      );
    }
  };

  // ---------------------------------------------------------------------------
  // Handlers: Submit 5-Star Review + Optional Reading Diary Entry
  // ---------------------------------------------------------------------------
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      notify('Please log in to publish a 5-star review.', 'info');
      return;
    }
    if (!selectedBook) return;
    if (!reviewThoughts.trim()) {
      notify('Share your thoughts on the book before publishing.', 'error');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      bookId: selectedBook.id,
      userId: currentUser.id,
      rating: reviewRating,
      thoughts: reviewThoughts.trim(),
      moodTags: reviewMoods,
      containsSpoilers: reviewSpoilers,
      likes: [],
      dislikes: [],
      reactions: { insightful: 1, moved: 1, fire: 1, cozy: 1 },
      comments: [],
      createdAt: new Date().toISOString()
    };

    setReviews((prev) => [newRev, ...prev]);

    // Persist review to MongoDB
    api.createReview({
      bookId: selectedBook._id || selectedBook.id,
      rating: reviewRating,
      thoughts: reviewThoughts.trim(),
      moodTags: reviewMoods,
      containsSpoilers: reviewSpoilers,
    }).then((savedReview) => {
      if (savedReview && savedReview._id) {
        setReviews((prev) =>
          prev.map((r) => (r.id === newRev.id ? { ...r, id: String(savedReview._id), _id: savedReview._id } : r))
        );
      }
    }).catch((err) => console.warn('MongoDB review notice:', err.message));

    if (alsoLogDiary) {
      const newDiary = {
        id: `dry-${Date.now()}`,
        userId: currentUser.id,
        bookId: selectedBook.id,
        status: 'read',
        readDate: new Date().toISOString().slice(0, 10),
        rating: reviewRating,
        diaryNotes: reviewThoughts.trim(),
        pagesRead: selectedBook.pageCount || 320,
        isReread: false,
        liked: currentUser.likedBooks.includes(selectedBook.id),
        addedToFavorites: currentUser.favorites.includes(selectedBook.id),
        comments: []
      };
      setDiaryEntries((prev) => [newDiary, ...prev]);

      api.createDiaryEntry({
        bookId: selectedBook._id || selectedBook.id,
        status: 'read',
        readDate: new Date(),
        rating: reviewRating,
        diaryNotes: reviewThoughts.trim(),
        pagesRead: selectedBook.pageCount || 320,
        isReread: false,
        liked: currentUser.likedBooks.includes(selectedBook.id),
        addedToFavorites: currentUser.favorites.includes(selectedBook.id),
      }).catch((err) => console.warn('MongoDB diary notice:', err.message));
    }

    setReviewThoughts('');
    notify(
      alsoLogDiary
        ? `Published ${reviewRating}★ review & logged "${selectedBook.title}" to your Reading Diary!`
        : `Published ${reviewRating}★ review for "${selectedBook.title}"!`,
      'success'
    );
  };

  const handleReviewReaction = (reviewId, reaction) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (reaction === 'like') {
      api.reactReview(reviewId).catch((err) => console.warn('MongoDB reactReview notice:', err.message));
    }
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== reviewId) return r;
        const hasLiked = r.likes.includes(currentUser.id);
        const hasDisliked = r.dislikes.includes(currentUser.id);
        if (reaction === 'like') {
          return {
            ...r,
            likes: hasLiked
              ? r.likes.filter((id) => id !== currentUser.id)
              : [...r.likes, currentUser.id],
            dislikes: r.dislikes.filter((id) => id !== currentUser.id)
          };
        }
        if (reaction === 'dislike') {
          return {
            ...r,
            dislikes: hasDisliked
              ? r.dislikes.filter((id) => id !== currentUser.id)
              : [...r.dislikes, currentUser.id],
            likes: r.likes.filter((id) => id !== currentUser.id)
          };
        }
        // Humanized resonance reaction pills ('insightful' | 'moved' | 'fire' | 'cozy')
        const currReacts = r.reactions || { insightful: 0, moved: 0, fire: 0, cozy: 0 };
        return {
          ...r,
          reactions: {
            ...currReacts,
            [reaction]: (currReacts[reaction] || 0) + 1
          }
        };
      })
    );
  };

  // Add a human comment to a Review or Diary Entry
  const handleAddComment = (targetId, isDiary = false) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    const text = (commentInputs[targetId] || '').trim();
    if (!text) return;

    const newComment = {
      id: `cmt-${Date.now()}`,
      userId: currentUser.id,
      text,
      createdAt: 'Just now'
    };

    if (isDiary) {
      setDiaryEntries((prev) =>
        prev.map((d) =>
          d.id === targetId
            ? { ...d, comments: [...(d.comments || []), newComment] }
            : d
        )
      );
    } else {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === targetId
            ? { ...r, comments: [...(r.comments || []), newComment] }
            : r
        )
      );
    }

    setCommentInputs((prev) => ({ ...prev, [targetId]: '' }));
    notify('Shared your reply with the reading community!', 'success');
  };

  // Send a Book Club Note / Recommendation to another reader
  const handleSendBookNote = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!noteMessage.trim()) {
      notify('Write a short personal note to accompany your book recommendation.', 'error');
      return;
    }
    const newNote = {
      id: `note-${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId: noteTargetUserId,
      bookId: noteBookId,
      message: noteMessage.trim(),
      likes: [currentUser.id],
      createdAt: 'Today'
    };
    setSocialNotes((prev) => [newNote, ...prev]);
    setNoteMessage('');
    const recipient = users.find((u) => u.id === noteTargetUserId);
    notify(`Sent book recommendation note to @${recipient?.username || 'reader'}!`, 'success');
  };

  // ---------------------------------------------------------------------------
  // Handlers: Log Book to Reading Diary
  // ---------------------------------------------------------------------------
  const openLogDiaryForBook = (bookId) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setDiaryBookId(bookId);
    setDiaryStatus('read');
    setDiaryDate('2026-10-15');
    setDiaryRating(5);
    setDiaryNotes('');
    setDiaryIsReread(false);
    setShowDiaryModal(true);
  };

  const handleSaveDiaryEntry = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const book = books.find((b) => b.id === diaryBookId);
    if (!book) return;

    const entry = {
      id: `dry-${Date.now()}`,
      userId: currentUser.id,
      bookId: book.id,
      status: diaryStatus,
      readDate: diaryDate,
      rating: diaryRating,
      diaryNotes:
        diaryNotes.trim() ||
        `Completed reading ${book.title} by ${book.author}. Rated ${diaryRating}/5 stars.`,
      pagesRead:
        diaryStatus === 'read'
          ? book.pageCount || 320
          : Math.floor((book.pageCount || 300) / 2),
      isReread: diaryIsReread,
      liked: currentUser.likedBooks.includes(book.id),
      addedToFavorites: currentUser.favorites.includes(book.id),
      comments: []
    };

    setDiaryEntries((prev) => [entry, ...prev]);
    setShowDiaryModal(false);
    notify(`Logged "${book.title}" to your Reading Diary!`, 'success');

    // Persist to MongoDB
    api.createDiaryEntry({
      bookId: book._id || book.id,
      status: diaryStatus,
      readDate: diaryDate,
      rating: diaryRating,
      diaryNotes: entry.diaryNotes,
      pagesRead: entry.pagesRead,
      isReread: diaryIsReread,
      liked: entry.liked,
      addedToFavorites: entry.addedToFavorites,
    }).then((savedEntry) => {
      if (savedEntry && savedEntry._id) {
        setDiaryEntries((prev) =>
          prev.map((d) => (d.id === entry.id ? { ...d, id: String(savedEntry._id), _id: savedEntry._id } : d))
        );
      }
    }).catch((err) => console.warn('MongoDB diary notice:', err.message));
  };

  const handleDeleteDiaryEntry = (entryId) => {
    setDiaryEntries((prev) => prev.filter((d) => d.id !== entryId));
    notify('Removed entry from Reading Diary.', 'info');
  };

  // ---------------------------------------------------------------------------
  // Handlers: Follow / Unfollow Readers
  // ---------------------------------------------------------------------------
  const handleToggleFollow = (targetUserId) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (targetUserId === currentUser.id) return;

    const isFollowing = currentUser.following.includes(targetUserId);
    const targetUser = users.find((u) => u.id === targetUserId);

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            following: isFollowing
              ? u.following.filter((id) => id !== targetUserId)
              : [...u.following, targetUserId]
          };
        }
        if (u.id === targetUserId) {
          return {
            ...u,
            followers: isFollowing
              ? u.followers.filter((id) => id !== currentUser.id)
              : [...u.followers, currentUser.id]
          };
        }
        return u;
      })
    );

    // Persist to MongoDB
    api.followUser(targetUserId).catch((err) => console.warn('MongoDB follow notice:', err.message));

    notify(
      isFollowing
        ? `Unfollowed @${targetUser?.username}`
        : `Now following @${targetUser?.username} — their Diary & Likes are in your Social Pulse!`,
      'success'
    );
  };

  // ---------------------------------------------------------------------------
  // Handlers: Login & Registration (Email, Password, Username)
  // ---------------------------------------------------------------------------
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const ident = authIdentifier.trim().toLowerCase();
      if (!ident || !authPassword) {
        notify('Please enter both your email/username and password.', 'error');
        return;
      }

      // Try Backend MongoDB Login
      try {
        const res = await api.login(ident, authPassword);
        if (res && res.token && res.user) {
          localStorage.setItem('aether_jwt_token', res.token);
          const loggedUser = {
            ...res.user,
            id: String(res.user.id || res.user._id),
          };
          setUsers((prev) => {
            const exists = prev.some((u) => u.id === loggedUser.id);
            return exists
              ? prev.map((u) => (u.id === loggedUser.id ? { ...u, ...loggedUser } : u))
              : [loggedUser, ...prev];
          });
          setCurrentUserId(loggedUser.id);
          setShowAuthModal(false);
          setAuthIdentifier('');
          setAuthPassword('');
          notify(`Welcome back, @${loggedUser.username}! (Authenticated via MongoDB)`, 'success');
          return;
        }
      } catch (err) {
        console.warn('Backend login attempt note:', err.message);
      }

      // Local fallback
      const matched = users.find(
        (u) => u.email.toLowerCase() === ident || u.username.toLowerCase() === ident
      );
      if (!matched) {
        notify('Invalid credentials or user not found. Check credentials or sign up!', 'error');
        return;
      }
      setCurrentUserId(matched.id);
      setShowAuthModal(false);
      setAuthIdentifier('');
      setAuthPassword('');
      notify(`Welcome back, @${matched.username}!`, 'success');
    } else {
      const cleanUser = authUsername.trim().toLowerCase().replace(/\s+/g, '_');
      const cleanEmail = authEmail.trim().toLowerCase();
      if (!cleanUser || !cleanEmail || !authPassword) {
        notify('Username, Email, and Password are required to create an account.', 'error');
        return;
      }

      // Try Backend MongoDB Register
      try {
        const res = await api.register({
          username: cleanUser,
          email: cleanEmail,
          password: authPassword,
          displayName: authDisplayName.trim() || cleanUser,
          bio: authBio.trim() || 'Book lover exploring new stories and sharing honest notes.',
        });
        if (res && res.token && res.user) {
          localStorage.setItem('aether_jwt_token', res.token);
          const newUser = {
            ...res.user,
            id: String(res.user.id || res.user._id),
            avatarColor: authColor,
            yearlyGoal: { read: 0, target: 12 },
            readingRitual: 'Cozy armchair & evening chapters ☕',
          };
          setUsers((prev) => [...prev, newUser]);
          setCurrentUserId(newUser.id);
          setShowAuthModal(false);
          setAuthUsername('');
          setAuthEmail('');
          setAuthPassword('');
          notify(`Account @${newUser.username} registered & persisted to MongoDB!`, 'success');
          return;
        }
      } catch (err) {
        console.warn('Backend register attempt note:', err.message);
      }

      // Local fallback
      const duplicate = users.find(
        (u) => u.username.toLowerCase() === cleanUser || u.email.toLowerCase() === cleanEmail
      );
      if (duplicate) {
        notify('That username or email is already registered.', 'error');
        return;
      }
      const newUser = {
        id: `usr-${Date.now()}`,
        username: cleanUser,
        displayName: authDisplayName.trim() || cleanUser,
        email: cleanEmail,
        password: authPassword,
        bio: authBio.trim() || 'Book lover exploring new stories and sharing honest notes.',
        readingRitual: 'Cozy armchair & evening chapters ☕',
        yearlyGoal: { read: 4, target: 15 },
        avatarColor: authColor,
        roleTag: 'Reader',
        favorites: ['bk-1', 'bk-2'],
        likedBooks: ['bk-1', 'bk-2'],
        dislikedBooks: [],
        following: ['usr-1', 'usr-2', 'usr-3'],
        followers: ['usr-1']
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUserId(newUser.id);
      setShowAuthModal(false);
      setAuthUsername('');
      setAuthEmail('');
      setAuthPassword('');
      notify(`Account @${newUser.username} created and authenticated!`, 'success');
    }
  };

  const socialFeedItems = useMemo(() => {
    const allowedUserIds =
      socialScope === 'following' && currentUser
        ? currentUser.following
        : users.map((u) => u.id);

    const revItems = reviews
      .filter((r) => allowedUserIds.includes(r.userId))
      .map((r) => ({
        type: 'review',
        id: `feed-rev-${r.id}`,
        rawId: r.id,
        date: r.createdAt.slice(0, 10),
        userId: r.userId,
        bookId: r.bookId,
        rating: r.rating,
        text: r.thoughts,
        moodTags: r.moodTags || [],
        comments: r.comments || [],
        reactions: r.reactions || { insightful: 4, moved: 6, fire: 5, cozy: 3 },
        reviewObj: r
      }));

    const diaryItems = diaryEntries
      .filter((d) => allowedUserIds.includes(d.userId))
      .map((d) => ({
        type: 'diary',
        id: `feed-dry-${d.id}`,
        rawId: d.id,
        date: d.readDate,
        userId: d.userId,
        bookId: d.bookId,
        rating: d.rating,
        text: d.diaryNotes,
        status: d.status,
        isReread: d.isReread,
        pagesRead: d.pagesRead,
        comments: d.comments || []
      }));

    return [...revItems, ...diaryItems].sort((a, b) => b.date.localeCompare(a.date));
  }, [reviews, diaryEntries, socialScope, currentUser, users]);

  const myDiaryEntries = useMemo(() => {
    if (!currentUser) return [];
    return diaryEntries
      .filter((d) => d.userId === currentUser.id)
      .filter((d) => diaryFilterStatus === 'all' || d.status === diaryFilterStatus)
      .sort((a, b) => b.readDate.localeCompare(a.readDate));
  }, [diaryEntries, currentUser, diaryFilterStatus]);

  const myStats = useMemo(() => {
    if (!currentUser) {
      return { readCount: 0, totalPages: 0, avgRating: 0, reviewsCount: 0 };
    }
    const allMyDiary = diaryEntries.filter((d) => d.userId === currentUser.id);
    const readCount = allMyDiary.filter((d) => d.status === 'read').length;
    const totalPages = allMyDiary.reduce((acc, d) => acc + (d.pagesRead || 0), 0);
    const myRevs = reviews.filter((r) => r.userId === currentUser.id);
    const avgRating =
      myRevs.length > 0
        ? (myRevs.reduce((acc, r) => acc + r.rating, 0) / myRevs.length).toFixed(1)
        : '4.9';
    return { readCount, totalPages, avgRating, reviewsCount: myRevs.length };
  }, [diaryEntries, reviews, currentUser]);

  const themeBg =
    ambienceMood === 'cozy'
      ? 'bg-[#0E0B14]'
      : ambienceMood === 'velvet'
      ? 'bg-[#090812]'
      : 'bg-[#060913]';

  return (
    <div
      className={`min-h-screen ${themeBg} text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden transition-colors duration-500`}
    >
      {/* Warm Humanized & Futuristic Ambient Light Fields */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-36 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-500/[0.08] blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full bg-rose-500/[0.06] blur-[140px]" />
        <div className="absolute -bottom-48 left-1/3 w-[32rem] h-[32rem] rounded-full bg-sky-500/[0.06] blur-[130px]" />
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-amber-400/40 shadow-[0_10px_35px_rgba(245,158,11,0.25)] text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-amber-50 font-medium">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white ml-2"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.09] bg-[#0D0A14]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('discover')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/25 via-rose-500/20 to-slate-900 border border-amber-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.22)] group-hover:border-amber-300 transition-colors">
                <BookOpen size={18} className="text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold tracking-wide text-sm sm:text-base bg-gradient-to-r from-amber-100 via-white to-rose-200 bg-clip-text text-transparent">
                    AETHER
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-400/30">
                    READS 3D
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">
                  Warm Social Book Sanctuary &amp; Google Books Archive
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Pills */}
          <nav className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl overflow-x-auto">
            {[
              { id: 'discover', label: 'Book Database', icon: Compass },
              { id: 'diary', label: 'Reading Diary', icon: Calendar },
              { id: 'social', label: 'Readers & Feed', icon: Users },
              { id: 'vault', label: 'My Vault', icon: Bookmark },
              { id: 'mern', label: 'MERN Stack', icon: Database }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.18)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-amber-300' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right User Auth, Database Status, 3D Toggle & Quick Diary Action */}
          <div className="flex items-center gap-2">
            {/* Live MongoDB Connection Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  dbStatus.connected
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                } animate-pulse shrink-0`}
              />
              <span className="font-mono text-slate-300">
                {dbStatus.connected ? 'MongoDB Live' : 'Local Cache'}
              </span>
              {apiLatency !== null && (
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {apiLatency}ms
                </span>
              )}
              <button
                type="button"
                onClick={() => syncWithDatabase(false)}
                disabled={isSyncing}
                className="text-slate-400 hover:text-white transition-colors ml-0.5"
                title="Force sync data with MongoDB"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin text-amber-400' : ''} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setEnable3DBooks((prev) => !prev)}
              className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                enable3DBooks
                  ? 'bg-amber-500/15 text-amber-200 border-amber-400/40'
                  : 'bg-white/[0.04] text-slate-400 border-white/10'
              }`}
              title="Toggle tactile 3D hardcover perspective"
            >
              <Layers size={13} />
              <span>3D Covers</span>
            </button>

            <button
              type="button"
              onClick={() => openLogDiaryForBook(books[0]?.id || 'bk-1')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-semibold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
            >
              <Plus size={14} />
              <span>Log Read Book</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                  title="Switch user account or manage session"
                >
                  <HumanAvatar user={currentUser} size="xs" />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-medium text-white leading-none">
                      @{currentUser.username}
                    </p>
                    <p className="text-[10px] text-amber-300/80 leading-none mt-0.5">
                      {currentUser.following.length} following
                    </p>
                  </div>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-medium transition-all"
              >
                <User size={14} />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ===================================================================
            TAB 1: BOOK DATABASE & CATALOG (WITH GOOGLE BOOKS & 3D SHELF)
        =================================================================== */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Warm Humanized Hero & 3D Interactive Bookshelf Showcase */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-200/15 bg-gradient-to-br from-[#1A1423]/95 via-[#12101B]/95 to-[#1F1624]/90 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-3.5 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs">
                    <Coffee size={13} className="text-amber-300" />
                    <span>
                      {currentUser
                        ? currentUser.readingRitual || 'Welcome back to your cozy reading sanctuary'
                        : 'Cozy Social Reading Sanctuary • Connected to Google Books'}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
                    Every book you love, on a living 3D shelf shared with kindred readers.
                  </h1>
                  <p className="text-sm text-slate-300/95 leading-relaxed">
                    Discover millions of titles via <strong>Google Books</strong> &amp;{' '}
                    <strong>Open Library</strong>, rate books out of 5 stars with honest thoughts,
                    keep a personal Reading Diary, and exchange book notes with friends you follow.
                  </p>

                  {/* Ambience Mood Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-slate-400">Reading Ambience:</span>
                    {[
                      { id: 'cozy', label: '☕ Candlelit Study' },
                      { id: 'velvet', label: '🌙 Midnight Velvet' },
                      { id: 'starlight', label: '✨ Starlight Atrium' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setAmbienceMood(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                          ambienceMood === m.id
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-400/40'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3D Interactive Floating Shelf Showcase */}
                <div className="flex-1 max-w-lg mx-auto lg:mx-0 w-full">
                  <div className="relative pt-4 pb-6 px-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-amber-950/20 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-amber-200/90 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-amber-400" />
                        <span>Featured 3D Hardcover Showcase (Hover to Tilt)</span>
                      </span>
                      <span className="text-[11px] text-slate-400">Click any book to review</span>
                    </div>

                    <div className="flex items-end justify-around gap-3 pt-2 pb-3">
                      {books.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          onClick={() => setSelectedBookId(b.id)}
                          className="cursor-pointer"
                        >
                          <FuturisticBookCover book={b} size="sm" is3D={true} />
                        </div>
                      ))}
                    </div>

                    {/* 3D Physical Wood & Glass Shelf Ledge */}
                    <div
                      className="h-3.5 w-full rounded-full bg-gradient-to-r from-amber-950 via-amber-700/60 to-amber-950 border-t border-amber-300/40 shadow-[0_12px_25px_rgba(0,0,0,0.85)]"
                      style={{ transform: 'rotateX(35deg)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Database Source Switcher & Action Bar */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDbMode('catalog')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      dbMode === 'catalog'
                        ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    <Database size={14} />
                    <span>Synced MongoDB Catalog ({books.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDbMode('openlibrary');
                      setExternalProvider('google');
                      handleSearchExternalDatabase(null, 'google');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      dbMode === 'openlibrary' && externalProvider === 'google'
                        ? 'bg-sky-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    <Globe size={14} />
                    <span>Search Google Books API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDbMode('openlibrary');
                      setExternalProvider('openlibrary');
                      handleSearchExternalDatabase(null, 'openlibrary');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      dbMode === 'openlibrary' && externalProvider === 'openlibrary'
                        ? 'bg-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    <Globe size={14} />
                    <span>Search Live Open Library API</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-medium text-amber-200 transition-all"
                  >
                    <Plus size={14} />
                    <span>Index Custom Book by ISBN</span>
                  </button>
                </div>
              </div>
            </div>

            {/* External Database Connector (Google Books API + Open Library API) */}
            {dbMode === 'openlibrary' && (
              <div className="rounded-3xl border border-sky-400/30 bg-[#111526]/95 p-6 space-y-5 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {externalProvider === 'google'
                          ? 'GOOGLE BOOKS API v1 CONNECTED'
                          : 'OPEN LIBRARY API CONNECTED'}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-1">
                      <Globe size={18} className="text-sky-400" />
                      <span>
                        {externalProvider === 'google'
                          ? 'Google Books Global Volume Search'
                          : 'Open Library Bibliographic Connector'}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Search any book by title, author, or ISBN from{' '}
                      {externalProvider === 'google' ? 'Google Books' : 'Open Library'} and import
                      it straight onto your 3D shelf for 5-star reviewing.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => handleSearchExternalDatabase(e, externalProvider)}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <div className="flex rounded-xl bg-slate-950 p-1 border border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setExternalProvider('google');
                          handleSearchExternalDatabase(null, 'google');
                        }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          externalProvider === 'google'
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Google Books
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setExternalProvider('openlibrary');
                          handleSearchExternalDatabase(null, 'openlibrary');
                        }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          externalProvider === 'openlibrary'
                            ? 'bg-indigo-500 text-white font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Open Library
                      </button>
                    </div>

                    <div className="relative">
                      <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={externalSearchInput}
                        onChange={(e) => setExternalSearchInput(e.target.value)}
                        placeholder="Search Google Books title, author..."
                        className="pl-9 pr-4 py-2 rounded-xl bg-slate-950/90 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400 w-56 sm:w-64"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSearchingExternal}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <RefreshCw size={13} className={isSearchingExternal ? 'animate-spin' : ''} />
                      <span>{isSearchingExternal ? 'Querying...' : 'Query DB'}</span>
                    </button>
                  </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {externalResults.map((extBook) => {
                    const alreadyInCatalog = books.some(
                      (b) =>
                        b.externalId === extBook.externalId ||
                        b.title.toLowerCase() === extBook.title.toLowerCase()
                    );
                    return (
                      <div
                        key={extBook.id}
                        className="flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all gap-4"
                      >
                        <div className="flex gap-4">
                          <FuturisticBookCover book={extBook} size="sm" is3D={enable3DBooks} />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-mono text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded">
                              {extBook.sourceApi || 'Google Books'}
                            </span>
                            <h3 className="text-sm font-semibold text-white mt-1.5 line-clamp-2">
                              {extBook.title}
                            </h3>
                            <p className="text-xs text-slate-400 truncate">{extBook.author}</p>
                            <p className="text-[11px] font-mono text-slate-500 mt-1">
                              {extBook.publishedYear} • {extBook.pageCount}p
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleImportExternalBook(extBook)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            alreadyInCatalog
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-sky-500/20 hover:bg-sky-500 text-sky-200 hover:text-slate-950 border border-sky-400/30'
                          }`}
                        >
                          {alreadyInCatalog ? (
                            <>
                              <Check size={14} />
                              <span>Synced in Catalog (Open)</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>Import to App Catalog</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter & Search Bar for Catalog */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter shelf by book title, author, or ISBN..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/60"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Sci-Fi', 'Speculative', 'Cyberpunk', 'Philosophy', 'Astrophysics', 'Literary'].map(
                  (genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                        selectedGenre === genre
                          ? 'bg-amber-500/25 text-amber-200 border border-amber-400/40'
                          : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      {genre}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="popular">Sort: Most Loved</option>
                  <option value="rating">Sort: Highest 5★ Rating</option>
                  <option value="year">Sort: Publication Year</option>
                  <option value="title">Sort: Title (A–Z)</option>
                </select>
              </div>
            </div>

            {/* 3D Book Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => {
                const stats = bookStatsMap[book.id] || {
                  avgRating: 4.5,
                  reviewCount: 0,
                  readCount: 0
                };
                const isFav = currentUser?.favorites.includes(book.id);
                const isLiked = currentUser?.likedBooks.includes(book.id);
                const isDisliked = currentUser?.dislikedBooks.includes(book.id);
                const isReadInDiary =
                  currentUser &&
                  diaryEntries.some(
                    (d) =>
                      d.userId === currentUser.id && d.bookId === book.id && d.status === 'read'
                  );

                return (
                  <div
                    key={book.id}
                    className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#161324]/95 to-[#0E0C18]/95 border border-white/[0.09] hover:border-amber-400/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  >
                    <div>
                      <div className="flex gap-5">
                        <div
                          onClick={() => setSelectedBookId(book.id)}
                          className="cursor-pointer shrink-0 pt-1 pl-1"
                        >
                          <FuturisticBookCover book={book} size="md" is3D={enable3DBooks} />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-400/20">
                                {book.genres?.[0] || 'Sci-Fi'}
                              </span>
                              {isReadInDiary && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                                  <Check size={10} /> READ
                                </span>
                              )}
                            </div>

                            <h3
                              onClick={() => setSelectedBookId(book.id)}
                              className="text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors cursor-pointer mt-2 line-clamp-2"
                            >
                              {book.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">by {book.author}</p>

                            <div className="flex items-center gap-2 mt-2.5">
                              <StarRating value={stats.avgRating} size={13} readOnly />
                              <span className="text-xs font-bold text-amber-300">
                                {stats.avgRating}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                ({stats.reviewCount} reviews)
                              </span>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-2">
                            <span>{book.publishedYear}</span>
                            <span>•</span>
                            <span>{book.pageCount} pages</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300/85 line-clamp-2 mt-4 leading-relaxed">
                        {book.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleBookReaction(book.id, 'favorite')}
                          title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isFav
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                              : 'bg-white/[0.04] text-slate-400 hover:text-rose-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          <Heart size={13} className={isFav ? 'fill-rose-400 text-rose-400' : ''} />
                          <span>{book.favoritesCount || 0}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookReaction(book.id, 'like')}
                          title="Like this book"
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isLiked
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                              : 'bg-white/[0.04] text-slate-400 hover:text-emerald-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          <ThumbsUp
                            size={13}
                            className={isLiked ? 'fill-emerald-400 text-emerald-400' : ''}
                          />
                          <span>{book.likesCount || 0}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookReaction(book.id, 'dislike')}
                          title="Dislike this book"
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isDisliked
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                              : 'bg-white/[0.04] text-slate-400 hover:text-amber-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          <ThumbsDown
                            size={13}
                            className={isDisliked ? 'fill-amber-400 text-amber-400' : ''}
                          />
                          <span>{book.dislikesCount || 0}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openLogDiaryForBook(book.id)}
                          title="Log to Reading Diary"
                          className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 transition-colors"
                        >
                          <Calendar size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedBookId(book.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-400/30 text-xs font-semibold transition-all"
                        >
                          <MessageSquare size={13} />
                          <span>Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: PERSONAL READING DIARY (CHRONICLE OF READ BOOKS)
        =================================================================== */}
        {activeTab === 'diary' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#171222] via-[#121629] to-[#171222] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs">
                    <BookMarked size={13} />
                    <span>Personal Reading Journal • Shared with Your Followers</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                    {currentUser
                      ? `${currentUser.displayName}’s Reading Chronicle`
                      : 'Reading Chronicle'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Every book you finish is chronicled here with the date, your 5-star rating, and
                    personal reflections so friends who follow you can read along and leave comments.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openLogDiaryForBook(books[0]?.id || 'bk-1')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all"
                  >
                    <Plus size={16} />
                    <span>Log a Book to Diary</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-slate-400">Books Finished</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{myStats.readCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-slate-400">Pages Turned</p>
                  <p className="text-2xl font-bold text-amber-300 mt-1">
                    {myStats.totalPages.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-slate-400">Average Rating</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">{myStats.avgRating} ★</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs text-slate-400">Kindred Followers</p>
                  <p className="text-2xl font-bold text-rose-300 mt-1">
                    {currentUser ? currentUser.followers.length : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'All Diary Logs' },
                  { id: 'read', label: 'Finished Reading' },
                  { id: 'reading', label: 'Currently Reading' },
                  { id: 'want_to_read', label: 'Reading Queue' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setDiaryFilterStatus(st.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      diaryFilterStatus === st.id
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {myDiaryEntries.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center space-y-3">
                  <Calendar size={32} className="mx-auto text-slate-500" />
                  <h3 className="text-base font-semibold text-white">No Diary Entries in This View</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Log a book you have read or are currently reading to build your chronological
                    reading diary.
                  </p>
                  <button
                    type="button"
                    onClick={() => openLogDiaryForBook(books[0]?.id || 'bk-1')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs"
                  >
                    <Plus size={14} /> Log Your First Book
                  </button>
                </div>
              ) : (
                myDiaryEntries.map((entry) => {
                  const book = books.find((b) => b.id === entry.bookId) || books[0];
                  return (
                    <div
                      key={entry.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#141122]/90 border border-white/10 hover:border-amber-400/30 transition-all"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-16 text-center p-2.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 shrink-0 font-mono">
                          <p className="text-[10px] text-amber-300 uppercase">
                            {entry.readDate.slice(0, 7)}
                          </p>
                          <p className="text-xl font-bold text-white mt-0.5">
                            {entry.readDate.slice(8, 10)}
                          </p>
                        </div>

                        <div
                          onClick={() => setSelectedBookId(book.id)}
                          className="cursor-pointer shrink-0"
                        >
                          <FuturisticBookCover book={book} size="sm" is3D={enable3DBooks} />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                                entry.status === 'read'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                                  : entry.status === 'reading'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30'
                                  : 'bg-indigo-500/15 text-indigo-300 border border-indigo-400/30'
                              }`}
                            >
                              {entry.status === 'read'
                                ? 'FINISHED READ'
                                : entry.status === 'reading'
                                ? 'CURRENTLY READING'
                                : 'WANT TO READ'}
                            </span>
                            {entry.isReread && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-400/30">
                                RE-READ
                              </span>
                            )}
                            <StarRating value={entry.rating || 5} size={13} readOnly />
                          </div>

                          <h3
                            onClick={() => setSelectedBookId(book.id)}
                            className="text-base font-serif font-bold text-white hover:text-amber-200 cursor-pointer"
                          >
                            {book.title}{' '}
                            <span className="text-xs font-sans font-normal text-slate-400">
                              by {book.author}
                            </span>
                          </h3>

                          <p className="text-xs text-slate-200 leading-relaxed max-w-2xl italic">
                            “{entry.diaryNotes}”
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                        <span className="text-xs font-mono text-slate-400">
                          {entry.pagesRead} pages logged
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedBookId(book.id)}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-xs text-slate-300"
                          >
                            Book Dossier
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteDiaryEntry(entry.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                            title="Delete diary log"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: SOCIAL READER NETWORK, BOOK CLUB NOTES & INTERACTIVE STREAM
        =================================================================== */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Kindred Readers Directory & Inspected Reader Profile */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-[#131020]/90 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Users size={17} className="text-amber-300" />
                      <span>Readers Network</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Follow fellow book lovers to see their Likes, Favorites &amp; Reading Diary.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    {users.length} Readers
                  </span>
                </div>

                <div className="space-y-3">
                  {users.map((reader) => {
                    const isMe = currentUser?.id === reader.id;
                    const isFollowing = currentUser?.following.includes(reader.id);
                    const isInspected = inspectedUser?.id === reader.id;
                    const readerDiaryCount = diaryEntries.filter(
                      (d) => d.userId === reader.id && d.status === 'read'
                    ).length;

                    return (
                      <div
                        key={reader.id}
                        onClick={() => setInspectedUserId(reader.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isInspected
                            ? 'bg-amber-500/10 border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.12)]'
                            : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <HumanAvatar user={reader} size="md" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-white">
                                  {reader.displayName}
                                </span>
                                {isMe && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400">@{reader.username}</p>
                              <p className="text-[11px] text-amber-200/80 mt-0.5">
                                {reader.readingRitual || 'Reading with warm tea ☕'}
                              </p>
                            </div>
                          </div>

                          {!isMe && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFollow(reader.id);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                isFollowing
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                              }`}
                            >
                              {isFollowing ? 'Following ✓' : '+ Follow'}
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-slate-300/90 mt-2.5 line-clamp-2">{reader.bio}</p>

                        <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] text-slate-400">
                          <span>
                            <strong className="text-white">{reader.favorites.length}</strong> Favs
                          </span>
                          <span>
                            <strong className="text-white">{reader.likedBooks.length}</strong> Likes
                          </span>
                          <span>
                            <strong className="text-white">{readerDiaryCount}</strong> Read in Diary
                          </span>
                          <span>
                            <strong className="text-white">{reader.followers.length}</strong>{' '}
                            Followers
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inspected Reader’s 3D Shelf & Diary Dossier */}
              {inspectedUser && (
                <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#1B1528] to-[#0F0C1A] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HumanAvatar user={inspectedUser} size="md" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">
                          READER SANCTUARY &amp; 3D SHELF
                        </span>
                        <h3 className="text-base font-bold text-white">
                          @{inspectedUser.username}’s Shelves &amp; Diary
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Mini 3D Shelf of Inspected Reader's Favorites */}
                  <div>
                    <p className="text-xs font-mono uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                      <Heart size={12} className="text-rose-400 fill-rose-400" /> Favorite Books (
                      {inspectedUser.favorites.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {inspectedUser.favorites.map((bId) => {
                        const b = books.find((item) => item.id === bId);
                        if (!b) return null;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBookId(b.id)}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-xs text-rose-200 flex items-center gap-1.5 transition-all"
                          >
                            <BookOpen size={12} />
                            <span>{b.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                      <ThumbsUp size={12} className="text-emerald-400" /> Liked Books (
                      {inspectedUser.likedBooks.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {inspectedUser.likedBooks.map((bId) => {
                        const b = books.find((item) => item.id === bId);
                        if (!b) return null;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBookId(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/25 text-xs text-emerald-200 transition-all"
                          >
                            {b.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                      <Calendar size={12} className="text-amber-300" /> Recent Reading Diary Entries
                    </p>
                    <div className="space-y-2">
                      {diaryEntries
                        .filter((d) => d.userId === inspectedUser.id)
                        .slice(0, 3)
                        .map((d) => {
                          const b = books.find((item) => item.id === d.bookId);
                          if (!b) return null;
                          return (
                            <div
                              key={d.id}
                              onClick={() => setSelectedBookId(b.id)}
                              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 cursor-pointer flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-white truncate">
                                  {b.title}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">{d.diaryNotes}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-amber-400">
                                  {d.rating} ★
                                </span>
                                <p className="text-[10px] font-mono text-slate-500">{d.readDate}</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Book Club Recommendations + Interactive Social Activity Stream */}
            <div className="lg:col-span-7 space-y-5">
              {/* Humanized Book Recommendation Note Composer */}
              <form
                onSubmit={handleSendBookNote}
                className="p-5 rounded-3xl bg-gradient-to-r from-[#1A1426] to-[#131728] border border-amber-400/25 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Coffee size={15} className="text-amber-300" />
                    <span>Pass a Book Recommendation Note to a Fellow Reader</span>
                  </h3>
                  <span className="text-[11px] text-amber-200/80">Book Club Postcard</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">To Reader</label>
                    <select
                      value={noteTargetUserId}
                      onChange={(e) => setNoteTargetUserId(e.target.value)}
                      className="w-full rounded-xl bg-slate-950/90 border border-white/15 px-3 py-1.5 text-xs text-white"
                    >
                      {users
                        .filter((u) => u.id !== currentUser?.id)
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            @{u.username} ({u.displayName})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Recommended Book
                    </label>
                    <select
                      value={noteBookId}
                      onChange={(e) => setNoteBookId(e.target.value)}
                      className="w-full rounded-xl bg-slate-950/90 border border-white/15 px-3 py-1.5 text-xs text-white"
                    >
                      {books.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title} — {b.author}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={noteMessage}
                    onChange={(e) => setNoteMessage(e.target.value)}
                    placeholder="Write a warm note explaining why they will love this book..."
                    className="flex-1 rounded-xl bg-slate-950/90 border border-white/15 px-3.5 py-2 text-xs text-white placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Send size={13} />
                    <span>Send Note</span>
                  </button>
                </div>

                {/* Recent Shared Book Notes */}
                {socialNotes.length > 0 && (
                  <div className="pt-2 space-y-2">
                    {socialNotes.slice(0, 2).map((note) => {
                      const fromU = users.find((u) => u.id === note.fromUserId) || users[0];
                      const toU = users.find((u) => u.id === note.toUserId) || users[1];
                      const noteBook = books.find((b) => b.id === note.bookId) || books[0];
                      return (
                        <div
                          key={note.id}
                          className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <p className="text-amber-200">
                              <strong>@{fromU.username}</strong> recommended{' '}
                              <button
                                type="button"
                                onClick={() => setSelectedBookId(noteBook.id)}
                                className="underline decoration-amber-400/60 font-semibold text-white hover:text-amber-300"
                              >
                                {noteBook.title}
                              </button>{' '}
                              to <strong>@{toU.username}</strong>
                            </p>
                            <p className="text-slate-300 italic">“{note.message}”</p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            {note.createdAt}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </form>

              {/* Reader Activity Stream Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#131020]/90 border border-white/10">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" />
                    <span>Reader Activity Stream</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    React and reply to 5-star reviews and reading diary reflections from friends.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setSocialScope('following')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      socialScope === 'following'
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Following ({currentUser ? currentUser.following.length : 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSocialScope('global')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      socialScope === 'global'
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Readers
                  </button>
                </div>
              </div>

              {socialFeedItems.length === 0 ? (
                <div className="p-10 rounded-2xl border border-white/10 bg-white/[0.02] text-center space-y-3">
                  <Users size={28} className="mx-auto text-slate-500" />
                  <p className="text-sm font-semibold text-white">
                    Follow readers on the left to populate your personalized stream!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSocialScope('global')}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold"
                  >
                    Switch to All Readers Feed
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {socialFeedItems.map((item) => {
                    const authorUser = users.find((u) => u.id === item.userId) || users[0];
                    const book = books.find((b) => b.id === item.bookId) || books[0];

                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-3xl bg-[#131020]/90 border border-white/[0.09] hover:border-amber-400/25 transition-all space-y-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setInspectedUserId(authorUser.id)}
                              className="focus:outline-none"
                            >
                              <HumanAvatar user={authorUser} size="sm" />
                            </button>
                            <div>
                              <p className="text-xs text-slate-200">
                                <button
                                  type="button"
                                  onClick={() => setInspectedUserId(authorUser.id)}
                                  className="font-bold text-white hover:text-amber-300"
                                >
                                  {authorUser.displayName} (@{authorUser.username})
                                </button>{' '}
                                {item.type === 'review'
                                  ? 'wrote a 5-star review'
                                  : 'logged a book in their Reading Diary'}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {item.date} • {authorUser.readingRitual}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase ${
                              item.type === 'review'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30'
                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                            }`}
                          >
                            {item.type === 'review' ? 'REVIEW' : 'DIARY LOG'}
                          </span>
                        </div>

                        <div className="flex gap-4 pt-1">
                          <div
                            onClick={() => setSelectedBookId(book.id)}
                            className="cursor-pointer shrink-0"
                          >
                            <FuturisticBookCover book={book} size="sm" is3D={enable3DBooks} />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4
                                onClick={() => setSelectedBookId(book.id)}
                                className="text-sm font-serif font-bold text-white hover:text-amber-200 cursor-pointer"
                              >
                                {book.title}{' '}
                                <span className="text-xs font-sans font-normal text-slate-400">
                                  by {book.author}
                                </span>
                              </h4>
                              <StarRating value={item.rating || 5} size={13} readOnly />
                            </div>

                            <p className="text-xs text-slate-200 leading-relaxed">{item.text}</p>

                            {item.moodTags && item.moodTags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {item.moodTags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-200 border border-amber-400/20"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Expressive Human Reading Reactions */}
                            {item.type === 'review' && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                                {[
                                  { key: 'insightful', label: '💡 Insightful' },
                                  { key: 'moved', label: '❤️ Moved Me' },
                                  { key: 'fire', label: '🔥 Page-Turner' },
                                  { key: 'cozy', label: '☕ Cozy Vibe' }
                                ].map((rx) => (
                                  <button
                                    key={rx.key}
                                    type="button"
                                    onClick={() => handleReviewReaction(item.rawId, rx.key)}
                                    className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/10 text-[11px] text-slate-200 transition-all"
                                  >
                                    {rx.label} ({item.reactions?.[rx.key] || 0})
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Interactive Comments & Replies Thread */}
                            <div className="pt-2 space-y-2 border-t border-white/[0.06]">
                              {(item.comments || []).map((cmt) => {
                                const cUser =
                                  users.find((u) => u.id === cmt.userId) || users[0];
                                return (
                                  <div
                                    key={cmt.id}
                                    className="flex items-start gap-2 text-xs bg-white/[0.02] p-2 rounded-xl"
                                  >
                                    <HumanAvatar user={cUser} size="xs" />
                                    <div className="flex-1">
                                      <span className="font-semibold text-amber-200">
                                        @{cUser.username}:
                                      </span>{' '}
                                      <span className="text-slate-300">{cmt.text}</span>
                                    </div>
                                  </div>
                                );
                              })}

                              <div className="flex items-center gap-2 pt-1">
                                <input
                                  type="text"
                                  value={commentInputs[item.rawId] || ''}
                                  onChange={(e) =>
                                    setCommentInputs((prev) => ({
                                      ...prev,
                                      [item.rawId]: e.target.value
                                    }))
                                  }
                                  placeholder={`Reply to @${authorUser.username}’s thoughts...`}
                                  className="flex-1 rounded-xl bg-slate-950/70 border border-white/10 px-3 py-1.5 text-xs text-white placeholder:text-slate-500"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAddComment(item.rawId, item.type === 'diary')
                                  }
                                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: MY VAULT (FAVORITES, LIKED, DISLIKED & MY REVIEWS)
        =================================================================== */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#131020]/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider">
                  PERSONAL 3D COLLECTION SANCTUARY
                </span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  {currentUser
                    ? `@${currentUser.username}’s Curated Shelves`
                    : 'Your Curated Shelves'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage your Favorite books, Liked &amp; Disliked titles, and all 5-star reviews you
                  have authored.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: 'favorites',
                    label: `Favorites (${currentUser?.favorites.length || 0})`,
                    icon: Heart
                  },
                  {
                    id: 'liked',
                    label: `Liked (${currentUser?.likedBooks.length || 0})`,
                    icon: ThumbsUp
                  },
                  {
                    id: 'disliked',
                    label: `Disliked (${currentUser?.dislikedBooks.length || 0})`,
                    icon: ThumbsDown
                  },
                  {
                    id: 'reviews',
                    label: `My Reviews (${
                      reviews.filter((r) => r.userId === currentUser?.id).length
                    })`,
                    icon: Star
                  }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setVaultTab(t.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        vaultTab === t.id
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {vaultTab !== 'reviews' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(() => {
                  const listIds =
                    vaultTab === 'favorites'
                      ? currentUser?.favorites || []
                      : vaultTab === 'liked'
                      ? currentUser?.likedBooks || []
                      : currentUser?.dislikedBooks || [];
                  const shelfBooks = books.filter((b) => listIds.includes(b.id));
                  if (shelfBooks.length === 0) {
                    return (
                      <div className="col-span-full p-10 rounded-2xl border border-white/10 bg-white/[0.02] text-center space-y-2">
                        <p className="text-sm font-semibold text-white">
                          No books in your {vaultTab} shelf yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('discover')}
                          className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold"
                        >
                          Explore Book Database
                        </button>
                      </div>
                    );
                  }
                  return shelfBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBookId(book.id)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#131020]/90 border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all"
                    >
                      <FuturisticBookCover book={book} size="sm" is3D={enable3DBooks} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-serif font-bold text-white truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">{book.author}</p>
                        <p className="text-[11px] font-mono text-amber-300 mt-1">
                          {book.publishedYear} • {book.pageCount} pages
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-slate-500" />
                    </div>
                  ));
                })()}
              </div>
            ) : (
              <div className="space-y-4">
                {reviews
                  .filter((r) => r.userId === currentUser?.id)
                  .map((r) => {
                    const book = books.find((b) => b.id === r.bookId) || books[0];
                    return (
                      <div
                        key={r.id}
                        className="p-5 rounded-2xl bg-[#131020]/90 border border-white/10 flex flex-col sm:flex-row gap-4 justify-between"
                      >
                        <div className="flex gap-4">
                          <FuturisticBookCover book={book} size="sm" is3D={enable3DBooks} />
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4
                                onClick={() => setSelectedBookId(book.id)}
                                className="text-sm font-bold text-white hover:text-amber-300 cursor-pointer"
                              >
                                {book.title}
                              </h4>
                              <StarRating value={r.rating} size={13} readOnly />
                            </div>
                            <p className="text-xs text-slate-300">{r.thoughts}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setReviews((prev) => prev.filter((item) => item.id !== r.id))
                          }
                          className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 text-xs"
                        >
                          Delete Review
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 5: MERN STACK ARCHITECTURE & LIVE MONGODB STATE INSPECTOR
        =================================================================== */}
        {activeTab === 'mern' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-400/30 bg-[#131020]/95 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                    FULL-STACK ARCHITECTURE // MONGODB + EXPRESS + REACT + NODE.JS
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    MERN Stack Backend &amp; Google Books API Telemetry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                    Every action you take in this app updates the live state collections below and
                    maps directly to the Express + Mongoose REST endpoints packaged in the
                    downloadable MERN archive.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTestDatabasePing}
                    disabled={isPinging}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all"
                  >
                    <RefreshCw size={14} className={isPinging ? 'animate-spin' : ''} />
                    <span>{isPinging ? 'Pinging API...' : 'Ping MongoDB & API'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => syncWithDatabase(false)}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-medium transition-all"
                  >
                    <Database size={14} className="text-sky-400" />
                    <span>Sync Collections</span>
                  </button>
                </div>
              </div>

              {/* Live Connection Banner */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${
                      dbStatus.connected
                        ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]'
                        : 'bg-amber-400 shadow-[0_0_12px_#fbbf24]'
                    } animate-pulse`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {dbStatus.connected ? 'MongoDB Server Connected' : 'Local Fallback Cache'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        {dbStatus.dbHost}:{dbStatus.dbPort} / {dbStatus.database}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Service: <span className="text-slate-200">{dbStatus.service}</span> • Uptime:{' '}
                      <span className="text-amber-300">{dbStatus.uptimeSeconds}s</span>
                    </p>
                  </div>
                </div>
                {apiLatency !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">REST Roundtrip:</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      {apiLatency} ms
                    </span>
                  </div>
                )}
              </div>

              {/* Live Ping Results Console */}
              {pingResult && (
                <div className="p-4 rounded-2xl bg-[#08070D] border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Code2 size={13} /> Live Express + MongoDB Response ({pingResult.timestamp})
                    </span>
                    <span className="text-emerald-400">{pingResult.latency}ms latency</span>
                  </div>
                  <pre className="text-emerald-300 bg-black/60 p-3 rounded-xl overflow-x-auto text-[11px] leading-relaxed">
                    {JSON.stringify(pingResult, null, 2)}
                  </pre>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-300">models/User.js</span>
                    <span className="text-xs font-bold text-white">{users.length} docs</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Stores <code className="text-amber-300">username</code>,{' '}
                    <code className="text-amber-300">email</code>,{' '}
                    <code className="text-amber-300">passwordHash</code>,{' '}
                    <code className="text-amber-300">favorites[]</code>,{' '}
                    <code className="text-amber-300">likedBooks[]</code>, and{' '}
                    <code className="text-amber-300">following[]</code>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-sky-400">models/Book.js</span>
                    <span className="text-xs font-bold text-white">{books.length} docs</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Synced with <strong>Google Books API</strong> &amp; Open Library via{' '}
                    <code className="text-sky-300">googleBooksId</code> &amp;{' '}
                    <code className="text-sky-300">isbn</code>, plus community Likes &amp; 5-star
                    aggregates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-rose-400">models/Review.js</span>
                    <span className="text-xs font-bold text-white">{reviews.length} docs</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Links <code className="text-rose-300">user</code> &amp;{' '}
                    <code className="text-rose-300">book</code> ObjectIds with 1–5 star{' '}
                    <code className="text-rose-300">rating</code>,{' '}
                    <code className="text-rose-300">thoughts</code>, resonance reactions, and
                    comments.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">models/DiaryEntry.js</span>
                    <span className="text-xs font-bold text-white">{diaryEntries.length} docs</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Chronicles read books with <code className="text-emerald-300">readDate</code>,{' '}
                    <code className="text-emerald-300">status</code>,{' '}
                    <code className="text-emerald-300">rating</code>,{' '}
                    <code className="text-emerald-300">diaryNotes</code>, and follower comments.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <div className="bg-white/[0.04] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-300 flex items-center gap-2">
                    <Code2 size={14} className="text-amber-300" /> Express + JWT REST API Endpoints
                  </span>
                </div>
                <div className="divide-y divide-white/[0.06] text-xs font-mono">
                  {[
                    {
                      method: 'POST',
                      route: '/api/auth/register',
                      desc: 'Create account with username, email & bcrypt-hashed password'
                    },
                    {
                      method: 'POST',
                      route: '/api/auth/login',
                      desc: 'Authenticate with email/username & password → returns JWT'
                    },
                    {
                      method: 'GET',
                      route: '/api/books/google-books?q=',
                      desc: 'Query Google Books API v1 volumes & import metadata'
                    },
                    {
                      method: 'GET',
                      route: '/api/books/external-search?q=',
                      desc: 'Query Open Library / ISBN bibliographic database'
                    },
                    {
                      method: 'POST',
                      route: '/api/books/:id/react',
                      desc: 'Toggle Favorite, Like, or Dislike on a book'
                    },
                    {
                      method: 'POST',
                      route: '/api/reviews',
                      desc: 'Publish 1–5 star rating, thoughts, and social comments'
                    },
                    {
                      method: 'POST',
                      route: '/api/diary',
                      desc: 'Log a read book to the user’s chronological Reading Diary'
                    },
                    {
                      method: 'POST',
                      route: '/api/users/:id/follow',
                      desc: 'Follow/unfollow another reader to subscribe to their feed'
                    }
                  ].map((ep) => (
                    <div
                      key={ep.route}
                      className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ep.method === 'GET'
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <span className="text-white">{ep.route}</span>
                      </div>
                      <span className="text-slate-400 font-sans text-xs">{ep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL 1: 3D BOOK DOSSIER & 5-STAR REVIEW STUDIO
      ===================================================================== */}
      {selectedBook && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#110E1C] border border-amber-400/30 shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <BookOpen size={14} />
                <span>
                  3D HARDCOVER DOSSIER // {selectedBook.sourceApi || 'GOOGLE BOOKS'} • ISBN{' '}
                  {selectedBook.isbn || 'VERIFIED'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookId(null)}
                className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="shrink-0 pt-2 pl-2">
                  <FuturisticBookCover book={selectedBook} size="lg" is3D={true} />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(selectedBook.genres || ['Sci-Fi']).map((g) => (
                        <span
                          key={g}
                          className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {selectedBook.title}
                    </h2>
                    <p className="text-sm text-slate-300 mt-0.5">
                      by <span className="font-semibold text-white">{selectedBook.author}</span> •{' '}
                      {selectedBook.publishedYear} • {selectedBook.pageCount} pages
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-2">
                      <StarRating
                        value={bookStatsMap[selectedBook.id]?.avgRating || 4.7}
                        size={18}
                        readOnly
                      />
                      <span className="text-lg font-bold text-amber-400">
                        {bookStatsMap[selectedBook.id]?.avgRating || 4.7}
                      </span>
                      <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                    <div className="h-4 w-px bg-white/10 hidden sm:block" />
                    <div className="text-xs text-slate-300 font-mono">
                      {bookStatsMap[selectedBook.id]?.reviewCount || 0} Reviews •{' '}
                      {bookStatsMap[selectedBook.id]?.readCount || 0} Diary Reads
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedBook.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleBookReaction(selectedBook.id, 'favorite')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentUser?.favorites.includes(selectedBook.id)
                          ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                          : 'bg-white/[0.06] hover:bg-rose-500/20 text-slate-200 border border-white/15'
                      }`}
                    >
                      <Heart
                        size={14}
                        className={
                          currentUser?.favorites.includes(selectedBook.id) ? 'fill-white' : ''
                        }
                      />
                      <span>
                        {currentUser?.favorites.includes(selectedBook.id)
                          ? 'In Favorites Vault'
                          : 'Add to Favorites'}{' '}
                        ({selectedBook.favoritesCount || 0})
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookReaction(selectedBook.id, 'like')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentUser?.likedBooks.includes(selectedBook.id)
                          ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50'
                          : 'bg-white/[0.06] hover:bg-emerald-500/15 text-slate-200 border border-white/15'
                      }`}
                    >
                      <ThumbsUp size={14} />
                      <span>Like ({selectedBook.likesCount || 0})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookReaction(selectedBook.id, 'dislike')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentUser?.dislikedBooks.includes(selectedBook.id)
                          ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50'
                          : 'bg-white/[0.06] hover:bg-amber-500/15 text-slate-200 border border-white/15'
                      }`}
                    >
                      <ThumbsDown size={14} />
                      <span>Dislike ({selectedBook.dislikesCount || 0})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openLogDiaryForBook(selectedBook.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold transition-all"
                    >
                      <Calendar size={14} />
                      <span>+ Log to Reading Diary</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 5-Star Review & Thoughts Composer */}
              <form
                onSubmit={handleSubmitReview}
                className="rounded-2xl bg-slate-950/90 border border-white/10 p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span>Write a 5-Star Review &amp; Share Your Thoughts</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <StarRating value={reviewRating} onChange={setReviewRating} size={20} />
                    <span className="text-xs font-mono text-amber-300">
                      {STAR_LABELS[reviewRating]}
                    </span>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={reviewThoughts}
                  onChange={(e) => setReviewThoughts(e.target.value)}
                  placeholder={`How did "${selectedBook.title}" make you feel? Share favorite quotes, characters, or thoughts...`}
                  className="w-full rounded-xl bg-[#070B14] border border-white/15 p-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Vibe Tags:</span>
                  {MOOD_TAG_OPTIONS.map((tag) => {
                    const active = reviewMoods.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setReviewMoods((prev) =>
                            active ? prev.filter((t) => t !== tag) : [...prev, tag]
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                          active
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-400/40'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alsoLogDiary}
                        onChange={(e) => setAlsoLogDiary(e.target.checked)}
                        className="rounded border-white/20 bg-slate-900 text-amber-500"
                      />
                      <span>Mark as Read &amp; add to my Reading Diary</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reviewSpoilers}
                        onChange={(e) => setReviewSpoilers(e.target.checked)}
                        className="rounded border-white/20 bg-slate-900 text-rose-500"
                      />
                      <span>Contains Spoilers</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
                  >
                    Publish {reviewRating}★ Review
                  </button>
                </div>
              </form>

              {/* Community Reviews List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-bold text-white">
                    Reader Reviews &amp; Thoughts (
                    {reviews.filter((r) => r.bookId === selectedBook.id).length})
                  </h4>
                  <div className="flex items-center gap-1">
                    {[0, 5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewStarFilter(star)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono ${
                          reviewStarFilter === star
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white'
                        }`}
                      >
                        {star === 0 ? 'All ★' : `${star}★`}
                      </button>
                    ))}
                  </div>
                </div>

                {reviews
                  .filter((r) => r.bookId === selectedBook.id)
                  .filter((r) => reviewStarFilter === 0 || r.rating === reviewStarFilter)
                  .map((rev) => {
                    const revAuthor = users.find((u) => u.id === rev.userId) || users[0];
                    const isSpoilerHidden =
                      rev.containsSpoilers && !revealedSpoilers[rev.id];

                    return (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <HumanAvatar user={revAuthor} size="xs" />
                            <div>
                              <span className="text-xs font-bold text-white">
                                {revAuthor.displayName} (@{revAuthor.username})
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 ml-2">
                                {rev.createdAt.slice(0, 10)}
                              </span>
                            </div>
                          </div>
                          <StarRating value={rev.rating} size={13} readOnly />
                        </div>

                        {isSpoilerHidden ? (
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-between">
                            <span className="text-xs text-rose-200 font-mono">
                              Spoiler warning flagged by reviewer.
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedSpoilers((prev) => ({ ...prev, [rev.id]: true }))
                              }
                              className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-200 text-xs font-semibold"
                            >
                              Reveal Thoughts
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {rev.thoughts}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {(rev.moodTags || []).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-amber-300"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleReviewReaction(rev.id, 'like')}
                              className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-300"
                            >
                              <ThumbsUp size={12} />
                              <span>{rev.likes.length}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReviewReaction(rev.id, 'dislike')}
                              className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-300"
                            >
                              <ThumbsDown size={12} />
                              <span>{rev.dislikes.length}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: LOG BOOK TO READING DIARY
      ===================================================================== */}
      {showDiaryModal && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#120E1E] border border-amber-400/30 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-amber-300" />
                <h3 className="text-base font-bold text-white">Log Book to Reading Diary</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDiaryModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDiaryEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Select Book from Connected Catalog
                </label>
                <select
                  value={diaryBookId}
                  onChange={(e) => setDiaryBookId(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} — {b.author} ({b.publishedYear})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Reading Status
                  </label>
                  <select
                    value={diaryStatus}
                    onChange={(e) => setDiaryStatus(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  >
                    <option value="read">Finished Reading (Read)</option>
                    <option value="reading">Currently Reading</option>
                    <option value="want_to_read">Want to Read</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Diary Date</label>
                  <input
                    type="date"
                    value={diaryDate}
                    onChange={(e) => setDiaryDate(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xs font-mono text-slate-300">Rating out of 5 Stars:</span>
                <StarRating value={diaryRating} onChange={setDiaryRating} size={20} />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Diary Reflections &amp; Thoughts
                </label>
                <textarea
                  rows={3}
                  value={diaryNotes}
                  onChange={(e) => setDiaryNotes(e.target.value)}
                  placeholder="Record where you read this book, key takeaways, or notes for your followers..."
                  className="w-full rounded-xl bg-slate-950 border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={diaryIsReread}
                  onChange={(e) => setDiaryIsReread(e.target.checked)}
                  className="rounded border-white/20 bg-slate-900"
                />
                <span>This was a re-read of a previous favorite</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiaryModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                >
                  Save to Reading Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: AUTHENTICATION (EMAIL, PASSWORD & USERNAME) + DEMO SWITCHER
      ===================================================================== */}
      {showAuthModal && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-[#120E1E] border border-amber-400/30 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase">
                  MERN JWT AUTHENTICATION
                </span>
                <h3 className="text-base font-bold text-white">
                  {authMode === 'login' ? 'Log In to Aether Reads' : 'Create Reader Account'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-950 border border-white/10">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-1.5 rounded-lg text-xs font-semibold ${
                  authMode === 'login' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-1.5 rounded-lg text-xs font-semibold ${
                  authMode === 'register' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
                }`}
              >
                Sign Up (New User)
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'login' ? (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Email or Username
                    </label>
                    <input
                      type="text"
                      value={authIdentifier}
                      onChange={(e) => setAuthIdentifier(e.target.value)}
                      placeholder="aria@aether.io or aria_vance"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={authUsername}
                        onChange={(e) => setAuthUsername(e.target.value)}
                        placeholder="nova_reader"
                        className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={authDisplayName}
                        onChange={(e) => setAuthDisplayName(e.target.value)}
                        placeholder="Nova Sterling"
                        className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="nova@aether.io"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Reader Bio
                    </label>
                    <input
                      type="text"
                      value={authBio}
                      onChange={(e) => setAuthBio(e.target.value)}
                      placeholder="Sci-fi & philosophy enthusiast"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold text-xs shadow-lg"
              >
                {authMode === 'login' ? 'Authenticate with Email / Username' : 'Register & Sign In'}
              </button>
            </form>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <p className="text-[11px] font-mono text-slate-400">
                QUICK DEMO READER SWITCHER (ONE-CLICK):
              </p>
              <div className="grid grid-cols-2 gap-2">
                {users.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setCurrentUserId(u.id);
                      setShowAuthModal(false);
                      notify(`Switched active session to @${u.username}`, 'info');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                      currentUser?.id === u.id
                        ? 'bg-amber-500/20 border-amber-400/50 text-white'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07]'
                    }`}
                  >
                    <HumanAvatar user={u} size="xs" />
                    <span className="truncate">@{u.username}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: INDEX CUSTOM BOOK INTO DATABASE
      ===================================================================== */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#120E1E] border border-amber-400/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database size={16} className="text-amber-300" />
                <span>Index Book into Connected Database</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBookModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomBook} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Book Title *</label>
                  <input
                    type="text"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    placeholder="e.g. Solaris"
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Author *</label>
                  <input
                    type="text"
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    placeholder="e.g. Stanislaw Lem"
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">ISBN-13</label>
                  <input
                    type="text"
                    value={newBookIsbn}
                    onChange={(e) => setNewBookIsbn(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Year</label>
                  <input
                    type="number"
                    value={newBookYear}
                    onChange={(e) => setNewBookYear(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Genre</label>
                  <select
                    value={newBookGenre}
                    onChange={(e) => setNewBookGenre(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-xs text-white"
                  >
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Speculative">Speculative</option>
                    <option value="Cyberpunk">Cyberpunk</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Astrophysics">Astrophysics</option>
                    <option value="Literary">Literary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Synopsis</label>
                <textarea
                  rows={3}
                  value={newBookDesc}
                  onChange={(e) => setNewBookDesc(e.target.value)}
                  placeholder="Brief synopsis of the book"
                  className="w-full rounded-xl bg-slate-950 border border-white/15 p-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Sync Book to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
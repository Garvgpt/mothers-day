// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CONFIGURATION — this is the only file you need to edit!
//
//  HOW TO ADD PHOTOS:
//    1. Drop your images into the /photos/ folder.
//    2. Update the "photo" paths below to match your filenames.
//       e.g.  photo: "photos/me-and-mom-2010.jpg"
//
//  HOW TO ADD MORE TIMELINE ENTRIES OR POLAROIDS:
//    Just copy-paste an existing object in the array and fill it in.
//
//  EVERYTHING ELSE (colours, fonts, animations) lives in styles.css.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {

  // ── BROWSER TAB TITLE ──────────────────────────────────────────────────────
  pageTitle: "Happy Mother's Day ♥",

  // ── HERO SECTION ───────────────────────────────────────────────────────────
  hero: {
    photo:      "./hero1.jpg",          // Main photo — you and mom together
    headline:   "To the woman who raised us.",
    subheadline: "Happy Mother's Day"
  },

  // ── TIMELINE ───────────────────────────────────────────────────────────────
  // Entries alternate left/right automatically. Add as many as you like.
  timeline: [
     {
      year:    "2004",
      title:   "The Beginning",
      caption: "The day that changed everything — and started the greatest adventure of our lives.",
      photo:   "./old_img.jpg"
    },
    {
      year:    "2007",
      title:   "Early Days",
      caption: "You were always there, cheering us on every single step of the way.",
      photo:   "./1.jpg"
    },
    {
      year:    "2008",
      title:   "Sometime in the Past",
      caption: "You were always there, cheering me on every single step of the way.",
      photo:   "photos/timeline-2.jpg"
    },
    {
      year:    "2010",
      title:   "Growing Up",
      caption: "The years flew by so fast — but my favourite memories are from right here.",
      photo:   "photos/timeline-3.jpg"
    },
    {
      year:    "2017",
      title:   "New Chapters",
      caption: "No matter how much changed, you were always my constant.",
      photo:   "photos/timeline-4.jpg"
    },
    {
      year:    "Today",
      title:   "Here & Now",
      caption: "I am so lucky to have you in my corner, every single day.",
      photo:   "./img6.jpg"
    }
  ],

  // ── POLAROID GALLERY ───────────────────────────────────────────────────────
  // Click a polaroid once  →  it flips and shows your back message.
  // Click again (or the button on the back)  →  opens the photo in a lightbox.
  //
  // gallery[] is optional: add extra photo paths to create a slideshow
  // inside the lightbox when that polaroid is opened.
  //   e.g.  gallery: ["photos/trip-2.jpg", "photos/trip-3.jpg"]
  polaroids: [
    {
      photo:       "photos/polaroid-1.jpg",
      caption:     "Summer 2010",
      backMessage: "The summer I learned that home is wherever you are.",
      gallery:     []
    },
    {
      photo:       "photos/polaroid-2.jpg",
      caption:     "Birthday Joy",
      backMessage: "You always made every birthday feel like the most magical day in the world.",
      gallery:     []
    },
    {
      photo:       "photos/polaroid-3.jpg",
      caption:     "Family Dinner",
      backMessage: "Your cooking is the taste of home — nothing in the world comes close.",
      gallery:     []
    },
    {
      photo:       "photos/polaroid-4.jpg",
      caption:     "Holidays",
      backMessage: "The best part of every holiday was always just being together.",
      gallery:     []
    },
    {
      photo:       "photos/polaroid-5.jpg",
      caption:     "Today & Always",
      backMessage: "Here's to all the adventures still ahead of us. ♥",
      gallery:     []
    }
  ],

  // ── LETTER TO MOM ──────────────────────────────────────────────────────────
  // Separate paragraphs with a blank line (two newlines).
  letter: {
    greeting:  "Dear Mom,",
    body: `There are so many things I want to say that I never quite find the words for in the moment. So I built you this — a little corner of the internet that belongs entirely to us.

Thank you for every early morning, every packed lunch, every time you stayed up waiting to hear that I got home safe. Thank you for believing in me when I found it impossible to believe in myself, and for the way you love — without condition, without limit, without asking for anything in return.

Every good thing about me started with you.

I hope this little site makes you smile the way you have made me smile every single day of my life.`,
    signature: "With all my love, always"
  }

};

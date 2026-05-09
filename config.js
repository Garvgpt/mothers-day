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
      year:    "2019",
      title:   "You in Every Chapter",
      caption: "Turns out, our favorite photos always had one thing in common — you!",
      photo:   "./IMG_9413.JPG"
    },
    {
      year:    "2024",
      title:   "Growing Up",
      caption: "The years flew by so fast — but our favourite memories are from right here.",
      photo:   "./img7.jpeg"
    },
    {
      year:    "2024",
      title:   "New Chapters",
      caption: "No matter how much changed, you were always our constant.",
      photo:   "./img2.jpeg"
    },
    {
      year:    "Today",
      title:   "Here & Now",
      caption: "We are so lucky to have you in our corner, every single day.",
      photo:   "./img6_edit.jpeg"
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
      photo:       "./IMG_7108.jpg",
      caption:     "Super Mom!",
      backMessage: "Now we know humaara TT khelne ka shauk kaha se aata hai ;)",
      gallery:     ["./IMG_9001.jpg", "./IMG_7108.jpg"]
    },
    {
      photo:       "./IMG_8250.jpg",
      caption:     "Insanely Caring",
      backMessage: "Gucchi ko aapki godi mein dekh ke mai jealous ho jaata hu",
      gallery:     ["./IMG_8011.jpg"]
    },
    {
      photo:       "./img5.jpeg",
      caption:     "Strength toh hai",
      backMessage: "Sabse fast the hum dono hehe",
      gallery:     ["./img3.jpeg"]
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   script.js — reads CONFIG from config.js and brings the site alive.
   You shouldn't need to edit this file.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

document.addEventListener('DOMContentLoaded', () => {
  document.title = CONFIG.pageTitle;

  buildHero();
  buildTimeline();
  buildGallery();
  buildLetter();
  initScrollReveal();
  initTimelineRail();
  initLightbox();
  initPetals();
});

/* ─────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────── */
function buildHero() {
  const { hero } = CONFIG;

  document.getElementById('heroHeadline').textContent = hero.headline;
  document.getElementById('heroSub').textContent       = hero.subheadline;

  const img = document.getElementById('heroPhoto');
  img.onload  = () => img.classList.add('loaded');
  img.onerror = () => {};   // gradient fallback stays visible
  img.src = hero.photo;
}

/* ─────────────────────────────────────────────────────────────────
   TIMELINE
───────────────────────────────────────────────────────────────── */
function buildTimeline() {
  const container = document.getElementById('timelineEntries');

  CONFIG.timeline.forEach((entry, i) => {
    const side = i % 2 === 0 ? 'from-left' : 'from-right';

    const el = document.createElement('div');
    el.className = `tl-entry ${side}`;

    // Build photo with lightbox data
    const gallery = [{ src: entry.photo, caption: `${entry.year} — ${entry.title}` }];

    el.innerHTML = `
      <div class="tl-media">
        <img
          src="${entry.photo}"
          alt="${entry.title}"
          loading="lazy"
          data-lb='${JSON.stringify(gallery)}'
          tabindex="0"
          role="button"
          aria-label="Open ${entry.title} photo"
        >
      </div>
      <div class="tl-dot" aria-hidden="true"></div>
      <div class="tl-text">
        <span class="tl-year">${entry.year}</span>
        <h3 class="tl-title">${entry.title}</h3>
        <p class="tl-caption">${entry.caption}</p>
      </div>
    `;

    container.appendChild(el);

    // Keyboard-accessible lightbox trigger
    const img = el.querySelector('img');
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(gallery, 0);
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   POLAROID GALLERY
───────────────────────────────────────────────────────────────── */
function buildGallery() {
  const grid = document.getElementById('polaroidGrid');

  CONFIG.polaroids.forEach((p, i) => {
    // Full gallery for lightbox: main photo + any extras
    const fullGallery = [
      { src: p.photo, caption: p.caption },
      ...(p.gallery || []).map(src => ({ src, caption: p.caption }))
    ];

    const wrap = document.createElement('div');
    wrap.className = 'pol-wrap reveal';
    wrap.dataset.tiltIndex = i;   // used to restore tilt after reveal

    wrap.innerHTML = `
      <div class="pol-card">
        <div class="pol-front">
          <img src="${p.photo}" alt="${p.caption}" loading="lazy">
          <span class="pol-caption">${p.caption}</span>
        </div>
        <div class="pol-back">
          <p class="pol-back-msg">${p.backMessage}</p>
          <div class="pol-back-heart" aria-hidden="true">♥</div>
          <button class="pol-open-btn" aria-label="Open full photo for ${p.caption}">
            View full photo →
          </button>
        </div>
      </div>
    `;

    grid.appendChild(wrap);

    let flipped = false;

    // Click on the wrapper: first click flips, second click opens lightbox
    wrap.addEventListener('click', e => {
      if (!flipped) {
        wrap.classList.add('flipped');
        flipped = true;
        return;
      }
      // Already flipped — open lightbox
      openLightbox(fullGallery, 0);
    });

    // "View full photo" button on the back
    wrap.querySelector('.pol-open-btn').addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(fullGallery, 0);
    });

    // Click outside flipped card to unflip (delegated at document level)
    document.addEventListener('click', e => {
      if (flipped && !wrap.contains(e.target)) {
        wrap.classList.remove('flipped');
        flipped = false;
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   LETTER
───────────────────────────────────────────────────────────────── */
function buildLetter() {
  const { letter } = CONFIG;

  document.getElementById('letterGreeting').textContent = letter.greeting;

  const body = document.getElementById('letterBody');
  letter.body.split(/\n\n+/).forEach(para => {
    const p = document.createElement('p');
    p.textContent = para.trim();
    body.appendChild(p);
  });

  document.getElementById('letterSig').textContent = letter.signature;
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL REVEAL  (IntersectionObserver)
───────────────────────────────────────────────────────────────── */
function initScrollReveal() {
  // General .reveal observer
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Restore tilt for polaroids after they fade in
      const tiltIndex = entry.target.dataset.tiltIndex;
      if (tiltIndex !== undefined) {
        const tilts = [-3.5, 2.5, -1.8, 3, -2.2];
        const deg = tilts[parseInt(tiltIndex) % tilts.length];
        entry.target.style.transform = `rotate(${deg}deg)`;
      }

      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Staggered reveal for polaroid grid
  document.querySelectorAll('.pol-wrap').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    revealObs.observe(el);
  });

  // Timeline entry observer
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      tlObs.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.tl-entry').forEach(el => tlObs.observe(el));

  // Signature handwriting animation
  const sig = document.getElementById('letterSig');
  const sigObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    setTimeout(() => sig.classList.add('animate'), 400);
    sigObs.unobserve(sig);
  }, { threshold: 0.8 });
  sigObs.observe(sig);
}

/* ─────────────────────────────────────────────────────────────────
   TIMELINE RAIL (draws itself as user scrolls)
───────────────────────────────────────────────────────────────── */
function initTimelineRail() {
  const section = document.getElementById('timeline');
  const rail    = document.getElementById('timelineRail');

  let ticking = false;

  function updateRail() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight;
    // How far the mid-viewport has scrolled past the top of the section
    const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.55);
    const progress = Math.min(scrolled / total, 1);
    rail.style.height = (progress * total) + 'px';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateRail);
      ticking = true;
    }
  }, { passive: true });

  updateRail();
}

/* ─────────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────────── */
let lbImages  = [];
let lbIndex   = 0;

function initLightbox() {
  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbCap    = document.getElementById('lbCaption');
  const lbCount  = document.getElementById('lbCounter');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');

  function show(index) {
    const item = lbImages[index];
    lbImg.src      = item.src || '';
    lbImg.alt      = item.caption || '';
    lbCap.textContent   = item.caption || '';
    lbCount.textContent = lbImages.length > 1
      ? `${index + 1} / ${lbImages.length}`
      : '';

    // Show/hide nav
    const multi = lbImages.length > 1;
    lbPrev.classList.toggle('hidden', !multi);
    lbNext.classList.toggle('hidden', !multi);
  }

  // Make openLightbox accessible globally within this module
  window._lbOpen = function(images, startIndex) {
    lbImages = images;
    lbIndex  = startIndex;
    show(lbIndex);
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  function close() {
    lb.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', close);

  lb.addEventListener('click', e => {
    if (e.target === lb) close();
  });

  lbPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    show(lbIndex);
  });

  lbNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    show(lbIndex);
  });

  document.addEventListener('keydown', e => {
    if (lb.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  // Wire up timeline photo clicks
  document.addEventListener('click', e => {
    const img = e.target.closest('[data-lb]');
    if (!img) return;
    const images = JSON.parse(img.dataset.lb);
    openLightbox(images, 0);
  });
}

// Thin wrapper so other functions can call openLightbox before initLightbox runs
function openLightbox(images, startIndex) {
  window._lbOpen(images, startIndex);
}

/* ─────────────────────────────────────────────────────────────────
   FALLING PETALS  (canvas animation)
───────────────────────────────────────────────────────────────── */
function initPetals() {
  const canvas = document.getElementById('petals');
  const ctx    = canvas.getContext('2d');

  const PETAL_COUNT  = 28;
  const PETAL_COLORS = ['#E8B4B8', '#D4A0A0', '#F5CDD4', '#C5D5BB', '#B9CFA8', '#EDD5D5'];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Petal {
    constructor(fromTop = false) { this.reset(fromTop); }

    reset(fromTop = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = fromTop ? -15 - Math.random() * 50 : Math.random() * canvas.height;
      this.size  = Math.random() * 7 + 4;
      this.vx    = (Math.random() - 0.5) * 0.6;
      this.vy    = Math.random() * 1.2 + 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - 0.5) * 0.04;
      this.alpha = Math.random() * 0.45 + 0.2;
      this.wobble      = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.025 + 0.008;
      this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.wobble) * 0.7;
      this.y += this.vy;
      this.angle += this.spin;
      if (this.y > canvas.height + 20 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset(true);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      // Petal shape: two bezier curves forming a pointed oval
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(
        this.size * 0.6, -this.size * 0.5,
        this.size * 0.6,  this.size * 0.5,
        0, this.size
      );
      ctx.bezierCurveTo(
        -this.size * 0.6,  this.size * 0.5,
        -this.size * 0.6, -this.size * 0.5,
        0, -this.size
      );
      ctx.fill();
      ctx.restore();
    }
  }

  // Seed petals across the full viewport (not just top) on load
  const petals = Array.from({ length: PETAL_COUNT }, () => new Petal(false));

  // Gradually trickle in new ones
  let spawnTimer = 0;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer++;
    if (spawnTimer > 90 && petals.length < PETAL_COUNT + 10) {
      petals.push(new Petal(true));
      spawnTimer = 0;
    }

    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  loop();
}

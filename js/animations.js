/* ============================================================
 *  animations.js — Scroll-reveal observer & twinkling stars canvas
 * ============================================================ */

/* ==============================================================
 *  SCROLL-REVEAL  (IntersectionObserver)
 * ============================================================== */

/**
 * initAnimations
 * Observes every .reveal element. When 15 % of it enters the
 * viewport the .active class is added (triggering CSS transitions)
 * and the element is unobserved to save resources.
 * Also applies staggered delays to gallery items & section titles.
 */
function initAnimations() {
  /* --- Build the observer --- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);                        // one-shot reveal
        }
      });
    },
    { threshold: 0.15 }
  );

  /* --- Observe .reveal elements --- */
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => observer.observe(el));

  /* --- Section titles (stagger individually) --- */
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach((title) => {
    title.classList.add('reveal');
    observer.observe(title);
  });

  /* --- Gallery items (staggered transition-delay) --- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;              // 80 ms stagger
    if (!item.classList.contains('reveal')) {
      item.classList.add('reveal');
    }
    observer.observe(item);
  });
}


/* ==============================================================
 *  STARS CANVAS — Ending section twinkling night sky
 * ============================================================== */

/**
 * initStarsCanvas
 * Fills #stars-canvas with 200 tiny stars that twinkle by
 * oscillating opacity via sin().
 */
function initStarsCanvas() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* --- Sizing helper --- */
  function resize() {
    const parent = canvas.parentElement || document.body;
    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* --- Star colours --- */
  const STAR_COLORS = ['#FFFFFF', '#FFD700', '#F5E6A3', '#FFFACD'];

  /* ----------------------------------------------------------
   * STAR FACTORY
   * ---------------------------------------------------------- */
  const STAR_COUNT = 200;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x:            Math.random() * canvas.width,
      y:            Math.random() * canvas.height,
      radius:       Math.random() * 1.5 + 0.5,                    // 0.5 – 2 px
      baseOpacity:  Math.random() * 0.5 + 0.3,                    // 0.3 – 0.8
      twinkleSpeed: Math.random() * 0.003 + 0.001,                // controls flicker rate
      color:        STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
    });
  }

  /* ----------------------------------------------------------
   * RENDER LOOP
   * Oscillates each star's opacity using sin(time * speed).
   * ---------------------------------------------------------- */
  function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s) => {
      /* Twinkle: smoothly oscillate opacity between ~0 and baseOpacity */
      const flicker = (Math.sin(time * s.twinkleSpeed) + 1) / 2;  // 0 – 1
      const opacity = s.baseOpacity * (0.3 + 0.7 * flicker);      // never fully invisible

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle   = s.color;
      ctx.globalAlpha = opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


/* ==============================================================
 *  SCROLL PROGRESS BAR
 * ============================================================== */

/**
 * initScrollProgress
 * Updates the #scroll-progress bar width based on page scroll position.
 */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

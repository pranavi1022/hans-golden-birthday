/* ============================================================
 *  main.js — Master initialisation for Hans's Golden Birthday
 *  Fetches data, populates EVERY piece of text, boots all modules.
 *  
 *  ALL text on the page comes from data/messages.json
 *  ALL letter content comes from data/letter.txt
 *  To edit ANY text, just edit those files — no code changes needed!
 * ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    /* ----------------------------------------------------------
     * 1.  FETCH DATA FILES
     * ---------------------------------------------------------- */
    const [messagesRes, letterRes] = await Promise.all([
      fetch('data/messages.json'),
      fetch('data/letter.txt')
    ]);

    if (!messagesRes.ok) throw new Error('Failed to load messages.json');
    if (!letterRes.ok)   throw new Error('Failed to load letter.txt');

    const data       = await messagesRes.json();
    const letterText = await letterRes.text();

    /* ----------------------------------------------------------
     * 2.  POPULATE SECTIONS  (order mirrors the page flow)
     *     Every single piece of text comes from messages.json
     * ---------------------------------------------------------- */
    populateHero(data.hero);
    populateBalloons(data.balloons);
    populateGallery(data.gallery);
    populateSlider(data.slider);
    populateWish(data.wish);
    populateLetter(data.letter, letterText);
    populateEnding(data.ending);

    /* ----------------------------------------------------------
     * 3.  INITIALISE INTERACTIVE MODULES
     * ---------------------------------------------------------- */
    initParticles();      // hero gold-dust canvas
    initBalloons();       // pop interaction
    initSlider();         // before-after drag
    initWish();           // candle blow + confetti
    initMusic();          // background music toggle
    initAnimations();     // scroll-reveal observer

    /* Stars canvas for the ending section */
    initStarsCanvas();

    /* Floating lanterns (ending section) */
    createLanterns();

  } catch (err) {
    console.error('[main.js] Initialisation error:', err);
  }
});


/* ==============================================================
 *  POPULATE FUNCTIONS
 *  Each function reads from messages.json and fills the page.
 * ============================================================== */

/**
 * populateHero — fills the hero banner text + badge.
 * Editable keys in messages.json → hero.title, hero.subtitle, hero.badge
 */
function populateHero(hero) {
  if (!hero) return;

  const titleEl    = document.querySelector('.hero-title');
  const glowEl     = document.querySelector('.hero-title-glow');
  const subtitleEl = document.querySelector('.hero-subtitle');
  const badgeEl    = document.querySelector('.hero-badge');

  if (titleEl)    titleEl.textContent    = hero.title    || '';
  if (glowEl)     glowEl.textContent     = hero.title    || '';
  if (subtitleEl) subtitleEl.textContent  = hero.subtitle || '';
  if (badgeEl)    badgeEl.textContent     = hero.badge    || '';
}


/**
 * populateBalloons — sets section heading + secret messages.
 * Editable keys → balloons.heading, balloons.messages[]
 */
function populateBalloons(balloons) {
  if (!balloons) return;

  /* Section heading */
  const headingEl = document.querySelector('#balloons .section-title');
  if (headingEl && balloons.heading) headingEl.textContent = balloons.heading;

  /* Balloon messages */
  const messages = balloons.messages || [];
  const wrappers = document.querySelectorAll('.balloon-wrapper');
  wrappers.forEach((wrapper, i) => {
    const msgEl = wrapper.querySelector('.balloon-message');
    if (msgEl && messages[i] !== undefined) {
      msgEl.textContent = messages[i];
    }
    if (messages[i] !== undefined) {
      wrapper.setAttribute('data-message', messages[i]);
    }
  });
}


/**
 * populateGallery — sets section heading + builds photo grid.
 * Editable keys → gallery.heading, gallery.categories[].name, .emoji, .images[]
 */
function populateGallery(gallery) {
  if (!gallery || !gallery.categories) return;

  /* Section heading */
  const headingEl = document.querySelector('#gallery .section-title');
  if (headingEl && gallery.heading) headingEl.textContent = gallery.heading;

  const container = document.querySelector('#gallery .gallery-grid')
                 || document.querySelector('#gallery');
  if (!container) return;

  gallery.categories.forEach((cat) => {
    /* --- Category wrapper --- */
    const catDiv = document.createElement('div');
    catDiv.classList.add('gallery-category');

    /* --- Category title --- */
    const catTitle = document.createElement('h3');
    catTitle.classList.add('category-title');
    catTitle.textContent = (cat.emoji ? cat.emoji + ' ' : '') + (cat.name || 'Gallery');
    catDiv.appendChild(catTitle);

    /* --- Image grid inside category --- */
    const imagesDiv = document.createElement('div');
    imagesDiv.classList.add('category-images');

    (cat.images || []).forEach((img) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item', 'reveal');

      /* Support both string paths and { src, alt } objects */
      const imgSrc = (typeof img === 'string') ? img : (img.src || '');
      const imgAlt = (typeof img === 'string') ? cat.name   : (img.alt || cat.name);

      const image = document.createElement('img');
      image.src      = imgSrc;
      image.alt      = imgAlt;
      image.loading  = 'lazy';

      /* Fallback placeholder when the image can't load */
      image.onerror = function () {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.classList.add('gallery-placeholder');
        placeholder.textContent = `${cat.emoji || ''} ${cat.name} 📷`;
        item.appendChild(placeholder);
      };

      item.appendChild(image);
      imagesDiv.appendChild(item);
    });

    catDiv.appendChild(imagesDiv);
    container.appendChild(catDiv);
  });
}


/**
 * populateSlider — sets heading, labels, and images.
 * Editable keys → slider.heading, slider.thenLabel, slider.nowLabel,
 *                  slider.thenImage, slider.nowImage
 */
function populateSlider(slider) {
  if (!slider) return;

  /* Section heading */
  const headingEl = document.querySelector('#slider .section-title');
  if (headingEl && slider.heading) headingEl.textContent = slider.heading;

  /* Labels */
  const thenLabel = document.querySelector('.slider-label.then-label');
  const nowLabel  = document.querySelector('.slider-label.now-label');
  if (thenLabel && slider.thenLabel) thenLabel.textContent = slider.thenLabel;
  if (nowLabel  && slider.nowLabel)  nowLabel.textContent  = slider.nowLabel;

  /* "Then" image */
  const thenImg = document.querySelector('.then-image img');
  if (thenImg) {
    if (slider.thenImage) thenImg.src = slider.thenImage;
    thenImg.onerror = function () {
      this.style.display = 'none';
      const ph = document.createElement('div');
      ph.classList.add('slider-placeholder');
      ph.textContent = (slider.thenLabel || 'Then') + ' 📷';
      this.parentElement.appendChild(ph);
    };
  }

  /* "Now" image */
  const nowImg = document.querySelector('.now-image img');
  if (nowImg) {
    if (slider.nowImage) nowImg.src = slider.nowImage;
    nowImg.onerror = function () {
      this.style.display = 'none';
      const ph = document.createElement('div');
      ph.classList.add('slider-placeholder');
      ph.textContent = (slider.nowLabel || 'Now') + ' 📷';
      this.parentElement.appendChild(ph);
    };
  }
}


/**
 * populateWish — sets heading, button text, and wish message.
 * Editable keys → wish.heading, wish.buttonText, wish.message
 */
function populateWish(wish) {
  if (!wish) return;

  /* Section heading */
  const headingEl = document.querySelector('#wish .section-title');
  if (headingEl && wish.heading) headingEl.textContent = wish.heading;

  /* Blow button text */
  const btnEl = document.querySelector('.blow-btn');
  if (btnEl && wish.buttonText) btnEl.textContent = wish.buttonText;

  /* Wish message */
  const msgEl = document.querySelector('.wish-message');
  if (msgEl && wish.message) msgEl.textContent = wish.message;
}


/**
 * populateLetter — sets heading, seal, and letter body.
 * Editable keys → letter.heading, letter.seal (in messages.json)
 *                  letter body text (in letter.txt)
 */
function populateLetter(letterData, letterText) {
  /* Section heading */
  if (letterData) {
    const headingEl = document.querySelector('#letter .section-title');
    if (headingEl && letterData.heading) headingEl.textContent = letterData.heading;

    /* Wax seal emoji */
    const sealEl = document.querySelector('.letter-seal');
    if (sealEl && letterData.seal) sealEl.textContent = letterData.seal;
  }

  /* Letter body from letter.txt */
  if (letterText) {
    const contentEl = document.querySelector('.letter-content');
    if (contentEl) contentEl.textContent = letterText;
  }
}


/**
 * populateEnding — sets quote, badge, and hearts.
 * Editable keys → ending.quote, ending.badge, ending.hearts
 */
function populateEnding(ending) {
  if (!ending) return;

  const quoteEl  = document.querySelector('.ending-quote');
  const badgeEl  = document.querySelector('.ending-badge');
  const heartsEl = document.querySelector('.ending-hearts');

  if (quoteEl  && ending.quote)  quoteEl.textContent  = ending.quote;
  if (badgeEl  && ending.badge)  badgeEl.textContent   = ending.badge;
  if (heartsEl && ending.hearts) heartsEl.textContent  = ending.hearts;
}


/* ==============================================================
 *  LANTERN FACTORY
 *  Creates 15 floating lantern elements inside .lanterns-container
 * ============================================================== */

function createLanterns() {
  const container = document.querySelector('.lanterns-container');
  if (!container) return;

  const LANTERN_COUNT = 15;

  for (let i = 0; i < LANTERN_COUNT; i++) {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');

    /* Randomised CSS custom properties for unique motion */
    const duration = (Math.random() * 15 + 15).toFixed(1);
    const sway     = (Math.random() * 100 - 50).toFixed(0);
    const left     = (Math.random() * 100).toFixed(1);
    const delay    = (Math.random() * 10).toFixed(1);

    lantern.style.setProperty('--duration', `${duration}s`);
    lantern.style.setProperty('--sway', `${sway}px`);
    lantern.style.left            = `${left}%`;
    lantern.style.animationDelay  = `${delay}s`;

    container.appendChild(lantern);
  }
}

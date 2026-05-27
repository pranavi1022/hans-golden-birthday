/* ============================================================
 *  main.js — Master initialisation for Hans's Golden Birthday
 *  Fetches data, populates every section, boots all modules.
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
     * ---------------------------------------------------------- */
    populateHero(data.hero);
    populateBalloons(data.balloons);
    populateGallery(data.gallery);
    populateSlider(data.slider);
    populateWish(data.wish);
    populateLetter(letterText);
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
 * ============================================================== */

/**
 * populateHero — fills the hero banner text.
 * @param {Object} hero  – { title: string, subtitle: string }
 */
function populateHero(hero) {
  if (!hero) return;

  const titleEl    = document.querySelector('.hero-title');
  const subtitleEl = document.querySelector('.hero-subtitle');

  if (titleEl)    titleEl.textContent    = hero.title    || '';
  if (subtitleEl) subtitleEl.textContent = hero.subtitle || '';
}


/**
 * populateBalloons — writes a secret message into each balloon.
 * @param {string[]} messages — array of messages, one per balloon
 */
function populateBalloons(messages) {
  if (!messages || !Array.isArray(messages)) return;

  const wrappers = document.querySelectorAll('.balloon-wrapper');
  wrappers.forEach((wrapper, i) => {
    const msgEl = wrapper.querySelector('.balloon-message');
    if (msgEl && messages[i] !== undefined) {
      msgEl.textContent = messages[i];
    }
    /* Store the message as a data attribute too (handy for CSS tooltips) */
    if (messages[i] !== undefined) {
      wrapper.setAttribute('data-message', messages[i]);
    }
  });
}


/**
 * populateGallery — dynamically builds gallery categories & images.
 * @param {Object} gallery – { categories: [{ name, images: [{ src, alt }] }] }
 */
function populateGallery(gallery) {
  if (!gallery || !gallery.categories) return;

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
    catTitle.textContent = cat.name || 'Gallery';
    catDiv.appendChild(catTitle);

    /* --- Image grid inside category --- */
    const imagesDiv = document.createElement('div');
    imagesDiv.classList.add('category-images');

    (cat.images || []).forEach((img) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item', 'reveal');           // .reveal for scroll animation

      /* Support both string paths and { src, alt } objects */
      const imgSrc = (typeof img === 'string') ? img : (img.src || '');
      const imgAlt = (typeof img === 'string') ? cat.name   : (img.alt || cat.name);

      const image = document.createElement('img');
      image.src      = imgSrc;
      image.alt      = imgAlt;
      image.loading  = 'lazy';                                // native lazy-load

      /* Fallback placeholder when the image can't load */
      image.onerror = function () {
        this.style.display = 'none';                          // hide broken <img>
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
 * populateSlider — sets "then" & "now" images for the before/after slider.
 * @param {Object} slider – { title, thenImage, nowImage }
 */
function populateSlider(slider) {
  if (!slider) return;

  /* Title */
  const titleEl = document.querySelector('#slider .section-title')
               || document.querySelector('#slider h2');
  if (titleEl && slider.title) titleEl.textContent = slider.title;

  /* Labels */
  const thenLabel = document.querySelector('.slider-label.then-label');
  const nowLabel  = document.querySelector('.slider-label.now-label');
  if (thenLabel && slider.thenLabel) thenLabel.textContent = slider.thenLabel;
  if (nowLabel  && slider.nowLabel)  nowLabel.textContent  = slider.nowLabel;

  /* "Then" image */
  const thenImg = document.querySelector('.then-image img');
  if (thenImg) {
    if (slider.thenImage) {
      thenImg.src = slider.thenImage;
    }
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
    if (slider.nowImage) {
      nowImg.src = slider.nowImage;
    }
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
 * populateWish — inserts the wish message text.
 * @param {Object} wish – { message: string }
 */
function populateWish(wish) {
  if (!wish) return;

  const msgEl = document.querySelector('.wish-message');
  if (msgEl && wish.message) {
    msgEl.textContent = wish.message;
  }
}


/**
 * populateLetter — fills the personal-letter section.
 * @param {string} text — raw text from letter.txt
 */
function populateLetter(text) {
  if (!text) return;

  const contentEl = document.querySelector('.letter-content');
  if (contentEl) {
    contentEl.textContent = text;
  }
}


/**
 * populateEnding — sets the closing quote / farewell.
 * @param {Object} ending – { quote: string }
 */
function populateEnding(ending) {
  if (!ending) return;

  const quoteEl = document.querySelector('.ending-quote');
  if (quoteEl && ending.quote) {
    quoteEl.textContent = ending.quote;
  }

  /* Badge text (e.g. "✨ 19 on 19 ✨") */
  const badgeEl = document.querySelector('.ending-badge');
  if (badgeEl && ending.badge) {
    badgeEl.textContent = ending.badge;
  }
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
    const duration = (Math.random() * 15 + 15).toFixed(1);         // 15 s – 30 s
    const sway     = (Math.random() * 100 - 50).toFixed(0);        // -50 px – 50 px
    const left     = (Math.random() * 100).toFixed(1);              // 0 % – 100 %
    const delay    = (Math.random() * 10).toFixed(1);               // stagger start

    lantern.style.setProperty('--duration', `${duration}s`);
    lantern.style.setProperty('--sway', `${sway}px`);
    lantern.style.left            = `${left}%`;
    lantern.style.animationDelay  = `${delay}s`;

    container.appendChild(lantern);
  }
}

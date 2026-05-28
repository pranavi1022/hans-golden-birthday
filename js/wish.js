/* ============================================================
 *  wish.js — Birthday candle blow-out + confetti celebration
 *  Click the blow button → candles extinguish → confetti rains
 *  → wish message appears.
 * ============================================================ */

/**
 * initWish
 * Hooks into the blow button, staggers candle blow-outs, then
 * triggers confetti and reveals the hidden wish message.
 */
function initWish() {
  const blowBtn     = document.querySelector('.blow-btn');
  const candles     = document.querySelectorAll('.candle');
  const wishMessage = document.querySelector('.wish-message');

  if (!blowBtn) return;

  /* --- Blow sound effect ---
   * Place your blow/whoosh sound file at: assets/music/blow.mp3
   * Supported formats: .mp3, .wav, .ogg */
  const blowSound = new Audio('assets/music/blow.mp3');
  blowSound.volume = 0.7;

  blowBtn.addEventListener('click', () => {
    /* Prevent repeated clicks */
    blowBtn.disabled = true;

    /* Play blow sound */
    try {
      blowSound.currentTime = 0;
      blowSound.play().catch(() => {});
    } catch (e) { /* no sound file yet — that's fine */ }

    /* --- Stagger candle blow-out (100 ms apart) --- */
    candles.forEach((candle, index) => {
      setTimeout(() => {
        candle.classList.add('blown');
      }, index * 100);
    });

    /* --- After the last candle, celebrate --- */
    const totalDelay = candles.length * 100 + 300;               // small extra buffer

    setTimeout(() => {
      /* Confetti shower */
      createConfetti();

      /* Show the wish message */
      if (wishMessage) {
        wishMessage.classList.add('visible');
      }

      /* Hide the blow button */
      blowBtn.classList.add('hidden');
    }, totalDelay);
  });
}


/* ==============================================================
 *  CONFETTI GENERATOR
 *  Spawns 100 tiny colourful pieces that rain down and vanish.
 * ============================================================== */

function createConfetti() {
  /* Container that lives above everything else */
  const container = document.createElement('div');
  container.classList.add('confetti-container');

  /* Inline styles to overlay the viewport */
  Object.assign(container.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '100vw',
    height:        '100vh',
    pointerEvents: 'none',
    overflow:      'hidden',
    zIndex:        '99999'
  });

  document.body.appendChild(container);

  /* --- Colour palette (gold / white / warm tones) --- */
  const COLORS = [
    '#FFD700', '#D4AF37', '#F5E6A3',
    '#FFFFFF', '#FFFACD', '#DAA520',
    '#FFC107', '#FFE082'
  ];

  const PIECE_COUNT = 100;

  for (let i = 0; i < PIECE_COUNT; i++) {
    const piece = document.createElement('div');

    /* Randomised properties */
    const size     = Math.random() * 7 + 8;                        // 8 – 15 px
    const left     = Math.random() * 100;                           // 0 – 100 %
    const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
    const duration = (Math.random() * 2 + 2).toFixed(2);           // 2 – 4 s
    const delay    = (Math.random() * 1).toFixed(2);                // 0 – 1 s
    const drift    = (Math.random() * 200 - 100).toFixed(0);       // -100 – 100 px
    const isCircle = Math.random() > 0.5;                           // 50 % chance circle

    Object.assign(piece.style, {
      position:          'absolute',
      top:               '-10px',
      left:              `${left}%`,
      width:             `${size}px`,
      height:            `${size}px`,
      backgroundColor:   color,
      borderRadius:      isCircle ? '50%' : '2px',
      opacity:           '1',
      animation:         `confettiFall ${duration}s ${delay}s ease-in forwards`,
      '--drift':         `${drift}px`
    });

    container.appendChild(piece);
  }

  /* --- Inject keyframes if not already present --- */
  if (!document.getElementById('confetti-keyframes')) {
    const style = document.createElement('style');
    style.id = 'confetti-keyframes';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* Clean up the container after 5 seconds */
  setTimeout(() => {
    container.remove();
  }, 5000);
}

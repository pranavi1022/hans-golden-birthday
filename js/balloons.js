/* ============================================================
 *  balloons.js — Pop-to-reveal balloon interaction
 *  Each balloon shows a hidden message when clicked.
 * ============================================================ */

/**
 * initBalloons
 * Attaches click handlers to every .balloon-wrapper.
 * On pop: adds .popped class + spawns a gold particle burst.
 */
function initBalloons() {
  const wrappers = document.querySelectorAll('.balloon-wrapper');

  /* --- Pop sound effect ---
   * Place your pop sound file at: assets/music/pop.mp3
   * Supported formats: .mp3, .wav, .ogg */
  const popSound = new Audio('assets/music/pop.mp3');
  popSound.volume = 0.6;

  wrappers.forEach((wrapper) => {
    wrapper.addEventListener('click', () => {
      /* Guard: don't re-pop */
      if (wrapper.classList.contains('popped')) return;

      /* Play pop sound */
      try {
        popSound.currentTime = 0;                                  // reset so it can replay
        popSound.play().catch(() => {});                            // graceful if no file yet
      } catch (e) { /* no sound file yet — that's fine */ }

      /* Mark as popped (CSS handles the visual transition) */
      wrapper.classList.add('popped');

      /* Spawn a celebratory particle burst at the balloon's position */
      const rect = wrapper.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      createBalloonBurst(cx, cy);
    });
  });
}


/* ----------------------------------------------------------
 *  BALLOON BURST EFFECT
 *  Creates 15 tiny gold circles that radiate outward
 *  from (cx, cy) and fade out.
 * ---------------------------------------------------------- */

/**
 * createBalloonBurst
 * @param {number} cx — centre X of the burst (viewport coords)
 * @param {number} cy — centre Y of the burst (viewport coords)
 */
function createBalloonBurst(cx, cy) {
  const BURST_COUNT  = 15;
  const BURST_COLORS = ['#D4AF37', '#FFD700', '#F5E6A3', '#FFF8DC', '#FFFACD'];

  for (let i = 0; i < BURST_COUNT; i++) {
    const dot = document.createElement('div');

    /* Random size between 4 px and 10 px */
    const size = Math.random() * 6 + 4;

    /* Random direction & distance */
    const angle    = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;                      // 40 – 120 px
    const dx       = Math.cos(angle) * distance;
    const dy       = Math.sin(angle) * distance;

    /* Base styles */
    Object.assign(dot.style, {
      position:        'fixed',
      left:            `${cx}px`,
      top:             `${cy}px`,
      width:           `${size}px`,
      height:          `${size}px`,
      borderRadius:    '50%',
      backgroundColor: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      pointerEvents:   'none',
      zIndex:          '10000',
      opacity:         '1',
      transition:      `all ${(Math.random() * 0.4 + 0.4).toFixed(2)}s ease-out`
    });

    document.body.appendChild(dot);

    /* Trigger animation on the next frame so the transition fires */
    requestAnimationFrame(() => {
      dot.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      dot.style.opacity   = '0';
    });

    /* Clean up after animation completes */
    setTimeout(() => {
      dot.remove();
    }, 900);
  }
}

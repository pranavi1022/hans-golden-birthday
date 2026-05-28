/* ==========================================================
   Loading Screen Controller
   Manages the full-screen loading overlay:
   - Dynamically creates sparkle dots arranged in a circle
   - Provides hideLoading() to dismiss the overlay
   - Auto-initializes on DOMContentLoaded
   ========================================================== */

/**
 * Initialise the loading screen.
 * Spawns 8 sparkle dots positioned in a circular ring
 * inside the .loading-sparkles container.
 */
function initLoading() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  /* Locate the sparkles container */
  const sparklesContainer = screen.querySelector('.loading-sparkles');
  if (sparklesContainer) {
    const SPARKLE_COUNT = 8;
    const RADIUS = 40; /* px – radius of the circle */

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('loading-sparkle');

      /* Place each dot evenly around the circle */
      const angle = (i / SPARKLE_COUNT) * Math.PI * 2;
      sparkle.style.left = `${50 + Math.cos(angle) * RADIUS}px`;
      sparkle.style.top  = `${50 + Math.sin(angle) * RADIUS}px`;

      /* Stagger animation so dots pulse sequentially */
      sparkle.style.animationDelay = `${i * 0.15}s`;

      sparklesContainer.appendChild(sparkle);
    }
  }

  /*
   * Note: hideLoading() is called externally (e.g. from main.js)
   * once all critical resources / data have loaded.
   */
}

/**
 * Hide the loading screen with a smooth fade-out.
 * After the CSS transition completes, the element is
 * removed from the DOM entirely to free resources.
 */
function hideLoading() {
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.classList.add('hidden');
    /* Remove from DOM after the 0.8 s CSS transition finishes */
    setTimeout(() => screen.remove(), 1000);
  }
}

/* Initialise as soon as the DOM is ready */
document.addEventListener('DOMContentLoaded', initLoading);

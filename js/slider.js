/* ============================================================
 *  slider.js — Before / After image comparison slider
 *  Drag the handle (or click anywhere) to reveal the "now" image.
 * ============================================================ */

/**
 * initSlider
 * Wires up mouse & touch events on .slider-container so the
 * user can drag the divider between the "then" and "now" photos.
 */
function initSlider() {
  const container = document.querySelector('.slider-container');
  const handle    = document.querySelector('.slider-handle');
  const nowImage  = document.querySelector('.now-image');

  if (!container || !handle || !nowImage) return;

  let isDragging = false;

  /* ----------------------------------------------------------
   * Helper: update slider position to a given percentage (0-100)
   * ---------------------------------------------------------- */
  function setSliderPercent(percent) {
    /* Clamp between 0 and 100 */
    percent = Math.max(0, Math.min(100, percent));

    /* Reveal the "now" image from the left edge up to `percent` */
    nowImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;

    /* Move the drag handle */
    handle.style.left = `${percent}%`;
  }

  /* Start at the midpoint */
  setSliderPercent(50);

  /* ----------------------------------------------------------
   * Convert a pointer event's X into a percentage of the slider
   * ---------------------------------------------------------- */
  function percentFromEvent(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect    = container.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  /* ----------------------------------------------------------
   * EVENT LISTENERS — Mouse + Touch
   * ---------------------------------------------------------- */

  /* --- Start dragging --- */
  function onStart(e) {
    isDragging = true;
    e.preventDefault();                                            // prevent text selection
    setSliderPercent(percentFromEvent(e));
  }

  /* --- While dragging --- */
  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    setSliderPercent(percentFromEvent(e));
  }

  /* --- Stop dragging --- */
  function onEnd() {
    isDragging = false;
  }

  /* Mouse events */
  container.addEventListener('mousedown',  onStart);
  handle.addEventListener('mousedown',     onStart);
  window.addEventListener('mousemove',     onMove);
  window.addEventListener('mouseup',       onEnd);

  /* Touch events */
  container.addEventListener('touchstart', onStart, { passive: false });
  handle.addEventListener('touchstart',    onStart, { passive: false });
  window.addEventListener('touchmove',     onMove,  { passive: false });
  window.addEventListener('touchend',      onEnd);
}

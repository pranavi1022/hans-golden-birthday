/* ==========================================================
   Fullscreen Photo Lightbox
   Opens gallery images in a fullscreen modal overlay.
   Supports closing via button click, backdrop click, or
   the Escape key. Uses event delegation so dynamically
   added gallery items are automatically handled.
   ========================================================== */

/**
 * Initialise the lightbox functionality.
 * Should be called once after the DOM is ready.
 */
function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  /* ---------- Open lightbox via delegated click ---------- */
  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (!galleryItem) return;

    const img = galleryItem.querySelector('img');
    if (!img || !img.src || img.style.display === 'none') return;

    /* Populate modal image and show */
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Gallery photo';
    lightbox.classList.add('active');

    /* Prevent background scrolling while modal is open */
    document.body.style.overflow = 'hidden';
  });

  /* ---------- Close: button ---------- */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  /* ---------- Close: backdrop click ---------- */
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Close: Escape key ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /**
   * Close the lightbox with a smooth transition.
   * Clears the image src after the CSS animation ends
   * to free memory for large photos.
   */
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    /* Wait for the 0.4 s CSS fade-out before clearing src */
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }
}

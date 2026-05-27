/* ============================================================
 *  particles.js — Golden particle canvas for the hero section
 *  Renders 80 floating gold motes on #particle-canvas.
 * ============================================================ */

/**
 * initParticles
 * Sets up the canvas, spawns particles, and kicks off the
 * requestAnimationFrame render loop.
 */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* --- Palette of gold tones picked at random per particle --- */
  const GOLD_COLORS = ['#D4AF37', '#FFD700', '#F5E6A3'];

  /* --- Sizing helper (matches canvas to its parent) --- */
  function resize() {
    const parent = canvas.parentElement || document.body;
    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ----------------------------------------------------------
   * PARTICLE FACTORY
   * Each particle is a simple POJO with position, velocity,
   * appearance, and a random gold hue.
   * ---------------------------------------------------------- */
  const PARTICLE_COUNT = 80;
  const particles = [];

  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 3 + 1,                              // 1 – 4 px
      speedX:  (Math.random() - 0.5),                              // -0.5 – 0.5
      speedY:  -(Math.random() * 0.7 + 0.3),                      // -0.3 – -1 (upward)
      opacity: Math.random() * 0.6 + 0.2,                         // 0.2 – 0.8
      color:   GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  /* ----------------------------------------------------------
   * RENDER LOOP
   * Clears → updates positions → draws circles.
   * Particles wrap around canvas edges for seamless flow.
   * ---------------------------------------------------------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      /* Update position */
      p.x += p.speedX;
      p.y += p.speedY;

      /* Wrap around edges */
      if (p.x < 0)             p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0)             p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      /* Draw particle */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    /* Reset alpha so it doesn't bleed into other draws */
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================
   Golden Sparkle Cursor Trail
   Renders a canvas-based particle trail that follows the
   mouse pointer on desktop devices. Each particle is a
   small glowing gold dot that drifts upward and fades out.
   Skipped entirely on touch devices for performance.
   ========================================================== */

/**
 * Initialise the cursor sparkle effect.
 * Should be called once after the DOM is ready.
 */
function initCursorSparkle() {
  /* Skip on touch devices – no mouse to track */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const canvas = document.getElementById('cursor-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* ---------- Canvas sizing ---------- */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---------- State ---------- */
  const particles = [];
  const COLORS = ['#D4AF37', '#FFD700', '#F5E6A3', '#FFFACD'];
  const MAX_PARTICLES = 50; /* Hard cap for performance */

  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;

  /* Track mouse position */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ---------- Particle spawning ---------- */
  function spawnParticle() {
    /* Only spawn when the cursor actually moves */
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    /* Spawn 1–2 particles per significant move */
    const count = Math.random() > 0.5 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: mouseX + (Math.random() - 0.5) * 10,
        y: mouseY + (Math.random() - 0.5) * 10,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1 - 0.5, /* Slight upward drift */
        opacity: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 30 + Math.random() * 20
      });
    }
  }

  /* ---------- Render loop ---------- */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnParticle();

    /* Update & draw each particle */
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.life++;
      p.opacity = 1 - (p.life / p.maxLife);
      p.size *= 0.98; /* Shrink over time */

      /* Remove dead particles */
      if (p.life >= p.maxLife || p.opacity <= 0) {
        particles.splice(i, 1);
        continue;
      }

      /* Draw a glowing circle */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * 0.7;
      ctx.fill();
    }

    /* Reset alpha so other canvas drawing isn't affected */
    ctx.globalAlpha = 1;

    /* Enforce particle cap */
    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }

    requestAnimationFrame(animate);
  }

  /* Kick off the render loop */
  requestAnimationFrame(animate);
}

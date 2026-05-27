/* ============================================================
 *  music.js — Background music toggle (play / pause)
 *  Audio source: assets/music/birthday.mp3
 * ============================================================ */

/**
 * initMusic
 * Creates an <audio> element, wires up the .music-toggle button,
 * and handles play/pause with graceful error handling.
 */
function initMusic() {
  const toggleBtn = document.querySelector('.music-toggle');
  if (!toggleBtn) return;

  /* --- Create the audio element programmatically --- */
  const audio = new Audio('assets/music/birthday.mp3');
  audio.loop    = true;
  audio.volume  = 0.5;                                             // default volume

  let isPlaying = false;

  /* --- Toggle handler --- */
  toggleBtn.addEventListener('click', async () => {
    if (!isPlaying) {
      /* ▶ PLAY */
      try {
        await audio.play();
        isPlaying = true;
        toggleBtn.classList.add('playing');
        toggleBtn.textContent = '🔊';                             // speaker-on icon
      } catch (err) {
        /* Browsers may block autoplay; just log, don't break UX */
        console.warn('[music.js] Playback blocked:', err.message);
      }
    } else {
      /* ⏸ PAUSE */
      audio.pause();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      toggleBtn.textContent = '🔇';                               // muted icon
    }
  });
}

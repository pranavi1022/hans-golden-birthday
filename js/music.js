/* ============================================================
 *  music.js — Mini music player (play / pause + progress bar)
 *  Audio source: assets/music/birthday.mp3
 * ============================================================ */

/**
 * initMusic
 * Wires up the #music-player mini-player with play/pause,
 * progress bar, and title updates.
 */
function initMusic() {
  const player = document.getElementById('music-player');
  const btn = document.getElementById('music-player-btn');
  if (!btn) return;

  const audio = new Audio('assets/music/birthday.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  let isPlaying = false;

  const titleEl = player ? player.querySelector('.music-player-title') : null;
  const progressBar = player ? player.querySelector('.music-player-progress-bar') : null;

  /* Update progress bar */
  if (progressBar) {
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    });
  }

  btn.addEventListener('click', async () => {
    if (!isPlaying) {
      try {
        await audio.play();
        isPlaying = true;
        btn.classList.add('playing');
        btn.textContent = '🔊';
        if (titleEl) titleEl.textContent = 'Playing: Our Golden Memories 🎵';
      } catch (err) {
        console.warn('[music] Playback blocked:', err.message);
      }
    } else {
      audio.pause();
      isPlaying = false;
      btn.classList.remove('playing');
      btn.textContent = '🔇';
      if (titleEl) titleEl.textContent = 'Paused 🎵';
    }
  });

}

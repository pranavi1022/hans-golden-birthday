/* ============================================
   COUNTDOWN.JS — Countdown Timer Logic
   Updates the live countdown timer leading to June 19th
   ============================================ */

function initCountdown() {
  const container = document.getElementById('countdown-timer');
  if (!container) return;

  // Target Date: June 19, 2026 at 00:00:00 local time
  const targetDate = new Date('June 19, 2026 00:00:00').getTime();

  // Elements
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // If the countdown is finished, display celebration text
    if (distance < 0) {
      clearInterval(timerInterval);
      container.innerHTML = `
        <div class="countdown-celebration">
          🎉 HAPPY GOLDEN BIRTHDAY, HANSSS! 💛✨
        </div>
      `;
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Populate values with leading zeros
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial call and set interval
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

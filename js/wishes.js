/* ============================================
   WISHES.JS — Supabase Cloud Database
   Real shared guestbook for Hans's Birthday
   Every device sees the same wishes.
   ============================================ */

/* ----------------------------------------------------------
 * SUPABASE CONFIGURATION
 * ---------------------------------------------------------- */
const SUPABASE_URL = 'https://untmjodetdtlpnqjgmvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudG1qb2RldGR0bHBucWpnbXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDI0MDEsImV4cCI6MjA5NTk3ODQwMX0.fHHrO8B7iVi2ZbX5jP0ZOw6aBzETsaEAaDICjm6FXtw';

/* ----------------------------------------------------------
 * SUPABASE REST API HELPERS
 * ---------------------------------------------------------- */

/**
 * Fetch all wishes from the Supabase database.
 * Returns an array of { name, message, created_at }.
 */
async function fetchWishes() {
  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/wishes?select=id,name,message,created_at&order=created_at.asc', {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
      }
    });
    if (!res.ok) {
      console.error('[wishes.js] Fetch error:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error('[wishes.js] Network error fetching wishes:', err);
    return [];
  }
}

/**
 * Insert a new wish into the Supabase database.
 * Returns true on success, false on failure.
 */
async function insertWish(name, message) {
  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/wishes', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ name: name, message: message })
    });
    if (!res.ok) {
      console.error('[wishes.js] Insert error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[wishes.js] Network error inserting wish:', err);
    return false;
  }
}

/* ----------------------------------------------------------
 * INITIALIZE STICKY NOTES WALL (Main Birthday Page)
 * Fetches wishes from the cloud database and renders them.
 * Auto-refreshes every 15 seconds so new wishes appear.
 * ---------------------------------------------------------- */
function initStickyNotes() {
  const grid = document.getElementById('sticky-notes-grid');
  if (!grid) return;

  let lastKnownCount = 0;

  async function renderWishes() {
    const wishes = await fetchWishes();

    // Only re-render if there are new wishes (prevents flickering)
    if (wishes.length !== lastKnownCount) {
      grid.innerHTML = '';
      wishes.forEach(function(wish) {
        addStickyNote(grid, wish.name, wish.message);
      });
      lastKnownCount = wishes.length;
    }
  }

  // Initial load
  renderWishes();

  // Auto-refresh every 15 seconds for real-time feel
  setInterval(renderWishes, 15000);
}

/* ----------------------------------------------------------
 * ADD A STICKY NOTE TO THE GRID
 * ---------------------------------------------------------- */
function addStickyNote(grid, name, message) {
  var note = document.createElement('div');
  note.className = 'sticky-note';

  var nameEl = document.createElement('div');
  nameEl.className = 'sticky-note-name';
  nameEl.textContent = name;

  var msgEl = document.createElement('div');
  msgEl.className = 'sticky-note-message';
  msgEl.textContent = message;

  note.appendChild(nameEl);
  note.appendChild(msgEl);
  grid.appendChild(note);
}

/* ----------------------------------------------------------
 * SUBMIT A WISH (Wishes Page Only)
 * Saves the wish to the Supabase cloud database.
 * ---------------------------------------------------------- */
function submitWish(name, message) {
  return insertWish(name, message).then(function(success) {
    if (!success) {
      throw new Error('Failed to save wish to the database.');
    }
  });
}

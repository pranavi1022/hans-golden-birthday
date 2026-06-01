/* ============================================
   WISHES.JS — Firebase Integration for
   Sticky Notes Wall & Wishes Submission
   ============================================ */

/* ----------------------------------------------------------
 * FIREBASE CONFIGURATION
 * Replace these values with your Firebase project config.
 * To set up:
 *   1. Go to https://console.firebase.google.com
 *   2. Create a new project (e.g. "hans-birthday-wishes")
 *   3. Go to Realtime Database → Create Database (test mode)
 *   4. Go to Project Settings → General → Your apps → Add web app
 *   5. Copy the config values below
 * ---------------------------------------------------------- */
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

/* ----------------------------------------------------------
 * FALLBACK SAMPLE WISHES (shown when Firebase is not configured)
 * ---------------------------------------------------------- */
const SAMPLE_WISHES = [
  { name: "Pranavi", message: "Golden bday for my golden girl! Here's to us and all our memories 💛✨", timestamp: Date.now() - 100000 },
  { name: "Vaish", message: "Happy birthday Hansss! Our trio is forever 🫂💖", timestamp: Date.now() - 80000 },
  { name: "A Friend", message: "Wishing you the most golden year ahead! You deserve all the happiness in the world ✨🎂", timestamp: Date.now() - 50000 },
  { name: "Your Twin Soul", message: "From 6th class to forever. No way back! Happy 19th 💛", timestamp: Date.now() - 20000 }
];

/* ----------------------------------------------------------
 * CHECK IF FIREBASE IS CONFIGURED
 * ---------------------------------------------------------- */
function isFirebaseConfigured() {
  return FIREBASE_CONFIG.databaseURL && FIREBASE_CONFIG.databaseURL.length > 0;
}

/* ----------------------------------------------------------
 * INITIALIZE STICKY NOTES WALL (Main Birthday Page)
 * ---------------------------------------------------------- */
function initStickyNotes() {
  const grid = document.getElementById('sticky-notes-grid');
  if (!grid) return;

  if (isFirebaseConfigured() && typeof firebase !== 'undefined') {
    // Initialize Firebase if not already done
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    const db = firebase.database();
    const wishesRef = db.ref('wishes');

    // Listen for wishes in real-time
    wishesRef.orderByChild('timestamp').on('child_added', function(snapshot) {
      const wish = snapshot.val();
      if (wish && wish.name && wish.message) {
        addStickyNote(grid, wish.name, wish.message);
      }
    });
  } else {
    // Firebase not configured — show sample wishes
    SAMPLE_WISHES.forEach(function(wish) {
      addStickyNote(grid, wish.name, wish.message);
    });
  }
}

/* ----------------------------------------------------------
 * ADD A STICKY NOTE TO THE GRID
 * ---------------------------------------------------------- */
function addStickyNote(grid, name, message) {
  const note = document.createElement('div');
  note.className = 'sticky-note reveal';

  const nameEl = document.createElement('div');
  nameEl.className = 'sticky-note-name';
  nameEl.textContent = name;

  const msgEl = document.createElement('div');
  msgEl.className = 'sticky-note-message';
  msgEl.textContent = message;

  note.appendChild(nameEl);
  note.appendChild(msgEl);
  grid.appendChild(note);
}

/* ----------------------------------------------------------
 * SUBMIT A WISH (Wishes Page Only)
 * ---------------------------------------------------------- */
function submitWish(name, message) {
  return new Promise(function(resolve, reject) {
    if (!isFirebaseConfigured() || typeof firebase === 'undefined') {
      // Demo mode — simulate success
      console.log('[wishes.js] Demo mode — wish not saved:', { name: name, message: message });
      resolve();
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    const db = firebase.database();
    const wishesRef = db.ref('wishes');

    wishesRef.push({
      name: name,
      message: message,
      timestamp: Date.now()
    })
    .then(function() { resolve(); })
    .catch(function(err) { reject(err); });
  });
}

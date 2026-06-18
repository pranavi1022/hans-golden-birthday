/* ============================================
   LOCK SCREEN LOGIC
   Handles the passcode verification and unlocking
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Enable locked mode immediately on load
    document.body.classList.add('locked-mode');

    // 2. Setup the unlock button logic
    const unlockBtn = document.getElementById('website-unlock-btn');
    const passcodeInput = document.getElementById('website-passcode');
    const errorMsg = document.getElementById('website-lock-error');
    const lockContainer = document.getElementById('website-lock-container');

    // The secret passcode!
    const SECRET_PASSCODE = 'triosol'; 

    if(unlockBtn && passcodeInput) {
        
        function tryUnlock() {
            const enteredValue = passcodeInput.value.trim().toLowerCase();
            
            // Check if passcode is correct
            if(enteredValue === SECRET_PASSCODE) {
                // UNLOCK!
                document.body.classList.remove('locked-mode');
                lockContainer.style.opacity = '0';
                setTimeout(() => {
                    lockContainer.style.display = 'none';
                }, 500);

                // Show background music player
                const musicPlayer = document.getElementById('music-player');
                if(musicPlayer) {
                    musicPlayer.style.display = 'flex';
                }
            } else {
                // ERROR
                errorMsg.textContent = "Incorrect passcode! Nice try 😜";
                errorMsg.style.opacity = '1';
                passcodeInput.style.borderColor = '#ff4d4d';
                
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                    passcodeInput.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                }, 3000);
            }
        }

        // Handle button click
        unlockBtn.addEventListener('click', tryUnlock);

        // Handle enter key
        passcodeInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                tryUnlock();
            }
        });
    }
});

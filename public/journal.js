// public/journal.js (Final Version with Pop-up)

// This function sets up the journal based on the user's login status.
function setupJournal() {
    const textarea = document.getElementById("journalEntry");
    const saveBtn = document.getElementById("saveJournal");
    const status = document.getElementById("journalStatus");
    const loginModal = document.getElementById('login-prompt-modal');
    const closeModalBtn = document.querySelector('.modal-close');

    // Make sure all the necessary elements exist before proceeding.
    if (!textarea || !saveBtn || !loginModal || !closeModalBtn) {
        return;
    }

    // --- Logic for the pop-up modal ---
    function showLoginPrompt() {
        loginModal.style.display = 'flex';
    }
    function hideLoginPrompt() {
        loginModal.style.display = 'none';
    }
    closeModalBtn.addEventListener('click', hideLoginPrompt);


    // Check if the user is logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // --- USER IS LOGGED IN ---
        // Restore full functionality to the journal.
        
        saveBtn.disabled = false;
        saveBtn.style.cursor = 'pointer';
        saveBtn.style.opacity = '1';

        // Load saved entry from localStorage.
        const savedEntry = localStorage.getItem("journalEntry");
        if (savedEntry) {
            textarea.value = savedEntry;
        }

        // Add the click listener for the save button.
        saveBtn.addEventListener("click", () => {
            localStorage.setItem("journalEntry", textarea.value);
            if (status) {
                status.textContent = "Saved! 🌱";
                setTimeout(() => {
                    status.textContent = "";
                }, 2000);
            }
        });

    } else {
        // --- USER IS NOT LOGGED IN ---
        // Lock the feature and show the pop-up on interaction.

        // 1. Visually disable the save button.
        saveBtn.disabled = true;
        saveBtn.style.cursor = 'not-allowed';
        saveBtn.style.opacity = '0.6';
        
        // 2. Add an event listener to the text area.
        textarea.addEventListener('focus', (event) => {
            // Prevent the user from typing.
            event.preventDefault();
            textarea.blur(); // Remove the blinking cursor.
            
            // Show the login pop-up.
            showLoginPrompt();
        });
    }
}

// Run the setup function when the page first loads.
document.addEventListener('DOMContentLoaded', setupJournal);

// IMPORTANT: Also run the setup function every time the page is shown
// This fixes the back button / caching problem.
window.addEventListener('pageshow', setupJournal);
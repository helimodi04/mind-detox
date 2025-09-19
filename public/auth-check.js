// public/js/auth-check.js

function checkAuthentication() {
    // Check if the isLoggedIn flag is NOT set to 'true' in sessionStorage
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        
        // If the user is not logged in, immediately redirect them to the login page.
        // We use location.replace() so the user cannot use the back button to return.
        console.log('User not authenticated. Redirecting to login...');
        window.location.replace('login.html');
    }
}

// Run the check immediately when the script loads
checkAuthentication();

// Also, run the check every time the page is shown (e.g., when using the back button)
window.addEventListener('pageshow', checkAuthentication);
// js/auth-guard.js

// Check karte hain ki 'isLoggedIn' status 'true' hai ya nahi
// Hum yeh status login karne par set karenge
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    
    // Agar user logged in nahi hai, toh use login page par bhej do.
    // Saath mein, hum current page ka naam URL mein bhej rahe hain.
    const currentPage = window.location.pathname.split('/').pop();
    window.location.href = `login.html?redirectUrl=${currentPage}`;

}
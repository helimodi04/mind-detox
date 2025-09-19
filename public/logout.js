// public/js/logout.js

document.addEventListener('DOMContentLoaded', () => {

    // Find the logout links by their IDs
    const logoutLink = document.getElementById('logout-link');
    const drawerLogoutLink = document.getElementById('drawer-logout-link');

    // This function will run when a logout link is clicked
    function handleLogout(event) {
        // Prevent the link from trying to go to a new page
        event.preventDefault(); 
        
        // Remove the 'isLoggedIn' status from the browser's memory
        sessionStorage.removeItem('isLoggedIn');
        
        // Show a confirmation message and redirect to the login page
        alert('You have been successfully logged out.');
        window.location.href = 'login.html';
    }

    // Attach the logout function to the click event of both links
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
    
    if (drawerLogoutLink) {
        drawerLogoutLink.addEventListener('click', handleLogout);
    }

});
// ui.js
document.addEventListener("DOMContentLoaded", () => {
    // For the Hamburger/Side Drawer
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.getElementById('drawer');
    const closeDrawerBtn = document.querySelector('.drawer-close');

    // For the Chatbot Popup
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotPopup = document.getElementById('chatbot');
    const closeChatbotBtn = document.getElementById('chatbot-close');

    // Event listeners for the Hamburger menu
    if (hamburger && drawer && closeDrawerBtn) {
        hamburger.addEventListener('click', () => {
            drawer.classList.add('show');
        });
        closeDrawerBtn.addEventListener('click', () => {
            drawer.classList.remove('show');
        });
    }

    // Event listeners for the Chatbot
    if (chatbotFab && chatbotPopup && closeChatbotBtn) {
        chatbotFab.addEventListener('click', () => {
            chatbotPopup.style.display = 'block';
        });
        closeChatbotBtn.addEventListener('click', () => {
            chatbotPopup.style.display = 'none';
        });
    }
});
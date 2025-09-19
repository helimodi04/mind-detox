document.addEventListener('DOMContentLoaded', () => {
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotPopup = document.getElementById('chatbot');
    const closeBtn = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatInput = document.getElementById('chatbotInput');
    const chatWindow = document.getElementById('chatbotMessages');

    chatbotFab.addEventListener('click', () => {
        chatbotPopup.classList.toggle('chatbot-popup--open');
    });

    closeBtn.addEventListener('click', () => {
        chatbotPopup.classList.remove('chatbot-popup--open');
    });

    chatbotForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        displayMessage(userMessage, 'user');
        chatInput.value = '';

        try {
            const response = await fetch("https://mind-detox-2.onrender.com/chat", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;

            displayMessage(botResponse, 'bot');

        } catch (error) {
            console.error('Error:', error);
            displayMessage('Sorry, I seem to be having trouble connecting. Please try again later.', 'bot');
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message'); // ye CSS se match karega
        if (sender === 'user') {
            messageElement.classList.add('user'); // ye bhi CSS se match karega
        }
        messageElement.textContent = message;

        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

});

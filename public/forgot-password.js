document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const messageElement = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageElement.textContent = 'Sending request...';
        messageElement.style.color = '#333';

        const email = forgotPasswordForm.querySelector('input[type="email"]').value;

        try {
            const response = await fetch('/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const resultText = await response.text();

            if (response.ok) {
                messageElement.style.color = 'green';
                messageElement.textContent = resultText;
            } else {
                messageElement.style.color = 'red';
                messageElement.textContent = resultText;
            }

        } catch (error) {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Could not connect to the server. Please try again later.';
        }
    });
});
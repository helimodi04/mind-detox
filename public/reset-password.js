document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const messageElement = document.getElementById('message');

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageElement.textContent = 'Resetting password...';
        messageElement.style.color = '#333';

        // 1. Get the reset token from the page's URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Invalid or missing reset token.';
            return;
        }

        // 2. Get the new password from the form
        const newPassword = document.getElementById('new-password').value;

        try {
            // 3. Send the token and new password to the server
            const response = await fetch('/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });

            const resultText = await response.text();

            if (response.ok) {
                messageElement.style.color = 'green';
                messageElement.textContent = resultText + ' Redirecting to login page...';
                // Redirect to login after a few seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
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
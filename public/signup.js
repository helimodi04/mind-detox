document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupErrorMessage = document.getElementById('error-message-signup');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (signupErrorMessage) signupErrorMessage.textContent = '';

        const username = signupForm.querySelector('input[name="username"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const resultText = await response.text();
            if (response.ok) {
                alert("Signup successful! Please check your email to verify your account.");
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                if (signupErrorMessage) signupErrorMessage.textContent = resultText;
            }
        } catch (error) {
            if (signupErrorMessage) signupErrorMessage.textContent = 'Could not connect to the server.';
        }
    });
});
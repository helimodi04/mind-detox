document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const loginErrorMessage = document.getElementById('error-message');
    const signupErrorMessage = document.getElementById('error-message-signup');

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        if (loginErrorMessage) loginErrorMessage.textContent = '';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        if (signupErrorMessage) signupErrorMessage.textContent = '';
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (loginErrorMessage) loginErrorMessage.textContent = '';
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                const errorText = await response.text();
                if (loginErrorMessage) loginErrorMessage.textContent = errorText;
            }
        } catch (error) {
            if (loginErrorMessage) loginErrorMessage.textContent = 'Could not connect to server.';
        }
    });

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
                const result = JSON.parse(resultText);
                alert(result.message);
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            } else {
                if (signupErrorMessage) signupErrorMessage.textContent = resultText;
            }
        } catch (error) {
            if (signupErrorMessage) signupErrorMessage.textContent = 'Could not connect to server.';
        }
    });
});
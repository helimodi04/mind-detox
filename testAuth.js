// Test authentication functions
const { createUser, loginUser } = require('./user');
const db = require('./database/user.sql'); // Adjust if your db connection is elsewhere

async function testSignupAndLogin() {
    // Hardcoded test values
    const username = 'testuser';
    const email = 'testuser@example.com';
    const password = 'TestPassword123';

    // Test user creation
    const signupResult = await createUser(username, email, password);
    console.log('Signup Result:', signupResult);

    // Manually set is_verified = 1 in DB for testing login (do this in DB or add a query here if needed)
    // Example: await db.query('UPDATE users SET is_verified = 1 WHERE email = ?', [email]);

    // Test user login
    const loginResult = await loginUser(email, password);
    console.log('Login Result:', loginResult);
}

testSignupAndLogin().catch(console.error);
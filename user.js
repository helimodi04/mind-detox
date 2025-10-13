require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Import both email functions
const { sendVerificationEmail, sendPasswordResetEmail } = require('./emailService.js');

async function createUser(db, username, email, password) {
    try {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const verification_token = crypto.randomBytes(32).toString('hex');

        const query = 'INSERT INTO users (username, email, password_hash, verification_token) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [username, email, password_hash, verification_token]);
        
        await sendVerificationEmail(email, verification_token);
        return { id: result.insertId, username: username, email: email };
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
}

async function verifyUser(db, token) {
    try {
        const findUserQuery = 'SELECT * FROM users WHERE verification_token = ?';
        const [users] = await db.query(findUserQuery, [token]);
        if (users.length === 0) return null;

        const user = users[0];
        const updateUserQuery = 'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?';
        await db.query(updateUserQuery, [user.id]);
        return user;
    } catch (error) {
        console.error('Error in verifyUser:', error);
        throw error;
    }
}

async function loginUser(db, email, password) {
    try {
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(findUserQuery, [email]);
        if (users.length === 0) return { success: false, message: 'User not found.' };

        const user = users[0];
        if (!user.is_verified) return { success: false, message: 'Please verify your email before logging in.' };

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) return { success: false, message: 'Incorrect password.' };
        
        return { success: true, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
}

async function requestPasswordReset(db, email) {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        console.log(`Password reset requested for non-existent email: ${email}`);
        return; // Silently exit for security
    }
    const user = users[0];

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await db.query(
        'UPDATE users SET password_reset_token = ?, token_expires_at = ? WHERE id = ?',
        [hashedToken, tokenExpires, user.id]
    );

    await sendPasswordResetEmail(user.email, resetToken);
}

// --- NEW FUNCTION TO HANDLE THE ACTUAL PASSWORD RESET ---
async function resetPassword(db, token, newPassword) {
    try {
        // Hash the incoming token to find it in the database
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find the user by the token AND make sure the token has not expired
        const findUserQuery = 'SELECT * FROM users WHERE password_reset_token = ? AND token_expires_at > NOW()';
        const [users] = await db.query(findUserQuery, [hashedToken]);

        if (users.length === 0) {
            return { success: false, message: 'Password reset token is invalid or has expired.' };
        }
        const user = users[0];

        // Hash the new password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password and clear the reset token fields
        const updateUserQuery = 'UPDATE users SET password_hash = ?, password_reset_token = NULL, token_expires_at = NULL WHERE id = ?';
        await db.query(updateUserQuery, [password_hash, user.id]);

        return { success: true, message: 'Password has been reset successfully.' };

    } catch (error) {
        console.error('Error in resetPassword:', error);
        throw error;
    }
}

// --- EXPORT ALL FUNCTIONS ---
module.exports = {
    createUser,
    verifyUser,
    loginUser,
    requestPasswordReset,
    resetPassword // Export the new function
};
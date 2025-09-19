// user.js (Final Version - Accepts DB connection)

require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendVerificationEmail } = require('./emailService.js');

// NOTE: We have removed the database pool creation from this file.

async function createUser(db, username, email, password) { // Add username parameter
    try {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const verification_token = crypto.randomBytes(32).toString('hex');

        // Update the query to include the username column and value
        const query = 'INSERT INTO users (username, email, password_hash, verification_token) VALUES (?, ?, ?, ?)';
        const values = [username, email, password_hash, verification_token];
        
        const [result] = await db.query(query, values);
        
        sendVerificationEmail(email, verification_token);
return { success: true, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
}

async function verifyUser(db, token) { // 'db' is now passed in
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

async function loginUser(db, email, password) { // 'db' is now passed in
    try {
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(findUserQuery, [email]);
        if (users.length === 0) return { success: false, message: 'User not found.' };
        const user = users[0];
        if (!user.is_verified) return { success: false, message: 'Please verify your email before logging in.' };
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) return { success: false, message: 'Incorrect password.' };
        return { success: true, user: { id: user.id, email: user.email } };
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    verifyUser,
    loginUser
};
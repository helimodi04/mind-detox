// emailService.js

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Your existing function for sending verification emails
async function sendVerificationEmail(userEmail, token) {
    const verificationUrl = `${process.env.BASE_URL}/verify?token=${token}`;
    const mailOptions = {
        from: `Mind Detox <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Verify Your Email for Mind Detox',
        html: `
            <h1>Welcome to Mind Detox!</h1>
            <p>Thank you for signing up. Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}" style="background-color: #2B8282; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}


// --- NEW FUNCTION TO SEND THE PASSWORD RESET EMAIL ---
async function sendPasswordResetEmail(userEmail, token) {
    // This link should point to the page where the user will enter their new password
    const resetUrl = `${process.env.BASE_URL}/reset-password.html?token=${token}`;

    const mailOptions = {
        from: `Mind Detox <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Reset Your Password for Mind Detox',
        html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Click the link below to set a new password:</p>
            <a href="${resetUrl}" style="background-color: #2B8282; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}


// --- EXPORT BOTH FUNCTIONS ---
module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail // Add the new function to the exports
};
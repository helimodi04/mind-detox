// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a "transporter" - an object that can send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email from .env file
        pass: process.env.EMAIL_PASS  // Your email's App Password from .env file
    }
});

/**
 * Sends a verification email to a new user.
 * @param {string} userEmail - The email address to send the verification link to.
 * @param {string} token - The unique verification token for the user.
 */
function sendVerificationEmail(userEmail, token) {
    // Construct the verification URL that the user will click
    const verificationUrl = `http://localhost:3000/verify?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Verify Your Email for Mind Detox',
        html: `
            <h1>Welcome to Mind Detox!</h1>
            <p>Thank you for signing up. Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}" style="background-color: #2B8282; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If you did not sign up for this account, you can safely ignore this email.</p>
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}

module.exports = { sendVerificationEmail };
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
const { createUser, verifyUser, loginUser } = require('./user.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required.');
    }
    try {
        const newUser = await createUser(db, username, email, password);
        res.status(201).send({ message: 'User created! Please check your email to verify.', user: newUser });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Username or email already in use.');
        }
        res.status(500).send('Error creating user.');
    }
});

app.get('/verify', async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).send('Verification token is missing.');
    try {
        const user = await verifyUser(db, token);
        if (!user) return res.status(400).send('Invalid or expired verification token.');
        res.send('<h1>Email Verified Successfully!</h1><p>You can now close this tab and log in.</p>');
    } catch (error) {
        res.status(500).send('An error occurred during verification.');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required.');
    try {
        const result = await loginUser(db, email, password);
        if (result.success) {
            res.status(200).send({ message: 'Login successful!', user: result.user });
        } else {
            res.status(401).send(result.message);
        }
    } catch (error) {
        res.status(500).send('An error occurred during login.');
    }
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const systemPrompt = await fs.readFile("aura_prompt.txt", "utf-8");
        const API_KEY = process.env.GEMINI_API_KEY;
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
        const data = {
            contents: [{
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }]
            }]
        };
        const response = await axios.post(API_URL, data);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to communicate with the AI service.' });
    }
});

app.get('/api/health-data', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM chatbot_db.student_mental_health");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ message: 'Failed to retrieve data.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

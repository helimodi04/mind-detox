const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve everything in public folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("⚠️ GEMINI_API_KEY is not set in your .env file!");
    process.exit(1);
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

// Serve dashboard.html from root or public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Chatbot endpoint
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const systemPrompt = await fs.readFile("aura_prompt.txt", "utf-8");

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

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

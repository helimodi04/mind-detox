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
app.post('/analyze', async (req, res) => {
    try {
        const userAnswers = req.body;
        
        const systemPrompt = `Analyze the following user's answers to a mental health questionnaire. 
        Provide a mental health rating (0-100), a brief analysis of their current state, and 2-3 personalized suggestions for improvement.
        
        User's answers:
        Mood: ${userAnswers.mood}
        Thoughts: ${userAnswers.thoughts}
        
        Format the response as a single JSON object with the following keys:
        - mentalHealthRating (number)
        - analysis (string)
        - suggestions (array of strings)
        `;

        const data = {
            contents: [{
                role: "user",
                parts: [{ text: systemPrompt }]
            }]
        };

        const response = await axios.post(API_URL, data);
        
        const aiResponseText = response.data.candidates[0].content.parts[0].text;
        const aiResponseObject = JSON.parse(aiResponseText);

        res.json(aiResponseObject);

    } catch (error) {
        console.error('Error in /analyze endpoint:', error.message);
        res.status(500).json({ error: 'Failed to process analysis.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

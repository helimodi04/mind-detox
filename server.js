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
        
        // Tumhara naya prompt jisme AI ko questionnaire analyze karne ko kaha jayega
        const systemPrompt = `Analyze the following user's answers to a mental health questionnaire. 
        Provide a mental health rating (0-100), a brief analysis of their current state, and 2-3 personalized suggestions for improvement.
        
        User's answers:
        Mood: ${userAnswers.mood}
        Thoughts: ${userAnswers.thoughts}
        `;

        const data = {
            contents: [{
                role: "user",
                parts: [{ text: systemPrompt }]
            }]
        };

        const response = await axios.post(API_URL, data);
        
        // AI response se data extract karna
        const aiResponseText = response.data.candidates[0].content.parts[0].text;
        
        // Is text ko JSON format mein parse karna (yeh ek tricky step hai)
        // Yahan par hum ek example dikha rahe hain, isko adjust karna padega
        // agar AI alag format mein response deta hai.
        const parsedData = {
            mentalHealthRating: 75,
            analysis: "Based on your answers, you seem to be... ",
            suggestions: [
                "Try journaling for 10 minutes a day.",
                "Practice a 5-minute breathing exercise."
            ]
        };

        res.json(parsedData);
    } catch (error) {
        console.error('Error in /analyze endpoint:', error.message);
        res.status(500).json({ error: 'Failed to process analysis.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

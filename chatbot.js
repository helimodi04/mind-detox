document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chatbotForm");
    const input = document.getElementById("chatbotInput");
    const messages = document.getElementById("chatbotMessages");

    function addMessage(text, isUser = false) {
        const msg = document.createElement("div");
        msg.className = "chatbot-message" + (isUser ? " user" : "");
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function botReply(userText) {
        const text = userText.toLowerCase();
        let reply = "I'm here for you. Would you like to share more, or try a calming activity together?";

        if (/hello|hi|hey|good morning|good evening/.test(text)) {
            reply = "Hi there! 😊 I'm here to listen. How are you feeling right now?";
        } else if (/sad|upset|down|depressed|unhappy/.test(text)) {
            reply = "I'm really sorry you're feeling this way. It's okay to have tough days. Would you like a gentle affirmation or a breathing exercise?";
        } else if (/anxious|anxiety|nervous|worried|panic/.test(text)) {
            reply = "Anxiety can feel overwhelming. Let's try this: Inhale slowly for 4 seconds, hold, then exhale gently. Want to do a few rounds together?";
        } else if (/stress|stressed|overwhelmed|pressure/.test(text)) {
            reply = "Stress is tough, but you’re not alone. Would you like a calming quote or a quick mindfulness tip?";
        } else if (/happy|good|great|joy|excited/.test(text)) {
            reply = "That’s wonderful! Celebrate your happiness and remember this feeling. 😊";
        } else if (/angry|mad|frustrated/.test(text)) {
            reply = "It's okay to feel angry sometimes. If you want, we can try a calming technique together or just talk it out.";
        } else if (/tired|exhausted|sleepy|fatigue/.test(text)) {
            reply = "Rest is important. Maybe take a short break, stretch, or close your eyes for a moment. Would you like a gentle affirmation?";
        } else if (/thank|thanks|thank you/.test(text)) {
            reply = "You’re always welcome! 💙 I’m here whenever you need a little support.";
        } else if (/affirmation/.test(text)) {
            const affirmations = [
                "You are enough, just as you are.",
                "Every feeling is valid. You’re allowed to feel.",
                "You’re doing your best, and that’s enough.",
                "You have overcome so much already. Keep going!",
                "You are stronger than you think."
            ];
            reply = affirmations[Math.floor(Math.random() * affirmations.length)];
        } else if (/breathe|breathing|calm/.test(text)) {
            reply = "Let’s do a calming breath together: Inhale deeply... hold... and exhale slowly. How do you feel now?";
        } else if (/quote|motivation|inspire/.test(text)) {
            const quotes = [
                "This too shall pass.",
                "You don’t have to control your thoughts. Just stop letting them control you.",
                "Every day may not be good, but there is something good in every day.",
                "You are not alone. You are loved.",
                "Small steps every day lead to big changes."
            ];
            reply = quotes[Math.floor(Math.random() * quotes.length)];
        } else if (/alone|lonely/.test(text)) {
            reply = "You are not alone. I’m here for you, and there are people who care about you. Want to talk more?";
        } else if (/bye|goodbye|see you/.test(text)) {
            reply = "Take care! Remember, I’m always here if you need to talk or relax. 💙";
        }

        setTimeout(() => addMessage(reply), 700);
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;
        addMessage(userText, true);
        input.value = "";
        botReply(userText);
    });

    // Greet on open
    addMessage("Hi! I'm here for you. How are you feeling today?");

    // Floating button and popup logic
    const fab = document.getElementById("chatbot-fab");
    const popup = document.getElementById("chatbot");
    const closeBtn = document.getElementById("chatbot-close");

    fab.addEventListener("click", () => {
        popup.style.display = "flex";
        fab.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        fab.style.display = "flex";
    });
});
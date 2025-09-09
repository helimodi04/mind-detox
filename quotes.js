document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const getQuoteBtn = document.getElementById("getQuoteBtn");
    // Example: get mood from your mood tracker
    let currentMood = "calm"; // Replace with actual mood logic

    async function fetchQuote() {
        quoteText.textContent = "Loading...";
        quoteAuthor.textContent = "";
        try {
            let url = "https://api.quotable.io/random";
            // Optionally, filter by mood tag if your API supports it
            const res = await fetch(url);
            const data = await res.json();
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `— ${data.author}`;
        } catch (err) {
            const fallbackQuotes = [
                { content: "You are stronger than you think.", author: "Unknown", mood: "sad" },
                { content: "Keep going. Everything you need will come to you.", author: "Unknown", mood: "calm" },
                { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "happy" }
            ];
            const filtered = fallbackQuotes.filter(q => q.mood === currentMood);
            const random = filtered.length ? filtered[Math.floor(Math.random() * filtered.length)] : fallbackQuotes[0];
            quoteText.textContent = `"${random.content}"`;
            quoteAuthor.textContent = `— ${random.author}`;
        }
    }

    getQuoteBtn.addEventListener("click", fetchQuote);
    fetchQuote();
});

document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const getQuoteBtn = document.getElementById("getQuoteBtn");
    const moodSelector = document.getElementById("mood"); // Get the mood dropdown

    async function fetchQuote() {
        // Get the currently selected mood from the dropdown. Default to "calm" if nothing is selected.
        let currentMood = moodSelector.value || "calm";

        quoteText.textContent = "Loading...";
        quoteAuthor.textContent = "";

        try {
            // The API call remains the same
            const url = "https://api.quotable.io/random";
            const res = await fetch(url);

            // Check if the request was successful
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`); // This will trigger the catch block on API errors
            }

            const data = await res.json();
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `— ${data.author}`;
        } catch (err) {
            console.error("Failed to fetch quote, using fallback:", err); // Log the actual error to the console

            const fallbackQuotes = [
                { content: "You are stronger than you think.", author: "Unknown", mood: "sad" },
                { content: "Keep going. Everything you need will come to you.", author: "Unknown", mood: "calm" },
                { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "happy" },
                { content: "The best way out is always through.", author: "Robert Frost", mood: "anxious"},
                { content: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "angry"}
            ];

            // Now, this uses the REAL mood from the dropdown
            const filtered = fallbackQuotes.filter(q => q.mood === currentMood);

            // If a quote for the mood exists, pick it. Otherwise, pick a random one from the full list.
            const randomQuote = filtered.length 
                ? filtered[0] // If only one, pick it
                : fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]; // Pick any if mood not found

            quoteText.textContent = `"${randomQuote.content}"`;
            quoteAuthor.textContent = `— ${randomQuote.author}`;
        }
    }

    getQuoteBtn.addEventListener("click", fetchQuote);

    // Also fetch a new quote if the user changes their mood
    moodSelector.addEventListener("change", fetchQuote); 

    fetchQuote(); // Initial quote on page load
});
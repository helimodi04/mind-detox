document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const getQuoteBtn = document.getElementById("getQuoteBtn");
    const moodSelector = document.getElementById("mood"); // Get the mood dropdown

    // Fallback quotes available locally. Add or extend moods as needed.
    const fallbackQuotes = [
        { content: "You are stronger than you think.", author: "Unknown", mood: "sad" },
        { content: "It's okay to not be okay — healing takes time.", author: "Unknown", mood: "sad" },
        { content: "Keep going. Everything you need will come to you.", author: "Unknown", mood: "calm" },
        { content: "Find peace in the little things.", author: "Unknown", mood: "calm" },
        { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "happy" },
        { content: "Happiness often sneaks in through a door you didn't know you left open.", author: "John Barrymore", mood: "happy" },
        { content: "The best way out is always through.", author: "Robert Frost", mood: "anxious"},
        { content: "This too shall pass.", author: "Unknown", mood: "anxious" },
        { content: "Breathe. You are allowed to feel unsettled.", author: "Unknown", mood: "anxious" },
        { content: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "angry"},
        { content: "Anger is a sign that something needs attention.", author: "Unknown", mood: "angry" },
        { content: "Every day may not be good but there's something good in every day.", author: "Unknown", mood: "calm" },
        { content: "Small steps each day lead to big change.", author: "Unknown", mood: "motivated" },
        { content: "The quieter you become the more you can hear.", author: "Ram Dass", mood: "calm" },
        { content: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman", mood: "anxious" }
    ];

    // Track per-mood indices so fallback quotes rotate on each click
    const fallbackIndexes = {}; // { mood: nextIndex }
    let fallbackGlobalIndex = 0; // used when mood has no specific quotes

    function getFallbackQuote(currentMood) {
        if (!currentMood) currentMood = "calm";

        // Prefer mood-specific quotes but if there are fewer than 3 mood-specific
        // quotes, include general quotes (those without mood) or other moods to
        // increase variety.
        const moodSpecific = fallbackQuotes.filter(q => q.mood === currentMood);
        let pool = [];

        if (moodSpecific.length >= 3) {
            pool = moodSpecific;
        } else if (moodSpecific.length > 0) {
            // mix mood-specific with the whole pool to increase variety
            pool = [...moodSpecific, ...fallbackQuotes.filter(q => q.mood !== currentMood)];
        } else {
            // no mood-specific quotes, use full list
            pool = [...fallbackQuotes];
        }

        // initialize index for this mood if needed
        if (!(currentMood in fallbackIndexes)) fallbackIndexes[currentMood] = 0;

        const idx = fallbackIndexes[currentMood] % pool.length;
        const rawQuote = pool[idx];
        fallbackIndexes[currentMood] = fallbackIndexes[currentMood] + 1; // advance for next time

        // Ensure author exists
        const author = rawQuote.author && rawQuote.author.trim() ? rawQuote.author : "Unknown";
        return { content: rawQuote.content, author };
    }

    async function fetchQuote() {
        // Get the currently selected mood from the dropdown. Default to "calm" if nothing is selected.
        let currentMood = "calm";
        try {
            if (moodSelector && moodSelector.value) currentMood = moodSelector.value;
        } catch (e) {
            // ignore and use default
        }

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

            const randomQuote = getFallbackQuote(currentMood);

            quoteText.textContent = `"${randomQuote.content}"`;
            quoteAuthor.textContent = `— ${randomQuote.author}`;
        }
    }

    getQuoteBtn.addEventListener("click", fetchQuote);

    // Also fetch a new quote if the user changes their mood
    if (moodSelector) moodSelector.addEventListener("change", fetchQuote); 

    fetchQuote(); // Initial quote on page load
});
document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const getQuoteBtn = document.getElementById("getQuoteBtn");

    const quotes = [
        { content: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
        { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
        { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { content: "Success is what comes after you stop making excuses.", author: "Luis Galarza" },
        { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
        { content: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
        { content: "Stay away from those people who try to disparage your ambitions.", author: "Mark Twain" },
        { content: "Your limitation—it’s only your imagination.", author: "Unknown" },
        { content: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
        { content: "Dream it. Wish it. Do it.", author: "Unknown" }
    ];

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteText.textContent = `"${quote.content}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
    }

    getQuoteBtn.addEventListener("click", showRandomQuote);

    // Show one quote when the page loads
    showRandomQuote();
});

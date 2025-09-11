document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('questionnaireForm');
    const resultsDiv = document.getElementById('analysisResults');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const answers = {
            mood: form.mood.value,
            thoughts: form.thoughts.value
        };

        // User ko batane ke liye ki kaam ho raha hai
        resultsDiv.innerHTML = '<p>Analyzing your thoughts...</p>';

        try {
            const response = await fetch("https://mind-detox-2.onrender.com/analyze", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers)
            });

            const data = await response.json();

            // Display the results
            resultsDiv.innerHTML = `
                <h3>Mental Health Rating: ${data.mentalHealthRating}/100</h3>
                <p><strong>Analysis:</strong> ${data.analysis}</p>
                <p><strong>Suggestions:</strong></p>
                <ul>
                    ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultsDiv.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
        }
    });
});
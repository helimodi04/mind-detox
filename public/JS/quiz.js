const submitButton = document.querySelector('.submit-btn');
const resultContainer = document.getElementById('results');

function showPopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `<p>${message}</p><button onclick="this.parentElement.remove()">OK</button>`;
    document.body.appendChild(popup);
}

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const answers = [];
    for (let i = 1; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!answer) {
            showPopup("⚠️ Please answer all questions before submitting!");
            return;
        }
        answers.push(answer.value);
    }

    try {
        const response = await fetch('/analyze', {  // Use relative path!
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mood: answers[0],
                thoughts: answers[1]
            })
        });

        if (!response.ok) throw new Error("Server error. Try again later.");

        const data = await response.json();

        const ratingOutOf10 = (data.mentalHealthRating / 10).toFixed(1);

        let suggestionsHTML = '';
        data.suggestions.forEach(s => {
            suggestionsHTML += `<li>${s}</li>`;
        });

        resultContainer.innerHTML = `
            <div class="result-card fade-in">
                <h2>Your Score: ${ratingOutOf10} / 10</h2>
                <p>${data.analysis}</p>
                <ul>${suggestionsHTML}</ul>
                <button id="dashboardBtn" class="submit-btn">Go to Dashboard</button>
            </div>
        `;

        document.getElementById('dashboardBtn').addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });

    } catch (err) {
        showPopup(`😢 Analysis failed: ${err.message}`);
    }
});

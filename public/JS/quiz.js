const submitButton = document.querySelector('.submit-btn');
const resultContainer = document.getElementById('results');

function showPopup(message) {
    const existing = document.querySelector(".popup-message");
    if (existing) existing.remove();

    const popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `
        <p>${message}</p>
        <button id="closePopup">OK</button>
    `;
    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
        popup.remove();
    });
}

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const answers = {};
    for (let i = 1; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!answer) {
            showPopup("⚠️ Please answer all questions before submitting!");
            return;
        }
        answers[`q${i}`] = answer.value;
    }

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        const ratingOutOf10 = (data.mentalHealthRating / 10).toFixed(1);

        resultContainer.innerHTML = `
            <div class="result-card fade-in">
                <h2>Your Score: ${ratingOutOf10} / 10</h2>
                <p>${data.analysis}</p>
                <ul id="suggestions">
                    ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
                <button id="dashboardBtn" class="submit-btn">Go to Dashboard</button>
            </div>
        `;

        document.getElementById('dashboardBtn').addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });

    } catch (error) {
        console.error(error);
        showPopup("⚠️ Analysis failed! Please try again later.");
    }
});

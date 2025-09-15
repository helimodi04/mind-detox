const submitButton = document.querySelector('.submit-btn');
const resultContainer = document.getElementById('results');

function showPopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `<p>${message}</p><button onclick="this.parentElement.remove()">OK</button>`;
    document.body.appendChild(popup);
}

submitButton.addEventListener('click', (e) => {
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

    // Simple scoring
    let score = 0;
    answers.forEach(val => {
        if (["happy","never","rarely","not_really","talk","relax","hopeful","kind","happier","less_worried"].includes(val)) {
            score += 1;
        }
    });

    const rating = Math.round((score / 10) * 10);

    let analysis = "";
    if (rating >= 8) analysis = "🌟 You’re in a good mental space. Keep maintaining positivity.";
    else if (rating >= 5) analysis = "🙂 You’re doing okay, but there’s room for more self-care.";
    else analysis = "💙 Looks like you’ve been going through a tough time. Seek support if needed.";

    // Animate result container
    resultContainer.innerHTML = `
        <div class="result-card fade-in">
            <h2>Your Score: ${rating}/10</h2>
            <p>${analysis}</p>
            <button id="dashboardBtn" class="submit-btn">Go to Dashboard</button>
        </div>
    `;

    document.getElementById('dashboardBtn').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});

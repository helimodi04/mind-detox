const submitButton = document.getElementById('submitQuizBtn');
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

    let score = 0;
    answers.forEach((val) => {
        if (val === "happy" || val === "never" || val === "rarely" || val === "not_really" || val === "talk" || val === "relax" || val === "hopeful" || val === "kind" || val === "happier" || val === "less_worried") {
            score += 1;
        }
    });

    const rating = Math.round((score / 10) * 10);
    let analysis = "";
    if (rating >= 8) analysis = "🌟 You’re in a good mental space. Keep maintaining positivity and balance.";
    else if (rating >= 5) analysis = "🙂 You’re doing okay, but there’s room for more self-care and awareness.";
    else analysis = "💙 Looks like you’ve been going through a tough time. Don’t hesitate to share and seek support.";

    resultContainer.innerHTML = `
        <h2>Your Rating: ${rating}/10</h2>
        <p>${analysis}</p>
    `;
});

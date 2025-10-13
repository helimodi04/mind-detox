const submitButton = document.querySelector('.submit-btn');
// We don't need the old result container anymore
// const resultContainer = document.getElementById('results'); 
const quizContainer = document.querySelector('.quiz-container');

function showPopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `<p class="popup-text">${message}</p>
                       <button onclick="this.parentElement.remove()">OK</button>`;
    document.body.appendChild(popup);
}

submitButton.addEventListener('click', (e) => {
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

    // --- 1. GENERAL SCORING ---
    let score = 0;
    Object.values(answers).forEach((val) => {
        if (["happy", "never", "rarely", "not_really", "talk", "relax", "hopeful", "kind", "happier", "family", "media", "nature", "other"].includes(val)) {
            score++;
        }
    });

    // --- 2. DEFINE SUGGESTIONS LIST & ANALYSIS ---
    const specificSuggestions = [];
    let analysis = "";

    if (score >= 8) {
        analysis = "🌟 You’re in a good mental space. Keep maintaining positivity and balance.";
    } else if (score >= 5) {
        analysis = "🙂 You’re doing okay, but there’s room for more self-care and awareness.";
    } else {
        analysis = "💙 Looks like you’ve been going through a tough time. Don’t hesitate to share and seek support.";
    }
    
    // --- 3. SPECIFIC SUGGESTIONS LOGIC ---
    if (answers.q1 === 'worries') {
        specificSuggestions.push(`Talking about worries can make you feel better. Try sharing with the <a href="dashboard.html#chatbot">AI Chatbot</a>.`);
    } else if (answers.q1 === 'dont_notice') {
        specificSuggestions.push(`Noticing your thoughts is a great first step. Try writing them down in the <a href="dashboard.html#journal-writing">Private Journal</a>.`);
    }
    if (answers.q2 !== 'never') {
        specificSuggestions.push(`To help with overthinking, you can talk it out with the <a href="dashboard.html#chatbot">AI Chatbot</a> or listen to some calming music.`);
    }
    if (answers.q3 !== 'not_really') {
        specificSuggestions.push(`Keeping feelings inside can be tough. Try exploring and naming your feelings with the <a href="dashboard.html#mood-tracker">Mood Tracker</a>.`);
    }
    if (answers.q6 === 'distract') {
        specificSuggestions.push(`When stressed, finding a healthy way to calm down is important. Give the <a href="dashboard.html#breathing-circle">Guided Breathing</a> exercise a try.`);
    }
    if (answers.q8 !== 'hopeful') {
        specificSuggestions.push(`It's okay to feel unsure about the future. A <a href="dashboard.html#motivational-quote">Motivational Quote</a> might help you focus on enjoying the present moment.`);
    }
    if (answers.q9 === 'hard') {
        specificSuggestions.push(`Being kind to yourself is a skill. Let's start with a positive thought from the <a href="dashboard.html#motivational-quote">Motivational Quote</a> section.`);
    } else if (answers.q9 === 'dont_notice') {
        specificSuggestions.push(`To better understand your feelings, try tracking what makes you happy or sad each day with the <a href="dashboard.html#mood-tracker">Mood Tracker</a>.`);
    }
    if (score >= 8) {
        specificSuggestions.push(`🌟 It's wonderful that you're in such a positive space. Keep up the great work!`);
        specificSuggestions.push(`Keep nurturing this mindset by engaging with things that bring you joy and peace.`);
    }

    // --- 4. DISPLAY FINAL RESULTS IN THE POP-UP MODAL ---
    const resultModal = document.getElementById('result-modal');
    const resultModalContent = document.getElementById('result-modal-content');

    let suggestionsHTML = '';
    if (specificSuggestions.length > 0) {
        suggestionsHTML = `
            <h4>Here are some personalized suggestions:</h4>
            <ul>
                ${specificSuggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
            </ul>
        `;
    }

    // Inject the results into the modal
    resultModalContent.innerHTML = `
        <div class="result-card">
            <h2>Your Rating: ${score}/10</h2>
            <p>${analysis}</p>
            ${suggestionsHTML}
            <button id="dashboardBtn" class="submit-btn">Go to Dashboard</button>
        </div>
    `;
    
    // Show the modal
    resultModal.style.display = 'flex';

    // Make the "Go to Dashboard" button work from inside the modal
    document.getElementById('dashboardBtn').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
    // Make the new "Back to Quiz" button work
    document.getElementById('backToQuizBtn').addEventListener('click', () => {
        resultModal.style.display = 'none';
        // This line now works because quizContainer is defined
        quizContainer.style.display = 'block';
    });
});
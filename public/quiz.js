// NEW CODE FOR quiz.js

const submitButton = document.getElementById('submitQuiz');
const resultModal = document.getElementById('resultModal');
const ratingElement = document.getElementById('rating');
const analysisElement = document.getElementById('analysis');
const suggestionsElement = document.getElementById('suggestions');
const closeModalButton = document.querySelector('.close');
const dashboardButton = document.getElementById('dashboardButton');

// Ensure modal is hidden on page load
resultModal.style.display = 'none';

submitButton.addEventListener('click', async () => {
    const moodAnswer = document.querySelector('input[name="mood"]:checked');
    const thoughtsAnswer = document.querySelector('input[name="thoughts"]:checked');

    if (!moodAnswer || !thoughtsAnswer) {
        alert('Please answer all questions before submitting.');
        return;
    }

    const userAnswers = {
        mood: moodAnswer.value,
        thoughts: thoughtsAnswer.value
    };

    try {
        const response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAnswers)
        });

        // Agar server se response 'OK' nahi hai (e.g., error 500)
        if (!response.ok) {
            // Server se mila error message dikhao
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server mein kuch gadbad hai!');
        }

        const data = await response.json();
        
        // Rating ko 10 ke scale par convert karo
        const ratingOutOf10 = (data.mentalHealthRating / 10).toFixed(1);

        ratingElement.textContent = `Your Score: ${ratingOutOf10} / 10`;
        analysisElement.textContent = data.analysis;
        
        suggestionsElement.innerHTML = ''; // Purane suggestions clear karo
        data.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsElement.appendChild(li);
        });

        resultModal.style.display = 'block';

    } catch (error) {
        // Yeh sabse important part hai
        console.error('Fetch Error:', error);
        alert(`Analysis nahi ho paaya! 😢\nError: ${error.message}\n\nKya aapne terminal mein 'npm start' command chalaya hai?`);
    }
});

closeModalButton.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

dashboardButton.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

window.addEventListener('click', (event) => {
    if (event.target == resultModal) {
        resultModal.style.display = 'none';
    }
});
const circle = document.querySelector('.circle-animation');
const instruction = document.getElementById('breath-instruction');
let breathingInterval;
let breathingActive = false;

function toggleBreathing() {
    const btn = document.getElementById('breath-btn');
    if (!breathingActive) {
        startBreathing();
        btn.textContent = "Stop Breathing";
        breathingActive = true;
    } else {
        stopBreathing();
        btn.textContent = "Start Breathing";
        breathingActive = false;
    }
}

function startBreathing() {
    clearInterval(breathingInterval);

    // Initial state
    instruction.textContent = "Breathe In...";
    circle.style.transition = "transform 4s ease";
    circle.style.transform = "scale(1.2)";

    // Breathe In (4s), Hold (2s), Breathe Out (4s)
    let phase = 0;
    function animateBreath() {
        if (phase === 0) {
            instruction.textContent = "Breathe In...";
            circle.style.transition = "transform 4s ease";
            circle.style.transform = "scale(1.2)";
            phase = 1;
            breathingInterval = setTimeout(animateBreath, 4000);
        } else if (phase === 1) {
            instruction.textContent = "Hold...";
            circle.style.transition = "transform 2s ease";
            circle.style.transform = "scale(1.2)";
            phase = 2;
            breathingInterval = setTimeout(animateBreath, 2000);
        } else {
            instruction.textContent = "Breathe Out...";
            circle.style.transition = "transform 4s ease";
            circle.style.transform = "scale(1)";
            phase = 0;
            breathingInterval = setTimeout(animateBreath, 4000);
        }
    }
    animateBreath();
}

function stopBreathing() {
    clearTimeout(breathingInterval);
    circle.style.transition = "transform 1s ease";
    circle.style.transform = "scale(1)";
    instruction.textContent = "Get Ready...";
}


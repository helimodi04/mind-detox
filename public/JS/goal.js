document.addEventListener("DOMContentLoaded", () => {
    const setGoalBtn = document.getElementById("setScreenGoal");
    const slider = document.getElementById("screenSlider");
    const value = document.getElementById("screenValue");
    const goalStatus = document.getElementById("goalStatus");

    // Update slider value display
    if (slider && value) {
        slider.oninput = function() {
            value.textContent = `${this.value} hour${this.value == 1 ? '' : 's'}`;
        };
    }

    // Set goal button click
    if (setGoalBtn && slider) {
        setGoalBtn.addEventListener("click", () => {
            const goal = slider.value;
            localStorage.setItem("screenTimeGoal", goal);
            if (goalStatus) {
                goalStatus.textContent = `✅ Your screen time goal is set to ${goal} hour(s).`;
                goalStatus.style.color = "green";
            } else {
                alert(`Goal set! Try to keep your screen time under ${goal} hours today. 😊`);
            }
        });
    }

    // Load goal on page load
    const storedGoal = localStorage.getItem("screenTimeGoal");
    if (storedGoal && goalStatus) {
        goalStatus.textContent = `🎯 Your saved goal is ${storedGoal} hour(s).`;
        goalStatus.style.color = "blue";
    }
});

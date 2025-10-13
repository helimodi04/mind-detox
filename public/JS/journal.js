document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("journalEntry");
    const saveBtn = document.getElementById("saveJournal");
    const status = document.getElementById("journalStatus");

    // Load saved entry
    const saved = localStorage.getItem("journalEntry");
    if (saved) textarea.value = saved;

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("journalEntry", textarea.value);
        status.textContent = "Saved! 🌱";
        setTimeout(() => status.textContent = "", 2000);
    });
});
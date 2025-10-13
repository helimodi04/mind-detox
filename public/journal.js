function setupJournal() {
    const textarea = document.getElementById("journalEntry");
    const saveBtn = document.getElementById("saveJournal");
    const status = document.getElementById("journalStatus");

    if (!textarea || !saveBtn || !status) {
        console.error("Journal elements not found!");
        return;
    }

    const savedEntry = localStorage.getItem("journalEntry");
    if (savedEntry) {
        textarea.value = savedEntry;
    }

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("journalEntry", textarea.value);
        status.textContent = "Saved! 🌱";
        setTimeout(() => {
            status.textContent = "";
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', setupJournal);
window.addEventListener('pageshow', setupJournal);
const hamburger = document.querySelector('.hamburger');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('closeOverlay');

hamburger.addEventListener('click', () => {
    overlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
});

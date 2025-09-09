document.querySelectorAll('.mood-emoji').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.mood-emoji').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        // You can add logic here to update the chart or save the mood
    });
});
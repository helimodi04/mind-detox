// Sample data for moods and their percentage
const moodData = {
    labels: ['Happy', 'Sad', 'Anxious', 'Angry', 'Excited', 'Tired', 'Calm'],
    datasets: [{
        label: 'Mood Percentage',
        data: [40, 10, 15, 5, 20, 8, 2], // Example percentages, update as needed
        backgroundColor: [
            '#3ea3a3', // Happy
            '#2B8282', // Sad
            '#8ef4f4', // Anxious
            '#137373', // Angry
            '#379696', // Excited
            '#abf8f8', // Tired
            '#eaf6f6'  // Calm
        ],
        borderRadius: 8,
        borderWidth: 0
    }]
};

// Get context of the canvas element
const ctx = document.getElementById('moodChart').getContext('2d');

// Create bar chart
const moodChart = new Chart(ctx, {
    type: 'bar',
    data: moodData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                    color: '#3ea3a3',
                    font: { weight: 'bold' }
                },
                grid: { color: '#2B828244' },
                title: {
                    display: true,
                    text: 'Percentage',
                    color: '#3ea3a3',
                    font: { size: 16 }
                }
            },
            x: {
                ticks: {
                    color: '#3ea3a3',
                    font: { weight: 'bold' }
                },
                grid: { display: false },
                title: {
                    display: true,
                    text: 'Moods',
                    color: '#3ea3a3',
                    font: { size: 16 }
                }
            }
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Your Mood Chart',
                color: '#3ea3a3',
                font: { size: 18 }
            },
            tooltip: { enabled: true }
        }
    }
});

// Track mood counts
const moodCounts = {
    happy: 0,
    sad: 0,
    anxious: 0,
    angry: 0,
    excited: 0,
    tired: 0,
    calm: 0
};

// Listen for dropdown changes
document.getElementById('mood').addEventListener('change', function() {
    const selectedMood = this.value;
    if (selectedMood && moodCounts.hasOwnProperty(selectedMood)) {
        moodCounts[selectedMood]++;
        updateChart();
    }
});

// Update chart data and redraw
function updateChart() {
    const total = Object.values(moodCounts).reduce((a, b) => a + b, 0) || 1;
    moodChart.data.datasets[0].data = Object.values(moodCounts).map(count =>
        Math.round((count / total) * 100)
    );
    moodChart.update();
}

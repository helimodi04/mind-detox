// This event listener ensures that the script runs only after the entire HTML document has been loaded and parsed.
document.addEventListener("DOMContentLoaded", () => {
    
    // --- HAMBURGER MENU LOGIC ---
    // Select the necessary elements for the menu functionality.
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.querySelector('.drawer-close');

    // Check if all menu elements exist before adding event listeners.
    if (hamburger && drawer && closeBtn) {
        // When the hamburger icon is clicked, add the 'show' class to the drawer to make it visible.
        hamburger.addEventListener('click', () => {
            drawer.classList.add('show');
        });

        // When the close button is clicked, remove the 'show' class to hide the drawer.
        closeBtn.addEventListener('click', () => {
            drawer.classList.remove('show');
        });
    }


    // --- DATA VISUALIZATION LOGIC ---
    // This async function fetches data from the server and uses it to create a chart.
    async function fetchDataAndCreateChart() {
        try {
            // 1. Fetch data from the API endpoint we created on the server.
            const response = await fetch('/api/health-data');

            // Check if the network response was successful.
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // 2. Parse the JSON data from the response.
            const studentsData = await response.json();
            
            console.log(studentsData); // <-- YEH NAYI LINE ADD KAREIN
            // 3. Process the data to get the counts needed for the chart.
            let anxietyCount = 0;
let noAnxietyCount = 0;

studentsData.forEach(student => {
    // Convert anxiety value from string to a number
    const anxietyLevel = Number(student.anxiety);

    // If level is 3, 4, or 5 (greater than 2), it's 'With Anxiety'
    if (anxietyLevel > 2) {
        anxietyCount++;
    } else { // Levels 1 and 2 will be counted here as 'Without Anxiety'
        noAnxietyCount++;
    }
});

            // 4. Get the 2D rendering context for the canvas element from our HTML.
            const ctx = document.getElementById('anxietyChart').getContext('2d');

            // 5. Create the chart using the Chart.js library.
            new Chart(ctx, {
                type: 'bar', // Defines the type of chart.
                data: {
                    labels: ['Students with Anxiety', 'Students without Anxiety'],
                    datasets: [{
                        label: 'Number of Students',
                        data: [anxietyCount, noAnxietyCount], // The processed data from our API.
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)', // A semi-transparent red for "with Anxiety".
                            'rgba(75, 192, 192, 0.5)'  // A semi-transparent teal for "without Anxiety".
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Ensures the Y-axis starts at 0.
                        }
                    },
                    responsive: true, // Makes the chart responsive to screen size changes.
                    plugins: {
                        legend: {
                            display: false // Hides the legend as it's not needed for this simple chart.
                        },
                        title: {
                            display: true,
                            text: 'Anxiety Levels in Students' // Sets a title for the chart.
                        }
                    }
                }
            });

        } catch (error) {
            console.error("Could not fetch data or create chart:", error);
        }
    }

    // Call the function to fetch data and generate the chart when the page loads.
    fetchDataAndCreateChart();

});
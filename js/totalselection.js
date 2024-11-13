// Fetch total bhaji selections from Firestore and display them
function fetchBhajiSelections() {
    // Create an object to keep track of the bhaji counts
    const bhajiCounts = {
        bhaji1: 0,
        bhaji2: 0,
        bhaji3: 0,
        bhaji4: 0, // Add more bhaji types if needed
        // ... more bhajis
    };

    // Fetch all subscriptions from Firestore
    firebase.firestore().collection('subscriptions').get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.selectedBhajis && Array.isArray(data.selectedBhajis)) {
                    // Count each bhaji selected by the user
                    data.selectedBhajis.forEach(bhaji => {
                        if (bhajiCounts[bhaji] !== undefined) {
                            bhajiCounts[bhaji]++;
                        }
                    });
                }
            });

            // Display the bhaji counts
            displayBhajiCounts(bhajiCounts);
        })
        .catch((error) => {
            console.error("Error fetching bhaji selections: ", error);
        });
}

// Display bhaji counts in the HTML
function displayBhajiCounts(bhajiCounts) {
    const bhajiStatsDiv = document.getElementById('bhaji-stats');
    
    // Clear existing content
    bhajiStatsDiv.innerHTML = '';

    // Loop through the bhajiCounts and display them
    for (let bhaji in bhajiCounts) {
        const count = bhajiCounts[bhaji];
        const bhajiDiv = document.createElement('div');
        bhajiDiv.classList.add('bhaji-stats-item');
        bhajiDiv.innerHTML = `<strong>${bhaji}:</strong> ${count} selections`;
        bhajiStatsDiv.appendChild(bhajiDiv);
    }
}

// Call the fetch function on page load
window.onload = fetchBhajiSelections;

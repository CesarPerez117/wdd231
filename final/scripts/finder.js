// Wait until the DOM (HTML structure) is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    const dishSelect = document.getElementById("dish");
    const locationSelect = document.getElementById("location");

    // Fetch dish data from dishes.json and populate the "Dish" dropdown
    fetch("./data/dishes.json")
        .then(response => response.json())
        .then(dishes => {
            // Extract unique dish names
            const dishNames = [...new Set(dishes.map(d => d.name))];
            // Create <option> elements for each dish
            dishNames.forEach(name => {
                const option = document.createElement("option");
                option.value = name.toLowerCase(); // value stored in lowercase
                option.textContent = name;         // text shown to the user
                dishSelect.appendChild(option);
            });
        });

    // Fetch restaurant data from restaurants.json and populate the "Location" dropdown
    fetch("./data/restaurants.json")
        .then(response => response.json())
        .then(restaurants => {
            // Extract unique locations
            const locations = [...new Set(restaurants.map(r => r.location))];
            // Create <option> elements for each location
            locations.forEach(loc => {
                const option = document.createElement("option");
                option.value = loc.toLowerCase(); // value stored in lowercase
                option.textContent = loc;         // text shown to the user
                locationSelect.appendChild(option);
            });
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("finder-form");
    const resultsDiv = document.getElementById("results");

    // Initialize Leaflet map centered on Santo Domingo
    const map = L.map('map').setView([18.4861, -69.9312], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        // Get selected values from the form
        const dish = document.getElementById("dish").value.toLowerCase();
        const location = document.getElementById("location").value.toLowerCase();
        const style = document.getElementById("style").value;

        // Show a message while processing
        resultsDiv.innerHTML = "<p>Searching...</p>";

        // Remove previous markers from the map
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) map.removeLayer(layer);
        });

        // Fetch restaurant data and filter based on user input
        fetch("./data/restaurants.json")
            .then(response => response.json())
            .then(restaurants => {
                const filtered = restaurants.filter(r =>
                    r.dishes.some(d => d.toLowerCase().includes(dish)) && // match dish
                    r.location.toLowerCase().includes(location) &&        // match location
                    r.style.toLowerCase() === style.toLowerCase()         // match style
                );

                if (filtered.length > 0) {
                    // Display restaurant cards with details
                    resultsDiv.innerHTML = filtered.map(r => `
                        <div class="finder-card">
                          <h3>${r.name}</h3>
                          <p><strong>Location:</strong> ${r.location}</p>
                          <p><strong>Style:</strong> ${r.style}</p>
                          <p><strong>Specialties:</strong> ${r.dishes.join(", ")}</p>
                          <p><strong>Hours:</strong> ${r.hours}</p>
                        </div>
                    `).join("");

                    // Add markers for each restaurant on the map
                    filtered.forEach(r => {
                        L.marker([r.lat, r.lng]).addTo(map)
                            .bindPopup(`<b>${r.name}</b><br>${r.location}<br>${r.hours}`);
                    });

                    // Center the map on the first matching restaurant
                    map.setView([filtered[0].lat, filtered[0].lng], 14);
                } else {
                    // Show message if no restaurants match the filters
                    resultsDiv.innerHTML = "<p>No restaurants found. Try different filters.</p>";
                }
            })
            .catch(error => {
                // Handle errors (e.g., JSON file not found or invalid)
                console.error("Error loading restaurants:", error);
                resultsDiv.innerHTML = "<p>Error loading data.</p>";
            });
    });
});
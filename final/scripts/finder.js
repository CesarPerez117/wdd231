

document.addEventListener("DOMContentLoaded", () => {
    const dishSelect = document.getElementById("dish");
    const locationSelect = document.getElementById("location");

    fetch("data/dishes.json")
        .then(response => response.json())
        .then(dishes => {
            const dishNames = [...new Set(dishes.map(d => d.name))];
            dishNames.forEach(name => {
                const option = document.createElement("option");
                option.value = name.toLowerCase();
                option.textContent = name;
                dishSelect.appendChild(option);
            });
        });

    fetch("data/restaurants.json")
        .then(response => response.json())
        .then(restaurants => {
            const locations = [...new Set(restaurants.map(r => r.location))];
            locations.forEach(loc => {
                const option = document.createElement("option");
                option.value = loc.toLowerCase();
                option.textContent = loc;
                locationSelect.appendChild(option);
            });
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("finder-form");
    const resultsDiv = document.getElementById("results");

    const map = L.map('map').setView([18.4861, -69.9312], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const dish = document.getElementById("dish").value.toLowerCase();
        const location = document.getElementById("location").value.toLowerCase();
        const style = document.getElementById("style").value;

        resultsDiv.innerHTML = "<p>Searching...</p>";

        map.eachLayer(layer => {
            if (layer instanceof L.Marker) map.removeLayer(layer);
        });

        fetch("./data/restaurants.json")
            .then(response => response.json())
            .then(restaurants => {
                const filtered = restaurants.filter(r =>
                    r.dishes.some(d => d.toLowerCase().includes(dish)) &&
                    r.location.toLowerCase().includes(location) &&
                    r.style === style
                );

                if (filtered.length > 0) {
                    resultsDiv.innerHTML = filtered.map(r => `
                        <div class="finder-card">
                          <h3>${r.name}</h3>
                          <p><strong>Location:</strong> ${r.location}</p>
                          <p><strong>Style:</strong> ${r.style}</p>
                          <p><strong>Specialties:</strong> ${r.dishes.join(", ")}</p>
                          <p><strong>Hours:</strong> ${r.hours}</p>
                        </div>
                    `).join("");

                    filtered.forEach(r => {
                        L.marker([r.lat, r.lng]).addTo(map)
                            .bindPopup(`<b>${r.name}</b><br>${r.location}<br>${r.hours}`);
                    });

                    map.setView([filtered[0].lat, filtered[0].lng], 14);
                } else {
                    resultsDiv.innerHTML = "<p>No restaurants found. Try different filters.</p>";
                }
            })
            .catch(error => {
                console.error("Error loading restaurants:", error);
                resultsDiv.innerHTML = "<p>Error loading data.</p>";
            });
    });
});


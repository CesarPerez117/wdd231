const apiKey = "d74061a11429483e21b51e27c16c2eb9";
const city = "Santo Domingo"; 

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    const response = await fetch(url);
    const data = await response.json();

    const todayData = data.list[0];
    document.getElementById("current-temp").textContent = `${todayData.main.temp.toFixed(1)} °C`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${todayData.weather[0].icon}@2x.png`;
    document.getElementById("weather-desc").textContent = todayData.weather[0].description;
    document.getElementById("humidity").textContent = todayData.main.humidity;

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    [8, 16, 24].forEach((i, idx) => {
      const fData = data.list[i];
      const date = new Date(fData.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const card = document.createElement("div");
      card.className = "forecast-day";
      card.innerHTML = `
        <h3>${dayName}</h3>
        <img src="https://openweathermap.org/img/wn/${fData.weather[0].icon}@2x.png" alt="icono clima">
        <p>${fData.main.temp.toFixed(1)} °C</p>
        <p>${fData.weather[0].description}</p>
      `;
      forecastContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando clima:", err);
  }
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/directory.json");
    const members = await response.json();

    const goldMembers = members.filter(m => m.membership === 3 || m.membership === 2);

    const selected = goldMembers.sort(() => 0.5 - Math.random()).slice(0, 2);

    const container = document.querySelector("#spotlight-container");
    container.innerHTML = "";

    selected.forEach(m => {
      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.innerHTML = `
        <h3>${m.name}</h3>
        <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
        <p><strong>Tel:</strong> ${m.phone}</p>
        <p><strong>Dirección:</strong> ${m.address}</p>
        <p><a href="${m.website}" target="_blank">Visitar sitio</a></p>
        <p class="membership-level">Gold Member</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando spotlights:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  loadSpotlights();
});
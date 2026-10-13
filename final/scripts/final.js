
// Hamburger Menu 
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
        menuToggle.classList.toggle("active"); // activa animación a X
    });
});

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// Last Modified
document.getElementById("lastModified").textContent = document.lastModified;


// Dishes cards injection
document.addEventListener("DOMContentLoaded", () => {
    const dishesGrid = document.getElementById("dishes-grid");

    fetch("data/dishes.json")
        .then(response => response.json())
        .then(dishes => {
            dishes.forEach(dish => {
                const card = document.createElement("div");
                card.classList.add("dish-card");

                card.innerHTML = `
            <img src="${dish.image}" alt="${dish.alt}" loading="lazy">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
        `;


                dishesGrid.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading dishes:", error));
});

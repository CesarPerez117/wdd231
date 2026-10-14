// Hamburger Menu 
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
});

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// Last Modified
document.getElementById("lastModified").textContent = document.lastModified;

// Dishes cards + modals injection
document.addEventListener("DOMContentLoaded", () => {
  const dishesGrid = document.getElementById("dishes-grid");
  const modalsContainer = document.getElementById("dish-modals");

  fetch("data/dishes.json")
    .then(response => response.json())
    .then(dishes => {

      const isHomePage = !modalsContainer;

      let dishesToShow = dishes;

      if (isHomePage) {
        // Shuffle array
        dishesToShow = dishes.sort(() => 0.5 - Math.random());
        // Limit to 4
        dishesToShow = dishesToShow.slice(0, 4);
      }

      dishesToShow.forEach(dish => {
        const card = document.createElement("div");
        card.classList.add("dish-card");
        card.innerHTML = `
          <img src="${dish.image}" alt="${dish.alt}" loading="lazy">
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          ${!isHomePage && dish.ingredients ? `<button class="cta" data-dish="${dish.name}">View Recipe</button>` : ""}
        `;
        dishesGrid.appendChild(card);
      });

      if (!isHomePage) {
        dishes.forEach(dish => {
          if (dish.ingredients) {
            const modal = document.createElement("dialog");
            modal.id = `modal-${dish.name.replace(/\s+/g, '-')}`;
            modal.innerHTML = `
              <h2>${dish.name}</h2>
              <div class="modal-content">
                <p><strong>Cultural Meaning:</strong> ${dish.culturalMeaning}</p>
                
                <h3>Ingredients</h3>
                <ul>${dish.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                
                <h3>Preparation Steps</h3>
                <ol>${dish.steps.map(s => `<li>${s}</li>`).join('')}</ol>
                
                <h3>Fun Facts</h3>
                <ul>${dish.funFacts.map(f => `<li>${f}</li>`).join('')}</ul>
              </div>
              <button class="cta close-modal">Close</button>
            `;
            modalsContainer.appendChild(modal);

            const button = document.querySelector(`[data-dish="${dish.name}"]`);
            if (button) {
              button.addEventListener("click", () => modal.showModal());
              modal.querySelector(".close-modal").addEventListener("click", () => modal.close());
            }
          }
        });
      }
    })
    .catch(error => console.error("Error loading dishes:", error));
});



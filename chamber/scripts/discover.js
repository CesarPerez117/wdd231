import { items } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  const lastModifiedEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      hamburger.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const visitMessageEl = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (visitMessageEl) {
    if (lastVisit) {
      const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      let message = "";
      if (days < 1) {
        message = "Back so soon! Awesome.";
      } else if (days < 7) {
        message = `Welcome back! You visited ${days} day(s) ago.`;
      } else {
        message = "It’s been a while! Discover what’s new.";
      }
      visitMessageEl.textContent = message;
    } else {
      visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    }
  }

  localStorage.setItem("lastVisit", now);

  const grid = document.querySelector(".discover-grid");

  if (grid) {
    items.forEach((item, index) => {
      const card = document.createElement("section");
      card.classList.add("discover-card", `card${index + 1}`);

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
        </figure>
        <p>${item.description}</p>
        <hr>
        <p><strong>Address:</strong> ${item.address}</p>
        <button>Learn More</button>
        `;


      grid.appendChild(card);
    });
  }
});
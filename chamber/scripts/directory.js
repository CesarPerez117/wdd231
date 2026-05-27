const membersContainer = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
    try {
        const response = await fetch("data/directory.json");
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong></strong> ${member.address}</p>
            <p><strong></strong> ${member.phone}</p>
            <p><strong></strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership:</strong> ${getLevel(member.membership)}</p>
        `;

        membersContainer.appendChild(card);
    });
}

function getLevel(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        default: return "Member";
    }
}

gridBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
});

getMembers();
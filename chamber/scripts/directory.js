/* Directory JS: fetch data, render grid/list, toggle nav */
document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.querySelector('#members');
  const gridBtn = document.querySelector('#grid');
  const listBtn = document.querySelector('#list');
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  const yearEl = document.getElementById('year');
  const lastModifiedEl = document.getElementById('lastModified');

  yearEl.textContent = new Date().getFullYear();
  lastModifiedEl.textContent = document.lastModified;

  // Fetch and render members
  async function getMembers() {
    try {
      const res = await fetch('data/directory.json');
      if (!res.ok) throw new Error('Failed to load members');
      const data = await res.json();
      displayMembers(data);
    } catch (err) {
      membersContainer.innerHTML = '<p>Unable to load members at this time.</p>';
      console.error(err);
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = '';
    members.forEach(member => {
      const section = document.createElement('article');
      section.className = 'member';

      // membership badge color
      let badgeColor = 'var(--blue)';
      if (member.membership === 3) badgeColor = 'var(--orange)';
      else if (member.membership === 2) badgeColor = 'var(--silver)';

      section.innerHTML = `
        <img class="logo" src="images/${member.image}" alt="${member.name} logo">
        <div class="info">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        </div>
        <div class="badge" style="background:${badgeColor};">${member.membership === 3 ? 'Gold' : member.membership === 2 ? 'Silver' : 'Member'}</div>
      `;

      membersContainer.appendChild(section);
    });
  }

  // View toggles
  gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  });

  listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
  });

  // Hamburger toggle (adds/removes .open on nav)
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Initialize default view
  membersContainer.classList.add('grid');
  gridBtn.setAttribute('aria-pressed', 'true');

  getMembers();
});

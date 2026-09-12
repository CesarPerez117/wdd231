const hamBtn = document.getElementById('ham-btn');
const nav = document.querySelector('nav');

hamBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamBtn.classList.toggle('open');

  const expanded = hamBtn.classList.contains('open');
  hamBtn.setAttribute('aria-expanded', expanded);
});
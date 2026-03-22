const hero = document.querySelector('[data-event-date]');
const countdownEl = document.getElementById('countdown');
const nav = document.getElementById('nav');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Nav background change
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('backdrop-blur-md', window.scrollY > 24);
  nav.classList.toggle('bg-black/50', window.scrollY > 24);
});

// Mobile menu
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Countdown
if (hero && countdownEl) {
  const target = new Date(hero.dataset.eventDate);
  const updateCountdown = () => {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      countdownEl.textContent = '¡Hoy celebramos!';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Fade-up animation without extra libs
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-reveal]').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-6', 'transition', 'duration-700');
  observer.observe(el);
});

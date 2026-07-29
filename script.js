document.addEventListener('DOMContentLoaded', () => {
  // Fade in the main content once the page is ready
  const revealTargets = document.querySelectorAll('h1, p, h2, .video-item');
  revealTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    // slight stagger so elements don't all pop in at once
    setTimeout(() => el.classList.add('is-visible'), 80 * i);
  });

  // Hover glow: track the cursor position inside each video card and
  // feed it to CSS as --x / --y, so the glow follows the mouse instead
  // of just lighting up from a fixed point. The actual light-up/fade
  // is handled by CSS on :hover; this just aims it.
  const videoItems = document.querySelectorAll('.video-item');
  videoItems.forEach((item) => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      item.style.setProperty('--x', `${x}px`);
      item.style.setProperty('--y', `${y}px`);
    });
  });
});

// Subtle parallax: the starfield drifts a little as the mouse moves,
// giving the background a sense of depth. Disabled for users who
// prefer reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const maxShift = 18; // px of drift in any direction

  window.addEventListener('mousemove', (event) => {
    const xRatio = event.clientX / window.innerWidth - 0.5;
    const yRatio = event.clientY / window.innerHeight - 0.5;

    const shiftX = 50 + xRatio * (maxShift / window.innerWidth) * 100;
    const shiftY = 50 + yRatio * (maxShift / window.innerHeight) * 100;

    document.body.style.backgroundPosition = `${shiftX}% ${shiftY}%`;
  });
}
// Moonies Squad password gate — deterrent only, not real security.
// Change SQUAD_PASSWORD to whatever you want the password to be.
const SQUAD_PASSWORD = "Alchocoden";

const squadLock = document.getElementById('squadLock');
const squadContent = document.getElementById('squadContent');
const squadPasswordInput = document.getElementById('squadPassword');
const squadSubmitBtn = document.getElementById('squadSubmit');
const squadError = document.getElementById('squadError');

function unlockSquad() {
  squadLock.hidden = true;
  squadContent.hidden = false;
  sessionStorage.setItem('squadUnlocked', 'true');
}

function tryUnlock() {
  if (squadPasswordInput.value === SQUAD_PASSWORD) {
    unlockSquad();
  } else {
    squadError.textContent = "That's not it — try again.";
    squadPasswordInput.value = '';
  }
}

if (squadSubmitBtn) {
  squadSubmitBtn.addEventListener('click', tryUnlock);
  squadPasswordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') tryUnlock();
  });

  // Stay unlocked for the rest of this browser tab session
  if (sessionStorage.getItem('squadUnlocked') === 'true') {
    unlockSquad();
  }
}
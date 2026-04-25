/* BOOT */
const BOOT_LINES = [
  '> Initializing RV.DEV Website portfolio...',
  '> Loading modules: [Html] [CSS] [JS]',
  '> Connecting Spline runtime...',
  '> Calibrating robot systems...',
  '> Authenticating: VALENCIA_RHALF...',
  '> Status: ALL SYSTEMS OPERATIONAL',
  '> Launching...',
];

let li = 0;
const bootLinesEl = document.getElementById('bootLines');
const bootBar = document.getElementById('bootBar');
const bootPct = document.getElementById('bootPct');
const boot = document.getElementById('boot');

const lineIv = setInterval(() => {
  if (li < BOOT_LINES.length) {
    const d = document.createElement('div');
    d.className = 'boot-line';
    d.textContent = BOOT_LINES[li];
    bootLinesEl.appendChild(d);
    if (li > 0) bootLinesEl.children[li - 1].classList.remove('active');
    d.classList.add('active');
    li++;
  } else clearInterval(lineIv);
}, 320);

let pct = 0;
const barIv = setInterval(() => {
  pct += 2;
  bootBar.style.width = pct + '%';
  bootPct.textContent = pct + '%';
  if (pct >= 100) {
    clearInterval(barIv);
    setTimeout(() => {
      boot.classList.add('hidden');
      setTimeout(() => boot.remove(), 800);
    }, 400);
  }
}, 40);

/* NAV SCROLL */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ACTIVE SECTION */
const sections = ['about','skills','projects','experience','contact'];
const navAs = document.querySelectorAll('.nav-pill a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-pill a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(id => { const el = document.getElementById(id); if (el) sectionObs.observe(el); });

/* REVEAL ON SCROLL */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* JOURNEY ITEMS */
const journeyObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 200);
      journeyObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.journey-item').forEach(el => journeyObs.observe(el));

/* THEME TOGGLE */
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('rv-theme') || 'dark';
if (savedTheme === 'light') root.classList.add('light');
toggleBtn.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('rv-theme', isLight ? 'light' : 'dark');
});

/* CAROUSEL */
(function() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track) return;

  const slides = track.querySelectorAll('.proj-carousel-slide');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'proj-carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.proj-carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
})();
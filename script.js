// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
  });

  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in on scroll (kept from previous version, in case sections use .fade-in)
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));
}

// Mouse-parallax for hero decorative elements (sticky note, currently box, dots)
const frame = document.querySelector('.image-frame');
const parallaxItems = document.querySelectorAll('.parallax-item');

if (frame && parallaxItems.length && window.matchMedia('(hover: hover)').matches) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      parallaxItems.forEach(item => {
        const depth = parseFloat(item.dataset.depth) || 0.5;
        const moveX = x * depth * 40; // tweak 40 for stronger/weaker drift
        const moveY = y * depth * 40;

        gsap.to(item, {
          x: moveX,
          y: moveY,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });
    });

    frame.addEventListener('mouseleave', () => {
      parallaxItems.forEach(item => {
        gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }
}
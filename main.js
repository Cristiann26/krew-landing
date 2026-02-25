/* ═══════════════════════════════════════════════
   Krew Analytics Landing — Interactions
   ═══════════════════════════════════════════════ */

// ─── Scroll Reveal ─────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ─── Sticky Nav ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile Nav Toggle ─────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ─── FAQ Accordion ─────────────────────────
document.querySelectorAll('[data-faq-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const item = btn.closest('[data-faq]');
        const isOpen = item.classList.contains('open');

        // Close all others
        document.querySelectorAll('[data-faq].open').forEach((other) => {
            if (other !== item) other.classList.remove('open');
        });

        item.classList.toggle('open', !isOpen);
    });
});

// ─── Smooth scroll for anchor links ────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── Loom Video Facade (lazy-load) ─────────
const loomFacade = document.getElementById('loomFacade');
const videoContainer = document.getElementById('videoContainer');

if (loomFacade && videoContainer) {
    const loadVideo = () => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.loom.com/embed/7787b69245804ead9c735204ae4de544?autoplay=1';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('webkitallowfullscreen', '');
        iframe.setAttribute('mozallowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        loomFacade.remove();
        videoContainer.appendChild(iframe);
    };
    loomFacade.addEventListener('click', loadVideo);
    loomFacade.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') loadVideo();
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuOpen(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

// Smooth scroll for in-page anchors (respects reduced motion)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = href !== '#' ? document.querySelector(href) : null;
        if (!target) return;

        e.preventDefault();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .class-card, .highlight-item, .info-item').forEach(element => {
    observer.observe(element);
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
const updateNavbar = () => {
    navbar.style.boxShadow = window.scrollY > 50
        ? '0 5px 20px rgba(157, 78, 221, 0.2)'
        : 'none';
};

// Active section in navigation
const sections = document.querySelectorAll('section[id]');

const updateActiveNav = () => {
    let current = 'hero';
    const offset = window.scrollY + 120;

    sections.forEach(section => {
        if (offset >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
    });
};

const onScroll = () => {
    updateNavbar();
    updateActiveNav();
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        setMenuOpen(false);
    }
});

// Button ripple effect
const buttons = document.querySelectorAll('.btn, .btn-icon, .social-btn');

if (!document.querySelector('style[data-ripple]')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.setAttribute('data-ripple', 'true');
    rippleStyle.textContent = `
        .card, .class-card, .highlight-item, .info-item {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .card.is-visible, .class-card.is-visible,
        .highlight-item.is-visible, .info-item.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
            .card, .class-card, .highlight-item, .info-item {
                opacity: 1;
                transform: none;
                transition: none;
            }
            .hero-img {
                animation: none !important;
            }
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const siteHeader = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const enrollForm = document.getElementById('enrollForm');

function setMenuOpen(open) {
    mainNav.classList.toggle('is-open', open);
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => {
    setMenuOpen(!mainNav.classList.contains('is-open'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenuOpen(false);
});

function updateHeader() {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 60);
}

function updateActiveNav() {
    const offset = window.scrollY + 140;
    let current = 'inicio';

    document.querySelectorAll('main section[id]').forEach((section) => {
        if (offset >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', () => {
    updateHeader();
    updateActiveNav();
}, { passive: true });

updateHeader();
updateActiveNav();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        const target = href !== '#' ? document.querySelector(href) : null;
        if (!target) return;

        e.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document
    .querySelectorAll(
        '.audience-card, .feature-list li, .modality-list li, .stat, .enroll-form, .social-card, .event-card, .video-card'
    )
    .forEach((el) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('fieldNome').value.trim();
        const telefone = document.getElementById('fieldTelefone').value.trim();
        const email = document.getElementById('fieldEmail').value.trim();
        const faixa = document.getElementById('fieldFaixa').value;

        const lines = [
            'Olá Dance Fusion! Quero inscrever-me.',
            '',
            `Nome: ${nome}`,
            `Telefone: ${telefone}`,
            faixa ? `Faixa etária: ${faixa}` : '',
            email ? `Email: ${email}` : '',
        ].filter(Boolean);

        const text = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/351934309236?text=${text}`, '_blank', 'noopener,noreferrer');
    });
}

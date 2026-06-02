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

function isMobileViewport() {
    return window.matchMedia('(max-width: 992px)').matches;
}

function initEventCarousels() {
    document.querySelectorAll('[data-event-carousel]').forEach((carousel) => {
        const track = carousel.querySelector('.event-carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.event-carousel-slide'));
        const prevBtn = carousel.querySelector('.event-carousel-btn--prev');
        const nextBtn = carousel.querySelector('.event-carousel-btn--next');
        const dotsWrap = carousel.querySelector('.event-carousel-dots');
        if (!track || slides.length < 2 || !dotsWrap) return;

        let index = slides.findIndex((s) => s.classList.contains('is-active'));
        if (index < 0) index = 0;

        const dots = slides.map((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'event-carousel-dot' + (i === index ? ' is-active' : '');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Cartaz ${i + 1} de ${slides.length}`);
            dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
            return dot;
        });

        function goTo(nextIndex) {
            index = (nextIndex + slides.length) % slides.length;
            track.style.transform = `translateX(-${index * 100}%)`;
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === index);
                dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

        let touchStartX = 0;
        let touchDeltaX = 0;

        carousel.addEventListener(
            'touchstart',
            (e) => {
                if (!isMobileViewport()) return;
                touchStartX = e.changedTouches[0].screenX;
                touchDeltaX = 0;
            },
            { passive: true }
        );
        carousel.addEventListener(
            'touchmove',
            (e) => {
                if (!isMobileViewport()) return;
                touchDeltaX = e.changedTouches[0].screenX - touchStartX;
            },
            { passive: true }
        );
        carousel.addEventListener(
            'touchend',
            () => {
                if (!isMobileViewport()) return;
                if (Math.abs(touchDeltaX) < 40) return;
                if (touchDeltaX < 0) goTo(index + 1);
                else goTo(index - 1);
            },
            { passive: true }
        );

        carousel.addEventListener('keydown', (e) => {
            if (!isMobileViewport()) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goTo(index - 1);
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goTo(index + 1);
            }
        });
        carousel.setAttribute('tabindex', isMobileViewport() ? '0' : '-1');
    });
}

initEventCarousels();

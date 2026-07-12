// ==========================
// ANIMATIONS.JS
// All Animation Logic
// ==========================

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .card, .service-card, .blog-card, .testimonial-card, .why-choose, .newsletter-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== STAGGER ANIMATIONS =====
document.querySelectorAll('.stagger-children').forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
});

// ===== TYPEWRITER EFFECT (optional) =====
function typeWriter(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    const type = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(type);
        }
    }, speed);
}

// ===== PARALLAX SCROLL =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroImage = hero.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    }
});

// ===== FADE IN ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// ===== COUNTER ANIMATION =====
function animateCounter(elementId, target, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters
function initCounters() {
    const counters = [
        { id: 'students', target: 1200 },
        { id: 'projects', target: 350 },
        { id: 'articles', target: 180 },
        { id: 'tools', target: 80 }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const counter = counters.find(c => c.id === id);
                if (counter) {
                    animateCounter(id, counter.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
    });
}

initCounters();
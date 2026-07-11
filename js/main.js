// ==========================
// SCALEUP WEALTH HUB
// MAIN JAVASCRIPT
// ==========================

// ==========================
// LOADER
// ==========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================
// NAVBAR SCROLL EFFECT
// ==========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================
// MOBILE MENU
// ==========================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ==========================
// SMOOTH SCROLL
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================
// COUNTER ANIMATION
// ==========================
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

// ==========================
// SCROLL REVEAL ANIMATIONS
// ==========================
const revealElements = document.querySelectorAll('.card, .service-card, .blog-card, .testimonial-card, .why-choose, .newsletter-content');

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

// ==========================
// NEWSLETTER FORM
// ==========================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email === '') {
            emailInput.style.border = '2px solid #ef4444';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            emailInput.style.border = '2px solid #ef4444';
            return;
        }

        emailInput.style.border = 'none';
        
        const originalText = newsletterForm.querySelector('.btn-primary').innerHTML;
        const btn = newsletterForm.querySelector('.btn-primary');
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#22c55e';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            newsletterForm.reset();
        }, 3000);

        console.log('Newsletter subscription:', email);
    });

    newsletterForm.querySelector('input[type="email"]').addEventListener('input', function() {
        this.style.border = 'none';
    });
}

// ==========================
// BACK TO TOP BUTTON
// ==========================
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================
// DARK MODE - WORKING VERSION
// ==========================
// Create the button if it doesn't exist
let darkBtn = document.querySelector('.darkBtn');
if (!darkBtn) {
    darkBtn = document.createElement('button');
    darkBtn.className = 'darkBtn';
    darkBtn.setAttribute('aria-label', 'Toggle dark mode');
    darkBtn.innerHTML = '🌙';
    document.body.appendChild(darkBtn);
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    darkBtn.innerHTML = '☀️';
}

// Toggle dark mode
darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    this.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==========================
// NAVBAR ACTIVE LINK
// ==========================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ==========================
// FAQ ACCORDION
// ==========================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==========================
// BLOG CATEGORY FILTER
// ==========================
document.querySelectorAll('.blog-categories .category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.blog-categories .category-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        const posts = document.querySelectorAll('.blog-post');
        
        posts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

// ==========================
// TOOLS CATEGORY FILTER
// ==========================
document.querySelectorAll('.tools-categories .category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tools-categories .category-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        const tools = document.querySelectorAll('.tool-card');
        
        tools.forEach(tool => {
            if (category === 'all' || tool.dataset.category === category) {
                tool.style.display = 'block';
            } else {
                tool.style.display = 'none';
            }
        });
    });
});

// ==========================
// CONTACT FORM
// ==========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#22c55e';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
        
        console.log('Contact form submitted:', { name, email, message });
    });
}

// ==========================
// PAGINATION
// ==========================
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === '') return;
        
        document.querySelectorAll('.page-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
    });
});

// ==========================
// CONSOLE BRANDING
// ==========================
console.log('%c🚀 ScaleUp Wealth Hub', 'font-size: 24px; font-weight: bold; color: #D8B235;');
console.log('%cBuilt with ❤️ | AI • Digital Marketing • Online Growth', 'font-size: 14px; color: #6B6B6B;');
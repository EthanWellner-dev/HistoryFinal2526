// Advanced Scroll Animations
let lastScrollTop = 0;
let scrollDirection = 'down';

document.addEventListener('DOMContentLoaded', function() {
    setupNavbarScroll();
    setupScrollReveal();
    setupDirectionalScroll();
    setupParallax();
});

// Detect scroll direction
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop;
});

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll reveal animations using Intersection Observer
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
        'section h2, .fade-in, .artifact-content'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 0.05;
                entry.target.style.animationDelay = `${delay}s`;
                
                if (!entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('scroll-reveal', 'visible');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        if (!el.classList.contains('fade-in')) {
            observer.observe(el);
        }
    });
}

// Directional scroll animations - elements fly in from sides
function setupDirectionalScroll() {
    const elements = document.querySelectorAll(
        '.card, section h2, section p, .container > div'
    );

    const observerOptions = {
        threshold: 0.05,
        rootMargin: '100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Determine which side to animate from based on position
                const rect = entry.target.getBoundingClientRect();
                const isLeftSide = rect.left < window.innerWidth / 2;
                
                if (isLeftSide) {
                    entry.target.classList.add('slide-in-left', 'visible');
                } else {
                    entry.target.classList.add('slide-in-right', 'visible');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        if (!el.classList.contains('navbar') && 
            !el.classList.contains('footer') &&
            !el.classList.contains('hero-section')) {
            observer.observe(el);
        }
    });
}

// Parallax effect
function setupParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroContent = hero.querySelector('.container');
        
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for stats (if needed)
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

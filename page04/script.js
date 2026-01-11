// ===================================
// Navigation Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle?.classList.remove('active');
    });
});

// ===================================
// Smooth Scroll for Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.section-label, .section-title, .about-text, .about-stats, .product-card, .contact-info, .contact-form-wrapper');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85) {
            element.classList.add('revealed');
        }
    });
};

// Add reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
  .section-label, .section-title, .about-text, .about-stats, 
  .product-card, .contact-info, .contact-form-wrapper {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .section-label.revealed, .section-title.revealed, .about-text.revealed, 
  .about-stats.revealed, .product-card.revealed, .contact-info.revealed, 
  .contact-form-wrapper.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .product-card:nth-child(2) { transition-delay: 0.1s; }
  .product-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Show success message
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>✓ 견적 요청 완료!</span>';
    btn.style.background = '#0d9668';
    btn.disabled = true;

    // Reset form after 3 seconds
    setTimeout(() => {
        this.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);

    console.log('Form submitted:', data);
});

// ===================================
// Product Card Hover Effects
// ===================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const carousel = card.querySelector('.product-carousel');
        if (carousel) {
            carousel.style.animationDuration = '3s';
        }
    });

    card.addEventListener('mouseleave', () => {
        const carousel = card.querySelector('.product-carousel');
        if (carousel) {
            carousel.style.animationDuration = '6s';
        }
    });
});

// ===================================
// Parallax Effect for Hero
// ===================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    }
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Add active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-link.active {
    color: var(--color-gold) !important;
  }
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(activeStyle);

window.addEventListener('scroll', highlightNavLink);

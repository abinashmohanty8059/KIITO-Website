// ==========================================
// KIITO Website JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    initSmoothScroll();

    // Intersection Observer for animations
    initScrollAnimations();

    // Active navigation highlighting
    initActiveNav();
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe architecture layers
    const archLayers = document.querySelectorAll('.arch-layer');
    archLayers.forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'translateX(-30px)';
        layer.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(layer);
    });

    // Observe tech categories
    const techCategories = document.querySelectorAll('.tech-category');
    techCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(category);
    });

    // Observe dev cards
    const devCards = document.querySelectorAll('.dev-card');
    devCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==========================================
// ACTIVE NAVIGATION
// ==========================================

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -66% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    if (orb1) {
        orb1.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.15}px)`;
    }

    if (orb2) {
        orb2.style.transform = `translate(${-scrolled * 0.1}px, ${-scrolled * 0.1}px)`;
    }
});

// ==========================================
// DYNAMIC GRID BACKGROUND
// ==========================================

function createDynamicGrid() {
    const grid = document.querySelector('.grid-overlay');
    if (!grid) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const xPercent = (mouseX / window.innerWidth) * 100;
        const yPercent = (mouseY / window.innerHeight) * 100;

        grid.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });
}

createDynamicGrid();

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const cta = document.querySelector('.nav-cta');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    const closeMenu = () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    };

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (cta) {
        cta.addEventListener('click', closeMenu);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX / window.innerWidth) * 20;
    const moveY = (e.clientY / window.innerHeight) * 20;

    const hero = document.querySelector(".hero");

    if(hero){
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ==========================================
// FLOATING SCREENSHOTS
// ==========================================

function floatScreenshots() {
    const screenshots = document.querySelectorAll('img[src*="app-screenshot"]');

    screenshots.forEach((img, index) => {
        let pos = 0;
        let direction = 1;

        setInterval(() => {
            pos += direction;

            if (pos > 10 || pos < -10) {
                direction *= -1;
            }

            img.style.transform = `translateY(${pos}px)`;
        }, 50 + index * 10);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    floatScreenshots();
});

// 3D tilt effect for screenshots
const screenshots = document.querySelectorAll("img");

screenshots.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * -20;

    img.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
  });
});
// existing code
const menuBtn = document.querySelector(".mobile-menu-btn");

menuBtn.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
});


// ↓↓↓ PASTE THE MAGNETIC BUTTON CODE BELOW THIS ↓↓↓

const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {

    btn.addEventListener("mousemove", (e) => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;

    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
    });

});
const hero = document.querySelector(".hero");
const light = document.querySelector(".hero-light");

hero.addEventListener("mousemove",(e)=>{

light.style.left = e.pageX + "px";
light.style.top = e.pageY + "px";

});


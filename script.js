window.addEventListener('load', () => {
    // Hide preloader once everything is fully loaded
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Keep loading spinner visible for 4 seconds for aesthetic purposes
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Matches the CSS transition duration
        }, 4000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    initSmoothScroll();

    // Intersection Observer for animations
    initScrollAnimations();

    // Active navigation highlighting
    initActiveNav();

    // Initialize Hero Video logic 
    initHeroVideo();
});

// ==========================================
// HERO PROMO VIDEO
// ==========================================
function initHeroVideo() {
    const video = document.getElementById('promoVideo');
    const toggleBtn = document.getElementById('muteToggleBtn');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');

    if (!video || !toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle the muted state
        video.muted = !video.muted;
        
        // Swap the icons
        if (video.muted) {
            iconMuted.style.display = 'block';
            iconUnmuted.style.display = 'none';
        } else {
            iconMuted.style.display = 'none';
            iconUnmuted.style.display = 'block';
        }
    });
}

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
    init3DCardTilt();
});

// ==========================================
// 3D CARD TILT EFFECT
// ==========================================

function init3DCardTilt() {
    const cards = document.querySelectorAll('.card-3d');
    
    // Only apply hover effects on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    }

    function handleMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max rotation of 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function handleMouseLeave() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        // Reset transition to ensure smooth return
        this.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            this.style.transition = 'transform 0.1s';
        }, 500);
    }
}

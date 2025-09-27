// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

// Scroll animations
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add animation classes to elements
function addAnimationClasses() {
    // Hero content animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in');
    if (heroDescription) heroDescription.classList.add('fade-in');
    if (heroButtons) heroButtons.classList.add('fade-in');
    if (heroImage) heroImage.classList.add('slide-in-right');
    
    // Section animations
    const sectionTitles = document.querySelectorAll('.section-title');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    sectionTitles.forEach(title => title.classList.add('fade-in'));
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    portfolioItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    if (aboutText) aboutText.classList.add('slide-in-left');
    if (aboutStats) aboutStats.classList.add('slide-in-right');
    if (contactInfo) contactInfo.classList.add('slide-in-left');
    if (contactForm) contactForm.classList.add('slide-in-right');
}

// Trigger animations immediately for hero section
function triggerHeroAnimations() {
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in, .hero .slide-in-right');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 500);
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #4F46E5;
        }
        
        .notification-success {
            border-left-color: #10B981;
        }
        
        .notification-error {
            border-left-color: #EF4444;
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-message {
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close notification functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Parallax effect for hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing effect for hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const textWithoutSpan = heroTitle.textContent;
    const words = textWithoutSpan.split(' ');
    
    heroTitle.innerHTML = '';
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = '';
    
    function typeWriter() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            
            if (wordIndex === 2) { // "John Developer" - apply highlight
                currentWord = word;
                heroTitle.innerHTML = `Hi, I'm <span class="highlight">${currentWord}</span>`;
            } else {
                if (wordIndex === 0) {
                    heroTitle.innerHTML = word;
                } else if (wordIndex === 1) {
                    heroTitle.innerHTML = `${words[0]} ${word}`;
                } else {
                    heroTitle.innerHTML = originalText;
                }
            }
            
            wordIndex++;
            setTimeout(typeWriter, 500);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Skill bars animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Counter animation for stats
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-item h4');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateCounter(target, finalNumber);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16); // ~60fps
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
    triggerHeroAnimations();
    addParallaxEffect();
    addTypingEffect();
    animateCounters();
    
    // Trigger initial scroll animation check
    setTimeout(() => {
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }, 1000);
});

// Portfolio image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #4F46E5;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.background = '#3730A3';
        scrollToTopBtn.style.transform = 'translateY(0) scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.background = '#4F46E5';
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
addScrollToTop();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    highlightActiveNavLink();
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
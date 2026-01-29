/* ============================================
   SAMARTH KAPDI - PORTFOLIO JAVASCRIPT
   Ultimate Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initParticles();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initTypingEffect();
    initCounterAnimation();
    initSkillBars();
    initTiltEffect();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
});

/* ============ CUSTOM CURSOR ============ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    const dot = document.querySelector('.cursor-dot');
    
    if (!cursor || !dot) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        const ease = 0.15;
        const dotEase = 0.25;
        
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        dotX += (mouseX - dotX) * dotEase;
        dotY += (mouseY - dotY) * dotEase;
        
        cursor.style.left = `${cursorX - 20}px`;
        cursor.style.top = `${cursorY - 20}px`;
        
        dot.style.left = `${dotX - 4}px`;
        dot.style.top = `${dotY - 4}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .timeline-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

/* ============ PARTICLE BACKGROUND ============ */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.life = 0;
            this.maxLife = Math.random() * 200 + 100;
            this.opacity = 0;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;
            
            // Fade in and out
            if (this.life < 50) {
                this.opacity = this.life / 50;
            } else if (this.life > this.maxLife - 50) {
                this.opacity = (this.maxLife - this.life) / 50;
            } else {
                this.opacity = 1;
            }
            
            if (this.life >= this.maxLife) {
                this.reset();
            }
            
            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity * 0.5})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(100, window.innerWidth / 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pause animation when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

/* ============ NAVBAR ============ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

/* ============ HERO ANIMATIONS ============ */
function initHeroAnimations() {
    // Staggered letter animation
    const letters = document.querySelectorAll('.name-letter');
    
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.classList.add('animate-letter');
    });
    
    // Parallax effect on mouse move
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    hero?.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

/* ============ TYPING EFFECT ============ */
function initTypingEffect() {
    const words = document.querySelectorAll('.role-word');
    if (!words.length) return;
    
    let currentIndex = 0;
    
    function cycleWords() {
        words.forEach(word => word.classList.remove('active'));
        words[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % words.length;
    }
    
    // Initial call
    cycleWords();
    
    // Cycle every 3 seconds
    setInterval(cycleWords, 3000);
}

/* ============ COUNTER ANIMATION ============ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    function animateCounter(element, target) {
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    // Add animation to sections
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
}

/* ============ SKILL BARS ANIMATION ============ */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => skillObserver.observe(item));
}

/* ============ 3D TILT EFFECT ============ */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ============ CONTACT FORM ============ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Input animations
    const inputs = form?.querySelectorAll('input, textarea');
    
    inputs?.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/* ============ BACK TO TOP ============ */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });
    
    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============ SMOOTH SCROLL ============ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============ MAGNETIC BUTTON EFFECT ============ */
document.querySelectorAll('.btn-primary, .social-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ============ LOADING ANIMATION ============ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});

/* ============ PERFORMANCE OPTIMIZATION ============ */
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Heavy scroll operations here
}, 50));

console.log('%c Welcome to Samarth Kapdi\'s Portfolio! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c Built with ❤️ and lots of coffee ☕', 'color: #764ba2; font-size: 12px;');

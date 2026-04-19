/* ============================================
   SAMARTH KAPDI - PORTFOLIO JAVASCRIPT
   Production Build — 2026
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticles();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initTypingEffect();
    initCounterAnimation();
    initTiltEffect();
    initContactForm();
    initFormAccessibility();
    initSmoothScroll();
    initMagneticButtons();
    initSingleScrollListener();
});

/* ============ THROTTLE UTILITY ============ */
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

/* ============ CUSTOM CURSOR ============ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    const dot = document.querySelector('.cursor-dot');

    if (!cursor || !dot) return;

    /* Fix: disable on any pointer:coarse device (iPads, touch laptops) */
    if (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 768px)').matches) {
        cursor.style.display = 'none';
        dot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

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

    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .skill-tag, .timeline-card, .why-card, .hackathon-card, .cert-item, .highlight-item, .contact-item'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
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

    const particleCount = Math.min(100, window.innerWidth / 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

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
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============ SINGLE THROTTLED SCROLL LISTENER ============ */
function initSingleScrollListener() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = throttle(() => {
        const currentScroll = window.scrollY;

        /* Navbar background */
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        /* Back to top visibility */
        if (backToTop) {
            if (currentScroll > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        /* Active nav link highlighting */
        const scrollPos = currentScroll + 200;
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
    }, 50);

    window.addEventListener('scroll', onScroll, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============ HERO ANIMATIONS ============ */
function initHeroAnimations() {
    const letters = document.querySelectorAll('.name-letter');

    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.classList.add('animate-letter');
    });

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

    cycleWords();
    setInterval(cycleWords, 3000);
}

/* ============ COUNTER ANIMATION ============ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
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

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));

    const sectionElements = document.querySelectorAll('.section');

    sectionElements.forEach(section => {
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

/* ============ 3D TILT EFFECT ============ */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    if (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 768px)').matches) return;

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
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        submitBtn.innerHTML = '<span>Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

        form.reset();

        /* Clear has-value classes after reset */
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-value');
        });

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

/* ============ FORM ACCESSIBILITY ============ */
function initFormAccessibility() {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;

        input.addEventListener('input', () => {
            group.classList.toggle('has-value', input.value.length > 0);
        });

        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            group.classList.remove('focused');
        });

        /* Initial check for pre-filled values */
        if (input.value.length > 0) {
            group.classList.add('has-value');
        }
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
function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

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
}

/* ============ LOADING ANIMATION ============ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});

console.log('%c Welcome to Samarth Kapdi\'s Portfolio! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c Built with ❤️ and lots of coffee ☕', 'color: #764ba2; font-size: 12px;');

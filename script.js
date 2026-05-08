/**
 * iOS 26 Glassmorphism Digital Agency
 * Interactive Effects & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initTiltEffect();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
    initParallaxEffect();
});

/**
 * Navigation scroll effect
 */
function initNavigation() {
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for glass effect
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

/**
 * 3D Tilt Effect for Glass Cards
 */
/* --- Floating Action Button Styles --- */
.fab-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
}

.fab-main {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 12px 25px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.fab-main:hover { transform: scale(1.05); background: rgba(255, 255, 255, 0.3); }

.fab-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fab-container:hover .fab-menu {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.fab-item {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-decoration: none;
    transition: all 0.2s ease;
}

.fab-item:hover { background: white; transform: scale(1.1); }

/* --- Contact Section Buttons --- */
.contact-card-simple {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
}

.contact-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.contact-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.contact-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.4);
}

.btn-content {
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: left;
}

.btn-icon { font-size: 2rem; }
.btn-label { display: block; font-size: 0.8rem; opacity: 0.7; text-transform: uppercase; letter-spacing: 1px; }
.btn-value { font-size: 1.1rem; font-weight: 600; }
.btn-arrow { font-size: 1.5rem; opacity: 0.3; transition: transform 0.3s ease; }
.contact-btn:hover .btn-arrow { transform: translateX(5px); opacity: 1; }

.availability-badge-centered {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50px;
    font-size: 0.9rem;
}
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add shimmer effect on hover
            const shimmer = element.querySelector('.card-shimmer, .service-shimmer, .orb-shimmer');
            if (shimmer) {
                shimmer.style.left = `${(x / rect.width) * 100}%`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            const shimmer = element.querySelector('.card-shimmer, .service-shimmer, .orb-shimmer');
            if (shimmer) {
                shimmer.style.left = '-100%';
            }
        });
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate process timeline
                if (entry.target.classList.contains('process-timeline')) {
                    animateTimeline();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .service-card, .process-step, .portfolio-item, .testimonial-orb, .contact-info, .contact-form-container'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Process Timeline Animation
 */
function animateTimeline() {
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineGlow = document.querySelector('.timeline-glow');
    const steps = document.querySelectorAll('.process-step');
    
    if (timelineProgress) {
        timelineProgress.style.height = '100%';
        timelineProgress.style.transition = 'height 2s ease-out';
    }
    
    // Animate steps sequentially
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
            
            const node = step.querySelector('.node-core');
            if (node) {
                node.style.transform = 'scale(1)';
                node.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.6)';
            }
        }, index * 400);
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success modal
                modal.classList.add('active');
                
                // Reset form
                form.reset();
                btnText.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect for Background Elements
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.glass-card');
    const floatingWidgets = document.querySelectorAll('.widget');
    
    if (!hero) return;
    
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;
        
        // Move cards with different intensities
        floatingCards.forEach((card, index) => {
            const intensity = (index + 1) * 8;
            const x = moveX * intensity;
            const y = moveY * intensity;
            
            card.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Move widgets with inverse direction
        floatingWidgets.forEach((widget, index) => {
            const intensity = (index + 1) * -12;
            const x = moveX * intensity;
            const y = moveY * intensity;
            
            widget.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Text Scramble Effect for Hero Title
 */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble on hero title hover
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const scrambleElements = heroTitle.querySelectorAll('.gradient-text');
        
        scrambleElements.forEach(el => {
            const fx = new TextScramble(el);
            const original = el.innerText;
            
            el.addEventListener('mouseenter', () => {
                fx.setText(original);
            });
        });
    }
});

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-cyan), var(--accent-violet));
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}
function setSubject(subject) {
    // 1. Visual update: highlight the selected button
    const buttons = document.querySelectorAll('.sub-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 2. Functional update: Update the email link
    const mailLink = document.getElementById('mailLink');
    const baseEmail = "bellaaajss@gmail.com";
    const encodedSubject = encodeURIComponent("Inquiry regarding " + subject);
    
    mailLink.href = `mailto:${baseEmail}?subject=${encodedSubject}`;
    
    // 3. Optional: Add a little "pop" animation
    mailLink.style.transform = "scale(1.2)";
    setTimeout(() => { mailLink.style.transform = "scale(1)"; }, 200);
}
// Initialize scroll progress
initScrollProgress();

/**
 * Counter Animation for Stats
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Initialize counter animations when cards are visible
const cardValues = document.querySelectorAll('.card-value');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target;
            const text = value.textContent;
            const num = parseInt(text);
            
            if (!isNaN(num)) {
                value.textContent = '0%';
                animateCounter(value, num);
            }
            
            cardObserver.unobserve(value);
        }
    });
}, { threshold: 0.5 });

cardValues.forEach(value => cardObserver.observe(value));

/**
 * Particle Background Effect (Canvas)
 */
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 25;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

// Initialize particle background on non-touch devices
if (!window.matchMedia('(pointer: coarse)').matches) {
    initParticleBackground();
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// Console greeting
console.log('%c🔮 Glass Digital Agency', 'font-size: 24px; font-weight: bold; color: #00F0FF;');
console.log('%cWelcome to the iOS 26 Glassmorphism Experience', 'font-size: 14px; color: #8B5CF6;');

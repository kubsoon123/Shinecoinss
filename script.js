// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stats')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                }
                
                // Animate feature cards
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 500);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stats, .feature-card, .timeline-item, .social-link');
    animatedElements.forEach(el => {
        // Set initial state for animations
        if (el.classList.contains('feature-card')) {
            el.style.transform = 'translateY(50px)';
            el.style.opacity = '0';
            el.style.transition = 'all 0.6s ease';
        }
        
        if (el.classList.contains('timeline-item')) {
            el.style.transform = 'translateX(-50px)';
            el.style.opacity = '0';
            el.style.transition = 'all 0.8s ease';
        }
        
        observer.observe(el);
    });

    // Parallax effect for floating coins
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-coin');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Logo click interaction
    const logo = document.querySelector('.main-logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.animation = 'none';
            logo.offsetHeight; // Trigger reflow
            logo.style.animation = 'logoFloat 0.5s ease-in-out, logoGlow 0.5s ease-in-out';
            
            // Add a temporary spin effect
            logo.style.transform = 'scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                logo.style.animation = 'logoFloat 3s ease-in-out infinite, logoGlow 2s ease-in-out infinite alternate';
                logo.style.transform = '';
            }, 500);
        });
    }

    // Button hover effects with particles
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });

    function createParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#ffd700';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { transform: 'translateY(0px)', opacity: 1 },
                { transform: 'translateY(-50px)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #ffd700';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Random floating elements generator
    function createFloatingElement() {
        const symbols = ['✨', '💎', '🌟', '💫', '⭐', '🚀'];
        const element = document.createElement('div');
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.position = 'fixed';
        element.style.fontSize = '1.5rem';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.opacity = '0.6';
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(element);
        
        // Animate upward
        element.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 0.6 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 8000 + Math.random() * 4000,
            easing: 'linear'
        }).onfinish = () => {
            element.remove();
        };
    }

    // Create floating elements periodically
    setInterval(createFloatingElement, 3000);

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.background = `rgba(0, 0, 0, ${opacity})`;
    });

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature cards stagger animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Coin rotation on scroll
    window.addEventListener('scroll', () => {
        const coin = document.querySelector('.coin');
        if (coin) {
            const scrolled = window.pageYOffset;
            coin.style.transform = `rotateY(${scrolled * 0.5}deg)`;
        }
    });

    // Add glow effect to buttons on hover
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });

    // Roadmap timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
        item.style.transition = 'all 0.8s ease';
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease-in-out infinite';
            setTimeout(() => {
                document.body.style.animation = 'none';
            }, 10000);
        }
    });

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Initialize all animations
    console.log('🌟 ShineCoin website loaded successfully! 🚀');
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    body.loaded * {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(loadingStyle);
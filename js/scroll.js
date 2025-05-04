// Advanced Scroll Effects
class ScrollManager {
    constructor() {
        this.scrollY = 0;
        this.scrollDirection = 'down';
        this.scrollSpeed = 0;
        this.isScrolling = false;
        this.scrollTimeout;
        
        this.init();
    }
    
    init() {
        this.setupScrollListeners();
        this.setupParallax();
        this.setupScrollAnimations();
        this.setupHorizontalScroll();
    }
    
    setupScrollListeners() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Detect scroll direction
            if (currentScroll > lastScrollTop) {
                this.scrollDirection = 'down';
            } else if (currentScroll < lastScrollTop) {
                this.scrollDirection = 'up';
            }
            
            // Calculate scroll speed
            this.scrollSpeed = Math.abs(currentScroll - this.scrollY);
            this.scrollY = currentScroll;
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            
            // Update scrolling state
            this.isScrolling = true;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
                this.scrollSpeed = 0;
            }, 100);
            
            // Apply speed-based effects
            this.applyScrollEffects();
        }, { passive: true });
    }
    
    applyScrollEffects() {
        const body = document.body;
        
        if (this.scrollSpeed > 30) {
            body.classList.add('fast-scroll');
        } else {
            body.classList.remove('fast-scroll');
        }
        
        // Update scroll progress indicator
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
    }
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const parallaxScroll = () => {
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const rect = element.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const offset = (window.innerHeight / 2 - centerY) * speed;
                
                element.style.transform = `translateY(${offset}px)`;
            });
        };
        
        window.addEventListener('scroll', parallaxScroll, { passive: true });
        window.addEventListener('resize', parallaxScroll);
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-scroll-animation');
                    const delay = element.getAttribute('data-scroll-delay') || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate');
                        element.style.opacity = '1';
                        
                        switch(animation) {
                            case 'fade-up':
                                element.style.transform = 'translateY(0)';
                                break;
                            case 'fade-down':
                                element.style.transform = 'translateY(0)';
                                break;
                            case 'fade-left':
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'fade-right':
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'zoom-in':
                                element.style.transform = 'scale(1)';
                                break;
                            case 'rotate':
                                element.style.transform = 'rotate(0deg)';
                                break;
                        }
                    }, parseInt(delay));
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements with scroll animations
        document.querySelectorAll('[data-scroll-animation]').forEach(element => {
            // Initial state
            element.style.opacity = '0';
            element.style.transition = 'all 0.8s ease';
            
            switch(element.getAttribute('data-scroll-animation')) {
                case 'fade-up':
                    element.style.transform = 'translateY(50px)';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(-50px)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(50px)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(-50px)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(0.8)';
                    break;
                case 'rotate':
                    element.style.transform = 'rotate(-10deg)';
                    break;
            }
            
            observer.observe(element);
        });
    }
    
    setupHorizontalScroll() {
        const horizontalSections = document.querySelectorAll('.horizontal-scroll');
        
        horizontalSections.forEach(section => {
            const wrapper = section.querySelector('.horizontal-scroll-wrapper');
            const content = section.querySelector('.horizontal-scroll-content');
            
            if (wrapper && content) {
                let isScrolling = false;
                let startX;
                let scrollLeft;
                
                // Mouse wheel horizontal scroll
                section.addEventListener('wheel', (e) => {
                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                        e.preventDefault();
                        wrapper.scrollLeft += e.deltaX;
                    } else {
                        const scrollSpeed = window.innerWidth > 768 ? 30 : 20;
                        wrapper.scrollLeft += e.deltaY * scrollSpeed;
                    }
                }, { passive: false });
                
                // Touch scroll for mobile
                section.addEventListener('touchstart', (e) => {
                    isScrolling = true;
                    startX = e.touches[0].clientX - wrapper.offsetLeft;
                    scrollLeft = wrapper.scrollLeft;
                });
                
                section.addEventListener('touchmove', (e) => {
                    if (!isScrolling) return;
                    e.preventDefault();
                    const x = e.touches[0].clientX - wrapper.offsetLeft;
                    const walk = (x - startX) * 2;
                    wrapper.scrollLeft = scrollLeft - walk;
                });
                
                section.addEventListener('touchend', () => {
                    isScrolling = false;
                });
                
                // Update parallax items in horizontal scroll
                const parallaxItems = section.querySelectorAll('.parallax-item');
                
                wrapper.addEventListener('scroll', () => {
                    const scrollPercentage = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
                    
                    parallaxItems.forEach((item, index) => {
                        const speed = (index % 3 + 1) * 0.1;
                        const translateX = scrollPercentage * 100 * speed;
                        item.style.transform = `translateX(${translateX}px)`;
                    });
                    
                    // Update scroll indicator
                    const indicator = section.querySelector('.scroll-indicator');
                    if (indicator) {
                        indicator.style.transform = `translateX(${scrollPercentage * (wrapper.clientWidth - indicator.clientWidth)}px)`;
                    }
                });
            }
        });
    }
}

// Smooth Scroll Polyfill for older browsers
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Initialize scroll manager and smooth scroll
document.addEventListener('DOMContentLoaded', () => {
    new ScrollManager();
    smoothScroll();
});

// Add scroll position to CSS variables for animations
const updateScrollPosition = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    document.documentElement.style.setProperty('--scroll-top', scrollTop + 'px');
    document.documentElement.style.setProperty('--window-height', windowHeight + 'px');
    document.documentElement.style.setProperty('--document-height', documentHeight + 'px');
};

window.addEventListener('scroll', updateScrollPosition, { passive: true });
window.addEventListener('resize', updateScrollPosition);
updateScrollPosition();

// Intersection Observer for reveal animations
const createRevealObserver = () => {
    const options = {
        threshold: [0, 0.1, 0.2, 0.5, 0.8],
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const progress = entry.intersectionRatio;
            const element = entry.target;
            
            // Update CSS variable for progress-based animations
            element.style.setProperty('--reveal-progress', progress);
            
            if (progress > 0.1) {
                element.classList.add('is-revealed');
            }
        });
    }, options);
    
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
};

createRevealObserver();
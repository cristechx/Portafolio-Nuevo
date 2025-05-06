// Mobile Navigation Handler
class MobileNavigation {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileOverlayMenu = document.querySelector('.mobile-overlay-menu');
        this.bottomNavTabs = document.querySelectorAll('.nav-tab');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        this.sections = document.querySelectorAll('section[id]');
        
        // Verificar si estamos en móvil o desktop
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupStatusBar();
        this.setupScrollTracking();
        this.setupTouchFeedback();
        this.updateNavigationVisibility();
    }
    
    setupEventListeners() {
        // Mobile menu toggle (burger menu)
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu on link click
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
                this.scrollToSection(link.getAttribute('href'));
            });
        });
        
        // Bottom nav click handling
        this.bottomNavTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleBottomNavClick(tab);
            });
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.mobileMenuBtn && 
                this.mobileOverlayMenu &&
                !this.mobileMenuBtn.contains(e.target) && 
                !this.mobileOverlayMenu.contains(e.target) && 
                this.mobileOverlayMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Handle resize events
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            // If device type changed, update navigation
            if (wasMobile !== this.isMobile) {
                this.updateNavigationVisibility();
                
                // Reset mobile menu if switching to desktop
                if (!this.isMobile) {
                    this.closeMobileMenu();
                }
            }
        });
    }
    
    updateNavigationVisibility() {
        const desktopNav = document.querySelector('.desktop-nav');
        const bottomNav = document.querySelector('.bottom-nav');
        
        if (this.isMobile) {
            // Hide desktop nav, show bottom nav
            if (desktopNav) desktopNav.style.display = 'none';
            if (bottomNav) bottomNav.style.display = 'block';
        } else {
            // Show desktop nav, hide bottom nav
            if (desktopNav) desktopNav.style.display = 'flex';
            if (bottomNav) bottomNav.style.display = 'none';
        }
    }
    
    toggleMobileMenu() {
        if (this.hamburger) {
            this.hamburger.classList.toggle('active');
        }
        
        if (this.mobileOverlayMenu) {
            this.mobileOverlayMenu.classList.toggle('active');
            document.body.style.overflow = this.mobileOverlayMenu.classList.contains('active') ? 'hidden' : '';
        }
    }
    
    closeMobileMenu() {
        if (this.hamburger) {
            this.hamburger.classList.remove('active');
        }
        
        if (this.mobileOverlayMenu) {
            this.mobileOverlayMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleBottomNavClick(clickedTab) {
        // Remove active class from all tabs
        this.bottomNavTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        clickedTab.classList.add('active');
        
        // Smooth scroll to section
        const targetId = clickedTab.getAttribute('href');
        this.scrollToSection(targetId);
    }
    
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = this.isMobile ? 104 : 100; // Adjust for mobile
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    setupScrollTracking() {
        const options = {
            threshold: [0.1, 0.5],
            rootMargin: '-104px 0px 0px 0px' // Account for status bar + header
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    const sectionId = entry.target.id;
                    this.updateActiveNav(sectionId);
                }
            });
        }, options);
        
        this.sections.forEach(section => observer.observe(section));
    }
    
    updateActiveNav(activeSectionId) {
        // Update bottom nav
        this.bottomNavTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-section') === activeSectionId;
            tab.classList.toggle('active', isActive);
        });
        
        // Update desktop nav
        const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
        desktopNavLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeSectionId}`;
            link.classList.toggle('active', isActive);
        });
    }
    
    setupStatusBar() {
        const statusTime = document.querySelector('.status-time');
        const statusBattery = document.querySelector('.status-battery');
        
        // Update time every minute
        const updateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: false 
            });
            if (statusTime) statusTime.setAttribute('data-time', time);
        };
        
        updateTime();
        setInterval(updateTime, 60000);
        
        // Battery level (mock for demo)
        if (statusBattery) {
            statusBattery.setAttribute('data-battery', '100%');
        }
    }
    
    setupTouchFeedback() {
        // Add ripple effect to buttons
        const touchFeedbackElements = document.querySelectorAll('.contact-button, .nav-tab, .portfolio-filter');
        
        touchFeedbackElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.touches[0].clientX - rect.left - size / 2;
                const y = e.touches[0].clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
});
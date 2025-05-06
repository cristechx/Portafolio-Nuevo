/**
 * Corrección de navegación responsiva
 * Este archivo soluciona problemas de visualización y navegación en distintos dispositivos
 */

// Clase mejorada de navegación móvil
class MobileNavigationFix {
    constructor() {
        // Elementos principales
        this.header = document.querySelector('.header');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileOverlayMenu = document.querySelector('.mobile-overlay-menu');
        this.bottomNavTabs = document.querySelectorAll('.nav-tab');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        this.sections = document.querySelectorAll('section[id]');
        this.desktopNav = document.querySelector('.desktop-nav');
        this.bottomNav = document.querySelector('.bottom-nav');
        
        // Detectar dispositivo
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Inicializar
        this.init();
    }
    
    init() {
        console.log('Inicializando navegación mejorada');
        
        // Aplicar clases según dispositivo
        this.applyDeviceClasses();
        
        // Configurar elementos de navegación según dispositivo
        this.setupNavigation();
        
        // Configurar los eventos
        this.setupEventListeners();
        
        // Configurar barra de estado para móvil
        this.setupStatusBar();
        
        // Configurar observador de secciones
        this.setupSectionObserver();
        
        // Configurar cursor según dispositivo
        this.setupCursor();
    }
    
    applyDeviceClasses() {
        if (this.isTouch) {
            document.documentElement.classList.add('is-touch-device');
            document.body.classList.add('is-touch-device');
        }
        
        if (this.isMobile) {
            document.body.classList.add('is-mobile');
        } else if (this.isTablet) {
            document.body.classList.add('is-tablet');
        } else {
            document.body.classList.add('is-desktop');
        }
    }
    
    setupNavigation() {
        // Configurar visibilidad según dispositivo
        if (this.isMobile) {
            if (this.desktopNav) this.desktopNav.style.display = 'none';
            if (this.bottomNav) this.bottomNav.style.display = 'block';
        } else {
            if (this.desktopNav) this.desktopNav.style.display = 'flex';
            if (this.bottomNav) this.bottomNav.style.display = 'none';
        }
        
        // Si es tablet, mostrar el menú móvil pero no la barra inferior
        if (this.isTablet) {
            if (this.desktopNav) this.desktopNav.style.display = 'none';
            if (this.bottomNav) this.bottomNav.style.display = 'none';
        }
    }
    
    setupEventListeners() {
        // Evento para el botón de menú móvil
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Eventos para los enlaces del menú móvil
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.closeMobileMenu();
                this.handleLinkClick(e, link.getAttribute('href'));
            });
        });
        
        // Eventos para los tabs de navegación inferior
        this.bottomNavTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleTabClick(tab);
            });
        });
        
        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.mobileMenuBtn && 
                this.mobileOverlayMenu &&
                !this.mobileMenuBtn.contains(e.target) && 
                !this.mobileOverlayMenu.contains(e.target) && 
                this.mobileOverlayMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            const wasDevice = {
                mobile: this.isMobile,
                tablet: this.isTablet
            };
            
            // Actualizar estados de dispositivo
            this.isMobile = window.innerWidth <= 768;
            this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
            
            // Si cambió el tipo de dispositivo, actualizar navegación
            if (wasDevice.mobile !== this.isMobile || wasDevice.tablet !== this.isTablet) {
                this.applyDeviceClasses();
                this.setupNavigation();
                
                // Cerrar menú móvil si pasamos a desktop
                if (!this.isMobile && !this.isTablet) {
                    this.closeMobileMenu();
                }
            }
        });
        
        // Manejar evento de scroll para header sticky
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header?.classList.add('scrolled');
            } else {
                this.header?.classList.remove('scrolled');
            }
        });
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
    
    handleLinkClick(e, targetId) {
        e.preventDefault();
        this.scrollToSection(targetId);
    }
    
    handleTabClick(tab) {
        // Quitar la clase activa de todos los tabs
        this.bottomNavTabs.forEach(t => t.classList.remove('active'));
        
        // Añadir clase activa al tab seleccionado
        tab.classList.add('active');
        
        // Scroll a la sección
        const targetId = tab.getAttribute('href');
        this.scrollToSection(targetId);
    }
    
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Ajustar offset según dispositivo
            const headerOffset = this.isMobile ? 70 : 100;
            const targetPosition = targetElement.offsetTop - headerOffset;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    setupSectionObserver() {
        // Opciones para el observador
        const options = {
            threshold: 0.2,
            rootMargin: '-100px 0px 0px 0px'
        };
        
        // Crear observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveLinks(sectionId);
                }
            });
        }, options);
        
        // Observar todas las secciones
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    updateActiveLinks(activeSectionId) {
        // Actualizar tabs de navegación inferior
        this.bottomNavTabs.forEach(tab => {
            const tabSection = tab.getAttribute('data-section');
            tab.classList.toggle('active', tabSection === activeSectionId);
        });
        
        // Actualizar enlaces de navegación desktop
        const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${activeSectionId}`);
        });
    }
    
    setupStatusBar() {
        const statusTime = document.querySelector('.status-time');
        
        if (statusTime) {
            // Actualizar hora inicialmente
            this.updateTime();
            
            // Actualizar cada minuto
            setInterval(() => this.updateTime(), 60000);
        }
    }
    
    updateTime() {
        const statusTime = document.querySelector('.status-time');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        if (statusTime) {
            statusTime.setAttribute('data-time', timeString);
        }
    }
    
    setupCursor() {
        // Deshabilitar cursor personalizado en dispositivos táctiles
        if (this.isTouch) {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor) cursor.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';
        }
    }
}

// Ejecutar el arreglo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia de la clase de corrección
    window.navigationFix = new MobileNavigationFix();
});
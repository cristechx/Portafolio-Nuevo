/**
 * Portfolio Corrector
 * Script que corrige varios problemas de visualización y navegación
 * en tu portafolio para que se vea bien tanto en móvil como en web
 */

// Función autoejecutable para encapsular toda la funcionalidad
(function() {
    // Detectar tipo de dispositivo
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Función principal que ejecuta todas las correcciones
    function applyFixes() {
        console.log("Aplicando correcciones al portafolio");
        
        // Aplicar clases de dispositivo
        applyDeviceClasses();
        
        // Corregir navegación
        fixNavigation();
        
        // Corregir cursor en dispositivos táctiles
        fixCursor();
        
        // Arreglar problema del loader
        fixLoader();
        
        // Arreglar animaciones
        fixAnimations();
        
        // Corregir la barra de navegación inferior
        fixBottomNav();
        
        // Corregir portfolio
        fixPortfolio();
        
        // Corregir cambio de temas
        fixThemeSwitcher();
    }
    
    // Aplicar clases según dispositivo
    function applyDeviceClasses() {
        if (isTouch) {
            document.documentElement.classList.add('is-touch-device');
            document.body.classList.add('is-touch-device');
        }
        
        if (isMobile) {
            document.body.classList.add('is-mobile');
        } else if (isTablet) {
            document.body.classList.add('is-tablet');
        } else {
            document.body.classList.add('is-desktop');
        }
    }
    
    // Corregir problemas de navegación
    function fixNavigation() {
        const header = document.querySelector('.header');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const hamburger = document.querySelector('.hamburger');
        const mobileOverlayMenu = document.querySelector('.mobile-overlay-menu');
        const desktopNav = document.querySelector('.desktop-nav');
        const bottomNav = document.querySelector('.bottom-nav');
        
        // Configurar visibilidad según dispositivo
        if (isMobile) {
            if (desktopNav) desktopNav.style.display = 'none';
            if (bottomNav) bottomNav.style.display = 'block';
        } else if (isTablet) {
            if (desktopNav) desktopNav.style.display = 'none';
            if (bottomNav) bottomNav.style.display = 'none';
        } else {
            if (desktopNav) desktopNav.style.display = 'flex';
            if (bottomNav) bottomNav.style.display = 'none';
        }
        
        // Resolver problema del botón hamburguesa
        if (mobileMenuBtn && hamburger && mobileOverlayMenu) {
            // Eliminar listeners anteriores
            const newMobileBtn = mobileMenuBtn.cloneNode(true);
            if (mobileMenuBtn.parentNode) {
                mobileMenuBtn.parentNode.replaceChild(newMobileBtn, mobileMenuBtn);
            }
            
            // Reconfigurar con el listener correcto
            newMobileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                mobileOverlayMenu.classList.toggle('active');
                document.body.style.overflow = mobileOverlayMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Cerrar el menú al hacer clic en los enlaces del menú móvil
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger) hamburger.classList.remove('active');
                if (mobileOverlayMenu) mobileOverlayMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Hacer que el header sea sticky al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        });
    }
    
    // Corregir cursor en dispositivos táctiles
    function fixCursor() {
        if (isTouch) {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor) cursor.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';
        }
    }
    
    // Arreglar el loader para que no demore demasiado
    function fixLoader() {
        const loader = document.querySelector('.page-loader');
        
        if (loader) {
            // Forzar finalización del loader después de un tiempo máximo
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.add('page-loaded');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }, 4000);
        }
    }
    
    // Arreglar animaciones para que todo sea visible
    function fixAnimations() {
        // Forzar opacidad en todas las secciones
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.visibility = 'visible';
        });
        
        // Forzar opacidad en el contenido del héroe
        document.querySelectorAll('.hero-content *').forEach(element => {
            element.style.opacity = '1';
        });
        
        // Animar barras de habilidades
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // Corregir navegación inferior
    function fixBottomNav() {
        if (!isMobile) return;
        
        const bottomNavTabs = document.querySelectorAll('.nav-tab');
        
        // Configurar navegación activa inicial basada en la posición de scroll
        function updateActiveTab() {
            const scrollPosition = window.scrollY;
            
            // Encontrar sección visible actual
            const sections = document.querySelectorAll('section[id]');
            let currentSection = null;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            // Actualizar tab activo
            if (currentSection) {
                bottomNavTabs.forEach(tab => {
                    const tabSection = tab.getAttribute('data-section');
                    tab.classList.toggle('active', tabSection === currentSection);
                });
            }
        }
        
        // Inicializar tab activo
        updateActiveTab();
        
        // Actualizar al hacer scroll
        window.addEventListener('scroll', updateActiveTab);
        
        // Configurar eventos de clic
        bottomNavTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Actualizar tabs activos
                bottomNavTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Scroll a la sección
                const targetId = tab.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 70;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Corregir portfolio para scrolling horizontal
    function fixPortfolio() {
        const portfolioWrapper = document.querySelector('.portfolio-scroll-wrapper');
        
        if (portfolioWrapper) {
            portfolioWrapper.style.overflowX = 'auto';
            portfolioWrapper.style.WebkitOverflowScrolling = 'touch';
            
            // Ajustar altura según el dispositivo
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                if (isMobile) {
                    item.style.minWidth = '280px';
                    item.style.height = '380px';
                } else if (isTablet) {
                    item.style.minWidth = '330px';
                    item.style.height = '420px';
                }
            });
        }
        
        // Corregir los filtros de portfolio
        const portfolioFilters = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Eliminar clase activa
                portfolioFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Filtrar items
                const filterValue = filter.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 10);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Corregir problemas con el selector de temas
    function fixThemeSwitcher() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                
                // Aplicar tema
                document.body.setAttribute('data-theme', theme);
                
                // Guardar preferencia
                localStorage.setItem('theme', theme);
                
                // Actualizar botón activo
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            
            // Actualizar botón activo
            themeButtons.forEach(btn => {
                if (btn.getAttribute('data-theme') === savedTheme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }
    
    // Ejecutar al cargar el DOM
    document.addEventListener('DOMContentLoaded', applyFixes);
    
    // Ejecutar al cargar completamente la página
    window.addEventListener('load', () => {
        // Forzar correcciones después de la carga completa
        fixAnimations();
        document.body.classList.add('page-loaded');
    });
    
    // Aplicar correcciones al cambiar el tamaño de la ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Actualizar detección de dispositivo
            const wasMobile = isMobile;
            const wasTablet = isTablet;
            
            if (wasMobile !== (window.innerWidth <= 768) || 
                wasTablet !== (window.innerWidth > 768 && window.innerWidth <= 1024)) {
                // Recargar la página si cambió el tipo de dispositivo
                window.location.reload();
            }
        }, 250);
    });
})();
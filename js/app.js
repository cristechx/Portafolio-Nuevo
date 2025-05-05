// Solución de respaldo para asegurar que el contenido se muestre
// Al inicio del archivo app.js
(function() {
    // Forzar carga después de 8 segundos si no ocurre automáticamente
    setTimeout(function() {
        if (!document.body.classList.contains('page-loaded')) {
            console.log('Forzando carga de contenido por timeout');
            
            // Ocultar cargador
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.style.display = 'none';
            }
            
            // Mostrar contenido
            document.body.classList.add('page-loaded');
            
            // Hacer visible todo el contenido importante
            document.querySelectorAll('section, .hero-content *').forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.visibility = 'visible';
            });
        }
    }, 8000);
})();

// Corrige la función de carga de página en app.js
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    
    // Verifica que el loader existe antes de manipularlo
    if (loader) {
        document.body.classList.add('page-loaded');
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    } else {
        console.error('No se encontró el elemento .page-loader');
    }
});

// Asegúrate de que todas las funciones se inicialicen correctamente
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos de navegación
    if (typeof initNavigation === 'function') {
        initNavigation();
    }
    
    // Inicializar animaciones de las habilidades
    if (typeof initSkillsAnimations === 'function') {
        initSkillsAnimations();
    }
    
    // Inicializar filtro de portafolio
    if (typeof initPortfolioFilters === 'function') {
        initPortfolioFilters();
    }
    
    // Inicializar botón de volver arriba
    if (typeof initBackToTop === 'function') {
        initBackToTop();
    }
});

// Inicializar navegación
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-overlay-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
    
    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.querySelector('.hamburger')?.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.querySelector('.hamburger')?.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar enlaces activos
    updateActiveLinks();
    window.addEventListener('scroll', updateActiveLinks);
}

// Actualizar enlaces activos
function updateActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-tab');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + current || 
            link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Inicializar animaciones de habilidades
function initSkillsAnimations() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Inicializar filtro de portafolio
function initPortfolioFilters() {
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Quitar clase activa de todos los filtros
            portfolioFilters.forEach(f => f.classList.remove('active'));
            // Añadir clase activa al filtro actual
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Desencadenar reflujo
                    item.offsetHeight;
                    item.classList.add('visible');
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

// Inicializar botón de volver arriba
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}
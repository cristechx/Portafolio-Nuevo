// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    document.body.classList.add('page-loaded');
    
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Navigation
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
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

// Skills Animation
const observerOptions = {
    threshold: 0.5
};

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
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Section Visibility Animation
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === '#' + current) {
            li.classList.add('active');
        }
    });
});

// Portfolio Filter
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Trigger reflow
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

// Initialize portfolio animations
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

portfolioItems.forEach(item => {
    portfolioObserver.observe(item);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Consulta desde portfolioᵃᵀ de ${name}`);
        const body = encodeURIComponent(`
Nombre: ${name}
Email: ${email}

Mensaje:
${message}`);
        
        const mailtoLink = `mailto:Cristianpulido672@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Magnetic Effect for Buttons
document.querySelectorAll('.magnetic').forEach(elem => {
    let rect;
    let initialTransform;
    
    elem.addEventListener('mouseenter', () => {
        rect = elem.getBoundingClientRect();
        initialTransform = elem.style.transform;
    });
    
    elem.addEventListener('mousemove', (e) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        const deltaX = (x - xCenter) / 3;
        const deltaY = (y - yCenter) / 3;
        
        elem.style.transform = `${initialTransform} translate(${deltaX}px, ${deltaY}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
        elem.style.transform = initialTransform;
    });
});

// AOS (Animate On Scroll) Initialization
const initAOS = () => {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    aosElements.forEach(element => {
        aosObserver.observe(element);
    });
};

// Initialize AOS
initAOS();

// Project Redirect Function
const redirectToPortfolio = (url) => {
    window.open(url, '_blank');
};

// Performance Optimization
const optimizeImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
};

// Initialize image optimization
optimizeImages();

// Horizontal Scroll for Portfolio
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioWrapper = document.querySelector('.portfolio-scroll-wrapper');

if (portfolioWrapper && portfolioGrid) {
    portfolioWrapper.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            portfolioWrapper.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    });
}

// Add scroll event listener for mobile detection
let hasTouch = false;
document.addEventListener('touchstart', () => {
    hasTouch = true;
}, false);

// Apply mobile-specific behavior
if (hasTouch) {
    document.body.classList.add('is-touch');
}

// Window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Update intersection observer on resize
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }, 100);
});
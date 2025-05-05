// Portfolio Carousel
class PortfolioCarousel {
    constructor() {
        this.carousel = document.querySelector('.portfolio-carousel');
        this.slides = document.querySelectorAll('.portfolio-slide');
        this.prevBtn = document.querySelector('.portfolio-prev');
        this.nextBtn = document.querySelector('.portfolio-next');
        this.dots = document.querySelectorAll('.portfolio-dot');
        this.slideWidth = 0;
        this.currentIndex = 0;
        this.slidesPerView = 3;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.maxSlides = this.slides.length;
        
        if (this.carousel && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Determinar cuántos slides por vista según viewport
        this.updateSlidesPerView();
        
        // Calcular ancho de slides
        this.calculateSlideWidth();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Actualizar botones iniciales
        this.updateButtons();
        
        // Inicializar posición
        this.goToSlide(0);
    }
    
    updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            this.slidesPerView = 1;
        } else if (window.innerWidth <= 1024) {
            this.slidesPerView = 2;
        } else {
            this.slidesPerView = 3;
        }
    }
    
    calculateSlideWidth() {
        if (!this.carousel || this.slides.length === 0) return;
        
        // Calcular ancho basado en slidesPerView
        const containerWidth = this.carousel.parentElement.clientWidth;
        
        if (this.slidesPerView === 1) {
            this.slideWidth = containerWidth;
        } else {
            // Calcular ancho incluyendo gap
            const gap = 30; // Gap entre slides en px
            this.slideWidth = (containerWidth - (gap * (this.slidesPerView - 1))) / this.slidesPerView;
        }
        
        // Aplicar ancho a los slides
        this.slides.forEach(slide => {
            slide.style.width = `${this.slideWidth}px`;
            slide.style.minWidth = `${this.slideWidth}px`;
            slide.style.marginRight = this.slidesPerView > 1 ? '30px' : '0';
        });
    }
    
    setupEventListeners() {
        // Botones de navegación
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots de paginación
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
        }
        
        // Touch events para móvil
        if (this.carousel) {
            this.carousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            });
            
            this.carousel.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
        }
        
        // Resize window
        window.addEventListener('resize', () => {
            // Recalcular todo al cambiar el tamaño
            this.updateSlidesPerView();
            this.calculateSlideWidth();
            this.goToSlide(this.currentIndex);
            this.updateButtons();
        });
        
        // Cambiar slides al hacer clic en portfolio-filter
        const portfolioFilters = document.querySelectorAll('.portfolio-filter');
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Resetear carrusel cuando se cambia el filtro
                setTimeout(() => {
                    this.updateVisibleSlides();
                    this.goToSlide(0);
                }, 100);
            });
        });
    }
    
    updateVisibleSlides() {
        // Contar slides visibles
        let visibleCount = 0;
        this.slides.forEach(slide => {
            if (window.getComputedStyle(slide).display !== 'none') {
                visibleCount++;
            }
        });
        
        // Si no hay slides visibles, no hacer nada
        if (visibleCount === 0) return;
        
        // Actualizar máximo de slides
        this.maxSlides = visibleCount;
        
        // Recalcular dots
        this.updateDots();
    }
    
    updateDots() {
        if (!this.dots) return;
        
        const totalDots = Math.ceil(this.maxSlides / this.slidesPerView);
        
        // Ocultar todos los dots
        this.dots.forEach((dot, i) => {
            if (i < totalDots) {
                dot.style.display = 'block';
            } else {
                dot.style.display = 'none';
            }
        });
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }
    
    nextSlide() {
        const maxIndex = Math.ceil(this.maxSlides / this.slidesPerView) - 1;
        if (this.currentIndex < maxIndex) {
            this.goToSlide(this.currentIndex + 1);
        }
    }
    
    goToSlide(index) {
        if (!this.carousel) return;
        
        this.currentIndex = index;
        
        // Calcular posición
        const position = index * this.slideWidth * this.slidesPerView;
        
        // Aplicar transformación
        this.carousel.style.transform = `translateX(-${position}px)`;
        
        // Actualizar dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Actualizar botones
        this.updateButtons();
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
        }
        
        const maxIndex = Math.ceil(this.maxSlides / this.slidesPerView) - 1;
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
            this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (diff > swipeThreshold) {
            // Swipe izquierda, ir al siguiente
            this.nextSlide();
        } else if (diff < -swipeThreshold) {
            // Swipe derecha, ir al anterior
            this.prevSlide();
        }
    }
}

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioCarousel();
});
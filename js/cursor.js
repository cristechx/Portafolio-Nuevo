// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.isHovering = false;
        this.isClicking = false;
        
        this.init();
    }
    
    init() {
        // Check if device has mouse capabilities
        if (!window.matchMedia("(pointer: coarse)").matches) {
            this.setupCursor();
            this.addEventListeners();
        } else {
            // Hide cursor on touch devices
            this.cursor.style.display = 'none';
            this.cursorFollower.style.display = 'none';
        }
    }
    
    setupCursor() {
        this.cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.followerPosition = { x: this.cursorPosition.x, y: this.cursorPosition.y };
    }
    
    addEventListeners() {
        // Mouse move event for cursor
        document.addEventListener('mousemove', (e) => {
            this.cursorPosition.x = e.clientX;
            this.cursorPosition.y = e.clientY;
            
            this.updateCursorPosition();
        });
        
        // Mouse down event
        document.addEventListener('mousedown', () => {
            this.isClicking = true;
            this.cursor.style.transform = 'scale(0.8)';
            this.cursorFollower.style.transform = 'scale(1.3)';
        });
        
        // Mouse up event
        document.addEventListener('mouseup', () => {
            this.isClicking = false;
            this.updateCursorState();
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget) {
                this.cursor.style.opacity = '0';
                this.cursorFollower.style.opacity = '0';
            }
        });
        
        // Show cursor when mouse enters window
        document.addEventListener('mouseover', () => {
            this.cursor.style.opacity = '1';
            this.cursorFollower.style.opacity = '1';
        });
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .portfolio-item, .social-icon, .nav-link, .portfolio-filter');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.cursor.classList.add('pointer');
                this.cursorFollower.classList.add('pointer');
            });
            
            element.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.cursor.classList.remove('pointer');
                this.cursorFollower.classList.remove('pointer');
            });
        });
        
        // Start animation loop
        this.animateCursor();
    }
    
    updateCursorPosition() {
        this.cursor.style.transform = `translate(${this.cursorPosition.x}px, ${this.cursorPosition.y}px)`;
    }
    
    updateCursorState() {
        if (!this.isClicking) {
            this.cursor.style.transform = this.isHovering ? 'scale(1.5)' : 'scale(1)';
            this.cursorFollower.style.transform = this.isHovering ? 'scale(1.2)' : 'scale(1)';
        }
    }
    
    animateCursor() {
        // Smooth animation for cursor follower
        const lerp = (start, end, factor) => {
            return start + (end - start) * factor;
        };
        
        const animate = () => {
            // Smoothly interpolate follower position
            this.followerPosition.x = lerp(this.followerPosition.x, this.cursorPosition.x, 0.15);
            this.followerPosition.y = lerp(this.followerPosition.y, this.cursorPosition.y, 0.15);
            
            // Update follower position
            this.cursorFollower.style.transform = `translate(${this.followerPosition.x}px, ${this.followerPosition.y}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});

// Cursor effect for magnetic elements
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(element => {
    let rect;
    
    element.addEventListener('mouseenter', () => {
        rect = element.getBoundingClientRect();
    });
    
    element.addEventListener('mousemove', (e) => {
        if (!rect) return;
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        const deltaX = (x - xCenter) / 3;
        const deltaY = (y - yCenter) / 3;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// Smooth cursor transition for inputs
const inputElements = document.querySelectorAll('input, textarea');

inputElements.forEach(input => {
    input.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').style.mixBlendMode = 'normal';
        document.querySelector('.cursor').style.background = 'rgba(255, 255, 255, 0.5)';
    });
    
    input.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').style.mixBlendMode = 'difference';
        document.querySelector('.cursor').style.background = '';
    });
});
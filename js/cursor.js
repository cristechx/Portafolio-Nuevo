// Corrección para cursor.js
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        // Verificar si los elementos existen
        if (!this.cursor || !this.cursorFollower) {
            console.warn('Elementos del cursor personalizado no encontrados');
            return;
        }
        
        // Detección mejorada de dispositivos táctiles
        this.isTouchDevice = ('ontouchstart' in window) || 
                            (navigator.maxTouchPoints > 0) || 
                            (navigator.msMaxTouchPoints > 0);
        
        // Si es un dispositivo táctil, desactivar el cursor personalizado
        if (this.isTouchDevice) {
            this.disableCursor();
            return;
        }
        
        this.isHovering = false;
        this.isClicking = false;
        
        this.init();
    }
    
    disableCursor() {
        // Ocultar cursor personalizado y restaurar cursor del sistema
        if (this.cursor) this.cursor.style.display = 'none';
        if (this.cursorFollower) this.cursorFollower.style.display = 'none';
        
        // Eliminar la propiedad cursor: none del HTML y body
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        
        // Añadir clase para identificar dispositivos táctiles
        document.body.classList.add('is-touch-device');
    }
    
    // El resto del código se mantiene igual...
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', () => {
    // Detección de dispositivo táctil antes de inicializar el cursor
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
        // Para dispositivos táctiles, restaurar cursor normal
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        document.body.classList.add('is-touch-device');
        
        // Ocultar elementos del cursor personalizado
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        
        console.log('Dispositivo táctil detectado, cursor personalizado desactivado');
    } else {
        // Solo inicializar cursor en dispositivos no táctiles
        try {
            new CustomCursor();
        } catch (error) {
            console.error('Error al inicializar el cursor personalizado:', error);
        }
    }
});
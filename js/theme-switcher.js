// Clase para manejar el cambio de temas
class ThemeSwitcher {
    constructor() {
        this.body = document.body;
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.currentTheme = localStorage.getItem('theme') || 'default';
        this.mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
        this.mobileThemePanel = document.querySelector('.mobile-theme-panel');
        this.mobileThemeClose = document.querySelector('.mobile-theme-close');
        
        // Verificar si hay botones de tema antes de inicializar
        if (this.themeButtons.length === 0) {
            console.warn('No se encontraron botones de tema');
        }
        
        this.init();
    }
    
    init() {
        // Establecer tema inicial
        this.setTheme(this.currentTheme);
        
        // Añadir event listeners a los botones de tema
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.setTheme(theme);
                this.updateActiveButton(theme);
            });
        });
        
        // Event listener para mostrar/ocultar el panel en móvil
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', () => {
                this.toggleMobileThemePanel();
            });
        }
        
        // Event listener para cerrar el panel móvil
        if (this.mobileThemeClose) {
            this.mobileThemeClose.addEventListener('click', () => {
                this.mobileThemePanel.classList.remove('active');
            });
        }
        
        // Cerrar panel al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (this.mobileThemePanel && 
                this.mobileThemePanel.classList.contains('active') && 
                !this.mobileThemePanel.contains(e.target) && 
                this.mobileThemeToggle && 
                !this.mobileThemeToggle.contains(e.target)) {
                this.mobileThemePanel.classList.remove('active');
            }
        });
        
        // Marcar el botón del tema actual como activo
        this.updateActiveButton(this.currentTheme);
    }
    
    setTheme(theme) {
        // Guardar tema en localStorage
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Aplicar el tema al body
        this.body.setAttribute('data-theme', theme);
    }
    
    // Asegúrate de actualizar correctamente el tema activo
    updateActiveButton(theme) {
        // Quitar clase activa de todos los botones
        this.themeButtons.forEach(btn => {
            btn.classList.remove('active');
            
            // Añadir clase activa al botón del tema actual
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        
        // Añade un console.log para depuración
        console.log('Tema actualizado a:', theme);
    }
    toggleMobileThemePanel() {
        if (this.mobileThemePanel) {
            this.mobileThemePanel.classList.toggle('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        new ThemeSwitcher();
    } catch (error) {
        console.error('Error al inicializar el selector de temas:', error);
    }
});
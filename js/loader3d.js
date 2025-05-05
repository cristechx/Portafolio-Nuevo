// Corrige el archivo loader3d.js
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');
    const texts = document.querySelectorAll('.loader-3d-text');
    
    // Verificar si los elementos existen
    if (!loader) {
        console.warn('Elemento .page-loader no encontrado');
        document.body.classList.add('page-loaded'); // Forzar carga aunque no exista loader
        return;
    }
    
    // Función de finalización modificada para garantizar que el contenido se muestre
    function finishLoading() {
        // Añadir clase para mostrar el contenido
        document.body.classList.add('page-loaded');
        
        // Ocultar el cargador
        loader.classList.add('hidden');
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
        
        // Forzar visibilidad de las secciones
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.classList.add('visible');
        });
        
        console.log('Carga finalizada, contenido visible');
    }
    
    // Si no hay textos de animación o hay pocos, finalizar carga inmediatamente
    if (!texts || texts.length < 2) {
        finishLoading();
        return;
    }
    
    // Resto del código original...
    
    // Agregar un temporizador de seguridad para forzar la carga si tarda demasiado
    setTimeout(finishLoading, 2000); // 15 segundos máximo de espera
    
    // Secuencia normal de animación...
    const timeline = [
        { index: 0, duration: 2000 }, // Reducir tiempos de espera
        { index: 1, duration: 3000 }
    ];
    
    function showText(index) {
        if (index >= texts.length) {
            finishLoading();
            return;
        }
        
        const text = texts[index];
        const duration = timeline[index].duration;
        
        // Mostrar texto
        text.classList.remove('hidden');
        text.classList.add('animate-in');
        
        setTimeout(() => {
            // Ocultar texto
            text.classList.remove('animate-in');
            text.classList.add('animate-out');
            
            setTimeout(() => {
                text.classList.add('hidden');
                text.classList.remove('animate-out');
                showText(index + 1);
            }, 1000);
        }, duration);
    }
    
    // Iniciar la secuencia
    showText(0);
});
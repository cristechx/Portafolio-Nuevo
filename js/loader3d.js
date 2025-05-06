// Loader3D optimizado
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');
    const texts = document.querySelectorAll('.loader-3d-text');
    
    // Si no existen elementos, no hacer nada
    if (!loader || !texts.length) {
        document.body.classList.add('page-loaded');
        return;
    }
    
    // Función para finalizar carga
    function finishLoading() {
        loader.classList.add('hidden');
        document.body.classList.add('page-loaded');
        
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
        }, 1000);
    }
    
    // Mostrar el primer texto animado
    if (texts[0]) {
        texts[0].classList.remove('hidden');
        texts[0].classList.add('animate-in');
    }
    
    // Limitar tiempo de carga (no más de 4 segundos en total)
    setTimeout(finishLoading, 4000);
    
    // Detectar si la página ya cargó completamente
    if (document.readyState === 'complete') {
        finishLoading();
    } else {
        window.addEventListener('load', finishLoading);
    }
});
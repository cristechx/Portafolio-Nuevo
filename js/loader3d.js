// 3D Loader Controller (Versión Lenta)
class Loader3D {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        this.texts = document.querySelectorAll('.loader-3d-text');
        this.progressBar = document.querySelector('.loader-progress-bar');
        this.currentTextIndex = 0;
        this.animationTimeline = [
            { text: 'Portafolio', duration: 10000 }, // 10 segundos
            { text: 'Cristian Garcia', duration: 6000 } // 6 segundos
        ];
    }
    
    init() {
        this.startLoadingSequence();
    }
    
    startLoadingSequence() {
        // Esperar a que el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', () => {
            this.animateText(0);
        });
    }
    
    animateText(index) {
        if (index >= this.texts.length) {
            // Terminar la secuencia
            setTimeout(() => {
                this.finishLoading();
            }, 1000);
            return;
        }
        
        const currentText = this.texts[index];
        const textData = this.animationTimeline[index];
        
        // Mostrar texto actual
        currentText.classList.remove('hidden');
        currentText.classList.add('animate-in');
        
        // Después del tiempo especificado, ocultar el texto actual y mostrar el siguiente
        setTimeout(() => {
            currentText.classList.remove('animate-in');
            currentText.classList.add('animate-out');
            
            setTimeout(() => {
                currentText.classList.add('hidden');
                currentText.classList.remove('animate-out');
                this.animateText(index + 1);
            }, 1500); // Tiempo de salida más lento
        }, textData.duration);
    }
    
    finishLoading() {
        // Ocultar el loader
        this.loader.classList.add('hidden');
        document.body.classList.add('page-loaded');
        
        // Eliminar el loader del DOM después de la transición
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 1000);
    }
}

// Inicializar el loader
const loader3D = new Loader3D();
loader3D.init();

// CSS actualizado para que los textos sean más visibles
const style = document.createElement('style');
style.textContent = `
    /* 3D Page Loader - Versión Mejorada */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 1s ease, visibility 1s ease;
    }

    .page-loader.hidden {
        opacity: 0;
        visibility: hidden;
    }

    .loader-content {
        text-align: center;
        position: relative;
        perspective: 2000px;
    }

    .loader-3d-scene {
        position: relative;
        width: 100%;
        height: 150px;
        margin-bottom: 80px;
    }

    .loader-3d-text {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(3rem, 10vw, 8rem);
        font-weight: 800;
        color: #fff;
        letter-spacing: -3px;
        text-transform: uppercase;
        background: linear-gradient(45deg, #1CB698, #32CD32, #1CB698);
        background-size: 200% 200%;
        animation: gradientMove 3s ease infinite, textGlow 2s ease-in-out infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 
            0 0 30px rgba(28, 182, 152, 0.7),
            0 0 60px rgba(28, 182, 152, 0.5),
            0 0 90px rgba(28, 182, 152, 0.3);
        filter: drop-shadow(0 0 20px rgba(28, 182, 152, 0.5));
    }

    @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes textGlow {
        0% { text-shadow: 0 0 30px rgba(28, 182, 152, 0.7), 0 0 60px rgba(28, 182, 152, 0.5); }
        50% { text-shadow: 0 0 40px rgba(28, 182, 152, 1), 0 0 80px rgba(28, 182, 152, 0.8); }
        100% { text-shadow: 0 0 30px rgba(28, 182, 152, 0.7), 0 0 60px rgba(28, 182, 152, 0.5); }
    }

    .loader-3d-text.hidden {
        opacity: 0;
        transform: translateX(-50%) scale(0.5) rotateY(90deg);
        pointer-events: none;
    }

    .loader-3d-text.animate-in {
        animation: textEnter 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes textEnter {
        0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.3) rotateY(-180deg) translateZ(-500px);
            filter: blur(50px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) scale(1) rotateY(0deg) translateZ(0);
            filter: blur(0);
        }
    }

    .loader-3d-text.animate-out {
        animation: textExit 1.5s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
    }

    @keyframes textExit {
        0% {
            opacity: 1;
            transform: translateX(-50%) scale(1) rotateY(0deg) translateZ(0);
            filter: blur(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) scale(0.3) rotateY(180deg) translateZ(-500px);
            filter: blur(50px);
        }
    }

    .loader-progress {
        width: 400px;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 0 0 10px rgba(28, 182, 152, 0.3);
    }

    .loader-progress-bar {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #1CB698, #32CD32, #1CB698);
        background-size: 200% 100%;
        animation: 
            loadingProgress 16s ease-out forwards,
            gradientMove 2s ease infinite;
        border-radius: 4px;
        position: relative;
        box-shadow: 0 0 20px rgba(28, 182, 152, 0.7);
    }

    @keyframes loadingProgress {
        0% { width: 0%; }
        15% { width: 10%; }
        63% { width: 50%; }
        100% { width: 100%; }
    }

    /* Partículas mejoradas */
    .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        opacity: 0.8;
    }

    .particle {
        position: absolute;
        background: #1CB698;
        border-radius: 50%;
        animation: particleAnimation 6s linear infinite;
        box-shadow: 0 0 15px rgba(28, 182, 152, 0.7);
    }

    @keyframes particleAnimation {
        0% {
            transform: translate(0, 100vh) scale(0);
            opacity: 0;
        }
        5% {
            opacity: 1;
        }
        95% {
            opacity: 1;
        }
        100% {
            transform: translate(0, -100px) scale(1.5);
            opacity: 0;
        }
    }

    /* Efecto de ondas expandiendo */
    .loader-3d-scene::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        height: 400px;
        transform: translate(-50%, -50%);
        border: 2px solid rgba(28, 182, 152, 0.3);
        border-radius: 50%;
        animation: expandingWave 4s ease-out infinite;
    }

    @keyframes expandingWave {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.3;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    /* Mobile Adjustments */
    @media (max-width: 768px) {
        .loader-3d-text {
            font-size: clamp(2rem, 15vw, 5rem);
        }
        
        .loader-progress {
            width: 85%;
            max-width: 300px;
        }
    }
`;
document.head.appendChild(style);
// Controlador del formulario de contacto
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.formGroups = this.form?.querySelectorAll('.form-group');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.setupFormValidation();
        this.setupFormSubmit();
    }
    
    setupFormValidation() {
        // Validar cada campo al perder el foco
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            // También validar mientras se escribe, pero con delay
            let typingTimer;
            field.addEventListener('input', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    this.validateField(field);
                }, 500);
            });
        });
    }
    
    validateField(field) {
        const formGroup = field.closest('.form-group');
        
        // Eliminar mensajes de error previos
        const prevError = formGroup.querySelector('.error-message');
        if (prevError) {
            prevError.remove();
        }
        
        // Quitar clases de error o éxito previas
        field.classList.remove('is-invalid', 'is-valid');
        
        if (field.value.trim() === '') {
            // Campo vacío
            if (field.hasAttribute('required')) {
                this.showError(field, 'Este campo es obligatorio');
            }
            return false;
        }
        
        // Validaciones específicas por tipo
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showError(field, 'Por favor, introduce un email válido');
                return false;
            }
        }
        
        // Si llega aquí, el campo es válido
        field.classList.add('is-valid');
        return true;
    }
    
    showError(field, message) {
        // Añadir clase de error
        field.classList.add('is-invalid');
        
        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insertar después del campo
        const formGroup = field.closest('.form-group');
        formGroup.appendChild(errorDiv);
    }
    
    validateForm() {
        let isValid = true;
        
        // Validar todos los campos
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    setupFormSubmit() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validar formulario completo
            if (!this.validateForm()) {
                return;
            }
            
            // Deshabilitar botón para evitar múltiples envíos
            if (this.submitBtn) {
                this.submitBtn.disabled = true;
                this.submitBtn.innerHTML = `
                    <span>Enviando...</span>
                    <i class="fa-solid fa-circle-notch fa-spin"></i>
                `;
            }
            
            // Preparar datos del formulario
            const formData = new FormData(this.form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Enviar por Email
            this.sendByEmail(data);
        });
    }
    
    sendByEmail(data) {
        // Crear mailto link
        const subject = encodeURIComponent(`Consulta desde portafolio de ${data.name}`);
        const body = encodeURIComponent(`
Nombre: ${data.name}
Email: ${data.email}
Asunto: ${data.subject}

Mensaje:
${data.message}`);
        
        const mailtoLink = `mailto:Cristianpulido672@gmail.com?subject=${subject}&body=${body}`;
        
        // Abrir cliente de email
        window.location.href = mailtoLink;
        
        // Restaurar botón y mostrar mensaje de éxito
        setTimeout(() => {
            if (this.submitBtn) {
                this.submitBtn.disabled = false;
                this.submitBtn.innerHTML = `
                    <span>Enviar Mensaje</span>
                    <i class="fa-solid fa-paper-plane"></i>
                `;
            }
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage();
            
            // Limpiar formulario
            this.form.reset();
            
            // Quitar clases de validación
            this.form.querySelectorAll('.is-valid').forEach(field => {
                field.classList.remove('is-valid');
            });
        }, 1000);
    }
    
    showSuccessMessage() {
        // Crear overlay para mensaje de éxito
        const successOverlay = document.createElement('div');
        successOverlay.className = 'form-message-overlay';
        
        successOverlay.innerHTML = `
            <div class="form-success-message">
                <div class="success-icon">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                <button class="close-message-btn">Cerrar</button>
            </div>
        `;
        
        // Añadir al DOM
        document.body.appendChild(successOverlay);
        
        // Añadir clase para mostrar con animación
        setTimeout(() => {
            successOverlay.classList.add('active');
        }, 10);
        
        // Cerrar al hacer clic en el botón
        successOverlay.querySelector('.close-message-btn').addEventListener('click', () => {
            successOverlay.classList.remove('active');
            setTimeout(() => {
                successOverlay.remove();
            }, 300);
        });
        
        // Cerrar automáticamente después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(successOverlay)) {
                successOverlay.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(successOverlay)) {
                        successOverlay.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Inicializar el formulario
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
// Translation system
const translations = {
    es: {
        "loading": "Cargando...",
        "nav.home": "Inicio",
        "nav.about": "Sobre Mí",
        "nav.skills": "Skills",
        "nav.experience": "Experiencia",
        "nav.portfolio": "Portfolio",
        "nav.career": "Carrera",
        "nav.contact": "Contacto",
        "hero.subtitle": "Desarrollador Web & UI/UX Designer",
        "about.title": "Sobre Mí",
        "about.intro1": "¡Hola! Soy <strong>Cristian Garcia</strong>, desarrollador web especializado en WordPress y desarrollo de plugins a medida. Mi experiencia incluye herramientas avanzadas como <strong>JetEngine</strong> y <strong>Crocoblock</strong>, así como múltiples lenguajes de programación.",
        "about.intro2": "Certificado en <strong>ISO 27001</strong>, me enfoco en crear soluciones innovadoras, seguras y altamente funcionales.",
        "about.phone": "Teléfono",
        "about.location": "Ubicación",
        "about.downloadCV": "Descargar CV",
        "interests.games": "Juegos",
        "interests.music": "Música",
        "interests.travel": "Viajar",
        "interests.tech": "Tecnología",
        "interests.photo": "Fotografía",
        "interests.books": "Libros",
        "skills.title": "Skills",
        "skills.technicalTitle": "Habilidades Técnicas",
        "skills.professionalTitle": "Habilidades Profesionales",
        "skills.databases": "Bases de Datos",
        "skills.communication": "Comunicación",
        "skills.teamwork": "Trabajo en Equipo",
        "skills.creativity": "Creatividad",
        "skills.selfTaught": "Autodidacta",
        "skills.curiosity": "Curiosidad",
        "experience.title": "Experiencia",
        "experience.educationTitle": "Educación y Certificaciones",
        "experience.workTitle": "Experiencia Laboral",
        "experience.current": "2024 - Actualidad",
        "experience.iso": "Desarrollé habilidades en ciberseguridad y principios fundamentales de la norma ISO 27001.",
        "experience.softwareDiploma": "Diplomado en Desarrollo de Software",
        "experience.softwareDesc": "Obtención de conocimientos especializados en el ciclo de vida del desarrollo de software.",
        "experience.techDegree": "Tecnólogo en Desarrollo de Sistemas",
        "experience.techDesc": "Especializado en desarrollo e implementación de soluciones tecnológicas.",
        "experience.wordpressDeveloper": "Desarrollador WordPress",
        "experience.wordpressDesc": "Especializado en sitios web responsivos, SEO, Elementor Pro, JetEngine y desarrollo de plugins personalizados. Gestión avanzada de cPanel y migraciones.",
        "experience.frontendDeveloper": "Desarrollador Front-End",
        "experience.freelance": "Freelance",
        "experience.freelanceDesc": "Enfoque en desarrollo web full-stack, optimización SEO y certificación ISO 27001.",
        "experience.webDeveloper": "Desarrollador Web",
        "experience.manpowerDesc": "Capacitación en Angular, Java, React y metodologías ágiles.",
        "portfolio.title": "Portfolio",
        "portfolio.all": "Todo",
        "portfolio.agencies": "Agencias",
        "portfolio.personal": "Personales",
        "portfolio.mobile": "Móviles",
        "portfolio.viewProject": "Ver Proyecto",
        "portfolio.photography": "Web Fotografía",
        "portfolio.personalProject": "Proyecto Personal",
        "contact.title": "¿Tienes un proyecto en mente?",
        "contact.subtitle": "Estoy disponible para nuevos proyectos. ¡Hablemos!",
        "contact.sendEmail": "Enviar Email",
        "contact.callNow": "Llamar Ahora",
        "footer.copyright": "© 2024 Cristian Garcia. Todos los derechos reservados."
    },
    en: {
        "loading": "Loading...",
        "nav.home": "Home",
        "nav.about": "About Me",
        "nav.skills": "Skills",
        "nav.experience": "Experience",
        "nav.portfolio": "Portfolio",
        "nav.career": "Career",
        "nav.contact": "Contact",
        "hero.subtitle": "Web Developer & UI/UX Designer",
        "about.title": "About Me",
        "about.intro1": "Hello! I'm <strong>Cristian Garcia</strong>, a web developer specialized in WordPress and custom plugin development. My experience includes advanced tools like <strong>JetEngine</strong> and <strong>Crocoblock</strong>, as well as multiple programming languages.",
        "about.intro2": "Certified in <strong>ISO 27001</strong>, I focus on creating innovative, secure, and highly functional solutions.",
        "about.phone": "Phone",
        "about.location": "Location",
        "about.downloadCV": "Download CV",
        "interests.games": "Games",
        "interests.music": "Music",
        "interests.travel": "Travel",
        "interests.tech": "Technology",
        "interests.photo": "Photography",
        "interests.books": "Books",
        "skills.title": "Skills",
        "skills.technicalTitle": "Technical Skills",
        "skills.professionalTitle": "Professional Skills",
        "skills.databases": "Databases",
        "skills.communication": "Communication",
        "skills.teamwork": "Teamwork",
        "skills.creativity": "Creativity",
        "skills.selfTaught": "Self-taught",
        "skills.curiosity": "Curiosity",
        "experience.title": "Experience",
        "experience.educationTitle": "Education & Certifications",
        "experience.workTitle": "Work Experience",
        "experience.current": "2024 - Present",
        "experience.iso": "Developed cybersecurity skills and fundamental principles of ISO 27001 standard.",
        "experience.softwareDiploma": "Software Development Diploma",
        "experience.softwareDesc": "Obtained specialized knowledge in software development lifecycle.",
        "experience.techDegree": "System Development Technologist",
        "experience.techDesc": "Specialized in development and implementation of technology solutions.",
        "experience.wordpressDeveloper": "WordPress Developer",
        "experience.wordpressDesc": "Specialized in responsive websites, SEO, Elementor Pro, JetEngine, and custom plugin development. Advanced cPanel management and migrations.",
        "experience.frontendDeveloper": "Front-End Developer",
        "experience.freelance": "Freelance",
        "experience.freelanceDesc": "Focus on full-stack web development, SEO optimization, and ISO 27001 certification.",
        "experience.webDeveloper": "Web Developer",
        "experience.manpowerDesc": "Training in Angular, Java, React, and agile methodologies.",
        "portfolio.title": "Portfolio",
        "portfolio.all": "All",
        "portfolio.agencies": "Agencies",
        "portfolio.personal": "Personal",
        "portfolio.mobile": "Mobile",
        "portfolio.viewProject": "View Project",
        "portfolio.photography": "Photography Web",
        "portfolio.personalProject": "Personal Project",
        "contact.title": "Have a project in mind?",
        "contact.subtitle": "I'm available for new projects. Let's talk!",
        "contact.sendEmail": "Send Email",
        "contact.callNow": "Call Now",
        "footer.copyright": "© 2024 Cristian Garcia. All rights reserved."
    }
};

// Language switcher class
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'es';
        this.init();
    }
    
    init() {
        this.updateLanguage(this.currentLang);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.updateLanguage(lang);
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    updateLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[lang][key];
            if (translation) {
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Update active button
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Initialize language manager
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
});
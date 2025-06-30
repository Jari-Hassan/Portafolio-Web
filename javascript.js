// Configuración inicial de scroll
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    // Asegurar scroll al inicio
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 50);

    // Inicializar funcionalidades (sin tema claro/oscuro)
    // Forzar modo oscuro siempre
    document.body.classList.add('dark-mode');
    initNavigation();
    initScrollIndicator();
    initParticles();
    initSmoothScroll();
    initContactForm();
    initLanguageToggle();
    initMobileMenu();
});

// Eliminada la función de cambio de tema, modo oscuro siempre activo

// Navegación y scroll activo
function initNavigation() {
    const navItems = document.querySelectorAll('.navbar .nav-item');
    const sections = Array.from(navItems).map(btn => document.getElementById(btn.dataset.section));

    navItems.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const sectionId = btn.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    function updateActiveNavOnScroll() {
        let scrollPos = window.scrollY + window.innerHeight / 3;
        let activeIdx = 0;
        
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            if (sec && sec.offsetTop <= scrollPos) {
                activeIdx = i;
            }
        }
        
        navItems.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === activeIdx);
        });
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll();
}

// Indicador de scroll
function initScrollIndicator() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = percent + '%';
    });
}

// Partículas de fondo
function initParticles() {
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        particlesContainer.innerHTML = '';
        const count = window.innerWidth < 700 ? 18 : 36;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 18 + 8;
            particle.style.width = particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.18 + 0.07;
            particle.style.animationDuration = (8 + Math.random() * 8) + 's';
            particle.style.background = Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    window.addEventListener('resize', createParticles);
}

// Scroll suave para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showSuccessPopup();
                contactForm.reset();
            } else {
                alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
            }
        })
        .catch(() => {
            alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
        });
    });
}

// Popup de éxito
function showSuccessPopup() {
    let popup = document.getElementById('popup-exito');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup-exito';
        popup.className = 'popup-exito';
        popup.innerHTML = `
            <div class="popup-exito-content">
                <h3>
                    <span class="lang-es">¡Mensaje enviado!</span>
                    <span class="lang-en" style="display:none;">Message sent!</span>
                </h3>
                <p>
                    <span class="lang-es">Gracias por contactarme. Te responderé pronto.</span>
                    <span class="lang-en" style="display:none;">Thank you for contacting me. I will reply soon.</span>
                </p>
                <button id="cerrar-popup" class="btn btn-primary">
                    <span class="lang-es">Cerrar</span>
                    <span class="lang-en" style="display:none;">Close</span>
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }
    
    popup.style.display = 'flex';
    
    document.getElementById('cerrar-popup').onclick = () => {
        popup.style.display = 'none';
    };
    
    popup.onclick = (e) => {
        if (e.target === popup) popup.style.display = 'none';
    };
}

// Cambio de idioma
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    langToggle.addEventListener('click', function() {
        const esElements = document.querySelectorAll('.lang-es');
        const enElements = document.querySelectorAll('.lang-en');
        const isSpanish = esElements[0].style.display !== 'none';
        
        esElements.forEach(el => el.style.display = isSpanish ? 'none' : '');
        enElements.forEach(el => el.style.display = isSpanish ? '' : 'none');
        
        this.textContent = isSpanish ? 'ES' : 'EN';
    });
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });
}

// Quitar focus de los enlaces de proyecto al volver o recargar
window.addEventListener('pageshow', () => {
    document.querySelectorAll('.project-link-card').forEach(link => link.blur());
});
window.addEventListener('focus', () => {
    document.querySelectorAll('.project-link-card').forEach(link => link.blur());
});


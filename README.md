# 🚀 Portfolio Personal - Jari Hassan

## 📋 Descripción

Portafolio personal de Jari Hassan, estudiante de Ingeniería de Software especializado en desarrollo web full-stack. Este sitio web está diseñado con las mejores prácticas modernas de desarrollo web, enfocándose en UX/UI, accesibilidad, rendimiento y SEO.

## ✨ Características Principales

### 🎨 Diseño y UX/UI
- **Modo oscuro** forzado por defecto para una experiencia visual moderna
- **Diseño responsive** que se adapta a todos los dispositivos
- **Microinteracciones** suaves y animaciones CSS optimizadas
- **Interfaz glassmorphism** con efectos de blur y transparencia
- **Partículas animadas** de fondo para mayor dinamismo

### ♿ Accesibilidad (WCAG 2.1)
- **Estructura semántica** con HTML5 y roles ARIA
- **Navegación por teclado** completamente funcional
- **Lectores de pantalla** compatibles con aria-labels y live regions
- **Skip-link** para navegación rápida al contenido principal
- **Focus visible** mejorado para indicadores de enfoque
- **Reducción de movimiento** para usuarios con preferencias de accesibilidad

### 🔍 SEO Optimizado
- **Meta tags** completos (title, description, keywords)
- **Open Graph** y Twitter Cards para redes sociales
- **Structured Data** (JSON-LD) para motores de búsqueda
- **Favicon** y iconos para diferentes dispositivos
- **URLs semánticas** y navegación clara

### 📱 Rendimiento
- **Lazy loading** de imágenes para carga optimizada
- **Throttling** en eventos de scroll para mejor performance
- **CSS optimizado** con variables CSS y metodología BEM
- **JavaScript modular** con funciones específicas
- **Compresión** y minificación de recursos

### 🛡️ Seguridad y Privacidad
- **Formulario protegido** con FormSubmit y hash de correo
- **Validación en tiempo real** sin exponer datos sensibles
- **HTTPS ready** para despliegue seguro

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid/Flexbox
- **JavaScript (ES6+)** - Interactividad y funcionalidad
- **FormSubmit** - Manejo seguro de formularios
- **Google Fonts** - Tipografía (Inter + JetBrains Mono)
- **SVG** - Iconos optimizados

## 📁 Estructura del Proyecto

```
portafolio/
├── README.md
├── assets/
│   └── cv-jari-hassan.pdf
├── html/
│   ├── index.html         # Página principal del portafolio
│   ├── gravityflip.html   # Juego Gravity Flip
│   ├── num_secreto.html   # Juego Número Secreto
│   ├── pack&go.html       # Landing page Pack&Go
│   └── task.html          # Proyecto Task Manager
├── css/
│   ├── style.css          # Estilos principales del portafolio
│   ├── gravityflip.css    # Estilos del juego Gravity Flip
│   ├── num_secreto.css    # Estilos del juego Número Secreto
│   ├── pack&go.css        # Estilos de la landing Pack&Go
│   └── task.css           # Estilos del Task Manager
│   └── bola.css           # Estilos adicionales
├── js/
│   ├── javascript.js      # Funcionalidad principal del portafolio
│   ├── gravityflip.js     # JS del juego Gravity Flip
│   ├── num_secreto.js     # JS del juego Número Secreto
│   ├── pack&go.js         # JS de la landing Pack&Go
│   └── task.js            # JS del Task Manager
├── img/
│   └── favicon.png        # Favicon y otras imágenes
└── LICENSE
```

## 🚀 Funcionalidades

### 🏠 Página Principal
- **Hero section** con animaciones de entrada
- **Sección Sobre mí** con habilidades organizadas
- **Proyectos** con tarjetas interactivas
- **Páginas Web** como portafolio adicional
- **Blog técnico** con artículos de ejemplo
- **Formulario de contacto** con validación avanzada

### 🎯 Proyectos Incluidos
1. **Task Manager** - Aplicación de gestión de tareas
2. **Número Secreto** - Juego interactivo de adivinanza
3. **Gravity Flip** - Juego de plataformas con gravedad

### 🎒 Pack&Go – Kits de aventura personalizables
**Pack&Go** es una landing page incluida en este portafolio, desarrollada como ejemplo de proyecto real de e-commerce para experiencias de aventura.  
Incluye:

- **Página principal con hero animado y fondo con partículas**
- **Sección de características** (comodidad, personalización, sostenibilidad, experiencia local)
- **Pasos de compra** visuales y animados
- **Showcase de kit** con tarjetas interactivas y hover animado
- **Planes y precios** con tarjetas escalables y delineado al hacer hover
- **Testimonios** con slider y fotos reales
- **Sección de sostenibilidad** con estadísticas animadas
- **Preguntas frecuentes** (FAQ) con acordeón interactivo
- **Footer completo** con enlaces, redes sociales y newsletter
- **Favicon personalizado**
- **Responsive design** y accesibilidad

**Tecnologías:**  
HTML5, CSS3 (Grid/Flexbox, variables, animaciones), JavaScript modular, FontAwesome, Google Fonts.

### 🌐 Funcionalidades Técnicas
- **Cambio de idioma** (Español/Inglés)
- **Navegación suave** entre secciones
- **Indicador de progreso** de scroll
- **Botón "ir arriba"** con animación
- **Modal de éxito** para formulario

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Instalación y Uso

1. **Clonar el repositorio:**
```bash
git clone https://github.com/jari-upc/portfolio.git
cd portfolio
```

2. **Abrir en navegador:**
```bash
# Abrir index.html directamente o usar un servidor local
python -m http.server 8000
# o
npx serve .
```

3. **Personalizar:**
- Editar contenido en `index.html`
- Modificar estilos en `style.css`
- Ajustar funcionalidad en `javascript.js`
- Reemplazar CV en `assets/cv-jari-hassan.pdf`

## 🎨 Personalización

### Colores y Tema
```css
:root {
    --primary: #6366f1;        /* Color principal */
    --secondary: #ec4899;      /* Color secundario */
    --accent: #10b981;         /* Color de acento */
    --bg-light: #181a1b;       /* Fondo principal */
    --bg-card: rgba(30, 41, 59, 0.92); /* Fondo de tarjetas */
}
```

### Contenido
- Actualizar información personal en las secciones correspondientes
- Modificar proyectos y enlaces
- Cambiar información de contacto
- Actualizar CV y enlaces de redes sociales

## 📈 Lighthouse Score

El sitio está optimizado para obtener altas puntuaciones en:
- **Performance**: 90+ (con imágenes optimizadas)
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

## 🔗 Enlaces y Contacto

- **Portfolio**: [https://jari-upc.github.io/](https://jari-upc.github.io/)
- **LinkedIn**: [linkedin.com/in/jari-hassan](https://linkedin.com/in/Jari-UPC)
- **GitHub**: [github.com/jarihassan](https://github.com/Jari-UPC)
- **Instagram**: [@jarihassan_](https://instagram.com/jarihassan_)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

**Desarrollado por Jari Hassan** | © 2025 Todos los derechos reservados.

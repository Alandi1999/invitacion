# ⚙️ Configuración Avanzada - Invitación de Boda

Este archivo contiene configuraciones avanzadas y mejoras opcionales para tu invitación virtual.

## 🔧 Configuraciones Adicionales

### 1. Personalizar Textos por Defecto

Crea un archivo `config.js` para centralizar la configuración:

```javascript
// config.js
const weddingConfig = {
    // Información de los novios
    bride: "Nombre de la Novia",
    groom: "Nombre del Novio",
    
    // Fecha del evento
    weddingDate: "2025-01-20T18:00:00",
    
    // Ubicaciones
    ceremony: {
        name: "Iglesia San José",
        address: "Av. Principal 123, Ciudad",
        time: "18:00 hrs"
    },
    
    celebration: {
        name: "Salón Los Jardines",
        address: "Calle Secundaria 456, Ciudad",
        time: "20:00 hrs"
    },
    
    // Mensajes personalizados
    messages: {
        heroSubtitle: "Nos casamos y queremos que seas parte de nuestro día especial",
        storyText: "Después de 5 años juntos, hemos decidido dar el siguiente paso...",
        rsvpDeadline: "10 de enero"
    },
    
    // Configuración de colores
    colors: {
        primary: "#D4AF37",
        secondary: "#B8860B",
        accent: "#F7E7A4"
    }
};
```

### 2. Sistema de Confirmación Avanzado

Para un sistema más robusto, puedes integrar con servicios como:

#### Opción A: Google Sheets
```javascript
// Función para enviar a Google Sheets
async function sendToGoogleSheets(formData) {
    const scriptURL = 'TU_GOOGLE_APPS_SCRIPT_URL';
    
    try {
        await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
```

#### Opción B: Netlify Forms
Simplemente agrega `netlify` al formulario:

```html
<form class="rsvp-form" name="wedding-rsvp" method="POST" netlify>
    <!-- Campos del formulario -->
</form>
```

#### Opción C: EmailJS
```javascript
// Configuración EmailJS
emailjs.init("TU_USER_ID");

function sendEmail(formData) {
    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
        name: formData.get('guestName'),
        email: formData.get('guestEmail'),
        attendance: formData.get('attendance'),
        message: formData.get('message')
    });
}
```

### 3. Galería de Fotos Avanzada

Implementa una galería con lightbox:

```html
<!-- Incluir en el head -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>

<!-- Usar en la galería -->
<a href="fotos/galeria/foto1-grande.jpg" data-lightbox="wedding-gallery" data-title="Descripción">
    <img src="fotos/galeria/foto1-thumb.jpg" alt="Descripción">
</a>
```

### 4. Música de Fondo

Agrega música ambiente opcional:

```javascript
// Reproductor de música opcional
class WeddingMusicPlayer {
    constructor() {
        this.audio = new Audio('musica/background.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.3;
        this.isPlaying = false;
    }
    
    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
    }
}

// Agregar botón de música
const musicPlayer = new WeddingMusicPlayer();
document.addEventListener('click', () => {
    // Reproducir después de la primera interacción del usuario
    if (!musicPlayer.isPlaying) {
        musicPlayer.toggle();
    }
}, { once: true });
```

### 5. Mapa Interactivo

Integra Google Maps para mostrar ubicaciones:

```html
<!-- Agregar al HTML -->
<div class="map-container">
    <iframe 
        src="https://www.google.com/maps/embed?pb=TUS_COORDENADAS"
        width="100%" 
        height="300" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

### 6. Sistema de Invitados Personalizado

Crea invitaciones personalizadas usando parámetros URL:

```javascript
// Función para obtener parámetros de URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        guest: params.get('invitado'),
        family: params.get('familia')
    };
}

// Personalizar saludo
function personalizeInvitation() {
    const params = getUrlParams();
    if (params.guest) {
        document.getElementById('guest-name').textContent = 
            `Querido/a ${params.guest}`;
    }
}
```

### 7. PWA (Progressive Web App)

Convierte tu invitación en una PWA:

```json
// manifest.json
{
    "name": "Invitación de Boda - Mirko",
    "short_name": "Boda Mirko",
    "description": "Invitación virtual para nuestro gran día",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#FFF8E7",
    "theme_color": "#D4AF37",
    "icons": [
        {
            "src": "icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

### 8. Analytics y Seguimiento

Agrega Google Analytics para ver estadísticas:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
</script>
```

### 9. Optimización SEO

Mejora el SEO agregando meta tags:

```html
<head>
    <!-- Meta tags SEO -->
    <meta name="description" content="Invitación virtual para la boda de [Nombres] - 20 de enero 2025">
    <meta name="keywords" content="boda, invitación, casamiento, celebración">
    <meta name="author" content="[Nombres de los novios]">
    
    <!-- Open Graph para redes sociales -->
    <meta property="og:title" content="Invitación de Boda - [Nombres]">
    <meta property="og:description" content="Nos casamos el 20 de enero y queremos que seas parte de nuestro día especial">
    <meta property="og:image" content="https://tu-dominio.com/fotos/preview.jpg">
    <meta property="og:url" content="https://tu-dominio.com">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Invitación de Boda - [Nombres]">
    <meta name="twitter:description" content="Nos casamos el 20 de enero y queremos que seas parte de nuestro día especial">
    <meta name="twitter:image" content="https://tu-dominio.com/fotos/preview.jpg">
</head>
```

### 10. Protección con Contraseña

Para invitaciones privadas:

```javascript
// Sistema simple de contraseña
function checkPassword() {
    const password = prompt("Ingresa la contraseña de la invitación:");
    const correctPassword = "AMOR2025"; // Cambia esta contraseña
    
    if (password !== correctPassword) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: serif;">
                <h1>Acceso Restringido</h1>
                <p>Esta invitación es privada.</p>
                <button onclick="location.reload()">Intentar de nuevo</button>
            </div>
        `;
    }
}

// Ejecutar al cargar la página
window.addEventListener('load', checkPassword);
```

## 🚀 Mejoras de Rendimiento

### 1. Optimización de Imágenes
```bash
# Usar herramientas como ImageOptim o TinyPNG
# Formatos recomendados:
# - WebP para mejor compresión
# - JPG para fotos
# - PNG para gráficos con transparencia
```

### 2. Lazy Loading
```html
<!-- Carga perezosa de imágenes -->
<img src="fotos/foto.jpg" loading="lazy" alt="Descripción">
```

### 3. Service Worker para Cache
```javascript
// sw.js
const CACHE_NAME = 'wedding-invitation-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/fotos/pareja-principal.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});
```

## 📊 Métricas y Estadísticas Avanzadas

### Dashboard de Confirmaciones
```javascript
// Crear un dashboard simple para ver estadísticas
function createDashboard() {
    const stats = getWeddingStats();
    const dashboard = `
        <div style="position: fixed; top: 10px; left: 10px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 1000;">
            <h3>📊 Dashboard</h3>
            <p><strong>Total respuestas:</strong> ${stats.total}</p>
            <p><strong>Confirman asistencia:</strong> ${stats.attending}</p>
            <p><strong>No pueden asistir:</strong> ${stats.notAttending}</p>
            <p><strong>Total invitados:</strong> ${stats.totalGuests}</p>
            <button onclick="this.parentElement.remove()">Cerrar</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', dashboard);
}

// Activar con: createDashboard() en la consola
```

## 🔒 Consideraciones de Seguridad

1. **Validación de formularios**: Siempre valida en el frontend Y backend
2. **Sanitización**: Limpia los datos antes de mostrarlos
3. **Rate limiting**: Limita el número de envíos por IP
4. **HTTPS**: Usa siempre conexiones seguras
5. **Backup**: Haz copias de seguridad regulares de las confirmaciones

## 💡 Ideas Adicionales

- **Livestream**: Integra un link de transmisión en vivo para familiares lejanos
- **Libro de firmas digital**: Permite que los invitados dejen mensajes
- **Quiz sobre la pareja**: Juego interactivo sobre los novios
- **Timeline de la relación**: Historia visual de la pareja
- **Información del clima**: API del clima para el día de la boda
- **Sugerencias de regalos**: Lista de regalos integrada
- **Chat en vivo**: Sistema de chat para preguntas

---

¡Con estas configuraciones avanzadas tu invitación será verdaderamente única y profesional!

# 💍 Invitación Virtual de Boda - Mirko

Una elegante invitación virtual para bodas con cuenta regresiva, formulario de confirmación y diseño responsivo.

## ✨ Características

- 🎨 **Diseño Elegante**: Paleta de colores dorados y blancos con tipografías sofisticadas
- ⏰ **Cuenta Regresiva**: Contador automático hasta el día del evento
- 📝 **Formulario RSVP**: Sistema de confirmación de asistencia
- 📱 **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- 🎠 **Carrusel de Fotos**: Galería interactiva con autoplay y navegación táctil
- 🖼️ **Espacios para Fotos**: Placeholders listos para agregar tus fotos
- 💫 **Animaciones**: Efectos visuales elegantes y suaves
- 📊 **Estadísticas**: Sistema para ver confirmaciones de asistencia

## 🚀 Cómo Usar

### 1. Personalización Básica

Abre el archivo `index.html` y modifica la información personal:

```html
<!-- Cambiar los nombres de los novios -->
<span class="bride-name">Tu Nombre</span>
<span class="groom-name">Nombre de tu Pareja</span>

<!-- Modificar la fecha y hora -->
<p class="main-date">20 de Enero, 2025</p>
<p class="time-text">A las 18:00 hrs</p>
```

### 2. Configurar la Fecha del Evento

En el archivo `script.js`, línea 2:

```javascript
// Cambia esta fecha por la fecha real de tu boda
const weddingDate = new Date('2025-01-20T18:00:00').getTime();
```

### 3. Agregar Información del Evento

Modifica los detalles de la ceremonia y celebración:

```html
<!-- Ceremonia -->
<p class="detail-location">Iglesia [Nombre de tu iglesia]</p>
<p class="detail-address">[Dirección completa]</p>

<!-- Celebración -->
<p class="detail-location">Salón [Nombre del salón]</p>
<p class="detail-address">[Dirección completa]</p>
```

### 4. Personalizar el Mensaje

Edita la sección "Nuestra Historia":

```html
<p>Después de [X años juntos], hemos decidido dar el siguiente paso en nuestro amor. 
Te invitamos a ser parte de este momento tan especial donde dos corazones se unirán para siempre.</p>
```

## 📸 Cómo Agregar Fotos

### Reemplazar los Placeholders

1. **Foto Principal del Hero**:
   - Busca: `<div class="photo-placeholder main-photo">`
   - Reemplaza con: `<img src="ruta/a/tu/foto.jpg" alt="Foto de pareja" class="main-photo">`

2. **Fotos de la Historia**:
   - Busca: `<div class="photo-placeholder story-photo">`
   - Reemplaza con: `<img src="ruta/a/tu/foto.jpg" alt="Descripción" class="story-photo">`

3. **Carrusel de Fotos**:
   - Busca: `<div class="photo-placeholder carousel-photo">`
   - Reemplaza con: `<img src="ruta/a/tu/foto.jpg" alt="Descripción" class="carousel-photo">`

### Ejemplo de Reemplazo:

**Antes:**
```html
<div class="photo-placeholder main-photo">
    <i class="fas fa-camera"></i>
    <p>Foto Principal</p>
</div>
```

**Después:**
```html
<img src="fotos/pareja-principal.jpg" alt="Foto principal de la pareja" class="main-photo">
```

## 🎠 Carrusel de Fotos - Funciones Especiales

El carrusel incluye múltiples formas de navegación:

### 🖱️ **Navegación con Mouse**:
- **Flechas**: Clic en las flechas laterales
- **Puntos**: Clic en los puntos indicadores
- **Arrastrar**: Mantén presionado y arrastra para cambiar fotos
- **Botón Play/Pause**: Controla la reproducción automática

### 📱 **Navegación Táctil (Móviles)**:
- **Deslizar**: Desliza hacia la izquierda o derecha
- **Tocar**: Toca los puntos o flechas
- **Autoplay**: Se pausa automáticamente al tocar

### ⌨️ **Navegación con Teclado**:
- **← →**: Flechas izquierda y derecha
- **Espacio**: Play/Pause del autoplay

### ⚙️ **Configuraciones del Carrusel**:
- **Tamaño Grande**: Ocupa 70% de la altura de pantalla para máximo impacto
- **Autoplay**: Cambia automáticamente cada 4 segundos
- **Pausa inteligente**: Se pausa cuando no está visible
- **Responsive**: Se adapta perfectamente a móviles
- **Fondo Animado**: Gradientes suaves que se mueven sutilmente

## 🎨 Personalización de Colores

En el archivo `styles.css`, puedes modificar la paleta de colores:

```css
:root {
    --primary-gold: #D4AF37;    /* Dorado principal */
    --light-gold: #F7E7A4;      /* Dorado claro */
    --deep-gold: #B8860B;       /* Dorado oscuro */
    --cream: #FFF8E7;           /* Crema */
    --white: #FFFFFF;           /* Blanco */
    /* Modifica estos valores según tu preferencia */
}
```

## 📱 Hosting y Publicación

### Opción 1: GitHub Pages (Gratis)
1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main como fuente
4. Tu invitación estará disponible en: `https://tu-usuario.github.io/nombre-repo`

### Opción 2: Netlify (Gratis)
1. Comprime todos los archivos en un ZIP
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra el ZIP a Netlify
4. Tu invitación estará en línea inmediatamente

### Opción 3: Vercel (Gratis)
1. Sube los archivos a GitHub
2. Conecta tu repositorio con [vercel.com](https://vercel.com)
3. Tu invitación se desplegará automáticamente

## 📊 Ver Confirmaciones de Asistencia

Abre la consola del navegador (F12) y usa estos comandos:

```javascript
// Ver estadísticas
getWeddingStats();

// Descargar confirmaciones en CSV
exportRSVPs();
```

## 🛠️ Personalización Avanzada

### Cambiar Fuentes
En `index.html`, modifica el enlace de Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@400;700&display=swap" rel="stylesheet">
```

### Agregar Secciones
Puedes agregar nuevas secciones como:
- Código de vestimenta específico
- Información de hospedaje
- Lista de regalos
- Información de transporte

### Modificar Animaciones
En `styles.css`, puedes personalizar las animaciones:

```css
@keyframes tu-animacion {
    /* Tu animación personalizada */
}
```

## 🔧 Estructura de Archivos

```
mirko/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── fotos/              # Carpeta para tus fotos (crear)
    ├── pareja-principal.jpg
    ├── historia-1.jpg
    ├── historia-2.jpg
    └── galeria/
        ├── foto1.jpg
        ├── foto2.jpg
        └── ...
```

## 📝 Lista de Tareas de Personalización

- [ ] Cambiar nombres de los novios
- [ ] Actualizar fecha y hora del evento
- [ ] Modificar información de lugares
- [ ] Agregar fotos personales
- [ ] Personalizar mensaje de la historia
- [ ] Configurar hosting
- [ ] Probar en dispositivos móviles
- [ ] Compartir el enlace con invitados

## 💡 Consejos

1. **Tamaño de Fotos**: Usa imágenes optimizadas (menos de 500KB cada una)
2. **Formato**: Prefiere JPG para fotos y PNG para gráficos
3. **Resolución**: 1920x1080 para la foto principal, 800x600 para las demás
4. **Backup**: Guarda siempre una copia de seguridad antes de modificar
5. **Pruebas**: Revisa en diferentes dispositivos antes de publicar

## 🎉 ¡Felicidades!

Tu invitación virtual está lista para compartir. ¡Que tengas una boda maravillosa!

---

**Nota**: Esta invitación guarda las confirmaciones en el navegador local. Para un proyecto real con muchos invitados, considera implementar un backend para almacenar las respuestas en una base de datos.

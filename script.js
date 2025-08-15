// Fecha del evento - 20 de enero de 2025 a las 18:00
const weddingDate = new Date('2025-01-20T18:00:00').getTime();

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Actualizar el DOM
    document.getElementById('days').textContent = days > 0 ? days : 0;
    document.getElementById('hours').textContent = hours > 0 ? hours : 0;
    document.getElementById('minutes').textContent = minutes > 0 ? minutes : 0;
    document.getElementById('seconds').textContent = seconds > 0 ? seconds : 0;

    // Si la fecha ya pasó
    if (timeLeft < 0) {
        document.getElementById('days').textContent = 0;
        document.getElementById('hours').textContent = 0;
        document.getElementById('minutes').textContent = 0;
        document.getElementById('seconds').textContent = 0;
        
        // Cambiar el texto de la sección
        const countdownSection = document.querySelector('.countdown-section .section-title');
        countdownSection.textContent = '¡El gran día ha llegado!';
    }
}

// Actualizar la cuenta regresiva cada segundo
setInterval(updateCountdown, 1000);

// Inicializar la cuenta regresiva inmediatamente
updateCountdown();

// Manejo del formulario RSVP
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const attendanceSelect = document.getElementById('attendance');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    // Mostrar/ocultar el selector de número de invitados
    attendanceSelect.addEventListener('change', function() {
        if (this.value === 'si') {
            guestCountGroup.style.display = 'block';
            guestCountGroup.classList.add('fade-in-up');
        } else {
            guestCountGroup.style.display = 'none';
        }
    });

    // Manejo del envío del formulario
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const formData = new FormData(rsvpForm);
        const rsvpData = {
            name: formData.get('guestName'),
            email: formData.get('guestEmail'),
            phone: formData.get('guestPhone'),
            attendance: formData.get('attendance'),
            guestCount: formData.get('guestCount') || '1',
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Guardar en localStorage (en un proyecto real, esto se enviaría a un servidor)
        saveRSVP(rsvpData);
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Resetear el formulario
        rsvpForm.reset();
        guestCountGroup.style.display = 'none';
    });

    // Función para guardar RSVP
    function saveRSVP(data) {
        let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
        rsvps.push(data);
        localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
        
        // En un proyecto real, aquí harías una petición AJAX al servidor
        console.log('RSVP guardado:', data);
    }

    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        rsvpSuccess.classList.add('fade-in-up');
        
        // Scroll suave hacia el mensaje de éxito
        rsvpSuccess.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Ocultar el mensaje después de 5 segundos y mostrar el formulario de nuevo
        setTimeout(() => {
            rsvpSuccess.style.display = 'none';
            rsvpForm.style.display = 'block';
        }, 5000);
    }

    // Validación en tiempo real
    const requiredFields = ['guestName', 'guestEmail', 'attendance'];
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        field.addEventListener('blur', validateField);
        field.addEventListener('input', validateField);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remover clases de validación previas
        field.classList.remove('invalid', 'valid');
        
        // Validar según el tipo de campo
        let isValid = false;
        
        switch(field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'text':
                isValid = value.length >= 2;
                break;
            case 'select-one':
                isValid = value !== '';
                break;
            default:
                isValid = value !== '';
        }
        
        // Aplicar clase CSS según validación
        field.classList.add(isValid ? 'valid' : 'invalid');
    }

    // Animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.detail-card, .time-unit, .story-content, .gallery-photo');
    animatedElements.forEach(el => observer.observe(el));

    // Efectos de hover para las fotos placeholder
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.borderColor = 'var(--deep-gold)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--primary-gold)';
        });
    });

    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Función para copiar el link de la invitación
    function copyInvitationLink() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('¡Link copiado al portapapeles!');
        }).catch(() => {
            // Fallback para navegadores que no soporten clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('¡Link copiado al portapapeles!');
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-gold);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Función para obtener los RSVPs guardados (para vista administrativa)
    function getRSVPs() {
        return JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
    }

    // Función para ver estadísticas (accessible desde la consola)
    window.getWeddingStats = function() {
        const rsvps = getRSVPs();
        const stats = {
            total: rsvps.length,
            attending: rsvps.filter(r => r.attendance === 'si').length,
            notAttending: rsvps.filter(r => r.attendance === 'no').length,
            totalGuests: rsvps
                .filter(r => r.attendance === 'si')
                .reduce((sum, r) => sum + parseInt(r.guestCount || 1), 0)
        };
        
        console.log('📊 Estadísticas de la boda:');
        console.log(`Total de respuestas: ${stats.total}`);
        console.log(`Confirmaron asistencia: ${stats.attending}`);
        console.log(`No pueden asistir: ${stats.notAttending}`);
        console.log(`Total de invitados que asistirán: ${stats.totalGuests}`);
        
        return stats;
    };

    // Función para exportar RSVPs (accessible desde la consola)
    window.exportRSVPs = function() {
        const rsvps = getRSVPs();
        const csvContent = "data:text/csv;charset=utf-8," + 
            "Nombre,Email,Teléfono,Asistencia,Número de invitados,Mensaje,Fecha de confirmación\n" +
            rsvps.map(r => 
                `"${r.name}","${r.email}","${r.phone || ''}","${r.attendance}","${r.guestCount || '1'}","${r.message || ''}","${new Date(r.timestamp).toLocaleString()}"`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "confirmaciones_boda.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ===== CARRUSEL DE FOTOS =====
    
    // Inicializar carrusel
    const carousel = {
        track: document.getElementById('carouselTrack'),
        slides: document.querySelectorAll('.carousel-slide'),
        dots: document.querySelectorAll('.carousel-dot'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('.carousel-slide').length,
        isPlaying: true,
        autoplayInterval: null,
        autoplayDelay: 4000,
        touchStartX: 0,
        touchEndX: 0,
        isDragging: false
    };

    // Función para ir a un slide específico
    function goToSlide(slideIndex) {
        // Remover clase active del slide actual
        carousel.slides[carousel.currentSlide].classList.remove('active');
        carousel.dots[carousel.currentSlide].classList.remove('active');
        
        // Actualizar índice
        carousel.currentSlide = slideIndex;
        
        // Si estamos en el último slide, volver al primero
        if (carousel.currentSlide >= carousel.totalSlides) {
            carousel.currentSlide = 0;
        }
        
        // Si estamos antes del primer slide, ir al último
        if (carousel.currentSlide < 0) {
            carousel.currentSlide = carousel.totalSlides - 1;
        }
        
        // Mover el track
        const translateX = -carousel.currentSlide * 100;
        carousel.track.style.transform = `translateX(${translateX}%)`;
        
        // Activar nuevo slide
        carousel.slides[carousel.currentSlide].classList.add('active');
        carousel.dots[carousel.currentSlide].classList.add('active');
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        goToSlide(carousel.currentSlide + 1);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        goToSlide(carousel.currentSlide - 1);
    }

    // Función para iniciar autoplay
    function startAutoplay() {
        carousel.autoplayInterval = setInterval(nextSlide, carousel.autoplayDelay);
        carousel.isPlaying = true;
        carousel.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
        carousel.playPauseBtn.classList.add('playing');
    }

    // Función para pausar autoplay
    function pauseAutoplay() {
        clearInterval(carousel.autoplayInterval);
        carousel.isPlaying = false;
        carousel.playPauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Reproducir</span>';
        carousel.playPauseBtn.classList.remove('playing');
    }

    // Función para alternar autoplay
    function toggleAutoplay() {
        if (carousel.isPlaying) {
            pauseAutoplay();
        } else {
            startAutoplay();
        }
    }

    // Event listeners para navegación
    carousel.prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseAutoplay(); // Pausar cuando el usuario navega manualmente
    });

    carousel.nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseAutoplay(); // Pausar cuando el usuario navega manualmente
    });

    // Event listeners para los puntos
    carousel.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            pauseAutoplay(); // Pausar cuando el usuario navega manualmente
        });
    });

    // Event listener para play/pause
    carousel.playPauseBtn.addEventListener('click', toggleAutoplay);

    // ===== SOPORTE TÁCTIL PARA MÓVILES =====
    
    // Touch events
    carousel.track.addEventListener('touchstart', (e) => {
        carousel.touchStartX = e.touches[0].clientX;
        carousel.isDragging = true;
        pauseAutoplay(); // Pausar durante el touch
    });

    carousel.track.addEventListener('touchmove', (e) => {
        if (!carousel.isDragging) return;
        e.preventDefault(); // Prevenir scroll
        carousel.touchEndX = e.touches[0].clientX;
    });

    carousel.track.addEventListener('touchend', () => {
        if (!carousel.isDragging) return;
        carousel.isDragging = false;
        
        const touchDiff = carousel.touchStartX - carousel.touchEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(touchDiff) > minSwipeDistance) {
            if (touchDiff > 0) {
                // Swipe left - siguiente slide
                nextSlide();
            } else {
                // Swipe right - slide anterior
                prevSlide();
            }
        }
        
        // Reiniciar autoplay después de 3 segundos de inactividad
        setTimeout(() => {
            if (!carousel.isPlaying) {
                startAutoplay();
            }
        }, 3000);
    });

    // Mouse events para escritorio (drag)
    let isMouseDown = false;
    let startX = 0;
    let endX = 0;

    carousel.track.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.clientX;
        carousel.track.style.cursor = 'grabbing';
        pauseAutoplay();
    });

    carousel.track.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        endX = e.clientX;
    });

    carousel.track.addEventListener('mouseup', () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        carousel.track.style.cursor = 'grab';
        
        const mouseDiff = startX - endX;
        const minDragDistance = 50;
        
        if (Math.abs(mouseDiff) > minDragDistance) {
            if (mouseDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        // Reiniciar autoplay después de 3 segundos
        setTimeout(() => {
            if (!carousel.isPlaying) {
                startAutoplay();
            }
        }, 3000);
    });

    carousel.track.addEventListener('mouseleave', () => {
        isMouseDown = false;
        carousel.track.style.cursor = 'grab';
    });

    // ===== NAVEGACIÓN POR TECLADO =====
    
    document.addEventListener('keydown', (e) => {
        // Solo funcionar si el carrusel está visible
        const carouselSection = document.querySelector('.gallery-section');
        const rect = carouselSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    pauseAutoplay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    pauseAutoplay();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    toggleAutoplay();
                    break;
            }
        }
    });

    // ===== PAUSA AUTOMÁTICA CUANDO NO ESTÁ VISIBLE =====
    
    // Intersection Observer para pausar cuando no está visible
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Carrusel visible - continuar autoplay si estaba activo
                if (carousel.isPlaying) {
                    startAutoplay();
                }
            } else {
                // Carrusel no visible - pausar autoplay
                clearInterval(carousel.autoplayInterval);
            }
        });
    }, { threshold: 0.3 });

    carouselObserver.observe(document.querySelector('.carousel-container'));

    // ===== INICIALIZACIÓN =====
    
    // Configurar cursor para indicar que se puede arrastrar
    carousel.track.style.cursor = 'grab';
    
    // Iniciar autoplay
    startAutoplay();
    
    // Pausar autoplay cuando se pierde el foco de la ventana
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(carousel.autoplayInterval);
        } else if (carousel.isPlaying) {
            startAutoplay();
        }
    });

    console.log('🎉 Invitación de boda cargada correctamente!');
    console.log('💡 Usa getWeddingStats() para ver estadísticas');
    console.log('📁 Usa exportRSVPs() para descargar confirmaciones');
    console.log('🎠 Carrusel inicializado con autoplay');
    console.log('👆 Usa las flechas del teclado para navegar en el carrusel');
});

// Efectos de partículas para el fondo (opcional)
function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '♡';
    heart.style.cssText = `
        position: fixed;
        color: var(--light-gold);
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
        animation: floatUp ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(heart);
    
    // Remover después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 5000);
}

// Crear corazones flotantes cada 3 segundos
setInterval(createFloatingHearts, 3000);

// Agregar estilos para la animación de corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .invalid {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .valid {
        border-color: var(--primary-gold) !important;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important;
    }
`;
document.head.appendChild(style);

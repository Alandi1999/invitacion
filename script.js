// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
let countdownInterval;

// Variables del modal
let modalCurrentSlide = 0;
const modalSlides = document.querySelectorAll('.modal-carousel-item');
const modalIndicators = document.querySelectorAll('.modal-indicator');

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar loader y mostrar contenido
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        document.getElementById('main-content').classList.add('show');
    }, 2000);

    // Inicializar carrusel
    initCarousel();
    
    // Inicializar cuenta regresiva con delay para asegurar que el DOM esté listo
    setTimeout(() => {
        initCountdown();
    }, 100);
    
    // Auto-play del carrusel
    setInterval(nextSlide, 5000);
    
    // Inicializar modal
    initModal();
});

// Funciones del carrusel
function initCarousel() {
    if (slides.length > 0) {
        showSlide(0);
    }
}

function showSlide(index) {
    // Remover clase active de todos los elementos
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Añadir clase active al slide e indicador actual
    if (slides[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function currentSlideIndex(index) {
    showSlide(index - 1);
}

// Función para la cuenta regresiva hacia la boda
function initCountdown() {
    console.log('🎯 === CUENTA REGRESIVA HACIA LA BODA ===');
    
    // Verificar que los elementos existan
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('❌ No se encontraron los elementos del contador');
      return;
    }
    
    console.log('✅ Elementos del contador encontrados');
    
    // Función para actualizar la cuenta regresiva
    function updateCountdown() {
        // Fecha de la boda: 10 de enero 2026, 19:00 hs
        const targetDate = new Date('2026-01-10T19:00:00');
        const currentDate = new Date();
        
        // Calcular diferencia en milisegundos (TARGET - ACTUAL = tiempo que falta)
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        
        console.log('📅 Ahora:', currentDate.toString());
        console.log('💒 Boda:', targetDate.toString());
        console.log('⏰ Milisegundos que faltan:', timeDifference);
        console.log('📊 Días que faltan:', Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        
        // Si la diferencia es positiva = futuro (cuenta regresiva normal)
        // Si es negativa = ya pasó (pero mostraremos 0)
        
        if (timeDifference > 0) {
            // Todavía falta tiempo - CUENTA REGRESIVA
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            console.log(`⏳ FALTAN: ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
            
            // Actualizar display con los valores que van disminuyendo
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
            
        } else {
            // La boda ya fue - mostrar ceros
            console.log('🎉 ¡La boda ya fue!');
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }
    
    // Ejecutar inmediatamente
  updateCountdown();

    // Limpiar intervalo anterior si existe
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Configurar nuevo intervalo
    countdownInterval = setInterval(updateCountdown, 1000);
    
    console.log('✅ Cuenta regresiva iniciada correctamente');
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Funciones para touch/swipe en dispositivos móviles
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;
    
    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            previousSlide();
        } else {
            nextSlide();
        }
    }
}

// Función para pausar auto-play cuando el usuario interactúa
let autoPlayPaused = false;
let autoPlayTimeout;

function pauseAutoPlay() {
    autoPlayPaused = true;
    clearTimeout(autoPlayTimeout);
    
    // Reanudar auto-play después de 10 segundos
    autoPlayTimeout = setTimeout(() => {
        autoPlayPaused = false;
    }, 10000);
}

// Modificar las funciones de navegación para pausar auto-play
const originalNextSlide = nextSlide;
const originalPreviousSlide = previousSlide;
const originalCurrentSlide = currentSlideIndex;

nextSlide = function() {
    if (!autoPlayPaused) {
        originalNextSlide();
    }
}

previousSlide = function() {
    pauseAutoPlay();
    originalPreviousSlide();
}

currentSlideIndex = function(index) {
    pauseAutoPlay();
    originalCurrentSlide(index);
}

// Animaciones cuando los elementos entran en vista
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .detail-card, .time-unit');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Inicializar animaciones cuando se carga la página
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Función para smooth scrolling (opcional)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Precargar imágenes para mejor performance
function preloadImages() {
    const images = [
        'img/DSC00431.webp', 'img/DSC00448.webp', 'img/DSC00476.webp', 'img/DSC00495.webp', 'img/DSC00508.webp',
        'img/DSC00526.webp', 'img/DSC00582.webp', 'img/DSC00591.webp', 'img/DSC00595.webp', 'img/DSC00611.webp',
        'img/DSC00612.webp', 'img/DSC00615.webp', 'img/DSC00618.webp', 'img/DSC00624.webp', 'img/DSC00644.webp',
        'img/DSC00647.webp', 'img/DSC00651.webp', 'img/DSC00652.webp'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Llamar preload al cargar la página
document.addEventListener('DOMContentLoaded', preloadImages);

// Función de backup para forzar inicialización del temporizador
function forceCountdownInit() {
    console.log('🔄 === BACKUP: FORZANDO TEMPORIZADOR ===');
    const weddingDate = new Date(2026, 0, 10, 19, 0, 0); // 10 enero 2026, 19:00
    const now = new Date();
    
    console.log('📅 Ahora:', now.toString());
    console.log('💒 Boda:', weddingDate.toString());
    
    // Calcular la diferencia
    const difference = weddingDate.getTime() - now.getTime();
    const daysUntilWedding = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    console.log('📊 Milisegundos hasta la boda:', difference);
    console.log('📊 Días hasta la boda:', daysUntilWedding);
    console.log('⏳ ¿Es fecha futura?', difference > 0);
    
    // Verificar elementos
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
    
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        console.log('✅ Elementos encontrados');
        console.log('📋 Valores actuales en pantalla:', {
            days: daysEl.textContent,
            hours: hoursEl.textContent,
            minutes: minutesEl.textContent,
            seconds: secondsEl.textContent
        });
        
        // Solo si la diferencia es positiva (fecha en el futuro)
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            console.log('🔢 Calculando:');
            console.log(`   ${days} días`);
            console.log(`   ${hours} horas`);
            console.log(`   ${minutes} minutos`);
            console.log(`   ${seconds} segundos`);
            
            // Actualizar elementos
            daysEl.textContent = formatTime(days);
            hoursEl.textContent = formatTime(hours);
            minutesEl.textContent = formatTime(minutes);
            secondsEl.textContent = formatTime(seconds);
            
            console.log('🎯 ¡Temporizador actualizado exitosamente!');
            
            // Reiniciar el temporizador automático
            initCountdown();
            
        } else {
            console.log('❌ La fecha de la boda ya pasó');
        }
    } else {
        console.error('❌ No se encontraron los elementos del contador');
    }
}

// Ejecutar backup después de 2 segundos
setTimeout(forceCountdownInit, 2000);

// ===== FUNCIONES DEL MODAL =====

// Inicializar modal
function initModal() {
    // Agregar event listeners a las fotos del carrusel principal
    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openModal(index));
    });
    
    // Event listener para cerrar modal
    const closeBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('photoModal');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Event listeners para teclas
    document.addEventListener('keydown', handleModalKeys);
}

// Abrir modal
function openModal(photoIndex) {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    
    // Mostrar la foto correspondiente
    modalCurrentSlide = photoIndex;
    showModalSlide(photoIndex);
    updateModalCounter();
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Mostrar slide del modal
function showModalSlide(index) {
    // Remover clase active de todos los elementos
    modalSlides.forEach(slide => slide.classList.remove('active'));
    modalIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Añadir clase active al slide e indicador actual
    if (modalSlides[index]) {
        modalSlides[index].classList.add('active');
        modalIndicators[index].classList.add('active');
        modalCurrentSlide = index;
    }
}

// Navegación del modal
function modalNextSlide() {
    const nextIndex = (modalCurrentSlide + 1) % modalSlides.length;
    showModalSlide(nextIndex);
    updateModalCounter();
}

function modalPreviousSlide() {
    const prevIndex = (modalCurrentSlide - 1 + modalSlides.length) % modalSlides.length;
    showModalSlide(prevIndex);
    updateModalCounter();
}

function modalCurrentSlideIndex(index) {
    showModalSlide(index - 1);
    updateModalCounter();
}

// Actualizar contador del modal
function updateModalCounter() {
    const currentPhoto = document.getElementById('currentPhoto');
    const totalPhotos = document.getElementById('totalPhotos');
    
    if (currentPhoto && totalPhotos) {
        currentPhoto.textContent = modalCurrentSlide + 1;
        totalPhotos.textContent = modalSlides.length;
    }
}

// Manejar teclas del modal
function handleModalKeys(e) {
    const modal = document.getElementById('photoModal');
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                modalPreviousSlide();
                break;
            case 'ArrowRight':
                modalNextSlide();
                break;
        }
    }
}
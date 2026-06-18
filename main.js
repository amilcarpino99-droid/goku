document.addEventListener('DOMContentLoaded', () => {
    
    const shutterContainer = document.getElementById('shutter-container');
    const act1Section = document.getElementById('section-act1');
    const shutterImage = document.querySelector('#shutter-container img');

    // --- EFECTO PERSIANA MECÁNICA AL BAJAR ---
    window.addEventListener('scroll', () => {
        const sectionHeight = act1Section.offsetHeight;
        const scrollPosition = window.scrollY;

        // Calculamos el progreso del scroll dentro de la primera sección (de 0 a 1)
        let progress = scrollPosition / sectionHeight;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        // Efecto Persiana: El clip-path corta de abajo hacia arriba de forma limpia
        // El formato es: inset(top right bottom left)
        const percentHidden = progress * 100;
        shutterContainer.style.clipPath = `inset(0% 0% ${percentHidden}% 0%)`;

        // Parallax sutil interno: La imagen sube ligeramente mientras se cierra la persiana
        if (shutterImage) {
            shutterImage.style.transform = `translateY(-${progress * 15}%)`;
        }
    });

    // --- INTERSECTION OBSERVER (REVELAR TEXTOS Y KI) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});
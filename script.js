// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct snap for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Slight delay for the outline (Harvey Specter polish)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for the cursor
const interactiveElements = document.querySelectorAll('a, .card, .interest-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'rgba(75, 0, 130, 0.8)'; // Shift to purple on hover
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.borderColor = '#d4af37'; // Back to gold
    });
});

// 2. Parallax Background Ambient Glows
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gsap.to('.purple-glow', {
        x: x * 50,
        y: y * 50,
        duration: 2,
        ease: 'power2.out'
    });
    
    gsap.to('.gold-glow', {
        x: -x * 50,
        y: -y * 50,
        duration: 2,
        ease: 'power2.out'
    });
});

// 3. GSAP Scroll Animations (Staggered Fade Ups)
const slides = document.querySelectorAll('.slide');

slides.forEach((slide) => {
    const fadeElements = slide.querySelectorAll('.fade-up');
    
    gsap.fromTo(fadeElements, 
        { 
            y: 50, 
            opacity: 0,
            rotationX: 15 // Slight 3D tilt on start
        },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: slide,
                scroller: ".scroll-container", // Binding to our custom CSS scroll container
                start: "top 60%", // Triggers when the top of the slide is 60% down the viewport
                toggleActions: "play none none reverse" // Reverses elegantly if they scroll back up
            }
        }
    );
});

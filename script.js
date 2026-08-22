// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu?.classList.add('hidden');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`Hi Nicole,\n\n${message}\n\nFrom,\n${name}\n${email}`);
        window.location.href = `mailto:nasengonicole@gmail.com?subject=${subject}&body=${body}`;

        this.reset();
    });
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing effect for profession (optional enhancement)
const professionElement = document.getElementById('profession');
const professions = [
    'Computer Science Graduate',
    'MLOps & Applied ML Engineer',
    'AI Product Builder',
    'Full-Stack AI Developer',
    'Cloud-Native Problem Solver'
];
let currentProfessionIndex = 0;

function typeProfession() {
    if (!professionElement) return;
    const profession = professions[currentProfessionIndex];
    professionElement.textContent = profession;
    currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
}

// Change profession every 3 seconds
if (professionElement) {
    setInterval(typeProfession, 3000);
}

// Add hover effect to cards
document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-purple-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-purple-600');
        }
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 4000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Stardust Particle Effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? 'rgba(71, 85, 105, 0.5)' : 'rgba(194, 65, 12, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.boxShadow = '0 0 8px rgba(71, 85, 105, 0.6)';
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    
    document.getElementById('particles-js')?.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(floatStyle);

// Create particles periodically
if (document.getElementById('particles-js')) {
    setInterval(createParticle, 500);
    // Create initial batch
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }
}

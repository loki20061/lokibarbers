/* =============================================
   LOKIBARBERS — UPGRADED SCRIPT.JS
   ============================================= */

// =============================================
// DEVICE DETECTION
// =============================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// =============================================
// VIDEO — DESKTOP ONLY
// =============================================
const globalVideo = document.getElementById('global-video');
if (globalVideo) {
    if (isMobile || isTouch) {
        globalVideo.style.display = 'none';
        globalVideo.src = '';
        globalVideo.load();
    } else {
        globalVideo.muted = true;
        const p = globalVideo.play();
        if (p !== undefined) {
            p.catch(() => {
                document.addEventListener('click', function tryPlay() {
                    globalVideo.play().catch(() => {});
                    document.removeEventListener('click', tryPlay);
                }, { once: true });
            });
        }
    }
}

// =============================================
// LOADING SCREEN
// =============================================
window.addEventListener('load', () => {
    const loadTime = isMobile ? 1200 : 2500;
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, loadTime);
});

// =============================================
// AOS ANIMATIONS
// =============================================
AOS.init({
    duration: isMobile ? 500 : 800,
    easing: 'ease-in-out',
    once: true,
    offset: isMobile ? 40 : 100
});

// =============================================
// SCROLL PROGRESS BAR
// =============================================
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    progressBar.style.width = pct + '%';
}, { passive: true });

// =============================================
// BACK TO TOP
// =============================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}, { passive: true });

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =============================================
// LOGO CLICK
// =============================================
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// =============================================
// HERO TYPING ANIMATION
// =============================================
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
    const texts = ['Confidence Every Day', 'Premium Grooming', 'Accra\'s Finest Cuts'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = texts[textIndex];
        if (isDeleting) {
            heroSub.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeLoop, 500);
                return;
            }
        } else {
            heroSub.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2000);
                return;
            }
        }
        setTimeout(typeLoop, isDeleting ? 50 : 90);
    }

    setTimeout(typeLoop, 1800);
}

// =============================================
// PARTICLES
// =============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = isMobile ? 15 : 45;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            animation-duration:${Math.random() * 12 + 6}s;
            animation-delay:${Math.random() * 6}s;
            opacity:${Math.random() * 0.4};
        `;
        container.appendChild(p);
    }
}
createParticles();

// =============================================
// COUNTER ANIMATION
// =============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const step = target / (2000 / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 16);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// =============================================
// ACTIVE NAV LINK
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 250) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === '#' + current) {
            item.style.color = 'var(--gold)';
        }
    });
}, { passive: true });

// =============================================
// VANILLA TILT 3D EFFECT
// =============================================
if (!isTouch && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.1,
        perspective: 1000,
        scale: 1.02
    });
}

// =============================================
// CUSTOM CURSOR
// =============================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (!isTouch && cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
        follower.classList.add('clicked');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
        follower.classList.remove('clicked');
    });

    document.querySelectorAll('a, button, .tilt-card, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });
}

// =============================================
// SWIPER TESTIMONIALS
// =============================================
if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' },
        breakpoints: {
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 }
        }
    });
}

// =============================================
// GLIGHTBOX GALLERY
// =============================================
if (typeof GLightbox !== 'undefined') {
    GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        skin: 'clean'
    });
}

// =============================================
// BEFORE & AFTER SLIDER
// =============================================
const baSlider = document.getElementById('baSlider');
if (baSlider) {
    const baAfter = baSlider.querySelector('.ba-after');
    const baHandle = baSlider.querySelector('.ba-handle');
    let isDragging = false;

    function setPosition(x) {
        const rect = baSlider.getBoundingClientRect();
        let pct = ((x - rect.left) / rect.width) * 100;
        pct = Math.min(Math.max(pct, 2), 98);
        baAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        baHandle.style.left = pct + '%';
        const handleEl = baSlider.querySelector('.ba-handle');
        if (handleEl) handleEl.setAttribute('aria-valuenow', Math.round(pct));
    }

    baSlider.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); });
    document.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
    document.addEventListener('mouseup', () => { isDragging = false; });

    baSlider.addEventListener('touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', () => { isDragging = false; });

    // Animate hint on load
    setTimeout(() => {
        setPosition(baSlider.getBoundingClientRect().left + baSlider.offsetWidth * 0.5);
    }, 500);
}

// =============================================
// FAQ ACCORDION
// =============================================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = document.getElementById(btn.getAttribute('aria-controls'));
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all others
        document.querySelectorAll('.faq-question').forEach(other => {
            if (other !== btn) {
                other.setAttribute('aria-expanded', 'false');
                const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
                if (otherAnswer) otherAnswer.classList.remove('open');
            }
        });

        btn.setAttribute('aria-expanded', !isOpen);
        if (answer) answer.classList.toggle('open', !isOpen);
    });
});

// =============================================
// BOOKING MODAL
// =============================================
function openBooking() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Set min date to today
        const dateInput = document.getElementById('client-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }
}

function closeBooking() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const bookingModal = document.getElementById('booking-modal');
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeBooking();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBooking();
});

function submitBooking() {
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const service = document.getElementById('client-service').value;
    const barber = document.getElementById('client-barber').value;
    const date = document.getElementById('client-date').value;
    const time = document.getElementById('client-time').value;

    if (!name || !phone || !service || !date || !time) {
        alert('Please fill in all required fields!');
        return;
    }

    const message = `Hello LokiBarbers! I'd like to book an appointment. 🎯

👤 *Name:* ${name}
📞 *Phone:* ${phone}
✂️ *Service:* ${service}
💈 *Preferred Barber:* ${barber}
📅 *Date:* ${date}
⏰ *Time:* ${time}

Please confirm my booking. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/233541737618?text=${encoded}`, '_blank');
    closeBooking();
}

// =============================================
// KEYBOARD ACCESSIBILITY — STICKY BOOK
// =============================================
const stickyBook = document.querySelector('.sticky-book');
if (stickyBook) {
    stickyBook.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openBooking();
    });
}
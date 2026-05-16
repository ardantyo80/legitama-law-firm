// ========== MOBILE MENU HAMBURGER ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Tutup mobile menu kalau klik link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== NAVBAR SHADOW ON SCROLL ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
    }
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .service-card, .step');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Trigger sekali saat load
window.addEventListener('load', revealOnScroll);
// Trigger setiap scroll
window.addEventListener('scroll', revealOnScroll);

// ========== COUNTER ANIMATION (Angka Statistik) ==========
const counters = document.querySelectorAll('.stat-number');
let counted = false;

const startCounters = () => {
    if (counted) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50; // 50 steps
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
    counted = true;
};

// Trigger counter saat stat section visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// ========== TAMBAHAN: BUTTON SCROLL TO TOP ==========
// Buat tombol scroll to top
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// ========== FORM SUBMIT ANIMATION (DUMMY) ==========
// ========== FORM WA: Kirim pesan terstruktur ke WhatsApp ==========
const waForm = document.getElementById('waForm');
if (waForm) {
    waForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value.trim();
        const nowa = document.getElementById('nowa').value.trim();
        const pesan = document.getElementById('pesan').value.trim();
        
        if (!nama || !nowa) {
            alert('Mohon isi Nama dan Nomor WhatsApp terlebih dahulu');
            return;
        }
        
        // Validasi nomor WhatsApp (minimal angka)
        if (!/^\d+$/.test(nowa.replace(/\s/g, ''))) {
            alert('Nomor WhatsApp harus berupa angka');
            return;
        }
        
        // Format pesan untuk WhatsApp
        let waMessage = `Halo Legitama Law Firm%0A%0A`;
        waMessage += `*Nama:* ${nama}%0A`;
        waMessage += `*Nomor WA:* ${nowa}%0A`;
        if (pesan) {
            waMessage += `*Pesan:* ${pesan}%0A%0A`;
        }
        waMessage += `%0A%0A_Saya ingin konsultasi gratis, mohon dihubungi._`;
        
        // Nomor tujuan (ganti dengan nomor dummy atau nomor lu)
        const waNumber = '62895395198189'; 
        
        // Redirect ke WhatsApp
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
        
        // Animasi tombol submit
        const submitBtn = document.getElementById('submitWaBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dialihkan ke WA...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            // Reset form optional (biar user ga perlu isi ulang kalau gagal)
            // document.getElementById('waForm').reset();
        }, 2000);
    });
}

// ========== PREVENT DOUBLE SUBMIT ==========
// (sudah di handle di atas)

// ========== ADDITIONAL: PARALLAX EFFECT HERO ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

console.log('🚀 Legitama Law Firm - Animations Loaded!');
// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Tutup FAQ lain yang terbuka (opsional: biar cuma 1 terbuka)
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle class active untuk item yang diklik
        item.classList.toggle('active');
    });
});

// Buka FAQ pertama secara default (opsional, biar ada yang kebuka)
// if (faqItems.length > 0) {
//     faqItems[0].classList.add('active');
// }

// ========== TESTIMONIAL AUTO-SLIDER ==========
const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let slideInterval;
const slideDelay = 4000; // 4 detik per slide
let isHovering = false;

// Fungsi untuk update slide (berdasarkan index)
function updateSlide(index) {
    // Loop index (kalau kebanyakan balik ke awal, kurang ke akhir)
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    // Geser track
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Fungsi untuk next slide
function nextSlide() {
    updateSlide(currentIndex + 1);
}

// Fungsi untuk prev slide
function prevSlide() {
    updateSlide(currentIndex - 1);
}

// Fungsi untuk start auto-slide
function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    if (!isHovering) {
        slideInterval = setInterval(nextSlide, slideDelay);
    }
}

// Fungsi untuk stop auto-slide
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Event listener untuk tombol prev/next
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
}

// Event listener untuk dot indicator
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        updateSlide(index);
        startAutoSlide();
    });
});

// Pause on hover (mouse masuk slider, auto-slide berhenti)
const sliderContainer = document.querySelector('.testimonial-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        isHovering = true;
        stopAutoSlide();
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoSlide();
    });
}

// Start auto-slide saat halaman dimuat
startAutoSlide();

// Optional: update slide saat window resize (biar tetep rapi)
window.addEventListener('resize', () => {
    updateSlide(currentIndex);
});
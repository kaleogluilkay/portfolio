const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Hamburger Menü
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Aktif Menü Vurgusu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav .menu li a");
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            navLinks.forEach(link => {
                link.classList.remove("active");
                if(link.getAttribute("href") === "#" + entry.target.id){
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);
sections.forEach(section => observer.observe(section));

// Tüm kartlar (projeler + sertifikalar)
const cards = document.querySelectorAll('.projects .card, .certificates .certificate-card');
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const modalNoLink = document.getElementById('modal-no-link');
const modalClose = document.querySelector('.modal .close');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.dataset.type || 'project';
        modalImg.src = card.dataset.img;
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc || '';

        if( card.dataset.link){
            modalLink.href = card.dataset.link;
            modalLink.style.display = 'inline-block';
            modalLink.textContent = type === 'project' ? 'GitHub / Live' : 'Sertifikayı Gör';
            modalNoLink.style.display = 'none';
        } else {
            modalLink.style.display = 'none';
            modalNoLink.style.display = type === 'certificate' ? 'block' : 'none';
        }

        // Modal açma animasyonu
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            modal.querySelector('.modal-content').classList.add('show');
        }, 50); // küçük delay ile smooth açılma
    });
});

// Modal kapama animasyonu
const closeModal = () => {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('show');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400); // CSS geçiş süresi ile eşleşiyor
};

modalClose.addEventListener('click', closeModal);
window.addEventListener('click', e => {
    if(e.target === modal){
        closeModal();
    }
});

// Modal dışına tıklayınca kapama
window.addEventListener('click', e => {
    if(e.target === modal){
        modal.classList.remove('show');
        modal.querySelector('.modal-content').classList.remove('show');
    }
});

// Dark / Light Mode
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
}
themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});


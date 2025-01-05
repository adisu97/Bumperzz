// Flatpickr Initialization
flatpickr("#booking-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    time_24hr: true,
    minuteIncrement: 15,
    locale: "sv",
});

// Language Handling
let currentLanguage = 'sv';
const languageSelector = document.getElementById('language');
const translations = {};

async function loadLanguage(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return await response.json();
}

async function updateContent(lang) {
    if (!translations[lang]) {
        translations[lang] = await loadLanguage(lang);
    }
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

languageSelector.addEventListener('change', (event) => {
    currentLanguage = event.target.value;
    updateContent(currentLanguage);
});

// Update content on page load
updateContent(currentLanguage);

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slideshow .slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Playtime Buttons
const playtimeButtons = document.querySelectorAll('.playtime-buttons button');
const playtimeInput = document.getElementById('playtime');
const otherPlaytimeContainer = document.getElementById('other-playtime-container');
const otherPlaytimeInput = document.getElementById('other-playtime');

playtimeButtons.forEach(button => {
    button.addEventListener('click', () => {
        playtimeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (button.getAttribute('data-minutes') === 'other') {
            otherPlaytimeContainer.style.display = 'inline-flex';
            playtimeInput.value = '';
        } else {
            otherPlaytimeContainer.style.display = 'none';
            playtimeInput.value = button.getAttribute('data-minutes');
        }
    });
});

otherPlaytimeInput.addEventListener('input', () => {
    playtimeInput.value = otherPlaytimeInput.value;
});

// Form Submission and Modal Handling
const form = document.getElementById('booking-form');
const modal = document.getElementById('confirmation-modal');
const confirmName = document.getElementById('confirm-name');
const confirmEmail = document.getElementById('confirm-email');
const confirmDate = document.getElementById('confirm-date');
const confirmTime = document.getElementById('confirm-time');
const confirmPlaytime = document.getElementById('confirm-playtime');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedPlaytime = playtimeInput.value;
    if (!selectedPlaytime) {
        alert('Välj en speltid eller fyll i ett värde under "Annat".');
        return;
    }

    confirmName.textContent = document.getElementById('name').value;
    confirmEmail.textContent = document.getElementById('email').value;

    const datetimeInput = document.getElementById('booking-datetime').value;
    const [date, time] = datetimeInput.split(' ');
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    confirmDate.textContent = `${day}/${month}/${year}`;
    confirmTime.textContent = `${hours}:${minutes}`;

    const playtime = playtimeInput.value;
    const isOther = document.querySelector('.playtime-buttons button.active').getAttribute('data-minutes') === 'other';
    confirmPlaytime.textContent = isOther ? `${otherPlaytimeInput.value} h` : `${playtime} min`;

    modal.style.display = 'flex';
});

document.getElementById('confirm-send').addEventListener('click', function() {
    modal.style.display = 'none';
    form.submit();
});

document.getElementById('confirm-cancel').addEventListener('click', function() {
    modal.style.display = 'none';
});
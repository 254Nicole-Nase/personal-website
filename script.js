// Live Nairobi clock (EAT, UTC+3) in the masthead
const clock = document.getElementById('clock');

function updateClock() {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Nairobi'
    }).format(new Date());
}

updateClock();
setInterval(updateClock, 30000);

// Language switch: Kiswahili / English / Japanese for greetings and section names
const strings = {
    sw: { work: 'Kazi', path: 'Safari', skills: 'Ujuzi', contact: 'Wasiliana', greet: 'Habari! Karibu.', talk: 'Tuongee.' },
    en: { work: 'Work', path: 'Path', skills: 'Skills', contact: 'Contact', greet: 'Hello! Welcome.', talk: "Let's talk." },
    jp: { work: '仕事', path: '道', skills: '技術', contact: '連絡', greet: 'こんにちは！ようこそ。', talk: '話しましょう。' }
};
const langButtons = document.querySelectorAll('.lang button');

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = strings[lang][el.dataset.i18n];
        el.classList.toggle('jp', lang === 'jp');
        el.classList.remove('pop');
        void el.offsetWidth; // restart the animation
        el.classList.add('pop');
    });
    langButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
}

langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

// Project index: one row open at a time
const rows = document.querySelectorAll('.projects .row');

rows.forEach(row => {
    row.addEventListener('click', () => {
        const isOpen = row.getAttribute('aria-expanded') === 'true';

        rows.forEach(other => {
            other.setAttribute('aria-expanded', 'false');
            other.querySelector('.sign').textContent = '+';
            document.getElementById(other.getAttribute('aria-controls')).hidden = true;
        });

        if (!isOpen) {
            row.setAttribute('aria-expanded', 'true');
            row.querySelector('.sign').textContent = '−';
            const detail = document.getElementById(row.getAttribute('aria-controls'));
            detail.hidden = false;
            detail.classList.add('pop');
        }
    });
});

// Archery: a drifting sight, three arrows, score out of 30
const target = document.getElementById('target');
const sight = document.getElementById('sight');
const shootBtn = document.getElementById('shoot');
const againBtn = document.getElementById('again');
const scoreEl = document.getElementById('score');
let shots = [];
let t = 0;

function sightPosition() {
    return {
        x: 0.5 + 0.36 * Math.sin(t * 1.7) * Math.cos(t * 0.45),
        y: 0.5 + 0.32 * Math.sin(t * 1.15 + 1)
    };
}

function sway() {
    t += 0.018;
    const p = sightPosition();
    sight.style.left = `${p.x * 100}%`;
    sight.style.top = `${p.y * 100}%`;
    requestAnimationFrame(sway);
}

function verdict(total) {
    if (total >= 27) return 'Bullseye form.';
    if (total >= 20) return 'Solid grouping.';
    if (total >= 12) return 'Not bad for a first round.';
    return 'The wind, clearly.';
}

shootBtn.addEventListener('click', () => {
    const p = sightPosition();
    const dist = Math.hypot(p.x - 0.5, p.y - 0.5) / 0.5;
    const score = Math.max(0, 10 - Math.floor(dist * 10));
    shots.push(score);

    const arrow = document.createElement('span');
    arrow.className = 'arrow pop';
    arrow.style.left = `${p.x * 100}%`;
    arrow.style.top = `${p.y * 100}%`;
    target.appendChild(arrow);

    const total = shots.reduce((a, b) => a + b, 0);
    if (shots.length < 3) {
        shootBtn.textContent = `Release arrow (${3 - shots.length} left)`;
        scoreEl.textContent = `Last: ${score} · Total ${total}`;
    } else {
        shootBtn.hidden = true;
        sight.hidden = true;
        againBtn.hidden = false;
        scoreEl.textContent = `Total ${total}/30 — ${verdict(total)}`;
    }
});

againBtn.addEventListener('click', () => {
    shots = [];
    target.querySelectorAll('.arrow').forEach(a => a.remove());
    shootBtn.hidden = false;
    shootBtn.textContent = 'Release arrow (3 left)';
    sight.hidden = false;
    againBtn.hidden = true;
    scoreEl.textContent = '';
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(sway);
}

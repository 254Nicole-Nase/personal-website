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
            document.getElementById(row.getAttribute('aria-controls')).hidden = false;
        }
    });
});

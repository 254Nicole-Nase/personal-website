// "Nearest neighbours": re-rank projects by the chosen query
const queries = {
    all: 'AI that helps people',
    retrieval: 'semantic search over messy content',
    health: 'safer medicine for patients',
    commerce: 'trusted marketplace payments'
};

const results = document.getElementById('results');
const queryText = document.getElementById('query-text');
const chips = document.querySelectorAll('.chip');

function rank(q) {
    const cards = [...results.querySelectorAll('.result')];
    cards.sort((a, b) => JSON.parse(b.dataset.scores)[q] - JSON.parse(a.dataset.scores)[q]);

    cards.forEach((card, i) => {
        const score = JSON.parse(card.dataset.scores)[q];
        card.querySelector('.rank').textContent = `rank #${i + 1}`;
        card.querySelector('.score').textContent = `cos_sim ${score.toFixed(2)}`;
        card.querySelector('.sim span').style.width = `${Math.round(score * 100)}%`;
        results.appendChild(card);
    });

    queryText.textContent = queries[q];
    chips.forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.q === q)));
}

chips.forEach(chip => chip.addEventListener('click', () => rank(chip.dataset.q)));

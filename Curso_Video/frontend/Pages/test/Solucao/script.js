function toggleFAQ(id) {
    const answer = document.getElementById(`faq${id}`);
    const toggle = document.getElementById(`toggle${id}`);
    answer.classList.toggle('show');
    toggle.classList.toggle('rotate');
}

// Animation for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
});

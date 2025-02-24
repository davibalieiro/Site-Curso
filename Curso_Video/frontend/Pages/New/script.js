document.addEventListener('DOMContentLoaded', function() {
    // Função para rolar até o topo da página
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Exibir ou ocultar o botão de rolar ao topo com base na posição da rolagem
    window.addEventListener('scroll', () => {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        if (window.scrollY > 200) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Adiciona evento de clique ao botão
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);
    }

    // Função para filtrar as notícias
    function filterNews() {
        const searchInput = document.querySelector('.search-bar input');
        const filter = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.cards-container .card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(filter) || description.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Função para animar os cartões ao entrar na tela
    function animateCardsOnScroll() {
        const cards = document.querySelectorAll('.cards-container .card');
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 50) {
                card.classList.add('animate');
            } else {
                card.classList.remove('animate');
            }
        });
    }

    // Adiciona evento de scroll para animar os cartões
    window.addEventListener('scroll', animateCardsOnScroll);

    // Inicializa as animações ao carregar a página
    window.addEventListener('load', animateCardsOnScroll);
});
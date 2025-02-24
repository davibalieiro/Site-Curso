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

    // Função para carregar notícias do banco de dados
    function loadNews() {
        fetch('http://localhost:3000/api/news')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar notícias');
                }
                return response.json();
            })
            .then(data => {
                const featuredNewsContainer = document.getElementById('featured-news-container');
                const newsCardsContainer = document.getElementById('news-cards-container');

                // Exibir a primeira notícia como destaque
                if (data.length > 0) {
                    const featuredNews = data[0];
                    featuredNewsContainer.innerHTML = `
                        <div class="featured-card">
                            <img src="${featuredNews.image_url}" alt="${featuredNews.title}">
                            <div class="featured-content">
                                <h2>${featuredNews.title}</h2>
                                <p>${featuredNews.content}</p>
                                <a href="#" class="read-more">Leia mais</a>
                            </div>
                        </div>
                    `;
                }

                // Exibir as demais notícias
                data.slice(1).forEach(news => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${news.image_url}" alt="${news.title}">
                        <div class="card-content">
                            <h3>${news.title}</h3>
                            <p>${news.content}</p>
                            <a href="#" class="read-more">Leia mais</a>
                        </div>
                    `;
                    newsCardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao buscar notícias:', error));
    }

    loadNews();

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
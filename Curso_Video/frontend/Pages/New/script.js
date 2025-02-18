document.addEventListener("DOMContentLoaded", function() {
    const featuredNews = {
        title: "Curso de Desenvolvimento Web",
        image: "./img/featured-news.jpg",
        description: "Aprenda a construir sites modernos e responsivos do zero com nosso curso completo de desenvolvimento web. Domine HTML, CSS, JavaScript e frameworks populares para se tornar um desenvolvedor web profissional.",
        link: "#"
    };

    const featuredCard = document.querySelector(".featured-card");
    featuredCard.innerHTML = `
        <img src="${featuredNews.image}" alt="${featuredNews.title}">
        <div class="featured-content">
            <h2>${featuredNews.title}</h2>
            <p>${featuredNews.description}</p>
            <a href="${featuredNews.link}" class="read-more">Leia mais</a>
        </div>
    `;

    const newsData = [
        {
            title: "Curso de Banco de Dados",
            image: "./img/news1.jpg",
            description: "Descubra como gerenciar e manipular dados de maneira eficiente com nosso curso de banco de dados. Aprenda SQL, modelagem de dados, e técnicas avançadas para garantir a integridade e desempenho do seu banco de dados.",
            link: "#"
        },
        {
            title: "Curso de React",
            image: "./img/news2.jpg",
            description: "Domine o desenvolvimento de aplicações web com React, uma das bibliotecas JavaScript mais populares. Nosso curso cobre desde os fundamentos até técnicas avançadas, incluindo hooks, state management e integração com APIs.",
            link: "#"
        },
        {
            title: "Curso de Desenvolvimento de Jogos",
            image: "./img/news3.jpg",
            description: "Transforme sua paixão por jogos em uma carreira com nosso curso de desenvolvimento de jogos. Aprenda a criar jogos incríveis usando Unity e Unreal Engine, desde a concepção até o lançamento, incluindo design, programação e arte.",
            link: "#"
        }
    ];

    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = ""; // Limpa o conteúdo antes de adicionar os cards

    newsData.forEach(news => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}">
            <div class="card-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <a href="${news.link}" class="read-more">Leia mais</a>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
});
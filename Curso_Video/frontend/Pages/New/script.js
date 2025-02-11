document.addEventListener("DOMContentLoaded", function() {
    const newsData = [
        {
            title: "Título da Notícia 1",
            image: "./img/news1.jpg",
            description: "Descrição breve da notícia 1.",
            link: "#"
        },
        {
            title: "Título da Notícia 2",
            image: "./img/news2.jpg",
            description: "Descrição breve da notícia 2.",
            link: "#"
        },
        {
            title: "Título da Notícia 3",
            image: "./img/news3.jpg",
            description: "Descrição breve da notícia 3.",
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
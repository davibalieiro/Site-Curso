document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    loadCourses(searchTerm);
    setupFilters();

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
});

// Função para carregar os cursos a partir da API
async function loadCourses(searchTerm = '', category = 'Todos') {
    try {
        const coursesContainer = document.querySelector('.courses-container');
        
        // Exibe um texto de carregamento enquanto busca os cursos
        coursesContainer.innerHTML = '<p>Carregando cursos...</p>';
        
        const response = await fetch('http://localhost:3000/api/courses');

        if (!response.ok) {
            throw new Error('Falha ao carregar os cursos');
        }

        const courses = await response.json();

        // Limpa o conteúdo atual
        coursesContainer.innerHTML = '';

        // Filtra os cursos por termo de busca e categoria (se necessário)
        const filteredCourses = courses.filter(course => {
            return (category === 'Todos' || course.category === category) &&
                   (!searchTerm || course.name.toLowerCase().includes(searchTerm.toLowerCase()));
        });

        // Exibe os cursos filtrados
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.setAttribute('data-category', course.category);

            // Verificar se course.price é um número
            const price = !isNaN(parseFloat(course.price)) ? parseFloat(course.price).toFixed(2) : 'N/A';

            // Adicionar mensagens adicionais
            let messages = '';
            if (course.is_best_seller) {
                messages += '<p class="course-message1">Mais vendidos</p>';
            }
            if (course.rating >= 4.6) {
                messages += '<p class="course-message2">Alta Avaliação</p>';
            }
            if (course.price <= 80) {
                messages += '<p class="course-message3">Preço Acessível</p>';
            }

            courseCard.innerHTML = `
                <img src="${course.image_url}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p class="course-price">R$ ${price}</p>
                <p class="course-rating">${'⭐'.repeat(Math.round(course.rating))} ${course.rating}</p>
                ${messages}
                <br>
                <button onclick="redirecionarParaCompra('${course.name}', '${course.price}', '${course.category}')">Comprar</button>
                <button onclick="verMais('${course.name}')">Ver Mais</button>
            `;

            coursesContainer.appendChild(courseCard);
        });
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        document.querySelector('.courses-container').innerHTML = `<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>`;
    }
}

// Função para redirecionar para a página de compra com os parâmetros do curso
function redirecionarParaCompra(nome, preco, descricao) {
    window.location.href = "/Site-Curso/Curso_Video/frontend/Pages/compra/compra.html?curso=" + 
        encodeURIComponent(nome) + "&preco=" + encodeURIComponent(preco) + "&descricao=" + encodeURIComponent(descricao);
}

// Função para redirecionar para a página de detalhes do curso
function verMais(nome) {
    window.location.href = `/Site-Curso/Curso_Video/frontend/Pages/Components/Django/index.html?curso=${encodeURIComponent(nome)}`;
}

// Função para configurar os filtros de categoria
function setupFilters() {
    const filterItems = document.querySelectorAll('.filters li');
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.textContent;
            loadCourses('', category); // Recarrega os cursos com a categoria selecionada
        });
    });
}

// Função para buscar cursos (barra de pesquisa)
function searchCourses() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const courseName = card.querySelector('h3').textContent.toLowerCase();
        if (courseName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para ordenar cursos por preço
function sortCoursesByPrice(order = 'asc') {
    const coursesContainer = document.querySelector('.courses-container');
    const courseCards = Array.from(coursesContainer.children);

    courseCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.course-price').textContent.split(' ')[1]);
        const priceB = parseFloat(b.querySelector('.course-price').textContent.split(' ')[1]);

        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    courseCards.forEach(card => coursesContainer.appendChild(card));
}

// Função para ordenar cursos por avaliação
function sortCoursesByRating(order = 'desc') {
    const coursesContainer = document.querySelector('.courses-container');
    const courseCards = Array.from(coursesContainer.children);

    courseCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.course-rating').textContent.split(' ')[1]);
        const ratingB = parseFloat(b.querySelector('.course-rating').textContent.split(' ')[1]);

        return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });

    courseCards.forEach(card => coursesContainer.appendChild(card));
}
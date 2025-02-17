document.addEventListener('DOMContentLoaded', () => {
    loadCourses(); // Carrega os cursos ao carregar a página
    setupFilters(); // Configura os filtros de categoria
});

// Função para carregar os cursos da API
async function loadCourses(category = 'Todos') {
    try {
        const response = await fetch('http://localhost:3000/courses');
        const courses = await response.json();
        const coursesContainer = document.querySelector('.courses-container');

        // Limpa o conteúdo atual
        coursesContainer.innerHTML = '';

        // Filtra os cursos por categoria (se necessário)
        const filteredCourses = category === 'Todos' 
            ? courses 
            : courses.filter(course => course.category === category);

        // Exibe os cursos filtrados
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.setAttribute('data-category', course.category);

            courseCard.innerHTML = `
                <img src="${course.image_url}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p class="course-price">R$ ${course.price.toFixed(2)}</p>
                <p class="course-rating">${'⭐'.repeat(Math.round(course.rating))} ${course.rating}</p>
                ${course.is_best_seller ? '<p class="course-message1">Mais vendidos</p>' : ''}
            `;

            coursesContainer.appendChild(courseCard);
        });
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

// Função para configurar os filtros de categoria
function setupFilters() {
    const filterItems = document.querySelectorAll('.filters li');
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.textContent;
            loadCourses(category); // Recarrega os cursos com a categoria selecionada
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
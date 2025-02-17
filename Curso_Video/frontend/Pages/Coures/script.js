document.addEventListener('DOMContentLoaded', () => {
    loadCourses(); // Carrega os cursos ao carregar a página
    setupFilters(); // Configura os filtros de categoria
});
async function loadCourses(category = 'Todos') {
    try {
        const coursesContainer = document.querySelector('.courses-container');
        
        // Exibe um texto de carregamento enquanto busca os cursos
        coursesContainer.innerHTML = '<p>Carregando cursos...</p>';
        
        const response = await fetch('http://localhost:3000/courses');
        const courses = await response.json();

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
async function loadCourses(category = 'Todos') {
    try {
        const coursesContainer = document.querySelector('.courses-container');
        coursesContainer.innerHTML = '<p>Carregando cursos...</p>';

        const response = await fetch('http://localhost:3000/courses');
        
        if (!response.ok) {
            throw new Error('Falha ao carregar os cursos');
        }
        
        const courses = await response.json();
        coursesContainer.innerHTML = ''; // Limpar mensagem de "carregando"
        
        const filteredCourses = category === 'Todos' 
            ? courses 
            : courses.filter(course => course.category === category);

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
        document.querySelector('.courses-container').innerHTML = `<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>`;
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

app.get('/courses', async (req, res) => {
    try {
        const [courses] = await db.query('SELECT * FROM courses');
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter cursos' });
    }
});

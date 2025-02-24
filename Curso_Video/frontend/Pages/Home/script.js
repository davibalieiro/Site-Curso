document.addEventListener('DOMContentLoaded', () => {
  loadCourses(); // Carrega os cursos ao carregar a página
  setupFilters(); // Configura os filtros de categoria

  // Configurar a barra de pesquisa
  const searchButton = document.querySelector('#search-button');
  const searchInput = document.querySelector('#search-input');

  searchButton.addEventListener('click', () => {
      searchCourses();
  });

  searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          searchCourses();
      }
  });
});

// Função para buscar cursos (barra de pesquisa)
function searchCourses() {
  const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
  window.location.href = `/Site-Curso/Curso_Video/frontend/Pages/Coures/coures.html?search=${encodeURIComponent(searchTerm)}`;
}

// Função para carregar os cursos a partir da API
async function loadCourses(category = 'Todos') {
  try {
      const coursesContainer = document.querySelector('#courses-container');
      
      if (!coursesContainer) {
          throw new Error('Elemento courses-container não encontrado');
      }

      // Exibe um texto de carregamento enquanto busca os cursos
      coursesContainer.innerHTML = '<p>Carregando cursos...</p>';
      
      const response = await fetch('http://localhost:3000/api/home-courses');

      if (!response.ok) {
          throw new Error('Falha ao carregar os cursos');
      }

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
          courseCard.className = 'card';
          courseCard.setAttribute('data-category', course.category);

          // Verificar se course.price é um número
          const price = !isNaN(parseFloat(course.price)) ? parseFloat(course.price).toFixed(2) : 'N/A';

          courseCard.innerHTML = `
              <img src="${course.image_url}" alt="${course.name}">
              <h3>${course.name}</h3>
              <p>${course.category}</p>
              <span>R$ ${price}</span>
              <br>
              <button onclick="redirecionarParaCompra('${course.name}', '${course.price}', '${course.category}')">Comprar</button>
              <button onclick="verMais('${course.name}')">Ver Mais</button>
          `;

          coursesContainer.appendChild(courseCard);
      });
  } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      const coursesContainer = document.querySelector('#courses-container');
      if (coursesContainer) {
          coursesContainer.innerHTML = `<p>Erro ao carregar cursos. Tente novamente mais tarde.</p>`;
      } else {
          alert('Erro ao carregar cursos. Tente novamente mais tarde.');
      }
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
          loadCourses(category); // Recarrega os cursos com a categoria selecionada
      });
  });
}

// Funções para abrir/fechar o modal de categorias
const categoriesBtn = document.getElementById('categoriesBtn');
const categoryModal = document.getElementById('categoryModal');

categoriesBtn.addEventListener('click', (event) => {
event.stopPropagation();
categoryModal.classList.toggle('active');
});

document.addEventListener('click', (event) => {
if (!categoryModal.contains(event.target) && !categoriesBtn.contains(event.target)) {
  categoryModal.classList.remove('active');
}
});

function openCategoriesModal() {
const btn = document.getElementById('categoriesBtn');
const modal = document.getElementById('categoryModal');

const rect = btn.getBoundingClientRect();
modal.style.top = `${rect.bottom + window.scrollY}px`;
modal.style.left = `${rect.left + window.scrollX}px`;

modal.style.display = 'flex';
}

function selectCategory(category) {
localStorage.setItem('selectedCategory', category);
window.location.href = '/Site-Curso/Curso_Video/frontend/Pages/Coures/coures.html?category=' + encodeURIComponent(category);
}

// Funções para o carrossel de imagens
let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;
const carousel = document.querySelector('.carousel');
let autoSlide = setInterval(nextImage, 5000);

function updateCarousel() {
const newTransform = -currentIndex * 100 + '%';
carousel.style.transition = 'transform 0.5s ease';
carousel.style.transform = `translateX(${newTransform})`;
}

function nextImage() {
currentIndex = (currentIndex + 1) % totalImages;
updateCarousel();
resetAutoSlide();
}

function prevImage() {
currentIndex = (currentIndex - 1 + totalImages) % totalImages;
updateCarousel();
resetAutoSlide();
}

function resetAutoSlide() {
clearInterval(autoSlide);
autoSlide = setInterval(nextImage, 5000);
}

window.addEventListener('resize', updateCarousel);

// Funções para abrir/fechar o chat
function openChat() {
document.getElementById('chatWindow').style.display = 'block';
}

function closeChat() {
document.getElementById('chatWindow').style.display = 'none';
}

function sendOption(option) {
const chatMessages = document.getElementById("chatMessages");

const newMessage = document.createElement("div");
newMessage.classList.add("message");
newMessage.classList.add("user-message");
newMessage.innerText = `Você escolheu: ${option}`;
chatMessages.appendChild(newMessage);

const loadingMessage = document.createElement("div");
loadingMessage.classList.add("message");
loadingMessage.classList.add("bot-message");
loadingMessage.innerHTML = '<i>Carregando...</i>';
chatMessages.appendChild(loadingMessage);
chatMessages.scrollTop = chatMessages.scrollHeight;

setTimeout(() => {
  const botResponse = document.createElement("div");
  botResponse.classList.add("message");
  botResponse.classList.add("bot-message");

  if (option === 'Reputação') {
    botResponse.innerText = 'Você escolheu Reputação. Redirecionando para a página de Reputação...';
    setTimeout(() => { window.location.href = 'reputacao.html'; }, 1500);
  } else if (option === 'Perfil') {
    botResponse.innerText = 'Você escolheu Perfil. Redirecionando para a página de Perfil...';
    setTimeout(() => { window.location.href = 'perfil.html'; }, 1500);
  } else if (option === 'Sugestão de Curso') {
    botResponse.innerText = 'Você escolheu Sugestão de Curso. Redirecionando para a página de Sugestões de Curso...';
    setTimeout(() => { window.location.href = 'sugestao-curso.html'; }, 1500);
  } else if (option === 'Perguntas Frequentes') {
    botResponse.innerText = 'Você escolheu Perguntas Frequentes. Redirecionando para o FAQ...';
    setTimeout(() => { window.location.href = 'faq.html'; }, 1500);
  } else if (option === 'Solução de problemas: como desativar a aceleração de hardware no seu navegador') {
    botResponse.innerText = 'Você escolheu Solução de problemas. Redirecionando...';
    setTimeout(() => { window.location.href = 'solucao-problemas.html'; }, 1500);
  } else if (option === 'Relatar Vulnerabilidade de Segurança') {
    botResponse.innerText = 'Você escolheu Relatar Vulnerabilidade de Segurança. Redirecionando...';
    setTimeout(() => { window.location.href = 'relatar-vulnerabilidade.html'; }, 1500);
  }

  chatMessages.removeChild(loadingMessage);
  chatMessages.appendChild(botResponse);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}, 1000);
}

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
    };

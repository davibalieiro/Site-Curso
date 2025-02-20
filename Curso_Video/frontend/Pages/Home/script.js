const categoriesBtn = document.getElementById('categoriesBtn');
const categoryModal = document.getElementById('categoryModal');

// Abrir/Fechar o Modal
categoriesBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    categoryModal.classList.toggle('active');
});

// Fechar modal ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!categoryModal.contains(event.target) && !categoriesBtn.contains(event.target)) {
        categoryModal.classList.remove('active');
    }
});

function openCategoriesModal() {
  const btn = document.getElementById('categoriesBtn');
  const modal = document.getElementById('categoryModal');

  // Posiciona o modal logo abaixo do botão de categorias
  const rect = btn.getBoundingClientRect();
  modal.style.top = `${rect.bottom + window.scrollY}px`;
  modal.style.left = `${rect.left + window.scrollX}px`;

  modal.style.display = 'flex';
}

function selectCategory(category) {
  localStorage.setItem('selectedCategory', category);
  window.location.href = '/Site-Curso/Curso_Video/frontend/Pages/Coures/coures.html';
}

let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;
const carousel = document.querySelector('.carousel');
let autoSlide = setInterval(nextImage, 5000);

// Atualiza o carrossel com animação suave
function updateCarousel() {
    const newTransform = -currentIndex * 100 + '%';
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(${newTransform})`;
}

// Avança para a próxima imagem
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
    resetAutoSlide();
}

// Volta para a imagem anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
    resetAutoSlide();
}

// Reinicia o auto slide para evitar sobreposição de intervalos
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 5000);
}

// Ajusta o carrossel no redimensionamento da tela
window.addEventListener('resize', updateCarousel);

// Abrir/Fechar o Chat
function openChat() {
  document.getElementById('chatWindow').style.display = 'block';
}

function closeChat() {
  document.getElementById('chatWindow').style.display = 'none';
}

function sendOption(option) {
    const chatMessages = document.getElementById("chatMessages");

    // Exibindo a mensagem do usuário
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add("user-message");
    newMessage.innerText = `Você escolheu: ${option}`;
    chatMessages.appendChild(newMessage);

    // Exibindo uma animação de carregamento enquanto o bot responde
    const loadingMessage = document.createElement("div");
    loadingMessage.classList.add("message");
    loadingMessage.classList.add("bot-message");
    loadingMessage.innerHTML = '<i>Carregando...</i>';
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Resposta do bot após um pequeno delay
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

      // Remover mensagem de carregamento
      chatMessages.removeChild(loadingMessage);
      chatMessages.appendChild(botResponse);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática
    }, 1000);
}

function closeChat() {
    document.getElementById("chatWindow").style.display = 'none';
}

function redirecionarParaCompra(nome, preco, descricao) {
    window.location.href = "/Site-Curso/Curso_Video/frontend/Pages/test/compra/Compra.html?curso=" + 
        encodeURIComponent(nome) + "&preco=" + encodeURIComponent(preco) + "&descricao=" + encodeURIComponent(descricao);
}

// Função para buscar cursos e redirecionar para a página específica do curso
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", async function() {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            try {
                const response = await fetch('http://localhost:3001/api/courses');
                if (!response.ok) {
                    throw new Error('Falha ao buscar cursos');
                }

                const courses = await response.json();
                const matchingCourse = courses.find(course => course.name.toLowerCase().includes(query));

                if (matchingCourse) {
                    window.location.href = `/Site-Curso/Curso_Video/frontend/Pages/Coures/coures.html?id=${encodeURIComponent(matchingCourse.id)}`;
                } else {
                    alert('Curso não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
                alert('Erro ao buscar cursos. Tente novamente mais tarde.');
            }
        }
    });
});

function showCourseDetails(button) {
  const card = button.closest('.card');
  const title = card.querySelector('.course-title').innerText;
  const description = card.querySelector('.course-description').innerText;
  const price = card.querySelector('.course-price').innerText;

  const url = new URL(window.location.origin + '/Curso_Video/frontend/Pages/Components/Angular/index.html');
  url.searchParams.append('title', title);
  url.searchParams.append('description', description);
  url.searchParams.append('price', price);

  window.location.href = url.href;
}
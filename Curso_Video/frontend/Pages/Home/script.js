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

// Envia a mensagem e gera uma resposta automática
function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() === "") return;

  const chatMessages = document.getElementById('chatMessages');
  
  // Adiciona a mensagem do usuário
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user-message');
  userMessageElement.textContent = userInput;
  chatMessages.appendChild(userMessageElement);

  document.getElementById('userInput').value = '';

  // Resposta automática do bot
  setTimeout(() => {
      const botMessageElement = document.createElement('div');
      botMessageElement.classList.add('message', 'bot-message');
      botMessageElement.textContent = "Estou aqui para ajudar! Qual é sua dúvida?";
      chatMessages.appendChild(botMessageElement);

      // Rolagem automática
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

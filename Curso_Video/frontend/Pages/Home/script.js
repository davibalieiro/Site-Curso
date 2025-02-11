let currentIndex = 0;
   const images = document.querySelectorAll('.carousel img');
   const totalImages = images.length;
   const carousel = document.querySelector('.carousel');

   let autoSlide = setInterval(nextImage, 5000);

   function updateCarousel() {
       const newTransform = -currentIndex * 100 + '%';
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
// Funcionalidade do modal de categorias
document.getElementById('categoriesBtn').addEventListener('click', function(event) {
 event.stopPropagation(); // Impede o clique fora do botão de fechar o modal
 openCategoriesModal();
});

function openCategoriesModal() {
 document.getElementById('categoryModal').style.display = 'flex';
}

function closeCategoriesModal() {
 document.getElementById('categoryModal').style.display = 'none';
}

// Fechar o modal ao clicar fora dele
document.addEventListener('click', function(event) {
 const modal = document.getElementById('categoryModal');
 const modalContent = document.querySelector('.modal-content');
 const categoriesBtn = document.getElementById('categoriesBtn');

 // Verifica se o clique foi fora do modal e do botão de categorias
 if (modal.style.display === 'flex' && !modalContent.contains(event.target) && !categoriesBtn.contains(event.target)) {
   closeCategoriesModal();
 }
});

// Funcionalidade do chat
function openChat() {
 document.getElementById('chatWindow').style.display = 'block';
}

function closeChat() {
 document.getElementById('chatWindow').style.display = 'none';
}

function sendMessage() {
 var userMessage = document.getElementById('userInput').value;
 if (userMessage.trim() === "") return;

 var chatMessages = document.getElementById('chatMessages');
 var userMessageElement = document.createElement('div');
 userMessageElement.classList.add('message', 'user-message');
 userMessageElement.textContent = userMessage;
 chatMessages.appendChild(userMessageElement);

 document.getElementById('userInput').value = '';

 // Simula uma resposta automática
 setTimeout(() => {
   var botResponse = "Estou aqui para ajudar! Qual é sua dúvida?";
   var botMessageElement = document.createElement('div');
   botMessageElement.classList.add('message', 'bot-message');
   botMessageElement.textContent = botResponse;
   chatMessages.appendChild(botMessageElement);

   chatMessages.scrollTop = chatMessages.scrollHeight;
 }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
    const categoriesBtn = document.querySelector('.categories-btn');
    const categoryModal = document.querySelector('.category-modal');
    const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.querySelector('.chat-window');
    const closeChatButton = document.querySelector('.close-chat');

    categoriesBtn.addEventListener('click', () => {
        categoryModal.classList.toggle('active');
    });

    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    closeChatButton.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'http://localhost:3000';
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userSignupDateElement = document.getElementById('userSignupDate');
    const notificationsIcon = document.getElementById('notificationsIcon');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    
    if (!user || !token) {
        window.location.href = '/Site-Curso/Curso_Video/frontend/Pages/Auth/LoginRegister.html';
        return;
    } else {
        try {
            const response = await fetch(`${API_URL}/protected`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();
            user = data.user;
            localStorage.setItem('user', JSON.stringify(user));
            userNameElement.textContent = user.name;
            userEmailElement.textContent = user.email;
            userSignupDateElement.textContent = new Date(user.signup_date || new Date()).toLocaleDateString('pt-BR');
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            window.location.href = '/Site-Curso/Curso_Video/frontend/Pages/Auth/LoginRegister.html';
            return;
        }
    }

    const userData = {
        progress: [
            { course: "Curso de HTML e CSS", progress: 75 },
            { course: "Curso de JavaScript", progress: 50 },
            { course: "Curso de React", progress: 25 }
        ],
        history: [
            { course: "Curso de HTML e CSS", date: "2025-01-15" },
            { course: "Curso de JavaScript", date: "2025-01-20" },
            { course: "Curso de React", date: "2025-02-10" }
        ],
        feedback: [
            { course: "Curso de HTML e CSS", rating: 4, comment: "Ótimo curso!" },
            { course: "Curso de JavaScript", rating: 5, comment: "Muito bom, recomendo!" },
            { course: "Curso de React", rating: 3, comment: "Bom, mas pode melhorar." }
        ],
        notifications: [
            "Bem-vindo ao DevAcademy!",
            "Novo curso disponível: Node.js",
            "Sua assinatura foi renovada com sucesso."
        ],
        achievements: [
            "Concluiu o curso de HTML e CSS",
            "Primeiro acesso à plataforma",
            "Concluiu 50% do curso de JavaScript"
        ]
    };

    // Preencher progresso dos cursos
    const progressList = document.querySelector(".progress-list");
    if (progressList) {
        progressList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
        userData.progress.forEach(item => {
            const progressItem = document.createElement("li");
            progressItem.classList.add("progress-item");
            progressItem.innerHTML = `
                <h3>${item.course}</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: ${item.progress}%;"></div>
                </div>
                <p>${item.progress}% concluído</p>
            `;
            progressList.appendChild(progressItem);
        });
    }

    // Preencher histórico dos cursos
    const historyList = document.querySelector(".history-list");
    if (historyList) {
        historyList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
        userData.history.forEach(item => {
            const historyItem = document.createElement("li");
            historyItem.classList.add("history-item");
            historyItem.innerHTML = `
                <p><strong>Curso:</strong> ${item.course}</p>
                <p><strong>Data:</strong> ${new Date(item.date).toLocaleDateString()}</p>
            `;
            historyList.appendChild(historyItem);
        });
    }

    // Preencher feedback dos cursos
    const feedbackList = document.querySelector(".feedback-list");
    if (feedbackList) {
        feedbackList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
        userData.feedback.forEach(item => {
            const feedbackItem = document.createElement("li");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `
                <p><strong>Curso:</strong> ${item.course}</p>
                <div class="rating">
                    ${[...Array(5)].map((_, i) => `
                        <input type="radio" ${i + 1 <= item.rating ? 'checked' : ''} disabled>
                        <label>⭐</label>
                    `).join('')}
                </div>
                <p><strong>Comentário:</strong> ${item.comment}</p>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    }

    // Preencher notificações
    const notificationsList = document.querySelector(".notifications-list");
    notificationsList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
    userData.notifications.forEach(notification => {
        const li = document.createElement("li");
        li.classList.add("notification-item");
        li.innerHTML = `<p>${notification}</p>`;
        notificationsList.appendChild(li);
    });

    // Preencher conquistas
    const achievementsList = document.querySelector(".achievements-list");
    if (achievementsList) {
        achievementsList.innerHTML = ""; // Limpa a lista antes de adicionar os itens
        userData.achievements.forEach(achievement => {
            const li = document.createElement("li");
            li.classList.add("achievement-item");
            li.innerHTML = `<p>${achievement}</p>`;
            achievementsList.appendChild(li);
        });
    }

    // Evento de clique no botão "Editar Perfil"
    const editProfileBtn = document.getElementById("editProfileBtn");
    editProfileBtn.addEventListener("click", function() {
        const newName = prompt("Digite o novo nome:", user.name);
        const newEmail = prompt("Digite o novo email:", user.email);
        if (newName && newEmail) {
            user.name = newName;
            user.email = newEmail;
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
        }
    });

    // Evento de clique no botão de menu para mostrar/ocultar o menu lateral
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    const content = document.getElementById("content");
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show");
        content.classList.toggle("sidebar-open");
    });

    // Evento de clique no ícone de notificações para mostrar/ocultar o dropdown
    document.getElementById('notificationsIcon').addEventListener('click', () => {
        document.getElementById('notificationsDropdown').classList.toggle('show');
    });
});
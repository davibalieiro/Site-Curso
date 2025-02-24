document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '/Site-Curso/Curso_Video/frontend/Pages/Auth/Register.html';
        return;
    }

    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userSignupDate').textContent = new Date(user.signup_date).toLocaleDateString();

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

    // Preencher histórico dos cursos
    const historyList = document.querySelector(".history-list");
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

    // Preencher feedback dos cursos
    const feedbackList = document.querySelector(".feedback-list");
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
    achievementsList.innerHTML = ""; // Limpa a lista antes de adicionar os itens

    userData.achievements.forEach(achievement => {
        const li = document.createElement("li");
        li.classList.add("achievement-item");
        li.innerHTML = `<p>${achievement}</p>`;
        achievementsList.appendChild(li);
    });

    // Evento de clique na foto de perfil para upload
    const profileImage = document.getElementById("profileImage");
    const uploadImage = document.getElementById("uploadImage");

    profileImage.addEventListener("click", function() {
        uploadImage.click();
    });

    uploadImage.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                // Salvar a imagem no localStorage
                user.profileImage = e.target.result;
                localStorage.setItem('user', JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });

    // Restaurar a imagem de perfil do localStorage
    if (user.profileImage) {
        profileImage.src = user.profileImage;
    }

    // Evento de clique no botão "Editar Perfil"
    const editProfileBtn = document.getElementById("editProfileBtn");
    editProfileBtn.addEventListener("click", function() {
        alert("Função de edição de perfil ainda não implementada.");
    });

    // Evento de clique no botão de menu para mostrar/ocultar o menu lateral
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    const content = document.getElementById("content");

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show");
        content.classList.toggle("sidebar-open");
    });
});
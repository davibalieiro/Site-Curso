document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '../register.html';
        return;
    }

    document.getElementById('userInfo').innerHTML = `
        <h2>Bem-vindo, ${user.username}!</h2>
        <p>Email: ${user.email}</p>
    `;
});
document.addEventListener("DOMContentLoaded", function() {
    // Dados do usuário (simulados)
    const userData = {
        name: user.name,
        email: user.email,
        signupDate: "01/01/2023",
        progress: [
            { course: "Curso de HTML e CSS", progress: 75 },
            { course: "Curso de JavaScript", progress: 50 },
            { course: "Curso de React", progress: 25 }
        ]
    };

    // Atualiza os dados do usuário
    document.getElementById("userName").textContent = userData.name;
    document.getElementById("userEmail").textContent = userData.email;
    document.getElementById("userSignupDate").textContent = userData.signupDate;

    // Atualiza o progresso dos cursos
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
});
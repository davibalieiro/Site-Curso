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
        ]
    };

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
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user')) || {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        bio: 'Desenvolvedor web apaixonado por tecnologia e inovação.',
        signup_date: '2023-01-01'
    };

    // Elementos do DOM
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileBio = document.getElementById('profileBio');
    const profileSignupDate = document.getElementById('profileSignupDate');
    const profileImg = document.getElementById('profileImg');
    const profileImgInput = document.getElementById('profileImgInput');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editButtons = document.getElementById('editButtons');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editBio = document.getElementById('editBio');
    const profileEditForm = document.createElement('div');
    profileEditForm.classList.add('profile-edit-form');

    // Adiciona o formulário de edição ao DOM
    const profileSection = document.getElementById('profile');
    profileSection.appendChild(profileEditForm);

    // Preenche os dados do usuário
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;
    const signupDate = new Date(user.signup_date);
    profileSignupDate.textContent = signupDate.toLocaleDateString('pt-BR');
    profileBio.textContent = user.bio;

    // Função para alternar entre modo de visualização e edição
    const toggleEditMode = (isEditing) => {
        if (isEditing) {
            // Preenche os campos de edição com os dados atuais
            editName.value = user.name;
            editEmail.value = user.email;
            editBio.value = user.bio;

            // Esconde os elementos de visualização
            document.querySelectorAll('.profile-details p').forEach(p => p.classList.add('hidden'));
            document.querySelectorAll('.profile-details textarea').forEach(textarea => textarea.classList.add('hidden'));

            // Mostra o formulário de edição
            profileEditForm.innerHTML = `
                <input type="text" id="editName" placeholder="Nome" value="${user.name}">
                <input type="email" id="editEmail" placeholder="Email" value="${user.email}">
                <textarea id="editBio" placeholder="Biografia">${user.bio}</textarea>
                <div class="edit-buttons">
                    <button id="saveProfileBtn" class="btn">Salvar</button>
                    <button id="cancelEditBtn" class="btn">Cancelar</button>
                </div>
            `;
            profileEditForm.classList.add('visible');

            // Adiciona eventos aos novos botões
            document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
            document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
        } else {
            // Volta para o modo de visualização
            document.querySelectorAll('.profile-details p').forEach(p => p.classList.remove('hidden'));
            document.querySelectorAll('.profile-details textarea').forEach(textarea => textarea.classList.remove('hidden'));
            profileEditForm.classList.remove('visible');
        }
    };

    // Função para salvar as alterações
    const saveProfile = () => {
        user.name = editName.value;
        user.email = editEmail.value;
        user.bio = editBio.value;

        localStorage.setItem('user', JSON.stringify(user));

        profileName.textContent = user.name;
        profileEmail.textContent = user.email;
        profileBio.textContent = user.bio;

        toggleEditMode(false);
    };

    // Função para cancelar a edição
    const cancelEdit = () => {
        toggleEditMode(false);
    };

    // Evento para editar o perfil
    editProfileBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });

    // Evento para alterar a foto do perfil
    profileImg.addEventListener('click', () => {
        profileImgInput.click();
    });

    profileImgInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImg.src = e.target.result;
                localStorage.setItem('profileImg', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Carrega a foto do perfil salva
    if (localStorage.getItem('profileImg')) {
        profileImg.src = localStorage.getItem('profileImg');
    }
});
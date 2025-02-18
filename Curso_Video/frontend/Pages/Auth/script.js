const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const API_URL = 'http://localhost:3000'; 
let token = null; 

registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

function showMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? 'red' : 'green';
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        showMessage('Preencha todos os campos obrigatórios', true);
        return;
    }

    console.log('Enviando dados de registro:', { name, email, password }); // Log para depuração

    const submitButton = document.querySelector('#registerForm button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Registrando...';

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data); // Log para depuração
        if (response.ok) {
            showMessage('Usuário registrado com sucesso!');
            setTimeout(() => {
                switchToLogin();
            }, 2000); // Redireciona após 2 segundos
        } else {
            showMessage(data.message || 'Erro ao registrar usuário', true);
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor', true);
        console.error('Erro ao registrar usuário:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Cadastre-se';
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginUsername').value; // Certifique-se de que é o campo de email
    const password = document.getElementById('loginPassword').value;

    console.log('Enviando dados de login:', { email, password }); // Log para depuração

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Certifique-se de que está enviando email e password
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data); // Log para depuração
        if (response.ok) {
            token = data.token;
            showMessage('Login realizado com sucesso!');

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = './Dash/UserDashboard.html';
        } else {
            showMessage(data.message || 'Credenciais inválidas', true);
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor', true);
        console.error('Erro ao realizar login:', error);
    }
});

function switchToLogin() {
    wrapper.classList.remove('active');
}

function switchToRegister() {
    wrapper.classList.add('active');
}
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

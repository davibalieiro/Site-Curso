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
// Função para obter os parâmetros da URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    console.log("URL Params:", params.toString()); // Adicione este log para depuração
    return {
        nome: params.get("curso") || "",
        preco: params.get("preco") || "",
        descricao: params.get("descricao") || "Curso online de alta qualidade!"
    };
}

// Carregar as informações do curso na página de compra
window.onload = function() {
    const curso = getQueryParams();
    console.log("Curso Params:", curso); // Adicione este log para depuração

    if (curso.nome && curso.preco) {
        document.getElementById("curso-nome").innerText = curso.nome;
        document.getElementById("curso-preco").innerText = "R$ " + curso.preco;
        document.getElementById("curso-descricao").innerText = curso.descricao;

        // Atualizar os preços no resumo do pedido
        document.getElementById("preco-original").innerText = "R$ " + curso.preco;
        document.getElementById("preco-total").innerText = "R$ " + (parseFloat(curso.preco) + 0.90).toFixed(2);
    } else {
        console.error("Parâmetros não encontrados!");
    }
};

// Função para redirecionar para a página de compra com os parâmetros do curso
function redirecionarParaCompra(nome, preco, descricao) {
    window.location.href = "compra.html?curso=" + 
        encodeURIComponent(nome) + "&preco=" + encodeURIComponent(preco) + "&descricao=" + encodeURIComponent(descricao);
}
// Função para redirecionar para a página de compra com os parâmetros do curso
function redirecionarParaCompra(nome, preco, descricao) {
    window.location.href = "/Site-Curso/Curso_Video/frontend/Pages/test/compra/Compra.html?curso=" + 
        encodeURIComponent(nome) + "&preco=" + encodeURIComponent(preco) + "&descricao=" + encodeURIComponent(descricao);
}
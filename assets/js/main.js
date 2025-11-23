// Gerenciamento do carrinho usando localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    const produto = {
        id: Date.now(),
        nome: nome,
        preco: parseFloat(preco),
        imagem: imagem || 'assets/images/peixe-1.png',
        quantidade: 1
    };

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(p => p.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para remover produto do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    renderizarCheckout();
}

// Função para atualizar quantidade
function atualizarQuantidade(id, delta) {
    const produto = carrinho.find(p => p.id === id);
    if (produto) {
        produto.quantidade += delta;
        if (produto.quantidade <= 0) {
            removerDoCarrinho(id);
            return;
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
        renderizarCheckout();
    }
}

// Função para atualizar o carrinho (pode ser usada para atualizar contador, etc.)
function atualizarCarrinho() {
    // Esta função pode ser expandida para atualizar contadores na página
    const totalItens = carrinho.reduce((sum, p) => sum + p.quantidade, 0);
    return totalItens;
}

// Event listeners para os botões de adicionar ao carrinho
document.addEventListener('DOMContentLoaded', function() {
    const botoes = document.querySelectorAll('.buy-btn');
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const nome = this.getAttribute('data-name');
            const preco = this.getAttribute('data-price');
            const card = this.closest('.card');
            const imgElement = card ? card.querySelector('img') : null;
            let imagem = null;
            
            if (imgElement) {
                // Usa o src da imagem, ou tenta pegar do atributo src original
                imagem = imgElement.src || imgElement.getAttribute('src');
            }
            
            adicionarAoCarrinho(nome, preco, imagem);
            alert(`${nome} adicionado ao carrinho!`);
        });
    });
});


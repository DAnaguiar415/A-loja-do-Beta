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

// Funções utilitárias de carrinho importadas de cart-utils.js
import { removerDoCarrinho, atualizarQuantidade } from './cart-utils.js';

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


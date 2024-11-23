function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "img/menu-hamburger-nav-svgrepo-com.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "img/close-circle-svgrepo-com.svg";
    }
}



  function toggleDiv(divId) {
    var div = document.getElementById(divId);
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

let total = 0;
const carrinho = {};

function adicionarAoCarrinho(nome, preco) {
  if (carrinho[nome]) {
    carrinho[nome].quantidade += 1;
  } else {

    carrinho[nome] = {
      preco: preco,
      quantidade: 1
    };
  }
  atualizarCarrinho();
  exibirMensagem(` "${nome}" adicionado ao carrinho!`);
}

function removerProduto(nome) {
  if (carrinho[nome]) {
    total -= carrinho[nome].preco * carrinho[nome].quantidade;
    delete carrinho[nome];
    atualizarCarrinho();
    exibirMensagem(` "${nome}" Removido do carrinho!`);
  }
}

function atualizarCarrinho() {
  const produtosDiv = document.getElementById('produtos');
  produtosDiv.innerHTML = ''; 
  total = 0;
  for (const nome in carrinho) {
    if (carrinho.hasOwnProperty(nome)) {
      const produto = carrinho[nome];
      total += produto.preco * produto.quantidade;

      const produtoDiv = document.createElement('div');
      produtoDiv.className = 'produto';

      const nomeProduto = document.createElement('span');
      nomeProduto.textContent = `${nome} (x${produto.quantidade})`;

      const valorProduto = document.createElement('span');
      valorProduto.textContent = `R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = function () {
        removerProduto(nome);
      };

      produtoDiv.appendChild(nomeProduto);
      produtoDiv.appendChild(valorProduto);
      produtoDiv.appendChild(deleteBtn);

      produtosDiv.appendChild(produtoDiv);
    }
  }

  document.getElementById('total').textContent = total.toFixed(2);
}

function exibirMensagem(texto) {
  const mensagensDiv = document.getElementById('mensagens');

  const mensagemDiv = document.createElement('div');
  mensagemDiv.className = 'mensagem';
  mensagemDiv.textContent = texto;

  mensagensDiv.appendChild(mensagemDiv);

  setTimeout(() => {
    mensagemDiv.remove();
  }, 3000);
}

function fazerPedido() {
  if (Object.keys(carrinho).length === 0) {
    exibirMensagem('Seu carrinho está vazio!');
    return;
  }

  let mensagem = 'Pedido:\n';
  for (const nome in carrinho) {
    if (carrinho.hasOwnProperty(nome)) {
      const produto = carrinho[nome];
      mensagem += `${nome} (x${produto.quantidade}): R$ ${(produto.preco * produto.quantidade).toFixed(2)}\n`;
    }
  }
  mensagem += `Total: R$ ${total.toFixed(2)}`;
  mensagem += `\nInforme o seu nome: `;
  mensagem += `\nInforme o seu endereço: `;
  mensagem += `\nInforme a forma de pagamento: `;

  const numeroWhatsapp = '5511945264516'; 
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
  
  window.open(url, '_blank'); 
}

function pesquisarProduto(searchInputId) {
  const input = document.getElementById(searchInputId).value.toLowerCase();
  const produtos = document.querySelectorAll('.grid > div');
  const searchInput = document.getElementById(searchInputId);
  const searchButton = searchInput.nextElementSibling;

  if (searchButton.textContent === 'Voltar') {

    produtos.forEach(produto => {
      produto.style.display = 'block';
    });
    searchInput.placeholder = 'Pesquisar produtos...';
    searchButton.textContent = 'Pesquisar';
    searchInput.value = '';
    return;
  }

  let encontrou = false;

  produtos.forEach(produto => {
    const figcaption = produto.querySelector('figcaption');
    const nome = figcaption ? figcaption.textContent.toLowerCase() : '';
    if (nome.includes(input)) {
      produto.style.display = 'block';
      encontrou = true;
    } else {
      produto.style.display = 'none';
    }
  });

  if (!encontrou) {
    produtos.forEach(produto => {
      produto.style.display = 'block';
    });
  }

  searchInput.placeholder = 'Voltar produtos';
  searchButton.textContent = 'Voltar';
  searchInput.value = '';
}

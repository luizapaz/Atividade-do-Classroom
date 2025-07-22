function loadProdutos() {
  window.api.getProdutos((produtos) => {
    const container = document.getElementById('produto-lista');
    container.innerHTML = produtos.map(p => `<div>${p.nome} - R$${p.preco}</div>`).join('');
  });
}

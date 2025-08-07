let pedidos = [];
let contador = 1;

document.getElementById("ticketForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const tipo = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;
  const dataEntrega = document.getElementById("dataEntrega").value;

  const novoPedido = {
    id: contador++,
    tipo,
    descricao,
    estado: "Em Análise",
    dataEntrega
  };

  pedidos.push(novoPedido);
  atualizarTabela();
  this.reset();
});

function atualizarTabela() {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";
  pedidos.forEach(p => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td class="px-4 py-2">${p.id}</td>
      <td class="px-4 py-2">${p.tipo}</td>
      <td class="px-4 py-2">${p.descricao}</td>
      <td class="px-4 py-2">${p.estado}</td>
      <td class="px-4 py-2">${p.dataEntrega || "-"}</td>
    `;
    corpo.appendChild(linha);
  });
}

function exportarCSV() {
  const headers = "ID,Tipo,Descrição,Estado,Entrega\n";
  const linhas = pedidos.map(p => 
    \`\${p.id},\${p.tipo},\${p.descricao},\${p.estado},\${p.dataEntrega || ""}\`
  ).join("\n");
  const conteudo = headers + linhas;
  const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "pedidos_subhelp.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
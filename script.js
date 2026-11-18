const form = document.getElementById("form-cep");
const inputCep = document.getElementById("cep");
const botao = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");

function mostrarMensagem(texto, tipo) {
  resultado.innerHTML = "";
  const div = document.createElement("div");
  div.className = "mensagem " + tipo;
  div.textContent = texto;
  resultado.appendChild(div);
}

function mostrarEndereco(dados) {
  resultado.innerHTML = "";

  const container = document.createElement("div");
  container.className = "mensagem sucesso";

  const lista = document.createElement("ul");

  const campos = [
    ["Logradouro", dados.logradouro],
    ["Bairro", dados.bairro],
    ["Cidade", dados.localidade],
    ["UF", dados.uf],
  ];

  campos.forEach(([rotulo, valor]) => {
    const item = document.createElement("li");
    const negrito = document.createElement("strong");
    negrito.textContent = rotulo + ": ";
    item.appendChild(negrito);
    item.appendChild(document.createTextNode(valor || "-"));
    lista.appendChild(item);
  });

  container.appendChild(lista);
  resultado.appendChild(container);
}

async function buscarCep(evento) {
  evento.preventDefault();

  const cep = inputCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    mostrarMensagem("Digite um CEP válido com 8 números.", "erro");
    return;
  }

  mostrarMensagem("Buscando...", "info");
  botao.disabled = true;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      mostrarMensagem("CEP não encontrado em nossa base de dados.", "erro");
    } else {
      mostrarEndereco(dados);
    }
  } catch (e) {
    mostrarMensagem("Erro ao consultar o CEP. Tente novamente.", "erro");
  } finally {
    botao.disabled = false;
  }
}

form.addEventListener("submit", buscarCep);
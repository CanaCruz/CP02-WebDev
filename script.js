// === 1. CONTADOR DE SESSÃO ===
let tempo = parseInt(sessionStorage.getItem("tempo")) || 0;
const tempoSpan = document.getElementById("tempo");
const msg = document.getElementById("mensagem");

setInterval(() => {
  tempo++;
  sessionStorage.setItem("tempo", tempo);
  tempoSpan.textContent = tempo;
  if (tempo > 10) {
    msg.textContent = "Sua sessão pode expirar em breve. Interaja!";
  }
}, 1000);

// === 2. ENIGMA DA SEQUÊNCIA ===
function analisarSequencia() {
  const n1 = parseInt(document.getElementById("n1").value);
  const n2 = parseInt(document.getElementById("n2").value);
  const n3 = parseInt(document.getElementById("n3").value);
  const padraoEl = document.getElementById("padrao");
  const sequenciaEl = document.getElementById("sequencia");

  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) return;

  const seq = [n1, n2, n3];
  let padrao = "";

  if (n2 - n1 === n3 - n2) {
    padrao = "Progressão Aritmética";
    const r = n2 - n1;
    for (let i = 0; i < 5; i++) {
      seq.push(seq[seq.length - 1] + r);
    }
  } else if (n2 / n1 === n3 / n2 && Number.isInteger(n2 / n1)) {
    padrao = "Progressão Geométrica";
    const q = n2 / n1;
    for (let i = 0; i < 5; i++) {
      seq.push(seq[seq.length - 1] * q);
    }
  } else {
    padrao = "Padrão Personalizado (tipo Fibonacci)";
    for (let i = 0; i < 5; i++) {
      const len = seq.length;
      seq.push(seq[len - 1] + seq[len - 2]);
    }
  }

  padraoEl.textContent = `Padrão detectado: ${padrao}`;
  sequenciaEl.textContent = `Sequência completa: ${seq.join(", ")}`;
}

// === 3. LISTA DE CORES ===
const corInput = document.getElementById("corInput");
const lista = document.getElementById("listaCores");
const cores = [];

const codigosHex = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  yellow: "#FFFF00",
  black: "#000000",
  white: "#FFFFFF",
  purple: "#800080",
  pink: "#FFC0CB",
  orange: "#FFA500",
  gray: "#808080"
};

corInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const nome = corInput.value.trim().toLowerCase();
    if (!nome) return;

    const codigo = codigosHex[nome] || nome; // usa hex se disponível, senão o nome mesmo
    const corObj = { nome, codigo };

    cores.unshift(corObj);
    atualizarLista();
    corInput.value = "";
  }
});

function atualizarLista() {
  lista.innerHTML = "";
  for (let cor of cores) {
    const li = document.createElement("li");
    li.textContent = cor.nome;
    li.className = "color-item";
    li.style.backgroundColor = cor.codigo;
    lista.appendChild(li);
  }
}

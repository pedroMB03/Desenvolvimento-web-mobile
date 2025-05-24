const limiteTentativas = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = [];

function gerarNumeroSecreto() {
    let digitos = [];
    while (digitos.length < 4) {
        let numero = Math.floor(Math.random() * 10);
        if (!digitos.includes(numero)) {
            digitos.push(numero);
        }
    }
    return digitos.join('');
}

function verificarTentativa() {
    const entrada = document.getElementById('tentativa');
    const palpite = entrada.value;

    if (!/^\d{4}$/.test(palpite)) {
        alert('Digite exatamente 4 números!');
        return;
    }

    if (tentativas.length >= limiteTentativas) {
        alert('Você atingiu o limite de tentativas! Tente novamente!');
        return;
    }

    if (new Set(palpite).size !== 4) {
        alert('A tentativa não pode ter números repetidos!');
        return;
    }

    let bulls = 0;
    let cows = 0;

    // Lógica de Bulls e Cows
    for (let i = 0; i < 4; i++) {
        if (palpite[i] === numeroSecreto[i]) {
            bulls++;
        } else if (numeroSecreto.includes(palpite[i])) {
            cows++;
        }
    }

    const resultado = `${palpite} - Bulls: ${bulls}, Cows: ${cows}`;

    tentativas.push(resultado);

    exibirTentativas();
    atualizarTentativasRestantes();

    if (bulls === 4) {
        alert(`Parabéns! Você acertou o número secreto: ${numeroSecreto}`);
    }

    entrada.value = '';
    entrada.focus();
}

function exibirTentativas() {
    const lista = document.getElementById('listaTentativas');
    lista.innerHTML = '';

    tentativas.slice().reverse().forEach((tentativa, index) => {
        const itemLista = document.createElement("li");
        itemLista.className = "tentativaItem";
        itemLista.textContent = `Tentativa ${tentativas.length - index}: ${tentativa}`;
        lista.appendChild(itemLista);
    });
}

function atualizarTentativasRestantes() {
    const tentativasRestantes = limiteTentativas - tentativas.length;
    document.getElementById('tentativasRestantes').textContent = tentativasRestantes;
}

function reiniarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    tentativas = [];
    exibirTentativas();
    atualizarTentativasRestantes();
    document.getElementById('tentativa').value = '';
    alert('Novo jogo iniciado!');
    console.log("Número secreto:", numeroSecreto);
}

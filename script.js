// ==========================================
// 1. SISTEMA DE IRRIGAÇÃO AUTOMATIZADA (NOVO!)
// ==========================================
let irrigacaoAtiva = false;
let umidadeAtual = 65;
let volumeAgua = 8500;

function alternarIrrigacao() {
    const btn = document.getElementById("btn-irrigar");
    const statusSelo = document.getElementById("status-umidade");
    const labelUmidade = document.getElementById("dado-umidade");
    const labelAgua = document.getElementById("dado-agua");

    irrigacaoAtiva = !irrigacaoAtiva;

    if (irrigacaoAtiva) {
        btn.innerText = "Desligar Irrigação";
        btn.style.backgroundColor = "#c62828";
        statusSelo.innerText = "Status: Irrigando...";
        statusSelo.style.backgroundColor = "#bbdefb";
        statusSelo.style.color = "#0d47a1";
        
        // Efeito colateral: aumenta umidade e gasta água da cisterna
        window.loopIrrigacao = setInterval(() => {
            if (umidadeAtual < 95) umidadeAtual += 2;
            if (volumeAgua > 0) volumeAgua -= 50;
            
            labelUmidade.innerText = umidadeAtual + "%";
            labelAgua.innerText = volumeAgua + " Litros";
        }, 1000);

    } else {
        btn.innerText = "Ligar Irrigação";
        btn.style.backgroundColor = "#2e7d32";
        statusSelo.innerText = "Status: Ideal";
        statusSelo.style.backgroundColor = "#c8e6c9";
        statusSelo.style.color = "#2e7d32";
        
        clearInterval(window.loopIrrigacao);
    }
}

// ==========================================
// 2. LÓGICA DO QUIZ INTERATIVO
// ==========================================
function verificarResposta(correta) {
    const resultado = document.getElementById("resultado-quiz");
    
    if (correta) {
        resultado.innerHTML = "🎉 <strong>Correto!</strong> A energia solar é limpa, renovável e reduz drasticamente a pegada de carbono da propriedade rural.";
        resultado.style.color = "#2e7d32";
    } else {
        resultado.innerHTML = "❌ <strong>Incorreto.</strong> O gerador a diesel queima combustíveis fósseis, emitindo gases poluentes.";
        resultado.style.color = "#c62828";
    }
}

// ==========================================
// 3. OSCILAÇÃO NATURAL DOS SENSORES (SOL)
// ==========================================
function simularSol() {
    const labelPainelSolar = document.getElementById("dado-solar");
    let energiaAtual = 4.2;

    setInterval(() => {
        // Simula variação de nuvens passando pelo painel solar
        let variacao = (Math.random() * 0.4) - 0.2; 
        energiaAtual += variacao;
        if (energiaAtual < 0) energiaAtual = 0;
        labelPainelSolar.innerText = energiaAtual.toFixed(1) + " kWh";
    }, 5000);
}

// Inicializa as funções ao carregar a página
window.onload = function() {
    simularSol();
};

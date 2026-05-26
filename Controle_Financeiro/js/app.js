const despesasVetor = [];
let indiceEditando = null;

const getValue = function(seletor){
    const input = document.querySelector(seletor);  
    const valor = input.value;
    input.value = ""; 
    return valor;
};

const toNumber = function(valor){
    return Number(valor);
};

const criarDespesas = function(){
    const descricao = getValue(".descricao");
    const valor = toNumber(getValue(".valor"));

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert("Informe dados válidos.");
        return;
    }

    const despesa = {
        descricao,
        valor
    };

    if (indiceEditando === null) {
        despesasVetor.push(despesa);
    } else {
        despesasVetor[indiceEditando] = despesa;
        indiceEditando = null;
        document.querySelector(".botaoAdicionarDespesas").textContent = "Adicionar Despesa";
    }

    atualizarTela();
};

const listarDespesas = function(){
    const lista = document.querySelector(".lista");
    lista.innerHTML = "";

    despesasVetor.forEach(function (despesa, indice) {
        const item = document.createElement("div");
        item.classList.add("item");

        const texto = document.createElement("span");
        texto.textContent = `${despesa.descricao} - R$ ${despesa.valor}`;
        item.appendChild(texto);

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botaoEditar");
        botaoEditar.textContent = "✏️";
        botaoEditar.addEventListener("click", function () {
            editarDespesas(indice);
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("botaoRemover");
        botaoRemover.textContent = "X";
        botaoRemover.addEventListener("click", function() {
            removerDespesas(indice);
        });

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoRemover);
        item.appendChild(acoes);
        lista.appendChild(item);
    });

    document.querySelector(".descricao").focus();
};

const editarDespesas = function(indice){
    indiceEditando = indice;

    document.querySelector(".descricao").value = despesasVetor[indice].descricao;
    document.querySelector(".valor").value = despesasVetor[indice].valor;
    document.querySelector(".botaoAdicionarDespesas").textContent = "Salvar Edição";
    document.querySelector(".descricao").focus();
};

const removerDespesas = function(indice){
    despesasVetor.splice(indice, 1);
    atualizarTela();
}

const atualizarTela = function(){
    listarDespesas();
    calcularEstatistica();
}

const calcularEstatistica = function(){
    const estatisticas = document.querySelector(".estatisticas");
    estatisticas.innerHTML = "";

    if (despesasVetor.length === 0) {
        return;
    }

    const valores = despesasVetor.map(function (despesa) {
        return despesa.valor;
    });

    const total = valores.reduce((i, valor) => i + valor, 0);
    const media = total / despesasVetor.length;
    const maior = Math.max(...valores);
    const menor = Math.min(...valores);
    const acima100 = valores.filter(valor => valor > 100).length;

    const titulo = document.createElement("h2");
        titulo.textContent = "📊 Estatísticas";

    const pTotal = document.createElement("p");
        pTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

    const pMedia = document.createElement("p");
        pMedia.textContent = `Média: R$ ${media.toFixed(2)}`;

    const pMaior = document.createElement("p");
        pMaior.textContent = `Maior gasto: R$ ${maior.toFixed(2)}`;

    const pMenor = document.createElement("p");
        pMenor.textContent = `Menor gasto: R$ ${menor.toFixed(2)}`;

    const pAcima100 = document.createElement("p");
        pAcima100.textContent = `Gastos Acima de R$100: ${acima100}`;
        
    const percentual = document.createElement("div");

    const tituloPercentual = document.createElement("h3");
        tituloPercentual.textContent = "Percentuais";
        percentual.appendChild(tituloPercentual);

    despesasVetor.forEach(function (despesa) {
        const linha = document.createElement("p");
        linha.textContent = `${despesa.descricao} → ${(despesa.valor / total * 100).toFixed(1)}%`;
        percentual.appendChild(linha);
    });

    estatisticas.appendChild(titulo);
    estatisticas.appendChild(pTotal);
    estatisticas.appendChild(pMedia);
    estatisticas.appendChild(pMaior);
    estatisticas.appendChild(pMenor);
    estatisticas.appendChild(pAcima100);
    estatisticas.appendChild(percentual);
} 

document.querySelector(".botaoAdicionarDespesas").addEventListener("click", criarDespesas);
/*

const calcularEstatistica = () => {
    const valorTotal = despesasArray.reduce((acum, despesa) => {
         return acum + valor; 
    },0)

    const estatisticaHTML = document.querySelector(".estatisticas")

    const soValor = despesasArray.map((despesas) => valor)
    const maiorGasto = Math.max.apply(null, soValor);
    const menorGasto = Math.min.apply(null, soValor);
    const qtdaGastosAcima100 = (soValor.filter(valor => valor >= 100)).length;

    const h2 = document.createElement("h2")
    const pTotal = document.createElement("p")
    const pMaior = document.createElement("p");
    const pMenor = document.createElement("p");
    const pQtda = document.createElement("p");
    const ulItens = document.createElement("ul")
    ulItens.innerHTML = despesas.reduce((acum, despesas) => {
        return acum + `<li>${descricao} - R/$${valor} - ${(100 * valor/valorTotal).toFixed(2)}%</li>`
    }, "")
    h2.textContent = "Estatisticas"

    //não repetir
    estatisticaHTML.innerHTML = "";

    pTotal.textContent = `Total: R$ ${valorTotal.tofixed(2)}`
    maiorGasto.textContent = `MaiorGasto: R$ ${pMaior.tofixed(2)}`
    menorGasto.textContent = `MenorGasto: R$ ${pMenor.tofixed(2)}`
    qtdaGastosAcima100.textContent = `QuantidadeDeGastos: R$ ${pQtda.tofixed(2)}`

    estatisticaHTML.appendChild(h2)
    estatisticaHTML.appendChild(pTotal)
    estatisticaHTML.appendChield(pMaior)
    estatisticaHTML.appendChield(pMenor)
    estatisticaHTML.appendChield(pQtda)
    estatisticaHTML.appendChield(ulItens)
}

const botao = document.querySelector(".botaoAdicionar")

//abordagem 2 - 
botao.addEventListener("click", adicionarDespesa)
botao.addEventListener("click", calcularEstatistica)
*/
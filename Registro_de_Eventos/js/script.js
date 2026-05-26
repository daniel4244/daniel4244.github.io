const eventoArray  = [];

const getValue = function(seletor){
    const input = document.querySelector(seletor);
    return input.value;
};

const getChecked = function(seletor){
    const input = document.querySelector(seletor);
    return input.checked;
}

const getNumber = function(valor){
    return Number(valor)
};

const getData = function(valor){
    return new Date(valor)
};

const limparCampos = function(){
    document.querySelector("#titulo").value = "";
    document.querySelector("#local").value = "";
    document.querySelector("#vagas").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#data").value = "";
    document.querySelector("#ativo").checked = false;
};

const criarEvento = function(){
  try{
    const titulo = getValue("#titulo").trim();
    const local = getValue("#local").trim();
    const vagas = getNumber(getValue("#vagas"));
    const preco = getNumber(getValue("#preco"));
    const data = getData(getValue("#data"));
    const ativo = getChecked("#ativo");

    if(!titulo) { throw new Error("Titulo não pode ficar vazio.");}
    if(!local) { throw new Error("Local não pode ficar vazio.");}
    if(vagas < 0) { throw new Error("Vagas não pode ser negativo.");}
    if(preco < 0) { throw new Error("Preço não pode ficar negativo.");}
    if(isNaN(data.getTime())) { throw new Error("Data inválida");}

    const evento = {
        titulo,
        local,
        vagas,
        preco,
        data,
        ativo,
        observacao: undefined,
        cancelamento: null
    };
    eventoArray.push(evento);
    limparCampos();
    atualizarTela();
    } catch (erro) {
        alert(erro.message);
    } 
}

const listarEvento = function(){
    const lista = document.querySelector("#listaEventos");
    lista.innerHTML = "";

    eventoArray.forEach(function(evento,indice){
        const item = document.createElement("div");
        item.classList.add("item");

        const texto = document.createElement("span");
        texto.textContent = `
        Titulo: ${evento.titulo} |
        Local: ${evento.local} |
        Vagas: ${evento.vagas} |
        Preço R$ ${evento.preco.toFixed(2)} |
        Data: ${evento.data.toLocaleDateString("pt-BR")} |
        Status: ${evento.ativo ? "Ativo" : "Inativo"}`;
        item.appendChild(texto);

        const acao = document.createElement("div");
        acao.classList.add("acao");

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("botaoRemover");
        botaoRemover.textContent = "X";
        botaoRemover.addEventListener("click", function(){
            removerEvento(indice);
        });

        acao.appendChild(botaoRemover);
        item.appendChild(acao);
        lista.appendChild(item);
    });

    document.querySelector("#titulo").focus();
}

const removerEvento = function(indice){
    eventoArray.splice(indice, 1);
    atualizarTela();
}

const atualizarTela = function(){
    listarEvento();
    listarEstatisticas();
}

const listarEstatisticas = function(){
    const estatisticas = document.querySelector("#estatisticas");
    estatisticas.innerHTML = "";

    if (eventoArray.length === 0){return;}

    const eventosAtivos = eventoArray.filter(function(evento){
        return evento.ativo;
    });

    const quantidadeAtivos = eventosAtivos.length;

    const totalArrecadado = eventosAtivos.reduce(function(acumulador, evento){
        return acumulador + (evento.vagas * evento.preco);
    }, 0);

    const titulo = document.createElement("h2");
        titulo.textContent = "📊 Estatísticas";

    const pEventosAtivos = document.createElement("p");
        pEventosAtivos.textContent = `Eventos Ativos: ${quantidadeAtivos}`;

    const pValorTotal = document.createElement("p");
        pValorTotal.textContent = `Total Arrecadado pelos eventos ativos: R$ ${totalArrecadado.toFixed(2)}`;

    const observacoes = document.createElement("div");

    eventosAtivos.forEach(function(evento){
        const pObservacao = document.createElement("p");
        if (evento.observacao === undefined) {
            pObservacao.textContent = `Evento ${evento.titulo} não possui observações cadastradas.`;
        } else {
            pObservacao.textContent = `Evento ${evento.titulo}: ${evento.observacao}`;
        }
        observacoes.appendChild(pObservacao);
    });

    const cancelamentos = document.createElement("div");

    eventoArray.forEach(function(evento){
        if (evento.cancelamento !== null) {
            const pCancelamento = document.createElement("p");
            pCancelamento.textContent = `Evento cancelado. Motivo: ${evento.cancelamento}`;
            cancelamentos.appendChild(pCancelamento);
        }
    });

    estatisticas.appendChild(titulo);
    estatisticas.appendChild(pEventosAtivos);
    estatisticas.appendChild(pValorTotal);
    estatisticas.appendChild(observacoes);
    estatisticas.appendChild(cancelamentos);
}

document.querySelector("#btnCadastrar").addEventListener("click", criarEvento);


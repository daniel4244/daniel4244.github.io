const apiKey = "dbe1fabbdf854db483d192749261506";
let historicoConsultas = [];

const elementos = {
    //captura de elementos principais
    btnPesquisar: document.getElementById("btnPesquisar"),
    historico: document.getElementById("historico"),
    resultado: document.getElementById("resultado"),
    estatisticas: document.getElementById("estatisticas"),
    campoCidade: document.getElementById("cidade"),
    sugestoes: document.getElementById("sugestoes"),    

    //captura de dados do clima
    nomeCidade: document.getElementById("nomeCidade"),
    temperatura: document.getElementById("temperatura"),
    sensacao: document.getElementById("sensacao"),
    umidade: document.getElementById("umidade"),
    vento: document.getElementById("vento"),
    dataConsulta: document.getElementById("dataConsulta"),

    //dados estatisticos
    totalConsultas: document.getElementById("totalConsultas"),
    mediaTemp: document.getElementById("mediaTemp"),
    cidadeQuente: document.getElementById("cidadeQuente")
};

//função de busca da API
async function buscarClima(cidade){
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cidade)}&lang=pt`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    console.log(dados);

    mostrarResultado(dados);
    adicionarAoHistorico(dados);
}

//mostra o resultado retornado direto no textContent
function mostrarResultado(dados){   
    elementos.nomeCidade.textContent = dados.location.name;
    elementos.temperatura.textContent = `${dados.current.temp_c} °C`;
    elementos.sensacao.textContent = `${dados.current.feelslike_c} °C`;
    elementos.umidade.textContent = `${dados.current.humidity}%`;
    elementos.vento.textContent = `${dados.current.wind_kph} km/h`;
    elementos.dataConsulta.textContent =
        new Date().toLocaleDateString("pt-BR");
}

function adicionarAoHistorico(dados){
    const consulta ={
        cidade: dados.location.name,
        pais: dados.location.country,
        temperatura: dados.current.temp_c,
        umidade: dados.current.humidity,
        vento: dados.current.wind_kph,
        dataConsulta: new Date().toLocaleDateString("pt-br")
    };

    historicoConsultas.push(consulta);
    mostrarHistorico();
    atualizarEstatisticas();
}

function mostrarSugestoes(cidadesEncontradas){
    elementos.sugestoes.innerHTML = "";

    cidadesEncontradas.forEach(function(cidade){
        const item = document.createElement("div");
        item.textContent = `${cidade.name}, ${cidade.region}, ${cidade.country}`;
   
        item.addEventListener("click", function(){
            elementos.campoCidade.value = cidade.name;
            elementos.sugestoes.innerHTML = "";

            buscarClima(`id:${cidade.id}`);
        });
        elementos.sugestoes.appendChild(item);

    });
}

function mostrarHistorico(){
    elementos.historico.innerHTML = "";

    historicoConsultas.forEach(function(consulta){
        elementos.historico.innerHTML += `
            <div class = "item-historico">
                <h2><strong>${consulta.cidade}, ${consulta.pais}</strong></h2>
                <li>Temperatura: ${consulta.temperatura} °C</li>
                <li>Umidade: ${consulta.umidade}%</li>
                <li>Vento: ${consulta.vento} km/h</li>
                <li>Data: ${consulta.dataConsulta}</li>
                <br>
            </div>
        `;
    });
}

function atualizarEstatisticas(){
    if(historicoConsultas.length === 0){
        elementos.totalConsultas.textContent = "0";
        elementos.mediaTemp.textContent = "0";
        elementos.cidadeQuente.textContent = "0";
        return;
    }

    elementos.totalConsultas.textContent = historicoConsultas.length;

    const somaTemperaturas = historicoConsultas.reduce(function(total, consulta){
        return total + consulta.temperatura;
    }, 0);

    const media = somaTemperaturas / historicoConsultas.length;
    elementos.mediaTemp.textContent = `${media.toFixed(1)} °C`;

        const maisQuente = historicoConsultas.reduce(function(maior, consulta) {
        if (consulta.temperatura > maior.temperatura) {
            return consulta;
        }

        return maior;
    });

    elementos.cidadeQuente.textContent =
        `${maisQuente.cidade} (${maisQuente.temperatura} °C)`;
}

//EventListener da barra de pesquisa a partir da digitação
elementos.campoCidade.addEventListener("input", async function(){
    const textoDigitado = elementos.campoCidade.value.trim();

    if(textoDigitado.lenght < 3){
        elementos.sugestoes.innerHTML = "";
        return;
    }

    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(textoDigitado)}`;
    const resposta = await fetch(url);
    const cidadesEncontradas = await resposta.json();

    mostrarSugestoes(cidadesEncontradas);
    console.log(cidadesEncontradas);
})

//EventListener do pesquisar a partir do click
elementos.btnPesquisar.addEventListener("click", function(){
    const cidade = elementos.campoCidade.value.trim();
    console.log(cidade);

    if(cidade === ""){
        alert("Digite uma cidade");
        return;
    }

    buscarClima(cidade);
})
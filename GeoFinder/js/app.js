//captura de elementos
const campoBusca = document.getElementById("campoBusca");
const filtroRegiao = document.getElementById("filtroRegiao");
const listaPaises = document.getElementById("listaPaises");
const estatisticas = document.getElementById("estatisticas");
const detalhes = document.getElementById("detalhes");

//declaração de arrays de objetos vazias para API
let paises = [];
let paisesExibidos = [];

//funcção assincrona para carregar a API
async function carregarPaises() {
    const resposta = await fetch("https://www.apicountries.com/countries");
    const dados = await resposta.json();

    console.log("Primeiro país:", dados[0]);

    paises = dados;
    paisesExibidos = dados;

    mostrarPaises(paisesExibidos);
}

//mostra os paises
function mostrarPaises(lista) {
    listaPaises.innerHTML = "";

    lista.forEach(function(pais) {
        listaPaises.innerHTML += `
            <div class="pais" onclick="mostrarDetalhes('${pais.alpha3Code}')">
                <img src="${pais.flags.png}" alt="Bandeira de ${pais.name}">
                <h2>${pais.name}</h2>
                <p>Capital: ${pais.capital ? pais.capital : "Não informada"}</p>
                <p>População: ${pais.population}</p>
                <p>Região: ${pais.region}</p>
            </div>
        `;
    });
    calcularEstatisticas(lista);
}

//aplica os filtros
function aplicarFiltros() {
    const textoDigitado = campoBusca.value.toLowerCase();
    const regiaoSelecionada = filtroRegiao.value;

    let resultado = paises;

    if (textoDigitado !== "") {
        resultado = resultado.filter(function(pais) {
            return pais.name.toLowerCase().includes(textoDigitado);
        });
    }
    if (regiaoSelecionada !== "") {
        resultado = resultado.filter(function(pais) {
            return pais.region === regiaoSelecionada;
        });
    }
    paisesExibidos = resultado;
    mostrarPaises(paisesExibidos);
}

//filtro_1
campoBusca.addEventListener("input", function() {
    aplicarFiltros();
});

//filtro_2
filtroRegiao.addEventListener("change", function() {
    aplicarFiltros();
});

//ordenação_1
function ordenarPorNome(){
    paisesExibidos.sort(function(a,b){
        return a.name.localeCompare(b.name);
    });
    mostrarPaises(paisesExibidos);
}

//ordenação_2
function ordenarPorArea(){
    paisesExibidos.sort(function(a,b){
        return b.area - a.area;
    });
    mostrarPaises(paisesExibidos);
}

//ordenação_3
function ordenarPorPopulacao(){
    paisesExibidos.sort(function(a,b){
        return b.population - a.population
    });
    mostrarPaises(paisesExibidos);
}

//funcao para calcular as estatisticas
function calcularEstatisticas(lista) {
    if (lista.length === 0) {
        estatisticas.innerHTML = `
            <h2>Estatísticas</h2>
            <p>Nenhum país encontrado.</p>
        `;
        return;
    }

    const populacaoTotal = lista.reduce(function(total, pais) {
        return total + (pais.population || 0);
    }, 0);

    const areaTotal = lista.reduce(function(total, pais) {
        return total + (pais.area || 0);
    }, 0);

    const mediaPopulacao = populacaoTotal / lista.length;
    const mediaArea = areaTotal / lista.length;

    estatisticas.innerHTML = `
        <h2>Estatísticas</h2>
        <p>Quantidade de países exibidos: ${lista.length}</p>
        <p>População total: ${populacaoTotal}</p>
        <p>Área total: ${areaTotal}</p>
        <p>Média de população: ${mediaPopulacao.toFixed(2)}</p>
        <p>Média de área: ${mediaArea.toFixed(2)}</p>
    `;
}

//funcao para detalhes
function mostrarDetalhes(codigo){
    const pais = paises.find(function(pais){
        return pais.alpha3Code === codigo;
    });

    if (!pais) {
        detalhes.innerHTML = "<p>País não encontrado.</p>";
        return;
    }

    const moedas = pais.currencies
        ? pais.currencies.map(function(moeda){
            return moeda.name;
        }).join(", ")
        : "Não informada";

    const idiomas = pais.languages
        ? pais.languages.map(function(idioma) {
            return idioma.name;
        }).join(", ")
        : "Não informados";

    const fronteiras = pais.borders && pais.borders.length > 0
        ? pais.borders.join(", ")
        : "Nenhuma";

    detalhes.innerHTML = `
        <h2>Detalhes de ${pais.name}</h2>
        <p><strong>Sub-região:</strong> ${pais.subregion ? pais.subregion : "Não informada"}</p>
        <p><strong>Moedas:</strong> ${moedas}</p>
        <p><strong>Idiomas:</strong> ${idiomas}</p>
        <p><strong>Fronteiras:</strong> ${fronteiras}</p>
    `;
}

carregarPaises();


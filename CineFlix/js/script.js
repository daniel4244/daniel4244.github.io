const campoBusca = document.getElementById("campoBusca");
const catalogo = document.getElementById("catalogo");

let filmes = [];
let filmesExibidos = [];

async function carregarFilmes() {
    const resposta = await fetch("https://rafaelescalfoni.github.io/desenv_web/filmes.json");
    const dados = await resposta.json();

    filmes = dados;
    filmesExibidos = dados;

    mostrarFilmes(filmesExibidos);
}

function mostrarFilmes(lista) {
    catalogo.innerHTML = "";

    if (lista.length === 0) {
        catalogo.innerHTML = `<p class="mensagem">Nenhum filme encontrado.</p>`;
        return;
    }

    lista.forEach(function(filme) {
        catalogo.innerHTML += `
            <article class="filme">
                <img class="filme-poster" src="${filme.figura}" alt="${filme.titulo}">

                <div class="filme-conteudo">
                    <div class="filme-topo">
                        <h2>${filme.titulo}</h2>
                        <span class="classificacao ${classeClassificacao(filme.classificacao)}">
                            ${textoClassificacao(filme.classificacao)}
                        </span>
                    </div>

                    <ul class="generos">
                        ${montarGeneros(filme.generos)}
                    </ul>

                    <p class="elenco">
                        <strong>Elenco:</strong> ${filme.elenco.join(", ")}
                    </p>

                    <p class="resumo">${filme.resumo}</p>

                    <p class="avaliacao">
                        Avaliação média: ${calcularMediaOpinioes(filme.opinioes)}
                    </p>

                    <div class="similares">
                        <h3>Títulos semelhantes</h3>
                        <ul class="similares-lista">
                            ${montarSimilares(filme.titulosSemelhantes)}
                        </ul>
                    </div>
                </div>
            </article>
        `;
    });
}

function montarGeneros(generos) {
    let html = "";

    generos.forEach(function(genero) {
        html += `<li>${genero}</li>`;
    });

    return html;
}

function montarSimilares(idsSimilares) {
    let html = "";

    idsSimilares.forEach(function(id) {
        const filmeSimilar = filmes.find(function(filme) {
            return filme.id === id;
        });

        if (filmeSimilar) {
            html += `
                <li>
                    <img src="${filmeSimilar.figura}" alt="${filmeSimilar.titulo}" title="${filmeSimilar.titulo}">
                </li>
            `;
        }
    });

    if (html === "") {
        return `<li>Nenhum título semelhante.</li>`;
    }

    return html;
}

function calcularMediaOpinioes(opinioes) {
    if (opinioes.length === 0) {
        return "Sem avaliações";
    }

    const soma = opinioes.reduce(function(total, opiniao) {
        return total + opiniao.rating;
    }, 0);

    const media = soma / opinioes.length;

    return media.toFixed(1);
}

function classeClassificacao(classificacao) {
    if (classificacao === 0) {
        return "livre";
    }

    return `anos-${classificacao}`;
}

function textoClassificacao(classificacao) {
    if (classificacao === 0) {
        return "L";
    }

    return classificacao;
}

function aplicarBusca() {
    const textoDigitado = campoBusca.value.toLowerCase().trim();

    if (textoDigitado === "") {
        filmesExibidos = filmes;
    } else {
        filmesExibidos = filmes.filter(function(filme) {
            return filme.titulo.toLowerCase().includes(textoDigitado);
        });
    }

    mostrarFilmes(filmesExibidos);
}

campoBusca.addEventListener("input", function() {
    aplicarBusca();
});

carregarFilmes();
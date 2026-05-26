const testarSenha = senhaDigitada => {
    let classe=[0,0,0,0]

    for(let i=0; i< senhaDigitada.length; i++) {
        console.log(senhaDigitada[i])
        let caracter = senhaDigitada[i]
        let codigoAscii = senhaDigitada.charCodeAt(i)
        if(codigoAscii >= 97 && codigoAscii<=122) {
            classe[0]= 1
        } else if (codigoAscii >= 65 && codigoAscii<=90) {
            classe[1]= 1
        } else if (codigoAscii >= 48 && codigoAscii<=57) {
            classe[2]= 1
        } else {
            classe[3] = 1
        }
    }
    let pontuacao = 0
    for(let i=0; i<classe.length; i++) {
        pontuacao += classe[i]
    } 
    console.log(`valor atribuido a classe = ${classe} pontuacao: ${pontuacao}`)
    let tipoSenha = ""
    switch (pontuacao) {
        case 4: tipoSenha = "Senha Muito Forte" 
            break
        case 3: tipoSenha = "Senha Forte" 
            break
        case 2: tipoSenha = "Senha Moderada" 
            break
        default: tipoSenha =  "Senha Fraca" 
    }
    return tipoSenha
}
const botao01 = document.querySelector("#executar01")
botao01.onclick = function() {
    const iptSenha = document.getElementById("iptSenha")
    let tipoSenha = testarSenha(iptSenha.value)
    const resultado = document.getElementById("resultado01") 
    resultado.innerHTML = `<h1>Tipo de Senha Detectada</h1><strong>${tipoSenha}</strong>`
    console.log(tipoSenha)
}
/*
02. Faça um programa que inverta uma palavra
*/
const inverterPalavra = palavraDigitada => {
    let invertida = "";

    for(let i = palavraDigitada.length - 1; i >= 0; i--) {
        invertida += palavraDigitada[i];
    }
    return invertida;
}
const botao02 = document.querySelector("#executar02")
botao02.onclick = function() {
    const palavraDigitada = document.getElementById("palavra02")
    let invertida = inverterPalavra(palavraDigitada.value)
    const resultado02 = document.getElementById("resultado02")

    resultado02.innerHTML =`<h1>Palavra Invertida</h1><strong>${invertida}</strong>`
    console.log(invertida)
}
/*
   03. Faça um programa que marque no texto todas as ocorrencias de um termo digitado 
*/
const expressaoRegular = texto => texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const destacarOcorrencias = (textoDigitado, palavraAlvo) => {
    if (palavraAlvo.trim() === "") {
        return {
            qtda: 0,
            textoMarcado: textoDigitado
        }
    }
    const regex = new RegExp(expressaoRegular(palavraAlvo), "gi")
    const correspondencias = textoDigitado.match(regex)
    const qtda = correspondencias ? correspondencias.length : 0
    const textoMarcado = textoDigitado.replace(regex, match => `<mark>${match}</mark>`)

    return {
        qtda,
        textoMarcado
    }
}
const botao03 = document.querySelector("#executar03")
botao03.onclick = function(){
    const textoDigitado = document.getElementById("texto");
    const palavraAlvo = document.getElementById("pesquisa");
    const resultado03 = document.getElementById("resultado03")

    const { qtda, textoMarcado } = destacarOcorrencias(textoDigitado.value, palavraAlvo.value)
    
    resultado03.innerHTML = `<h1>Ocorrencias: ${qtda}</h1><p>${textoMarcado}</p>`
    console.log("Palavra alvo: " + palavraAlvo.value + "Quantidade: " + qtda);
}
/*
 04. Faça um programa que codifique uma frase usando a estratégia TENIS/POLAR, na qual as letras que apareçam em uma das palavras são intercambiadas - A letra T por P e vice-versa; a letra E por O e vice- versa; a letra N por L e vice-versa; a letra I por A e vice-versa; e a letra S por R e vice-versa; as demais letras devem ser mantidas no texto codificado.  
*/
const trocaPolar = fraseDigitada => {
    let inversao = ""
    for(let i = 0; i < fraseDigitada.length; i++) {
        let polar = fraseDigitada[i].toLowerCase()
        let letraConvertida = polar

        switch (polar) {
            case 't': letraConvertida = "p"
                break
            case 'e': letraConvertida = "o"
                break
            case 'n': letraConvertida = "l"
                break
            case 'i': letraConvertida = "a"
                break
            case 's': letraConvertida = "r"
                break
            case 'p': letraConvertida = "t"
                break
            case 'o': letraConvertida = "e"
                break
            case 'l': letraConvertida = "n"
                break
            case 'a': letraConvertida = "i"
                break
            case 'r': letraConvertida = "s"
                break
        }
        inversao += letraConvertida
    }
    return inversao
}
const botao04 = document.querySelector("#executar04")
botao04.onclick = function(){
    const frase = document.getElementById("frase03")
    const resultado04 = document.getElementById("resultado04")

    const codificada = trocaPolar(frase.value)

    resultado04.innerHTML = `<h1>Frase Codificada</h1><strong>${codificada}</strong>`
}
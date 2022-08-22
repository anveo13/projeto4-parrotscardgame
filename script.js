//cartas
const cartas = document.querySelector("ul");
let numeroCartas;
let condicaoJogo;

do {
    numeroCartas = parseInt(prompt("Digite a numero de cartas que vai jogar \n\n Somente PARES  entre 4 e 14"));

    let condicao1 = numeroCartas >= 4 && numeroCartas <= 14;
    let condicao2 = numeroCartas % 2 === 0;
    condicaoJogo = condicao1 && condicao2;

} while (!condicaoJogo);

const opcoesCaroa = ["bobrossparrot", "explodyparrot", "fiestaparrot", 
                            "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
let escolherCoroa = [];

let count = 0;
while(count !== (numeroCartas) / 2) {
    let varEscolherCartas = Math.round(Math.random() * (opcoesCaroa.length - 1));

    let varParaEscolherPosicaoA  = Math.round(Math.random() * (numeroCartas - 1));
    let varParaEscolherPosicaoB = Math.round(Math.random() * (numeroCartas - 1));

    let posicaoDiferentes = varParaEscolherPosicaoB !== varParaEscolherPosicaoA;
    let posicaoDefinida = escolherCoroa[varParaEscolherPosicaoB] == undefined && 
    escolherCoroa[varParaEscolherPosicaoA] == undefined;

    if(posicaoDiferentes && posicaoDefinida) {

    escolherCoroa[varParaEscolherPosicaoA] = opcoesCaroa[varEscolherCartas];
    escolherCoroa[varParaEscolherPosicaoB] = opcoesCaroa[varEscolherCartas];

    opcoesCaroa.splice(varEscolherCartas, 1);
    count++;
    };
};

for(let i = 0; i < numeroCartas; i++) {
cartas.innerHTML += `<li>      
       <div class="volta-cara cara">
               <img src="images/front.png">
       </div>
       <div class="coroa cara">
               <img src="images/${escolherCoroa[i]}.gif"
       </div>
   </li>`;
}

// fim cartas

const itemsArray = document.querySelectorAll("li");
let tempoInicial = true;
let segundos = 0;
let cartaEscolhida = [];
let numeroJogadas = 0;
let id;

function iniciarCronometro() {
    const id = setInterval(function(){
        segundos++;
        let tempo = document.querySelector("span");
        tempo.innerHTML = `${segundos}s`;
   }, 1000);
    return id;
}

function remove() {
    itemsArray.forEach(item => {
        item.removeEventListener("click", jogar);
    });
};

function adiciona() {
    itemsArray.forEach(item => {
        item.addEventListener("click", jogar);
    });
}

adiciona();

function jogar(event) {
    const item = event.currentTarget;
    let carta1;
    let carta2;
    let cartasIguais;

    if(tempoInicial) {
        tempoInicial = false;
        id = iniciarCronometro();
    }

    if(!cartaEscolhida.includes(item)) {
        giraCarta(item);
        cartaEscolhida.push(item);
        numeroJogadas++;
    } else if(cartaEscolhida.includes(item)) {
    }

    let even = numeroJogadas % 2 === 0;
    if(even) {

        carta2 = cartaEscolhida[cartaEscolhida.indexOf(item)];
        carta1 = cartaEscolhida[cartaEscolhida.indexOf(item) - 1];
        cartasIguais = verificarCartas(carta1, carta2);
        if(!cartasIguais) {
            cartaEscolhida.splice(cartaEscolhida.length - 2, 2);
        }
        if(cartasIguais) {
            fimJogo(id);
        }
    }
};

function verificarCartas(carta1, carta2) {
    let carta1Image = carta1.children[1].children[0].getAttribute("src");
    let carta2Image = carta2.children[1].children[0].getAttribute("src");

    remove();
    if(carta1Image !== carta2Image) {
        setTimeout(function() {
            giraCarta(carta1);
            giraCarta(carta2);
            adiciona();
        }, 1000);
        return false;
    } else {
        setTimeout(adiciona, 400);
        return true;
    };
};

function giraCarta(item) {
    let cara = item.children[0];
    let coroa = item.children[1];

    if(cara.classList.contains("volta-cara") === true) {
        cara.classList.remove("volta-cara");
        cara.classList.add("coroa");
        coroa.classList.add("volta-cara");
        coroa.classList.remove("coroa");
    } else {
        cara.classList.remove("coroa");
        cara.classList.add("volta-cara");
        coroa.classList.add("coroa");
        coroa.classList.remove("volta-cara");
    };
};


function fimJogo(id) {

    if(cartaEscolhida.length === numeroCartas) {
        clearInterval(id);
        setTimeout(alert, 500,`Voce ganhou em ${numeroJogadas} jogadas! \n\n  Em ${segundos} segundos!`);
        setTimeout(function () {reiniciarJogo()}, 1000);
    }
}

function reiniciarJogo() {
    const pergunta = prompt("Quer Jogar Novamente? Digite 'sim' ou 'nao'");
    if(pergunta === 'sim') {
        location.reload();
    };
};
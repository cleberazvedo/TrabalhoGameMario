function sortearNro(x) {
    return parseInt(Math.random() * x);
}

function iniciarJogo() {

    var g_nroImage = sortearNro(6);
    document.body.style.backgroundImage = "url('/image/fundo" + g_nroImage + ".png')";

    if (document.getElementById("mario").clientWidth == document.getElementById("cogumelo").clientWidth) {
        document.getElementById("lifeP").innerHTML = parseInt(document.getElementById("lifeP").innerHTML) + 1;
    }

    sortearCogumelo();
    sortearMario();
}

function sortearCogumelo() {
    var ponto1 = {
        x: 0,
        y: 0
    }
    var ponto2 = {
        x: 0,
        y: 0
    }
    var m, k;
    var larguraImg = document.getElementById("cogumelo").clientWidth;
    // Sorteio da coordenada do primeiro ponto de x do cogumelo
    ponto1.x = sortearNro(window.innerWidth - larguraImg);
    // Sorteio da coordenada do segundo ponto de x do cogumelo
    ponto2.x = sortearNro(window.innerWidth - larguraImg);
    // Sorteio da coordenada do segundo ponto de y do cogumelo
    ponto2.y = window.innerHeight - document.getElementById("cogumelo").clientHeight;

    m = getCoefAngular(ponto1, ponto2)
    k = getCoefLinear(ponto1, m);
    voar(ponto1.y, ponto2.y, m, k);
}

function sortearMario() {
    habilitaMovimentoTeclado("mario", 15);
    posicionarObj("mario", sortearNro(window.innerWidth - document.getElementById("mario").clientWidth), window.innerHeight - document.getElementById("mario").clientHeight);
}

var pointsPlacar = 0;

function voar(y_inicial, y_final, m, k) {
    if (y_inicial < y_final) {
        y_inicial = y_inicial + 2;
        x_atual = (y_inicial - k) / m;
        posicionarObj("cogumelo", x_atual, y_inicial);
        if (detectarColisao("mario", "cogumelo")) {
            document.getElementById("placar").innerHTML = parseInt(document.getElementById("placar").innerHTML) + 1;
            pointsPlacar = document.getElementById("placar");
            return;
        }
        setTimeout(voar, 1, y_inicial, y_final, m, k);
    } else {
        document.getElementById("cogumelo").style.visibility = "hidden";
        sortearCogumelo();
    }
}

function getCoefAngular(ponto1, ponto2) {
    return (ponto2.y - ponto1.y) / (ponto2.x - ponto1.x);
}

function getCoefLinear(ponto, m) {
    return ponto.y - m * ponto.x;
}

function posicionarObj(idCampo, x, y) {
    document.getElementById(idCampo).style.position = "absolute";
    document.getElementById(idCampo).style.top = y + "px";
    document.getElementById(idCampo).style.left = x + "px";
}

function detectarColisao(objeto1, objeto2) {
    var baseObjeto2 = document.getElementById(objeto2).getBoundingClientRect();
    var baseObjeto1 = document.getElementById(objeto1).getBoundingClientRect();
    return ((baseObjeto2.bottom >= baseObjeto1.top) && (((baseObjeto2.right >= baseObjeto1.left) && (baseObjeto2.left <= baseObjeto1.right)) || ((baseObjeto2.left >= baseObjeto1.right) && (baseObjeto2.right <= baseObjeto1.left)) || ((baseObjeto2.left >= baseObjeto1.left) && (baseObjeto2.right <= baseObjeto1.right)))) ? true : false;

}
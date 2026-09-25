const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let index = 0;
let intervalo;


// CARROSSEL PRINCIPAL

if (slider && slides.length > 0 && prev && next) {

    function atualizarCarrossel() {

        slider.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }


    function proximoSlide() {

        index++;

        if (index >= slides.length) {
            index = 0;
        }

        atualizarCarrossel();
    }


    function slideAnterior() {

        index--;

        if (index < 0) {
            index = slides.length - 1;
        }

        atualizarCarrossel();
    }


    next.addEventListener("click", () => {

        proximoSlide();
        reiniciarIntervalo();

    });


    prev.addEventListener("click", () => {

        slideAnterior();
        reiniciarIntervalo();

    });


    dots.forEach((dot, i) => {

        dot.addEventListener("click", () => {

            index = i;

            atualizarCarrossel();

            reiniciarIntervalo();

        });

    });


    function iniciarIntervalo() {

        intervalo = setInterval(proximoSlide, 4000);

    }


    function reiniciarIntervalo() {

        clearInterval(intervalo);

        iniciarIntervalo();

    }


    iniciarIntervalo();

    atualizarCarrossel();

}

// CARROSSEL DA FUNILARIA

const imagemFunilaria = document.querySelector("#imagem-carrossel");

if (imagemFunilaria) {

    const imagensFunilaria = [
        "img/funilaria_antes.jpeg",
        "img/funilaria_depois.jpeg"
    ];

    let indiceFunilaria = 0;


    function atualizarFunilaria() {

        imagemFunilaria.src = imagensFunilaria[indiceFunilaria];

        const indicadores = document.querySelectorAll(".indicadores span");

        indicadores.forEach((indicador, i) => {

            indicador.classList.remove("ativo");

            if (i === indiceFunilaria) {

                indicador.classList.add("ativo");

            }

        });

    }


    function proximo() {

        indiceFunilaria++;

        if (indiceFunilaria >= imagensFunilaria.length) {

            indiceFunilaria = 0;

        }

        atualizarFunilaria();

    }


    function anterior() {

        indiceFunilaria--;

        if (indiceFunilaria < 0) {

            indiceFunilaria = imagensFunilaria.length - 1;

        }

        atualizarFunilaria();

    }

}



// MENU MOBILE

const menuMobile = document.querySelector(".menu-mobile");
const menuLista = document.querySelector("nav ul");

if (menuMobile && menuLista) {

    menuMobile.addEventListener("click", () => {

        menuLista.classList.toggle("menu-aberto");

    });


    const linksMenu = menuLista.querySelectorAll("a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            menuLista.classList.remove("menu-aberto");

        });

    });

}



// GALERIA

const filtros = document.querySelectorAll(".filtro");
const itensGaleria = document.querySelectorAll(".galeria-item");

if (filtros.length > 0 && itensGaleria.length > 0) {

    filtros.forEach(filtro => {

        filtro.addEventListener("click", () => {

            const categoria = filtro.dataset.filtro;


            filtros.forEach(botao => {

                botao.classList.remove("ativo");

            });


            filtro.classList.add("ativo");


            itensGaleria.forEach(item => {

                const categoriaItem = item.dataset.categoria;


                if (categoria === "todos" || categoria === categoriaItem) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });

}

// MODAL DA GALERIA

const itensGaleriaModal = document.querySelectorAll(".galeria-item");
const modalGaleria = document.querySelector(".modal-galeria");
const modalImagem = document.querySelector(".modal-imagem");
const modalFechar = document.querySelector(".modal-fechar");
const modalAnterior = document.querySelector(".modal-anterior");
const modalProximo = document.querySelector(".modal-proximo");

let modalIndiceAtual = 0;



function abrirModal(indice) {
    modalIndiceAtual = indice;
    const imagem = itensGaleriaModal[modalIndiceAtual].querySelector("img");

    modalImagem.src = imagem.src;
    modalImagem.alt = imagem.alt;
    modalGaleria.classList.add("aberto");

}



// PEGAR SOMENTE AS IMAGENS VISÍVEIS

function obterImagensVisiveis() {

    return Array.from(itensGaleriaModal).filter(item => {
        return item.style.display !== "none";

    });

}



// PRÓXIMA IMAGEM

function proximaImagem() {
    const imagensVisiveis = obterImagensVisiveis();

    if (imagensVisiveis.length === 0) {
        return;

    }


    let posicaoAtual = imagensVisiveis.indexOf(
        itensGaleriaModal[modalIndiceAtual]
    );

    posicaoAtual++;

    if (posicaoAtual >= imagensVisiveis.length) {
        posicaoAtual = 0;

    }


    const proxima = imagensVisiveis[posicaoAtual];
    modalIndiceAtual = Array.from(itensGaleriaModal).indexOf(proxima);
    abrirModal(modalIndiceAtual);

}

// IMAGEM ANTERIOR

function imagemAnterior() {

    const imagensVisiveis = obterImagensVisiveis();


    if (imagensVisiveis.length === 0) {

        return;

    }


    let posicaoAtual = imagensVisiveis.indexOf(
        itensGaleriaModal[modalIndiceAtual]
    );

    posicaoAtual--;

    if (posicaoAtual < 0) {
     posicaoAtual = imagensVisiveis.length - 1;

    }

    const anterior = imagensVisiveis[posicaoAtual];
    modalIndiceAtual = Array.from(itensGaleriaModal).indexOf(anterior);
    abrirModal(modalIndiceAtual);

}

// EVENTOS DO MODAL

if (
    itensGaleriaModal.length > 0 &&
    modalGaleria &&
    modalImagem &&
    modalFechar &&
    modalAnterior &&
    modalProximo
) {


    itensGaleriaModal.forEach((item, indice) => {

        item.addEventListener("click", () => {

            abrirModal(indice);

        });

    });

    // FECHAR NO X
    modalFechar.addEventListener("click", () => {

        modalGaleria.classList.remove("aberto");

    });

    // SETA ESQUERDA

    modalAnterior.addEventListener("click", () => {

        imagemAnterior();

    });

    // SETA DIREITA

    modalProximo.addEventListener("click", () => {

        proximaImagem();

    });

    // TECLADO

    document.addEventListener("keydown", (event) => {

        if (!modalGaleria.classList.contains("aberto")) {

            return;

        }

        if (event.key === "ArrowLeft") {
            imagemAnterior();

        }

        if (event.key === "ArrowRight") {
            proximaImagem();

        }

        if (event.key === "Escape") {
            modalGaleria.classList.remove("aberto");

        }

    });

}
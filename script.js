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
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let index = 0;
let intervalo;

function atualizarCarrossel() {
    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
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
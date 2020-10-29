"use strict"

let btnAnterior = document.querySelector("#anterior");
let btnSiguiente = document.querySelector("#siguiente");

btnAnterior.addEventListener("click", () => {
	posicionSlide(-1);
})

btnSiguiente.addEventListener("click", () => {
	posicionSlide(1);
})

automatic();


function automatic() {	
	let segundos = 2;
	let ciclo = setInterval(function() {

		segundos -= 1;
		if (segundos <= 0) {
			posicionSlide(1);		
			// clearInterval(ciclo);
		}

	}, 2000);

}

let slideIndex = 1;
mostrarSlides(slideIndex);

function posicionSlide(index) {
	mostrarSlides(slideIndex += index);
}

function slideActual(index) {
  	mostrarSlides(slideIndex = index);
}

function mostrarSlides(index) {
	let i;
	let slides = document.querySelectorAll(".slide");

	if (index > slides.length) {
		slideIndex = 1
	}

	if (index < 1) {
		slideIndex = slides.length
	}

	for (i = 0; i < slides.length; i++) {
		slides[i].classList.add("d-none");
	}

	slides[slideIndex-1].classList.remove("d-none");
}

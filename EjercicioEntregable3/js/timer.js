"use strict"

document.addEventListener("DOMContentLoaded", () => {

	timer();
	window.addEventListener("scroll", animacionScroll);
	parallax();
	// cards();
})

// function cards() {
// 	let card = document.querySelectorAll(".card");
// 	let oculto = document.querySelector(".oculto");

// 	for (let i = 0; i < card.length; i++) {
// 		card[i].addEventListener("mouseover", function() {
// 			card[i].innerHTML = "Hola";
// 			card[i].classList.add("d-none");
// 		});

// 		card[i].addEventListener("mouseup", function() {
			
// 		})
// 	}
// }

function parallax() {
	let luna = document.querySelector("#luna");
	let oveja = document.querySelector("#oveja");

	let inicioOveja = 1500;
	oveja.style.left = inicioOveja + "px";

	window.addEventListener("scroll", function() {
		let valor = window.scrollY;

		luna.style.left = valor * 0.5 + "px";
		luna.style.top = valor * 0.5 + "px";
		oveja.style.left = inicioOveja / (valor/50) + "px";
	})
}

function timer() {
	let estreno = new Date("Nov 31, 2020 18:00:00").getTime();

	let ciclo = setInterval(function() {
		let tiempoAhora = new Date().getTime();

		let distancia = estreno - tiempoAhora;
		let dias = Math.floor(distancia/(1000 * 60 * 60 * 24));
		let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
		let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

		document.querySelector("#estreno").innerHTML = "Faltan: " + dias + " días, " + horas + " horas, " + minutos + " minutos, " + segundos + " segundos.";

	}, 1000);
}

function animacionScroll() {

	/* Animación timer */

	let timer = document.querySelector(".timer");

	if (window.scrollY >= 800) {
		timer.classList.remove("opacidad0");
		timer.classList.add("opacidad");
	} else if (window.scrollY <= 650){
		timer.classList.add("opacidad0");
		timer.classList.remove("opacidad");
	}

	/* Animación cards */

	let cards = document.querySelector(".flex-column");

	if (window.scrollY >= 1000) {
		cards.classList.remove("opacidad0");
		cards.classList.add("opacidad");
		cards.classList.add("animation-cards");
	} else if (window.scrollY <= 850) {
		cards.classList.remove("animation-cards");
		cards.classList.add("opacidad0");
		cards.classList.remove("opacidad");
		// cards.classList.add("opacity0");
	}

	let slider = document.querySelector(".slider-container");

	if (window.scrollY >= 1500) {
		slider.classList.remove("opacidad0");
		slider.classList.add("opacidad");
	} else if (window.scrollY <= 1350){
		slider.classList.add("opacidad0");
		slider.classList.remove("opacidad");
	}

}
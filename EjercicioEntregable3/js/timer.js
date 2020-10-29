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

	window.addEventListener("scroll", function() {
		let valor = window.scrollY;

		luna.style.left = valor * 0.5 + "px";
		luna.style.top = valor * 0.5 + "px";
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

	// let timer = document.querySelector(".timer");

	// if (window.scrollY >= 1000) {
	// 	timer.classList.add("opacidad");
	// } else {
	// 	timer.classList.remove("opacidad");
	// }

	/* Animación cards */

	let cards = document.querySelector(".cards");

	if (window.scrollY >= 1200) {
		cards.classList.add("opacidad");
	} else {
		cards.classList.remove("opacidad");
	}

	let slider = document.querySelector(".slider-container");

	if (window.scrollY >= 1700) {
		slider.classList.add("opacidad");
	} else {
		slider.classList.remove("opacidad");
	}

}
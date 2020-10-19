"use strict"

document.addEventListener("DOMContentLoaded", () => {

	timer();
	window.addEventListener("scroll", animacionScroll);

})

function animacionScroll() {

	/* Animación timer */

	// let timer = document.querySelector(".timer");

	// if (window.scrollY >= 1000) {
	// 	timer.classList.add("opacidad");
	// } else {
	// 	timer.classList.remove("opacidad");
	// }

	/* Animación acordeón */

	let acordeon = document.querySelector(".box-acordeon");

	if (window.scrollY >= 1100) {
		acordeon.classList.add("mover");
	} else {
		acordeon.classList.remove("mover");
	}

	/* Animación cards */

	let cards = document.querySelector(".cards");

	if (window.scrollY >= 1450) {
		cards.classList.add("opacidad");
	} else {
		cards.classList.remove("opacidad");
	}
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
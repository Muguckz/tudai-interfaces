"use strict"

document.addEventListener("DOMContentLoaded", () => {
	
	timer();

})

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
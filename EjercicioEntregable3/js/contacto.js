"use strict"

let btnEnviar = document.querySelector("#btnEnviar");

btnEnviar.addEventListener("click", anim);

function anim() {
	this.innerHTML = "Enviando..";
	this.classList.add("botonColor");

	let btn = this;

	let segundos = 5;
	let ciclo = setInterval(function() {

		segundos -= 1;
		if (segundos <= 0) {
			btn.innerHTML = "Enviado";
			btn.classList.remove("botonColor");
			clearInterval(ciclo);
		}

	}, 1000);
}
"use strict"

let labels = document.querySelectorAll("label");
let btnEnviar = document.querySelector("#btnEnviar");
// let textarea = document.querySelector("textarea");

animForm();

function animForm() {
	let segundos = 4;
	let ciclo = setInterval(function() {

		segundos -= 1;
		if (segundos <= 0) {
			for (let i = 0; i < labels.length; i++) {
				labels[i].classList.remove("opacidad0");
				btnEnviar.classList.remove("opacidad0");
				labels[i].classList.add("opacidad");
				btnEnviar.classList.add("opacidad");

				// console.log(labels[i]);
			}
			// textarea.classList.remove("opacidad0");
			clearInterval(ciclo);
		}

	}, 1000);
}

btnEnviar.addEventListener("click", anim);

function anim() {
	this.innerHTML = "Enviando..";
	this.classList.add("botonColor");

	let btn = this;

	let success = document.querySelector(".success");
	success.classList.add("d-none");

	let segundos = 5;
	let ciclo = setInterval(function() {

		segundos -= 1;
		if (segundos <= 0) {
			btn.innerHTML = "Enviado";
			btn.classList.remove("botonColor");
			success.classList.remove("d-none");
			clearInterval(ciclo);
		}

	}, 1000);
}
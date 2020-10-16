"use strict"

let elements = document.body.getElementsByTagName("*");

for (let i = 2; i < elements.length; i++) {
	elements[i].classList.add("d-none-spinner");
}

forzarCarga();

function forzarCarga() {
	let spinner = document.querySelector(".spinner");
	let segundos = 3;
	let ciclo = setInterval(function() {

		segundos -= 1;
		if (segundos <= 0) {
			for (let i = 2; i < elements.length; i++) {
				elements[i].classList.remove("d-none-spinner");
				spinner.classList.add("d-none-spinner");
			}
				elements[0].remove();
			clearInterval(ciclo);
		}

	}, 1000);
}

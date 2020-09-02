"use strict"

document.addEventListener("DOMContentLoaded", function(){

	pintarRectangulo();
});

function pintarRectangulo() {
	let ctx = document.querySelector("#canvas").getContext("2d");

	// Definimos el color
	ctx.fillStyle = "#333";
	// Posicionamos la figura y seteamos un tamaño
	ctx.fillRect(0, 0, 500, 250);
}


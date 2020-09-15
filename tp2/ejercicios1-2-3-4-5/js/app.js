"use strict"

import Figura from '../js/Figura.js';
import Circulo from '../js/Circulo.js';
import Rectangulo from '../js/Rectangulo.js';

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");

	let circulo = new Circulo(0, 0, "", ctx, 0);

	circulo.setColorRandom();
	circulo.dibujarFigura();

	let rectangulo = new Rectangulo(0, 0, "", ctx, 0, 0);

	rectangulo.setColorGradiente();
	rectangulo.dibujarFigura();

	let box = document.querySelector("#box");
	box.addEventListener("click", () => {
		cambiarColorFondo(box);
	});

	box.addEventListener("mousemove", () => {
		cambiarColorFondo(box);
	})

	box.addEventListener("mouseover", () => {
		cambiarColorFondo(box);
	})

})

function cambiarColorFondo(box) {
	let letras = "0123456789ABCDEF";
	let colorFondo = "#";

	for (let i = 0; i < 6; i++) {
    	colorFondo += letras[Math.floor(Math.random() * 16)];
  	}

	box.style.background = colorFondo;
}
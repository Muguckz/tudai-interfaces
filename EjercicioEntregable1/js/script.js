"use strict"

let dibujando = false;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Guardo la posición del canvas.
let canvasPosition = canvas.getBoundingClientRect();

let x = 0, y = 0;
let color = 'black';
let grosor = 1;

function definirColor(c) {
	color = c;
}

function definirGrosor(g) {
	grosor = g;
}


// document.addEventListener("DOMContentLoaded", () => {


	// let lapiz = document.querySelector("#lapiz");
	// lapiz.addEventListener("click", () => {
	// 	Código para dibujar.
	// });

	// let goma = document.querySelector("#goma");
	// goma.addEventListener("click", () => {
	// 	Código para borrar.
	// });



// });

// Donde hace clic.
canvas.addEventListener("mousedown", (e) => {
	// Empieza a dibujar.
	dibujando = true;
	// x será la posición donde le haces el mousedown y para obtener
	// el valor verdadero debo restarle a la posición de x la posición del canvas 
	// y como estoy tratando a la x será left y parecido con y.
	// todo esto se hace para que el sistema de coordenadas coincida con el canvas.
	x = e.clientX - canvasPosition.left;
	y = e.clientY - canvasPosition.top;

	console.log("mousedown X = " + x);
	console.log("mousedown Y = " + y);
});

// Movimiento del mouse.
canvas.addEventListener("mousemove", (e) => {
	// let x2 = e.clientX - canvasPosition.left;
	// let y2 = e.clientY - canvasPosition.top;
	if (dibujando === true) {
		dibujar(x, y, e.clientX - canvasPosition.left, e.clientY - canvasPosition.top);
		x = e.clientX - canvasPosition.left;
		y = e.clientY - canvasPosition.top;

		// console.log("mousemove X = " + x);
		// console.log("mousemove Y = " + y);
	}
});

// Donde soltó el clic.
canvas.addEventListener("mouseup", (e) => {
	// let x2 = e.clientX - canvasPosition.left;
	// let y2 = e.clientY - canvasPosition.top;
	if (dibujando === true) {
		dibujar(x, y, e.clientX - canvasPosition.left, e.clientY - canvasPosition.top);
		x = 0;
		y = 0;
		dibujando = false;
	}
});

function dibujar(x, y, x2, y2) {
	// Ruta nueva.
	ctx.beginPath();
	// Definir color.
	ctx.strokeStyle = color;
	// Definir grosor.
	ctx.lineWidth = grosor;
	// Nos movemos a la coordenada inicial.
	ctx.moveTo(x, y);
	// Dibujo línea hasta x2 e y2.
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}
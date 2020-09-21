"use strict"

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// let partida = new Partida();
	// partida.iniciarJuego();

	let tablero = new Tablero(ctx);
	// definirTablero(tablero, ctx);

	let ficha = new Ficha(ctx);
	// definirFichas(ficha, ctx);

	tablero.crearTablero();
	ficha.crearFichasRojas();
	ficha.crearFichasAzules();

	// canvas.addEventListener("mousedown", (e) => {
	// 	agarrarFicha(e, ficha);
	// 	console.log(e.clientX);
	// 	console.log(e.clientY);
	// });

	// let imgTablero = tablero.getImgTablero();

	canvas.addEventListener("click", (e) => {
		insertarFicha(e, ficha);
	})


	// let jugador1 = new Jugador("Federico", ctx);
	// let jugador2 = new Jugador("Nicolás", ctx);
})

// function definirTablero(tablero, ctx) {

// 	const cols = 8;
// 	const rows = 7;
// 	let matriz = [];
// 	let imgCelda = tablero.getImgCelda();
// 	let x, y;
// 	x = 350;
// 	y = 0;

// 	for (let i = 0; i < rows; i++) {
// 		matriz[i] = [];
// 		for (let j = 0; j < cols; j++) {
// 			tablero.dibujarCelda(imgCelda, x, y);
// 			x += 65;
// 		}
// 		x = 350;
// 		y += 60;
// 	}

// 	// let imgTablero = tablero.getImgTablero();
// 	// tablero.definirTablero(imgTablero);
// }

// function definirCelda(tablero) {
// 	tablero.getImgCelda();
// }

// function definirFichas(ficha, ctx) {
// 	ficha.crearFichasAzules();
// 	ficha.crearFichasRojas();
// }

function agarrarFicha(e, ficha) {
	let x = e.clientX;
	let y = e.clientY;

	ficha.agarrarFicha(x, y);
}

function insertarFicha(e, ficha) {
	let x = e.clientX;
	let y = e.clientY;

	let celdasOcupadas = [];

	ficha.insertarFicha(x, y, ficha);	
}

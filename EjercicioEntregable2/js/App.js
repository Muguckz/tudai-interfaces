"use strict"

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// let partida = new Partida();
	// partida.iniciarJuego();

	let tablero = new Tablero(ctx);
	definirTablero(tablero, ctx);

	let ficha = new Ficha(ctx);
	definirFichas(ficha, ctx);

	canvas.addEventListener("mousedown", (e) => {
		agarrarFicha(e, ficha);
	});

	let imgTablero = tablero.getImgTablero();

	canvas.addEventListener("click", (e) => {
		insertarFicha(e, ficha, imgTablero);
	})


	// let jugador1 = new Jugador("Federico", ctx);
	// let jugador2 = new Jugador("Nicolás", ctx);
})

function definirTablero(tablero, ctx) {

	let imgTablero = tablero.getImgTablero();
	tablero.definirTablero(imgTablero);
}

function definirFichas(ficha, ctx) {
	ficha.definirFichasAzules();
	ficha.definirFichasRojas();
}

function agarrarFicha(e, ficha) {
	let x = e.clientX;
	let y = e.clientY;

	ficha.agarrarFicha(x, y);
}

function insertarFicha(e, ficha, imgTablero) {
	let x = e.clientX;
	let y = e.clientY;

	ficha.insertarFicha(x, y, ficha, imgTablero);	
}

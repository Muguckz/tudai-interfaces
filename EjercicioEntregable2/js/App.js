"use strict"

const cantFichas = 30;

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	let lastClickedPiece = null;
	let isMouseDown = false;

	let Celdas =[[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]]

    let CeldasEjeX = [0,0,0,0,0,0,0,0]

    let CeldasEjeY = [0,0,0,0,0,0,0]

	let tablero = new Tablero(ctx, Celdas, CeldasEjeX, CeldasEjeY, 0, 0);
	tablero.crearTablero();

	let partida = new Partida(true);

	let fichas = [];

	crearFichasAzules(ctx, fichas);
	crearFichasRojas(ctx, fichas);

	canvas.addEventListener("mousedown", (e) => {
		insertarFicha(e, tablero, partida);
	})

	// canvas.addEventListener("click", (e) => {
	// 	let fichaClickeada = buscarFichaClickeada(e.layerX, e.layerY, fichas);
	// 	if (fichaClickeada != null) {
	// 		console.log("Ficha.");
	// 	} else {
	// 		console.log("Nada.");
	// 	}
	// })

	let reiniciar = document.querySelector("#reiniciar");
	reiniciar.addEventListener("click", () => {
		reiniciarPartida(tablero);
	});
})

function reiniciarPartida(tablero) {
	let partida = new Partida();

	partida.reiniciarPartida(tablero);
}

// function buscarFichaClickeada(x, y, fichas) {
// 	for (let i = 0; i < fichas.length; i++) {
// 		const elemento = fichas[i];
// 		if (elemento.estaDentro(x, y)) {
// 			return elemento;
// 		}
// 	}
// }

function crearFichasAzules(ctx, fichas) {
	let colorFicha = 'blue';

	for (let i = 0; i < cantFichas; i++) {
		let x = Math.random() * 200;
		let y = Math.random() * 250;
		let ficha = new Ficha(ctx, x, y, colorFicha, 20);
		fichas.push(ficha);
		ficha.crearFichasAzules(x, y);
		// ficha.dibujarFichas();
	}
}

function crearFichasRojas(ctx, fichas) {
	let colorFicha = 'red';

	for (let i = 0; i < cantFichas; i++) {
		let x =  Math.random() * 200;
		let y =  Math.random() * 250;
		let ficha = new Ficha(ctx, x, y, colorFicha, 20);
		fichas.push(ficha);
		ficha.crearFichasRojas(x, y);
		// ficha.dibujarFichas();
	}
}

function insertarFicha(e, tablero, partida) {
	let x = e.layerX;
	let y = e.layerY;

	tablero.insertarFicha(x, y, partida, tablero);
}

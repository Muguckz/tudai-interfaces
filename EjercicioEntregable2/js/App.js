"use strict"

const cantFichas = 30;
let isOnMove = false;
let isMouseDown = false;
let clickedFigure;
let fichasRojas = [];
let fichasAzules = [];

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");

	let Celdas =[[1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1]]

    let CeldasEjeX = [0,0,0,0,0,0,0,0]

    let CeldasEjeY = [0,0,0,0,0,0,0]

    let imgCelda = new Image();
	imgCelda.src = "images/Celda.png"; 
	imgCelda.width = 76;
	imgCelda.height = 68;

	let tablero = new Tablero(ctx, Celdas, CeldasEjeX, CeldasEjeY, 0, 0, imgCelda);

	let partida = new Partida(true, false, 0, 0);

	let ficha = new Ficha(ctx, 0, 0, 0, 20);

	// canvas.addEventListener("mousedown", (e) => {
	// 	turno = partida.getTurno();
	// 	let x = e.layerX;
	// 	let y = e.layerY;
	// 	let imgFicha;

	// 	if (partida.getFinalizado() == false) {
	// 		if (x >= 357 && x <= 940 && y >= 0 && y <= 57) {
	// 			imgFicha = rotarTurno(turno, ficha, partida);
	// 			// console.log(ficha);
	// 			tablero.insertarFicha(x, tablero, partida, imgFicha);
	// 		}
	// 	}

	// })

	let turno;
	let imgFicha = new Image();

	canvas.addEventListener("mousedown", (e) => {
		if (partida.getTurno() == true) {
			clickedFigure = findClickedFigure(e.layerX, e.layerY, fichasRojas);
			imgFicha = crearFicha(partida.getTurno());
		} else {
			clickedFigure = findClickedFigure(e.layerX, e.layerY, fichasAzules);
			imgFicha = crearFicha(partida.getTurno());
		}

		if (clickedFigure != null) {
        	isMouseDown = true;
        	moverFicha(ficha, imgFicha, clickedFigure, ctx, tablero);
        } else {
            console.log("No");
        }

    	turno = partida.getTurno();
	})

    canvas.addEventListener("mouseup", (e) => {
    	isMouseDown = false;
    	clickedFigure = null;
  		turno = partida.getTurno();
		let x = e.layerX;
		let y = e.layerY;
		let imgFicha;

		if (partida.getFinalizado() == false) {
			if (x >= 357 && x <= 940 && y >= 0 && y <= 57) {
				imgFicha = rotarTurno(turno, ficha, partida);
				// console.log(ficha);
				tablero.insertarFicha(x, tablero, partida, imgFicha);
			}
		}
    })

	let reiniciar = document.querySelector("#reiniciar");
	reiniciar.addEventListener("click", () => {
		reiniciarPartida(tablero);
		partida.setFinalizado(false);
	});

	let boxTutorial = document.querySelector(".tutorial");

	let btnComenzar = document.querySelector("#ocultarTutorial");
	btnComenzar.addEventListener("click", () => {
		comenzarPartida(boxTutorial, tablero, ctx , partida, ficha);
	});
})

function crearFicha(turno) {
	let ficha = new Image();

	if (turno) {
		ficha.src = "images/Ficha-roja.png";
	} else {
		ficha.src = "images/Ficha-azul.png";
	}
	return ficha;
}

function moverFicha(ficha, imgFicha, clickedFigure, ctx, tablero) {
    canvas.addEventListener("mousemove", (e) => {
    	if (isMouseDown) {
    		let x = e.layerX;
			let y = e.layerY;
			// console.log(clickedFigure);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ficha.moverFicha(x, y, imgFicha, clickedFigure);
    		dibujarFichasRojas(fichasRojas);
    		dibujarFichasAzules(fichasAzules);
    		tablero.dibujarCeldas();
    	}
    })
}

function findClickedFigure(x, y, fichas) {
	for (let i = 0; i < fichas.length; i++) {
		const elemento = fichas[i];
		if (elemento.estaDentro(x, y)) {
			return elemento;
		}
	}
}

function comenzarPartida(boxTutorial, tablero, ctx, partida, ficha) {
	boxTutorial.classList.add("d-none");
	// mostrarTutorial.classList.remove("d-none");
	tablero.eliminarDatosMatriz();
	tablero.crearTablero();
	crearFichasAzules(ctx);
	crearFichasRojas(ctx);

	let footerBox = document.querySelector(".footerBox");

	let parrafos = footerBox.querySelectorAll("p");

	for (let i = 0; i < parrafos.length; i++) {
		parrafos[i].classList.remove("d-none");
	}

	let btnReiniciar = footerBox.querySelector("#reiniciar");

	btnReiniciar.classList.remove("d-none");

	canvas.classList.remove("d-none");

	let turnoJugador = document.querySelector("#turnoJugador");

	turnoJugador.classList.remove("d-none");

}

function rotarTurno(turno, ficha, partida) {
	if (turno) {
		ficha = crearFicha(turno);
		partida.colorTurno(turno);
		// turnoJugador.innerHTML = "Turno jugador: Azul";
		partida.setTurno(false);
	} else {
		ficha = crearFicha(turno);
		partida.colorTurno(turno);
		// turnoJugador.innerHTML = "Turno jugador: Rojo";
		partida.setTurno(true);
	}
	return ficha;
}

function reiniciarPartida(tablero) {
	let partida = new Partida();

	partida.reiniciarPartida(tablero);
}

function crearFichasAzules(ctx) {

	for (let i = 0; i < cantFichas; i++) {
		let fichaImg = new Image();
		fichaImg.src = "images/Ficha-azul.png";
		let x = Math.random() * 200 + 20;
		let y = Math.random() * 200 + 70;
		let ficha = new Ficha(ctx, x, y, "Azul", 20, fichaImg);
		fichasAzules.push(ficha);
		dibujarFichasAzules(fichasAzules);
	}
}

function dibujarFichasRojas(fichasRojas) {
	for (let i = 0; i < fichasRojas.length; i++) {
		// console.log(fichasAzules[i]);
		fichasRojas[i].dibujar();
	}
}

function dibujarFichasAzules(fichasAzules) {
	for (let i = 0; i < fichasAzules.length; i++) {
		// console.log(fichasAzules[i]);
		fichasAzules[i].dibujar();
	}
}

function crearFichasRojas(ctx) {

	for (let i = 0; i < cantFichas; i++) {
		let fichaImg = new Image();
		fichaImg.src = "images/Ficha-roja.png";
		let x =  Math.random() * 200 + canvas.width - 250;
		let y =  Math.random() * 200 + 70;
		let ficha = new Ficha(ctx, x, y, "Rojo", 20, fichaImg);
		fichasRojas.push(ficha);
		dibujarFichasRojas(fichasRojas);
	}
}
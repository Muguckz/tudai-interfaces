"use strict"

const cantFichas = 30;
let isOnMove = false;
let isMouseDown = false;
let clickedFigure;
let dragging = false;
let fichasRojas = [];
let fichasAzules = [];
// let imgCanvas;

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

		if (dragging) {
			if (partida.getFinalizado() == false) {
				if (clickedFigure != null) {
		        	isMouseDown = true;
		        	moverFicha(ficha, imgFicha, clickedFigure, ctx, tablero);
		        } else {
		            console.log("No");
		        }
		    }

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
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			dibujarFichasRojas(fichasRojas);
			dibujarFichasAzules(fichasAzules);
			tablero.dibujarCeldas();
			// ctx.putImageData(imgCanvas, 340, 50);
			tablero.dibujarFichas();
			if (dragging) {
				if (y > 0 && y < 70) {
					if (x > 357 && x < 408 || x > 432 && x < 484 || x > 510 && x < 560 || x > 585 && x < 636 || x > 661 && x < 712 || x > 737 && x < 788
						|| x > 813 && x < 863 || x > 889 && x < 940) {
						imgFicha = rotarTurno(turno, ficha, partida);
						tablero.insertarFicha(x, tablero, partida, imgFicha);
						// imgCanvas = ctx.getImageData(340, 50, 620, 473);
					}
				}
			}
		}
		dragging = false;
    })

	let reiniciar = document.querySelector("#reiniciar");
	reiniciar.addEventListener("click", () => {
		reiniciarPartida(tablero, partida);
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
    		dragging = true;
    		let x = e.layerX;
			let y = e.layerY;
			// console.log(clickedFigure);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ficha.moverFicha(x, y, imgFicha, clickedFigure);
    		dibujarFichasRojas(fichasRojas);
    		dibujarFichasAzules(fichasAzules);
    		tablero.dibujarCeldas();
    		// ctx.putImageData(imgCanvas, 340, 50);
    		tablero.dibujarFichas();
    	}
    })
}

function findClickedFigure(x, y, fichas) {
	for (let i = 0; i < fichas.length; i++) {
		const elemento = fichas[i];
		if (elemento.estaDentro(x, y)) {
			dragging = true;
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

	let box = document.querySelector(".box");
	box.classList.remove("d-none");

}

function rotarTurno(turno, ficha, partida) {
	if (turno) {
		ficha = crearFicha(turno);
		partida.colorTurno(turno);
		partida.setTurno(false);
	} else {
		ficha = crearFicha(turno);
		partida.colorTurno(turno);
		partida.setTurno(true);
	}
	return ficha;
}

function reiniciarPartida(tablero) {
	let partida = new Partida();

	partida.reiniciarPartida(tablero);
}

function crearFichasAzules(ctx) {

	let fichaImg = new Image();
	for (let i = 0; i < cantFichas; i++) {
		fichaImg.src = "images/Ficha-azul.png";
		// let x = Math.random() * 200 + 20;
		// let y = Math.random() * 200 + 70;
		let x = 220;
		let y = 270;
		let ficha = new Ficha(ctx, x, y, "Azul", 20, fichaImg);
		fichasAzules.push(ficha);
		// dibujarFichasAzules(fichasAzules);
		ficha.dibujar();
	}
}

function dibujarFichasRojas(fichasRojas) {
	for (let i = 0; i < fichasRojas.length; i++) {
		// console.log(fichasAzules[i]);
		fichasRojas[i].reDibujar();
	}
}

function dibujarFichasAzules(fichasAzules) {
	for (let i = 0; i < fichasAzules.length; i++) {
		// console.log(fichasAzules[i]);
		fichasAzules[i].reDibujar();
	}
}

function crearFichasRojas(ctx) {

	let fichaImg = new Image();
	for (let i = 0; i < cantFichas; i++) {
		fichaImg.src = "images/Ficha-roja.png";
		// let x =  Math.random() * 200 + canvas.width - 250;
		// let y =  Math.random() * 200 + 70;
		let x = canvas.width - 220;
		let y = 270;
		let ficha = new Ficha(ctx, x, y, "Rojo", 20, fichaImg);
		fichasRojas.push(ficha);
		ficha.dibujar();
		// dibujarFichasRojas(fichasRojas);
	}
}
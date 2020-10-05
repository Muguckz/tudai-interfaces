"use strict"

const cantFichas = 30;
let isOnMove = false;
let lastClickedFigure = null;
let isMouseDown = false;
let clickedFigure;

document.addEventListener("DOMContentLoaded", () => {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	// ctx.fillStyle = "white";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	// let lastClickedPiece = null;

	let Celdas =[[1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1]]

    let CeldasEjeX = [0,0,0,0,0,0,0,0]

    let CeldasEjeY = [0,0,0,0,0,0,0]

    let posAzules = [];
    let posRojas = [];

	let tablero = new Tablero(ctx, Celdas, CeldasEjeX, CeldasEjeY, 0, 0);
	// tablero.crearTablero();

	let partida = new Partida(true, false);

	let ficha = new Ficha(ctx, 0, 0, 0, 20);

	let fichasRojas = [];
	let fichasAzules = [];

	// crearFichasAzules(ctx, fichas);
	// crearFichasRojas(ctx, fichas);

	canvas.addEventListener("mousedown", (e) => {
		turno = partida.getTurno();
		let x = e.layerX;
		let y = e.layerY;

		if (partida.getFinalizado() == false) {
			if (x >= 357 && x <= 940 && y >= 0 && y <= 57) {
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
				tablero.insertarFicha(x, tablero, partida, ficha);
			}
		}

	})

	// canvas.addEventListener("mousedown", (e) => {
	// 	crearFicha(e, ficha, partida);
	// 	isMouseDown = true;
	// })

	// canvas.addEventListener("mousedown", (e) => {
	// 	let x = e.layerX;
	// 	let y = e.layerY;

	// 	findClickedFigure(x, y, fichas);
	// })

	let turno;

	canvas.addEventListener("click", () => {
		if (partida.getTurno() == true) {
			clickedFigure = findClickedFigure(event.layerX, event.layerY, fichasRojas);
			console.log(clickedFigure);
		} else {
			clickedFigure = findClickedFigure(event.layerX, event.layerY, fichasAzules);
			console.log(clickedFigure);
		}

    	turno = partida.getTurno();
	})

    canvas.addEventListener('mousedown', event => {
    	// partida.setTurno(true);
  		// clickedFigure = findClickedFigure(event.layerX, event.layerY, fichas);
        if (clickedFigure != null) {
        	isMouseDown = true;
            if (partida.getTurno() == true && clickedFigure.colorFicha == "Rojo") {
            	console.log("rojo");
            	// turno = "Rojo";
            	// moverFicha(event, ficha, clickedFigure);
            	moverFicha(ficha, clickedFigure, turno, tablero);
            } else if (partida.getTurno() == false && clickedFigure.colorFicha == "Azul") {
            	console.log("azul");
            	// turno = "Azul";
            	// moverFicha(event, ficha, clickedFigure);
            	moverFicha(ficha, clickedFigure, turno, tablero);
            }
        } else {
            console.log("Nope");
        }
    });

    canvas.addEventListener("mouseup", () => {
    	isMouseDown = false;
    	clickedFigure = null;
    })

   //  canvas.addEventListener("mousemove", (e) => {
   //  	if (isMouseDown) {
   //  		let x = e.layerX;
			// let y = e.layerY;
   //  		ficha.moverFicha(x, y, clickedFigure);
   //  	}
   //  })
 

	// canvas.addEventListener("mousemove", (e) => {
	// 	moverFicha(e, ficha, partida, tablero);
	// 	isOnMove = true;
	// })

	// canvas.addEventListener("mouseup", () => {
	// 	isMouseDown = false;
	// 	isOnMove = false;
	// })

	// canvas.addEventListener("click", (e) => {
	// 	let fichaClickeada = findClickedFigure(e.layerX, e.layerY, fichas);
	// 	if (fichaClickeada != null) {
	// 		console.log("Ficha.");
	// 	} else {
	// 		console.log("Nada.");
	// 	}
	// })

	let reiniciar = document.querySelector("#reiniciar");
	reiniciar.addEventListener("click", () => {
		reiniciarPartida(tablero);
		partida.setFinalizado(false);
	});

	let boxTutorial = document.querySelector(".tutorial");
	// let mostrarTutorial = document.querySelector("#mostrarTutorial");

	// mostrarTutorial.addEventListener("click", () => {
	// 	mostrarBoxTutorial(boxTutorial, mostrarTutorial);
	// });

	let btnComenzar = document.querySelector("#ocultarTutorial");
	btnComenzar.addEventListener("click", () => {
		comenzarPartida(boxTutorial, tablero, fichasRojas, fichasAzules, ctx , partida, ficha);
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

function moverFicha(ficha, clickedFigure, turno, tablero) {
	// console.log(clickedFigure.colorFicha);
    canvas.addEventListener("mousemove", (e) => {
    	if (isMouseDown) {
    		let x = e.layerX;
			let y = e.layerY;
    		ficha.moverFicha(x, y, clickedFigure, turno, tablero);
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

// function moverFicha(e, ficha, partida, tablero) {
// 	ficha.moverFicha(e.layerX, e.layerY, partida, tablero);
// }

// function mostrarBoxTutorial(boxTutorial) {
// 	boxTutorial.classList.remove("d-none");
// 	mostrarTutorial.classList.add("d-none");
// }

function comenzarPartida(boxTutorial, tablero, fichasRojas, fichasAzules, ctx, partida, ficha, posAzules, posRojas) {
	boxTutorial.classList.add("d-none");
	// mostrarTutorial.classList.remove("d-none");
	tablero.eliminarDatosMatriz();
	tablero.crearTablero();
	crearFichasAzules(ctx, fichasAzules, posAzules);
	crearFichasRojas(ctx, fichasRojas, posRojas);

	let boxTurnos = document.querySelector(".box-turnos");

	let parrafos = boxTurnos.querySelectorAll("p");

	for (let i = 0; i < parrafos.length; i++) {
		parrafos[i].classList.remove("d-none");
	}

	let reiniciar = document.querySelector("#reiniciar");

	reiniciar.classList.remove("d-none");

	// empezarTimer();

	// timer(partida, ficha);

	// partida.tiempo(partida, ficha);
}

// function tiempo(partida, ficha) {
// 	let cronometro = document.getElementById("tiempo");
// 	let final = Date.now() + 60000;
// 	let elcrono = setInterval(tiempo,10); 
// 	function tiempo() {
// 	  let diferencia= final-Date.now();
// 	  let sg = diferencia/1000
// 	  if (diferencia<=0) {
// 	    clearInterval(elcrono);
// 	    cronometro.classList.add('rojo');
// 	    sg=0.0;
// 	  }
// 	  cronometro.innerHTML=sg;
// 	}
// }

// function empezarTimer() {

// 	let tiempoTotal = 30;

// 	document.querySelector("#tiempo").innerHTML = tiempoTotal;

// 	if(tiempoTotal == 0) {
// 		alert('Final');
// 	} else{
// 		tiempoTotal-=1;
// 		setTimeout("empezarTimer()", 1000);
// 	}

// }

// function crearFicha(e, ficha, partida) {
// 	let x = e.layerX;
// 	let y = e.layerY;

// 	crearFicha(x, y, partida);
// }

function reiniciarPartida(tablero) {
	let partida = new Partida();

	partida.reiniciarPartida(tablero);
}

// function findClickedFigure(x, y, fichas) {
// 	for (let i = 0; i < fichas.length; i++) {
// 		const elemento = fichas[i];
// 		if (elemento.estaDentro(x, y)) {
// 			return elemento;
// 		}
// 	}
// }

function crearFichasAzules(ctx, fichasAzules) {

	for (let i = 0; i < cantFichas; i++) {
		let fichaImg = new Image();
		fichaImg.src = "images/Ficha-azul.png";
		let x = Math.random() * 200;
		let y = Math.random() * 200;
		let ficha = new Ficha(ctx, x, y, "Azul", 20);
		fichaImg.onload = () => {
			ctx.drawImage(fichaImg, x, y, fichaImg.width/4, fichaImg.height/4);
		}
		fichasAzules.push(ficha);
		// ficha.crearFichas(fichaImg);
		// posAzules.push(x, y);
		// ficha.dibujarFicha();
	}
}

function crearFichasRojas(ctx, fichasRojas) {

	for (let i = 0; i < cantFichas; i++) {
		let fichaImg = new Image();
		fichaImg.src = "images/Ficha-roja.png";
		let x =  Math.random() * 200 + canvas.width - 250;
		let y =  Math.random() * 200;
		let ficha = new Ficha(ctx, x, y, "Rojo", 20);
		fichaImg.onload = () => {
			ctx.drawImage(fichaImg, x, y, fichaImg.width/4, fichaImg.height/4);
		}
		fichasRojas.push(ficha);
		// ficha.crearFichas(fichaImg);
		// posRojas.push(x, y);
		// ficha.dibujarFicha();
	}
}

// function insertarFicha(x, y, tablero, partida, ficha) {
// 	let x = e.layerX;
// 	let y = e.layerY;

// 	tablero.insertarFicha(x, partida, tablero, ficha);
// }

// function colorTurnoRojo() {
// 	let turnoJugador = document.querySelector(".turnoJugador");
// 	turnoJugador.innerHTML = "Turno jugador: Rojo";
// 	turnoJugador.classList.remove("turnoAzul");
// 	turnoJugador.classList.add("turnoRojo");
// }

// function colorTurnoAzul() {
// 	let turnoJugador = document.querySelector(".turnoJugador");
// 	turnoJugador.innerHTML = "Turno jugador: Azul";
// 	turnoJugador.classList.remove("turnoRojo");
// 	turnoJugador.classList.add("turnoAzul");
// }

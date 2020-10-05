class Partida {

	constructor(valor, finalizado) {
		this.turno = valor;
		this.finalizado = finalizado;
	}

	getTurno() {
		return this.turno;
	}

	setTurno(valor) {
		this.turno = valor;
	}

	getFinalizado() {
		return this.finalizado;
	}

	setFinalizado(valor) {
		this.finalizado = valor;
	}

	reiniciarPartida(tablero) {
		tablero.eliminarDatosMatriz();
		tablero.crearTablero();	
	}

	// colorTurnoRojo() {
	// 	let turnoJugador = document.querySelector(".turnoJugador");
	// 	turnoJugador.innerHTML = "Turno jugador: Rojo";
	// 	turnoJugador.classList.remove("turnoAzul");
	// 	turnoJugador.classList.add("turnoRojo");
	// }

	// colorTurnoAzul() {
	// 	let turnoJugador = document.querySelector(".turnoJugador");
	// 	turnoJugador.innerHTML = "Turno jugador: Azul";
	// 	turnoJugador.classList.remove("turnoRojo");
	// 	turnoJugador.classList.add("turnoAzul");
	// }

	colorTurno(turno) {
		let turnoJugador = document.querySelector(".turnoJugador");

		if (turno) {
			turnoJugador.innerHTML = "Turno jugador: Azul";
			turnoJugador.classList.remove("turnoRojo");
			turnoJugador.classList.add("turnoAzul");
		} else {
			turnoJugador.innerHTML = "Turno jugador: Rojo";
			turnoJugador.classList.remove("turnoAzul");
			turnoJugador.classList.add("turnoRojo");
		}
	}

	ganador(color, tablero) {
		let turnoJugador = document.querySelector(".turnoJugador");
		// let siguienteTurno;

		if (color == "Azules") {
			this.colorTurno(true);
			// siguienteTurno = "Azules";
		} else {
			this.colorTurno(false);
			// siguienteTurno = "Rojos";
		}
		

		console.log(this.getFinalizado());

		// turnoJugador.classList.remove("turnoRojo");
		// turnoJugador.classList.remove("turnoAzul");

		turnoJugador.innerHTML = "Ganaron los " + color;
		// turnoJugador.innerHTML = "Ganaron los " + color + " Siguiente turno: " + siguienteTurno;
		// this.reiniciarPartida(tablero);
	}

	// rotarTurno(partida, ficha) {
	// 	let turnoJugador = document.querySelector(".turnoJugador");
	// 	let imgFicha = new Ficha(this.ctx);

	// 	if (this.getTurno(true)) {
	// 		ficha = imgFicha.crearFichaRoja();
	// 		this.colorTurnoAzul();
	// 		turnoJugador.innerHTML = "Turno jugador: Azul";
	// 		this.setTurno(false);
	// 	} else {
	// 		ficha = imgFicha.crearFichaAzul();
	// 		this.colorTurnoRojo();
	// 		turnoJugador.innerHTML = "Turno jugador: Rojo";
	// 		this.setTurno(true);
	// 	}

	// 	return ficha;
	// }

	// tiempo(partida, ficha) {
	// 	let contador = 3;
	// 	let cuentaRegresiva = document.querySelector("#tiempo");
	// 	let ciclo = setInterval (function(){  
	// 	contador -= 1;
	// 	cuentaRegresiva.innerHTML = contador;
	// 	if (contador === 0) {
	// 		partida.rotarTurno(partida, ficha);
	// 	    clearInterval(ciclo);
	// 	  	contador = 3;
	// 	  	cuentaRegresiva.innerHTML = contador;
	// 	  }
	// 	}, 1000);
	// }

}
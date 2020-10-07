class Partida {

	constructor(valor, finalizado, puntosAzules, puntosRojos) {
		this.turno = valor;
		this.finalizado = finalizado;
		this.puntosAzules = puntosAzules;
		this.puntosRojos = puntosRojos;
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

	getPuntosRojos() {
		return this.puntosRojos;
	}

	getPuntosAzules() {
		return this.puntosAzules;
	}

	setPuntosRojos(valor) {
		this.puntosRojos += valor;
	}

	setPuntosAzules(valor) {
		this.puntosAzules += valor;
	}

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
		let puntosRojos = document.querySelector("#puntosRojo");
		let puntosAzules = document.querySelector("#puntosAzul");

		if (color == "Azules") {
			this.colorTurno(true);
			this.setPuntosAzules(1);
			puntosAzules.innerHTML = "Puntos para azules: " + this.getPuntosAzules();
		} else {
			this.colorTurno(false);
			this.setPuntosRojos(1);
			puntosRojos.innerHTML = "Puntos para rojos: " + this.getPuntosRojos();
		}

		turnoJugador.innerHTML = "Ganaron los " + color;

		if (this.getPuntosRojos() == 3 || this.getPuntosAzules() == 3) {
			this.reiniciarPuntos(puntosRojos, puntosAzules, color);
		}
	}

	reiniciarPuntos(puntosRojos, puntosAzules, color) {
		turnoJugador.innerHTML = color + " han ganado 3 partidas.";
		this.setPuntosAzules(-this.getPuntosAzules());
		this.setPuntosRojos(-this.getPuntosRojos());
		puntosRojos.innerHTML = "Puntos para rojos: " + this.getPuntosRojos();
		puntosAzules.innerHTML = "Puntos para azules: " + this.getPuntosAzules();
	}
}
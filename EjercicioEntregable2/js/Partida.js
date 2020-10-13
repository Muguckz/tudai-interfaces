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
		console.log("asd");
		tablero.eliminarDatosMatriz();
		tablero.crearTablero();
		document.querySelector(".alert-ganador").classList.add("d-none");
		// this.setFinalizado(false);

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
		let alertGanador = document.querySelector(".alert-ganador");
		let textGanador = document.querySelector("#ganador");

		if (color == "Azul") {
			this.colorTurno(true);
			this.setPuntosAzules(1);
			puntosAzules.innerHTML = "Puntos para azules: " + this.getPuntosAzules();
			alertGanador.style.animationName = "ganadorAzul";

		} else {
			this.colorTurno(false);
			this.setPuntosRojos(1);
			puntosRojos.innerHTML = "Puntos para rojos: " + this.getPuntosRojos();
			alertGanador.style.animationName = "ganadorRojo";
		}

		turnoJugador.innerHTML = "Ganaron los " + color;
		alertGanador.classList.remove("d-none");
		textGanador.innerHTML = "Ganaron los " + color;

		if (this.getPuntosRojos() == 3 || this.getPuntosAzules() == 3) {
			this.reiniciarPuntos(puntosRojos, puntosAzules, color, textGanador);
		}
	}

	reiniciarPuntos(puntosRojos, puntosAzules, color, textGanador) {
		turnoJugador.innerHTML = color + " ha ganado 3 partidas.";
		textGanador.innerHTML = color + " ha ganado 3 partidas.";
		this.setPuntosAzules(-this.getPuntosAzules());
		this.setPuntosRojos(-this.getPuntosRojos());
		puntosRojos.innerHTML = "Puntos para rojos: " + this.getPuntosRojos();
		puntosAzules.innerHTML = "Puntos para azules: " + this.getPuntosAzules();
	}
}
class Partida {

	constructor(valor) {
		this.turno = valor;
	}

	iniciarJuego() {
		
	}

	getTurno() {
		return this.turno;
	}

	setTurno(valor) {
		this.turno = valor;
	}

	reiniciarPartida(tablero) {
		tablero.eliminarDatosMatriz();
		tablero.crearTablero();
	}

	ganador(color, tablero) {
		alert("Han ganado los " + color);
		this.reiniciarPartida(tablero);
	}
}
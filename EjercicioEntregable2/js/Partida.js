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
		tablero.eliminarDatosArreglo();
		tablero.crearTablero();
	}
}
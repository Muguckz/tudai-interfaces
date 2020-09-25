class Partida {

	constructor(valor) {
		this.turno = valor;
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

	rotarTurno(partida, ficha) {
		let imgFicha = new Ficha(this.ctx);
		if (this.getTurno(true)) {
			ficha = imgFicha.crearFichaRoja();
			this.setTurno(false);
		} else {
			ficha = imgFicha.crearFichaAzul();
			this.setTurno(true);
		}

		return ficha;
	}
}
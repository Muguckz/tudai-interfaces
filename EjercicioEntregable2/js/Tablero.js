class Tablero {

	constructor(ctx, Celdas, CeldasEjeX, CeldasEjeY, contadorVerticalRojas, contadorVerticalAzules, contadorHorizontalRojas, contadorHorizontalAzules) {
		this.ctx = ctx;
		this.Celdas = Celdas;
		this.CeldasEjeX = CeldasEjeX;
		this.CeldasEjeY = CeldasEjeY;
		this.contadorVerticalRojas = contadorVerticalRojas;
		this.contadorVerticalAzules = contadorVerticalAzules;
		this.contadorHorizontalRojas = contadorHorizontalRojas;
		this.contadorHorizontalAzules = contadorHorizontalAzules;
	}

	crearTablero() {
		const cols = 8;
		const rows = 7;
		let matriz = [];
		let imgCelda = this.getImgCelda();
		let x, y;
		x = 370;
		y = 8;

		for (let i = 0; i < cols; i++) {
			matriz[i] = [];
			for (let j = 0; j < rows; j++) {

				this.CeldasEjeY[j] = y;
				this.CeldasEjeX[i] = x;

				y += 60;
			}
			y = 8;
			x += 65;
		}

		this.dibujarCeldas();
	}

	getCeldasEjeX() {
		return this.CeldasEjeX;
	}

	getCeldasEjeY() {
		return this.CeldasEjeY;
	}

	dibujarCeldas() {
		const cols = 8;
		const rows = 7;
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				let imgCelda = this.getImgCelda();
				imgCelda.onload = () => {
					this.ctx.drawImage(imgCelda, this.getCeldasEjeX()[i], this.getCeldasEjeY()[j], imgCelda.width, imgCelda.height);
				}
			}
		}
	}

	insertarFicha(x, y, partida, tablero) {
		// Si hace clic en cualquier columna de la primer fila.
		if (x >= 380 && x <= 900 && y >= 8 && y <= 65) {
			this.verificarCelda(x, partida, tablero);
		}
	}

	verificarCelda(x, partida, tablero) {
		let posColumna = this.getPosColumna(x);

		let i = 7; // Cantidad de filas.
		let ficha;

		// Márgenes para ubicar bien las fichas.
		let pixelX = 15;
		let pixelY = 12;

		// Si no es null significa que le dio a una celda. (porque entre las celdas hay márgenes que no me importan)
		if (posColumna != null) {
			// i vale 7, o sea la fila final de cada columna.
			while (i > 0) {
				if (this.Celdas[i-1][posColumna] == 0) {
					ficha = this.rotarTurno(partida, ficha);

					ficha.onload = () => {
						// Dibujo la ficha en esa posición y le sumo unos pixeles de margen para que queden bien posicionadas.
						this.ctx.drawImage(ficha, this.getCeldasEjeX()[posColumna] + pixelX, this.getCeldasEjeY()[i-1] + pixelY, ficha.width/4, ficha.height/4);
					}

					// 0 Vacío, 1 Roja, 2 Azul
					let colorFicha = this.verificarColorFicha(partida);

					this.Celdas[i-1][posColumna] = colorFicha;

					this.verificarGanadorColumna(posColumna, colorFicha, partida, tablero);
					this.verificarGanadorFila(i-1, colorFicha, partida, tablero);

					// Implementar verificadores verticales.

					break;
				} else {
					i--;
				}
			}
		}
	}

	verificarColorFicha(partida) {
		if (partida.getTurno() == false) {
			return "Rojos";
		} else {
			return "Azules";
		}
	}

	verificarGanadorFila(fila, colorFicha, partida, tablero) {
		for (let i = 0; i < this.getCeldasEjeX().length - 1; i++) {

			if (this.Celdas[fila][i] == "Rojos") {
				this.contadorHorizontalRojas += 1;
			} else {
				this.contadorHorizontalRojas = 0;
			}

			if (this.Celdas[fila][i] == "Azules") {
				this.contadorHorizontalAzules += 1;
			} else {
				this.contadorHorizontalAzules = 0;
			}

			if (this.contadorHorizontalRojas == 4) {
				// console.log("Ganaron los: " + colorFicha);
				// partida.reiniciarPartida(tablero);
				partida.ganador(colorFicha, tablero);
				break;
			} else if (this.contadorHorizontalAzules == 4) {
				partida.ganador(colorFicha, tablero);
				break;
			}
		}
	}

	verificarGanadorColumna(columna, colorFicha, partida, tablero) {
		for (let i = 0; i < this.getCeldasEjeY().length; i++) {
			
			// Cada vez que itera, pregunta si es una ficha roja o azul, le suma al contador correcto y sino la resetea.
			// Comienza desde el inicio de la fila hasta el final de la columna. (en cada iteración las va contando de nuevo)

			if (this.Celdas[i][columna] == "Rojos") {
				this.contadorVerticalRojas += 1;
			} else {
				this.contadorVerticalRojas = 0;
			}

			if (this.Celdas[i][columna] == "Azules") {
				this.contadorVerticalAzules += 1;
			} else {
				this.contadorVerticalAzules = 0;
			}

			if (this.contadorVerticalRojas == 4) {
				partida.ganador(colorFicha, tablero);
				break;
			} else if (this.contadorVerticalAzules == 4) {
				partida.ganador(colorFicha, tablero);
				break;
			}
		}
	}

	rotarTurno(partida, ficha) {
		let imgFicha = new Ficha(this.ctx);
		if (partida.getTurno(true)) {
			ficha = imgFicha.crearFichaRoja();
			partida.setTurno(false);
		} else {
			ficha = imgFicha.crearFichaAzul();
			partida.setTurno(true);
		}

		return ficha;
	}

	getPosColumna(x) {

		if (x > 380 && x < 430) {
			return 0;
		}

		else if (x > 445 && x < 500) {
			return 1;
		}

		else if (x > 510 && x < 560) {
			return 2;
		}

		else if (x > 575 && x < 630) {
			return 3;
		}

		else if (x > 640 && x < 690) {
			return 4;
		}

		else if (x > 700 && x < 750) {
			return 5;
		}

		else if (x > 770 && x < 820) {
			return 6;
		}

		else if (x > 835 && x < 890) {
			return 7;
		} 

		// Retorno un null porque puede ser que le haga clic el borde sobrante de cada celda.

		else {
			return null;
		}
	}

	getImgCelda() {
		let imgCelda = new Image();
		imgCelda.src = "images/Celda.png"; 
		return imgCelda;
	}

	eliminarDatosMatriz() {
		const cols = 8;
		const rows = 7;

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				this.Celdas[j][i] = 0;
			}
		}
	}
}
class Tablero {

	constructor(ctx, Celdas, CeldasEjeX, CeldasEjeY, contadorVerticalRojas, contadorVerticalAzules, imgCelda) {
		this.ctx = ctx;
		this.Celdas = Celdas;
		this.CeldasEjeX = CeldasEjeX;
		this.CeldasEjeY = CeldasEjeY;
		this.contadorVerticalRojas = contadorVerticalRojas;
		this.contadorVerticalAzules = contadorVerticalAzules;
		this.imgCelda = imgCelda;
	}

	crearTablero() {
		const cols = 8;
		const rows = 7;
		let matriz = [];
		// let imgCelda = this.getImgCelda();
		let x, y;
		// x es el medio del canvas, donde empezará a dibujarse la tabla.
		x = canvas.width / 2 - this.imgCelda.width*8/2;
		y = 50;

		for (let i = 0; i < cols; i++) {
			matriz[i] = [];
			for (let j = 0; j < rows; j++) {

				this.CeldasEjeY[j] = y;
				this.CeldasEjeX[i] = x;

				y += this.imgCelda.height;
			}
			y = 50;
			x += this.imgCelda.width;
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
		for (let x = 0; x < this.getCeldasEjeX().length; x++) {
			for (let y = 0; y < this.getCeldasEjeY().length; y++) {
				// let imgCelda = this.getImgCelda();
				// this.imgCelda.onload = () => {
				this.ctx.drawImage(this.imgCelda, this.getCeldasEjeX()[x], this.getCeldasEjeY()[y], this.imgCelda.width, this.imgCelda.height);
				// }
			}
		}
	}

	insertarFicha(x, tablero, partida, imgFicha) {
		let posColumna = this.getPosColumna(x);

		let i = 7; // Cantidad de filas.

		// Márgenes para ubicar bien las fichas.
		let pixelX = 15;
		let pixelY = 12;

		// Si no es null significa que le dio a una celda. (porque entre las celdas hay márgenes que no me importan)
		if (posColumna != null) {
			// i vale 7, o sea la fila final de cada columna.
			while (i > 0) {
				if (this.Celdas[i-1][posColumna] == 0) {

					// ficha = partida.rotarTurno(partida, ficha);
					// partida.tiempo(partida, ficha);

					imgFicha.onload = () => {
						// Dibujo la ficha en esa posición y le sumo unos pixeles de margen para que queden bien posicionadas.
						this.ctx.drawImage(imgFicha, this.getCeldasEjeX()[posColumna] + pixelX, this.getCeldasEjeY()[i-1] + pixelY, imgFicha.width/4, imgFicha.height/4);
					}

					// 0 Vacío, 1 Roja, 2 Azul
					let colorFicha = this.verificarColorFicha(partida);

					this.Celdas[i-1][posColumna] = colorFicha;

					this.verificarGanadorVertical(posColumna, colorFicha, partida, tablero);
					this.verificarGanadorHorizontal(colorFicha, partida, tablero);
					this.verificarDiagonal(colorFicha, partida, tablero);
					this.verificarDiagonal2(colorFicha, partida, tablero);

					break;
				} else {
					i--;
				}
			}
		}
	}

	verificarDiagonal(colorFicha, partida, tablero) {
	    for (let y = 0; y < this.getCeldasEjeY().length - 3; y++) {
			for (let x = 0; x < this.getCeldasEjeX().length - 3; x++) {
	   			if (this.Celdas[y][x] == colorFicha && this.Celdas[y+1][x+1] == colorFicha && this.Celdas[y+2][x+2] == colorFicha && this.Celdas[y+3][x+3] == colorFicha) {
					partida.ganador(colorFicha, tablero);
					partida.setFinalizado(true);
					this.bloquearDatosMatriz();
	   			} 
			}
		}
	}

	verificarDiagonal2(colorFicha, partida, tablero) {
        for (let y = 3; y < this.getCeldasEjeY().length; y++) {
		    for (let x = 0; x < this.getCeldasEjeX().length - 3; x++) {
		        if (this.Celdas[y][x] == colorFicha && this.Celdas[y-1][x+1] == colorFicha && this.Celdas[y-2][x+2] == colorFicha && this.Celdas[y-3][x+3] == colorFicha) {
		        	partida.ganador(colorFicha, tablero);
		        	partida.setFinalizado(true);
		        	this.bloquearDatosMatriz();
		    	}
			}
		}
	}

	verificarGanadorHorizontal(colorFicha, partida, tablero) {
		for (let y = 0; y < this.getCeldasEjeY().length; y++) {
			for (let x = 0; x < this.getCeldasEjeX().length - 3; x++) {
				if (this.Celdas[y][x] == colorFicha && this.Celdas[y][x+1] == colorFicha && this.Celdas[y][x+2] == colorFicha && this.Celdas[y][x+3] == colorFicha) {
					partida.ganador(colorFicha, tablero);
					partida.setFinalizado(true);
					this.bloquearDatosMatriz();
				}
			}
		}
	}

	verificarGanadorVertical(columna, colorFicha, partida, tablero) {
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
				partida.setFinalizado(true);
				this.bloquearDatosMatriz();
				break;
			} else if (this.contadorVerticalAzules == 4) {
				partida.ganador(colorFicha, tablero);
				partida.setFinalizado(true);
				this.bloquearDatosMatriz();
				break;
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

	getPosColumna(x) {

		// Retorno la posición de la columna.

		if (x > 357 && x < 408) {
			return 0;
		}

		else if (x > 432 && x < 484) {
			return 1;
		}

		else if (x > 510 && x < 560) {
			return 2;
		}

		else if (x > 585 && x < 636) {
			return 3;
		}

		else if (x > 661 && x < 712) {
			return 4;
		}

		else if (x > 737 && x < 788) {
			return 5;
		}

		else if (x > 813 && x < 863) {
			return 6;
		}

		else if (x > 889 && x < 940) {
			return 7;
		} 

		// Retorno un null porque puede ser que le haga clic el borde sobrante de cada celda.

		else {
			return null;
		}
	}

	bloquearDatosMatriz() {
		const cols = 8;
		const rows = 7;

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				this.Celdas[j][i] = 1;
			}
		}
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
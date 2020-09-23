class Tablero {

	constructor(ctx, Celda, arrayCeldas) {
		this.ctx = ctx;
		this.Celda = Celda;
		this.arrayCeldas = arrayCeldas;
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
			this.Celda = {};

			for (let j = 0; j < rows; j++) {
				this.Celda = {};

				this.Celda['ejeX'] = x;
				this.Celda['ejeY'] = y;
				this.Celda['vacio'] = true;
				this.arrayCeldas.push(this.Celda);

				y += 60;
			}
			y = 8;
			x += 65;
		}
		console.log(this.arrayCeldas);
		this.dibujarCelda();
	}

	getCeldas() {
		return this.arrayCeldas;
	}

	insertarFicha(x, y) {
		// Si hace clic en cualquier columna de la primer fila.
		if (x >= 380 && x <= 900 && y >= 8 && y <= 65)
			this.verificarCelda(x);

		
	}

	verificarCelda(x) {
		let posArreglo = this.getPosArreglo(x);
		let imgFicha = new Ficha(this.ctx);

		let i = 7; // Cantidad de filas.

		// Márgenes para ubicar bien las fichas.
		let pixelX = 15;
		let pixelY = 12;

		// Si no es null significa que le dio a una celda. (porque entre las celdas hay márgenes que no me importan)
		if (posArreglo != null) {
			// i vale 7, o sea la fila final de cada columna.
			while (i > 0) {
				// Si el objeto de esa posición está vacío.
				if (this.getCeldas()[i + posArreglo - 1].vacio == true) {
					let ficha = imgFicha.crearFichaRoja();

					ficha.onload = () => {
						// Dibujo la ficha en esa posición y le sumo unos pixeles de margen para que queden bien posicionadas.
						this.ctx.drawImage(ficha, this.getCeldas()[i + posArreglo - 1].ejeX + pixelX, this.getCeldas()[i + posArreglo - 1].ejeY + pixelY, ficha.width/4, ficha.height/4);
					}
					// Seteo esa posición del arreglo en false porque ya hay una ficha.
					this.getCeldas()[i + posArreglo - 1].vacio = false;
					break;
				} else {
					// i-- para que disminuya una fila.
					i--;
				}
			}

		}
	}

	getPosArreglo(x) {
		// Si la x de donde hago clic está en alguno de esos márgenes, devuelvo
		// la posición de inicio de la fila.

		if (x > 380 && x < 430) {
			return 0;
		}

		else if (x > 445 && x < 500) {
			return 7;
		}

		else if (x > 510 && x < 560) {
			return 14;
		}

		else if (x > 575 && x < 630) {
			return 21;
		}

		else if (x > 640 && x < 690) {
			return 28;
		}

		else if (x > 700 && x < 750) {
			return 35;
		}

		else if (x > 770 && x < 820) {
			return 42;
		}

		else if (x > 835 && x < 890) {
			return 49;
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

	dibujarCelda() {
		for (let i = 0; i < this.getCeldas().length; i++) {
		let imgCelda = this.getImgCelda();
			imgCelda.onload = () => {
				this.ctx.drawImage(imgCelda, this.getCeldas()[i].ejeX, this.getCeldas()[i].ejeY, imgCelda.width, imgCelda.height);
			}
		}
	}

	eliminarDatosArreglo() {
		// Elimino todos los datos del arreglo para cuando quiera comenzar una nueva partida.
		this.arrayCeldas.splice(0, 56);
	}
}
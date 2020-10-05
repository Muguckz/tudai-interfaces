class Ficha {

	constructor(ctx, x, y, colorFicha, radio) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.colorFicha = colorFicha;
		this.radio = radio;
	}
	
	// Grupo de fichas azules.
	// crearFichasAzules() {
	// 	let imgFichaAzul = this.crearFichaAzul();
	// 	imgFichaAzul.onload = () => {
	// 		this.ctx.drawImage(imgFichaAzul, this.x, this.y, imgFichaAzul.width/4, imgFichaAzul.height/4);
	// 	}
	// }

	// // Grupo de fichas rojas.
	// crearFichasRojas() {
	// 	let imgFichaRoja = this.crearFichaRoja();
	// 	imgFichaRoja.onload = () => {
	// 		this.ctx.drawImage(imgFichaRoja, this.x, this.y, imgFichaRoja.width/4, imgFichaRoja.height/4);
	// 	}
	// }

	// crearFichas(fichaImg) {
	// 	fichaImg.onload = () => {
	// 		this.ctx.drawImage(fichaImg, this.x, this.y, fichaImg.width/4, fichaImg.height/4);
	// 	}
	// }

	// crearFichaRoja() {
	// 	let ficha = new Image();
	// 	ficha.src = "images/Ficha-roja.png";
	// 	return ficha;
	// }

	// crearFichaAzul() {
	// 	let ficha = new Image();
	// 	ficha.src = "images/Ficha-azul.png";
	// 	return ficha;
	// }

	estaDentro(x, y) {
		let _x = this.x + this.radio - x;
		let _y = this.y + this.radio - y;

		return Math.sqrt(_x * _x + _y * _y) < this.radio;
	}

// 	crearFicha(x, y, partida) {
// 		// Si hago clic en la zona del las fichas azules.
// 		if (isOnMove == false) {
// 			if (x > 0 && x < 300 && y > 0 && y < 80) {
// 				this.dibujarFicha(x, y, false);
// 				// Si hago clic en la zona de las fichas rojas.
// 			} else if (x < canvas.width && x > canvas.width - 300 && y > 0 && y < 80) {
// 				this.dibujarFicha(x, y, true);
// 			}
// 		} else {
// 			if (x > 0 && x < canvas.width && y > 0 && y < 80) {
// 				this.dibujarFicha(x, y, false);
// 				// Si hago clic en la zona de las fichas rojas.
// 			} else if (x < canvas.width && x > 0 && y > 0 && y < 80) {
// 				this.dibujarFicha(x, y, true);
// 			}
// 		}

// 		// if (partida.getTurno(true)) {
// 		// 	this.dibujarFicha(x, y, true);
// 		// } else {
// 		// 	this.dibujarFicha(x, y, false);
// 		// }
// 	}

// 	dibujarFicha(x, y, valor) {
// 		let ficha;
// 		if (valor) {
// 			ficha = this.crearFichaRoja();
// 		} else {
// 			ficha = this.crearFichaAzul();
// 		}

// 		// Le resto el radio para que se centre.
// 		this.ctx.drawImage(ficha, x - this.radio, y - this.radio, ficha.width/4, ficha.height/4);
// 	}

// 	moverFicha(x, y, partida, tablero) {
// 		if (isMouseDown) {
// 			this.ctx.clearRect(0, 0, 325, 125);
// 			this.ctx.clearRect(canvas.width - 300, 0, 325, 125);
// 			// this.ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			this.crearFicha(x, y, partida);
// 			// for (let i = 0; i < 10; i++) {
// 			// 	this.crearFichasAzules(posFichasX[i], posFichasY[i]);
// 			// } 			
// 		}
// 	}
// }

	moverFicha(x, y, clickedFigure, turno, tablero) {

		// let ficha;

		// if (turno == "Rojo") {
		// 	console.log("redd");
		// 	ficha = this.crearFichaRoja();
		// 	// this.dibujarFicha(x, y, ficha);
		// } else if (turno == "Azul") {
		// 	console.log("bluee");
		// 	ficha = this.crearFichaAzul();
		// 	// this.dibujarFicha(x, y, ficha);
		// }
		this.x = x;
		this.y = y;

		let ficha;

		if (turno == true) {
			ficha = this.crearFichaRoja();
		} else if (turno == false) {
			ficha = this.crearFichaAzul();
		}

		// console.log(ficha);

		ficha.onload = () => {
			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			// this.ctx.drawImage(ficha, x - this.radio, y - this.radio, ficha.width/4, ficha.height/4);
			tablero.crearTablero();
		}

		// this.dibujarFicha(x, y);
		
	}

}
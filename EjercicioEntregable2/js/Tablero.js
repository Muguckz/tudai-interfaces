class Tablero {

	constructor(ctx) {
		this.ctx = ctx;
	}

	// (mejorar) ejes x e y
	crearTablero() {
		const cols = 8;
		const rows = 7;
		let matriz = [];
		let imgCelda = this.getImgCelda();
		let x, y;
		x = 350;
		y = 0;

		for (let i = 0; i < rows; i++) {
			matriz[i] = [];
			for (let j = 0; j < cols; j++) {
				this.dibujarCelda(imgCelda, x, y);
				x += 65;
			}
			x = 350;
			y += 60;
		}
	}
	
	// definirTablero(imgTablero) {
	// 	this.ctx.drawImage(imgTablero, canvas.width/2 - imgTablero.width/2, 0, imgTablero.width, imgTablero.height);
	// }

	// getImgTablero() {
	// 	let imgTablero = new Image();
	// 	imgTablero.src = "images/Tablero.png"; 
	// 	return imgTablero;
	// }

	getImgCelda() {
		let imgCelda = new Image();
		imgCelda.src = "images/Celda.png"; 
		return imgCelda;
	}

	dibujarCelda(imgCelda, x, y) {
		this.ctx.drawImage(imgCelda, x, y, imgCelda.width, imgCelda.height);
		// width: 76 | height: 68
		// console.log(imgCelda.width);
		// console.log(imgCelda.height);
	}
}
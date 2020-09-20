class Tablero {

	constructor(ctx) {
		this.ctx = ctx;
	}
	
	definirTablero(imgTablero) {
		this.ctx.drawImage(imgTablero, canvas.width/2 - imgTablero.width/2, 0, imgTablero.width, imgTablero.height);

		// this.detectarCeldasTabla(imgTablero);
	}

	getImgTablero() {
		let imgTablero = new Image();
		imgTablero.src = "images/Tablero.png"; 
		return imgTablero;
	}

	// detectarCeldasTabla(imgTablero) {
	// 	let imgData = this.getImgData(imgTablero);
	// 	let celdas = 0;

	// 	for (int x = 0; x < imgData.width; x++) {
	// 		for (int y = 0; y < imgData.height; y++) {

	// 		}
	// 	}
	// }

	// getImgData(imgTablero) {
	// 	let imgData = this.ctx.getImageData(0, 0, imgTablero.width, imgTablero.height);
	// 	return imgData;
	// }

}
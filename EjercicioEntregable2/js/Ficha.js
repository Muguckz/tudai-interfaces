class Ficha {

	constructor(ctx) {
		this.ctx = ctx;
	}
	
	// Grupo de fichas azules.
	crearFichasAzules() {
		let imgFichaAzul = this.crearFichaAzul();
		for (let i = 0; i < 20; i++) {
			let x = Math.random() * 200;
			let y = Math.random() * 200;
			this.ctx.drawImage(imgFichaAzul, x, y, imgFichaAzul.width/4, imgFichaAzul.height/4);
		}
	}

	// Grupo de fichas rojas.
	crearFichasRojas() {
		let imgFichaRoja = this.crearFichaRoja();
		for (let i = 0; i < 20; i++) {
			let x = Math.random() * 200;
			let y = Math.random() * 200;
			// Tuve que usar un -50 porque sino se generaban afuera del canvas. (mejorar)
			this.ctx.drawImage(imgFichaRoja, canvas.width - x - 50, y, imgFichaRoja.width/4, imgFichaRoja.height/4);
		}
	}

	crearFichaRoja() {
		let ficha = new Image();
		ficha.src = "images/Ficha-roja.png";
		return ficha;
	}

	crearFichaAzul() {
		let ficha = new Image();
		ficha.src = "images/Ficha-azul.png";
		return ficha;
	}

	insertarFicha(x, y, ficha) {
		// Medidas de los ejes que corresponden a las primer fila con sus columnas (mejorar)
		if (x >= 369 && x <= 875 && y >= 15 && y <= 65) {
			console.log("Primer fila.");
		}
	}

	// getImgFichasAzules() {
	// 	let imgFichasAzules = new Image();
	// 	imgFichasAzules.src = "images/Fichas-azules.jpg"; 
	// 	return imgFichasAzules;
	// }

	// getImgFichasRojas() {
	// 	let imgFichasRojas = new Image();
	// 	imgFichasRojas.src = "images/Fichas-rojas.jpg"; 
	// 	return imgFichasRojas;
	// }

	// agarrarFicha(x, y, imgFichasRojas, imgFichasAzules) {

	// 	let imgFichaAzul = this.getImgFichasAzules();
	// 	let imgFichaRoja = this.getImgFichasRojas();

	// 	if (x > 0 && x < imgFichaAzul.width/2 && y > 0 && y < imgFichaAzul.height/2) {
	// 		// console.log("Ficha azul.");
	// 		imgFichaAzul = this.crearFichaAzul();
	// 		this.dibujarFicha(imgFichaAzul, x, y);
	// 	} else if (x > canvas.width - imgFichaRoja.width/2 && x < canvas.width && y > 0 && y < imgFichaRoja.height/2) {
	// 		// console.log("Ficha roja.");
	// 		imgFichaRoja = this.crearFichaRoja();
	// 		this.dibujarFicha(imgFichaRoja, x, y);
	// 	} else {
	// 		// console.log("Nada.");
	// 	}
	// }


	// dibujarFicha(img, x, y) {
	// 	this.ctx.drawImage(img, x - img.width/6, y - img.height/6, img.width/4, img.height/4);
	// }

	// insertarFicha(x, y, ficha) {
	// 	if (x > 395 && x < 925 && y > 50 && y < 475) {
	// 		console.log("Tablero");
	// 		ficha = this.crearFichaAzul();
			
	// 		this.dibujarFicha(ficha, x, y);
	// 	}
	// }


	// moverFicha(ficha, x, y) {
	// 	this.ctx.drawImage(ficha, x, y, ficha.width/4, ficha.height/4);
	// }

	// estaDentro(x, y) {
	// 	let _x = this.x - x;
	// 	let _y = this.y - y;
	// 	return Math.sqrt(_x * _x + _y * _y) < this.radioFicha();
	// }

	// radioFicha() {
	// 	return 1000;
	// }
}
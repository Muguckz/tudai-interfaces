class Ficha {

	constructor(ctx) {
		this.ctx = ctx;
	}
	
	// Grupo de fichas.
	definirFichasAzules() {
		let imgFichasAzules = this.getImgFichasAzules();
		this.ctx.drawImage(imgFichasAzules, 0, 0, imgFichasAzules.width/2, imgFichasAzules.height/2);
	}

	definirFichasRojas() {
		let imgFichasRojas = this.getImgFichasRojas();
		this.ctx.drawImage(imgFichasRojas, canvas.width - imgFichasRojas.width/2, 0, imgFichasRojas.width/2, imgFichasRojas.height/2);
	}

	getImgFichasAzules() {
		let imgFichasAzules = new Image();
		imgFichasAzules.src = "images/Fichas-azules.jpg"; 
		return imgFichasAzules;
	}

	getImgFichasRojas() {
		let imgFichasRojas = new Image();
		imgFichasRojas.src = "images/Fichas-rojas.jpg"; 
		return imgFichasRojas;
	}

	// Se puede mejorar considerablemente porque acá sé más o menos lo que mide la imagen y puedo trabajar con eso
	// pero si la imagen cambia de tamaño se rompe todo y no es una buena práctica. *MEJORAR*
	agarrarFicha(x, y, imgFichasRojas, imgFichasAzules) {
		let imgFichaAzul = this.getImgFichasAzules();
		let imgFichaRoja = this.getImgFichasRojas();

		if (x > 0 && x < imgFichaAzul.width/2 && y > 0 && y < imgFichaAzul.height/2) {
			// console.log("Ficha azul.");
			imgFichaAzul = this.crearFichaAzul();
			this.dibujarFicha(imgFichaAzul, x, y);
		} else if (x > canvas.width - imgFichaRoja.width/2 && x < canvas.width && y > 0 && y < imgFichaRoja.height/2) {
			// console.log("Ficha roja.");
			imgFichaRoja = this.crearFichaRoja();
			this.dibujarFicha(imgFichaRoja, x, y);
		} else {
			// console.log("Nada.");
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

	dibujarFicha(img, x, y) {
		this.ctx.drawImage(img, x - img.width/6, y - img.height/6, img.width/4, img.height/4);
	}

	insertarFicha(x, y, ficha, imgTablero) {
		if (x > 395 && x < 925 && y > 0 && y < 475) {
			console.log("Tablero");
			ficha = this.crearFichaAzul();
			
			this.dibujarFicha(ficha, x, y);
		}
	}

	moverFicha(ficha, x, y) {
		this.ctx.drawImage(ficha, x, y, ficha.width/4, ficha.height/4);
	}

	estaDentro(x, y) {
		let _x = this.x - x;
		let _y = this.y - y;
		return Math.sqrt(_x * _x + _y * _y) < this.radioFicha();
	}

	radioFicha() {
		return 1000;
	}
}
class Ficha {

	constructor(ctx, x, y, radio) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.radio = radio;
	}
	
	// Grupo de fichas azules.
	crearFichasAzules(x, y) {
		let imgFichaAzul = this.crearFichaAzul();
		imgFichaAzul.onload = () => {
			this.ctx.drawImage(imgFichaAzul, x, y, imgFichaAzul.width/4, imgFichaAzul.height/4);
		}

	}

	// Grupo de fichas rojas.
	crearFichasRojas(x, y) {
		let imgFichaRoja = this.crearFichaRoja();
		imgFichaRoja.onload = () => {
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

	estaDentro(x, y) {
		let _x = this.x - x;
		let _y = this.y - y;

		return Math.sqrt(_x * _x + _y * _y) < this.radio;
	}
}
export default class Figura {

	constructor(x, y, colorFondo, ctx) {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.colorFondo = this.colorFondo;
		this.ctx = ctx;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getColorFondo() {
		return this.colorFondo;
	}

	dibujarFigura() {
		this.ctx.fillStyle = this.colorFondo;
	}

	setColorRandom() {
		let letras = "0123456789ABCDEF";
		this.colorFondo = "#";

		for (let i = 0; i < 6; i++) {
	    	this.colorFondo += letras[Math.floor(Math.random() * 16)];
	  	}
	}

	setColorGradiente() {
		let gradiente = this.ctx.createLinearGradient(0, 0, 200, 500);
		gradiente.addColorStop(0, 'black');
		gradiente.addColorStop(1, 'red');
		this.ctx.fillStyle = gradiente;
	}
}

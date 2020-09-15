import Figura from '../js/Figura.js';

export default class Rectangulo extends Figura {

	constructor(x, y, colorFondo, ctx, width, height) {
		super(x, y, colorFondo, ctx);
		this.width = Math.random() * 200 + 50;
		this.height = this.width/2;
	}

	dibujarFigura() {
		super.dibujarFigura();

		this.ctx.beginPath();
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
		this.ctx.closePath();
	}

	setFondoImagen() {
		let img = new Image();
		img.src = "images/Lobo.jpg";
		let image = this.ctx.createPattern(img, "repeat");
		// this.ctx.rect(0, 0, 150, 100);
		this.ctx.fillStyle = image;
		this.ctx.fill();
	}

	getAncho() {
		this.width

	}

	getAltura() {
		return this.height;
	}
}
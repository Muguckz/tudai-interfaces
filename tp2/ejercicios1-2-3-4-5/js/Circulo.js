import Figura from '../js/Figura.js';

export default class Circulo extends Figura {

	constructor(x, y, colorFondo, ctx, radio) {
		super(x, y, colorFondo, ctx);
		this.radio = Math.random() * 100;
	}

	dibujarFigura() {
		super.dibujarFigura();
		
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.closePath();
	}

	getRadio() {
		return this.radio;
	}
}
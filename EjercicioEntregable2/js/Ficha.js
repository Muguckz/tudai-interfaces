class Ficha {

	constructor(ctx, x, y, colorFicha, radio, fichaImg) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.colorFicha = colorFicha;
		this.radio = radio;
		this.fichaImg = fichaImg;
	}

	estaDentro(x, y) {
		let _x = this.x - x;
		let _y = this.y - y;

		return Math.sqrt(_x * _x + _y * _y) < this.radio;
	}

	dibujar() {
		// this.fichaImg.onload = () => {
			this.ctx.drawImage(this.fichaImg, this.x - this.radio, this.y - this.radio, this.fichaImg.width/4, this.fichaImg.height/4);
		// }
	}

	moverFicha(x, y, imgFicha, clickedFigure) {
		this.x = x;
		this.y = y;

		this.ctx.drawImage(imgFicha, x - this.radio, y - this.radio, imgFicha.width/4, imgFicha.height/4);

	}
}
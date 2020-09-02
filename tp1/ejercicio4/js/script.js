"use strict"

document.addEventListener("DOMContentLoaded", function(){

	pintarRectanguloGradiente();
});

function pintarRectanguloGradiente() {

	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");

	let width = canvas.width;
	let height = canvas.height;

    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;

	let imageData = ctx.createImageData(width, height);

	let coeficiente = 255/height; 

	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++) {

			// Coeficiente será un número que sumado a Y en cada iteración pondrá el mismo valor 
			// de color a r,g y b (cada iteración es un pixel) 
          	r = Math.round(y + coeficiente);
            g = Math.round(y + coeficiente);
            b = Math.round(y + coeficiente);

			setPixel(imageData, x, y, r, g, b, a);
		}
	}
	ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
	let index = (x + y * imageData.width) * 4;

	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
}
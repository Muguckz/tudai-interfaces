"use strict"

document.addEventListener("DOMContentLoaded", function(){

	pintarRectangulo();
});

function pintarRectangulo() {
	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");

	let width = canvas.width;
	let height = canvas.height;

	let imageData = ctx.createImageData(width, height);

    let r = 111;
    let g = 100;
    let b = 100;
    let a = 255;

	for(let x = 0; x < width; x++) {
		for(let y = 0; y < height; y++) {
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
"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
// menuHeight será la altura del menú de arriba y le sumo un pixel para que quede mejor posicionado el mouse a la 
// hora de pintar
let menuHeight = (document.querySelector(".navbar").offsetHeight) + 1;
let dibujando = false;
let borrando = false;
let color = "black";
let grosorLapiz = 1;
let grosorGoma = 1;

canvas.height = window.innerHeight - menuHeight;
canvas.width = window.innerWidth;

document.addEventListener("DOMContentLoaded", () => {

	let nuevaHoja = document.querySelector("#nuevaHoja");
	nuevaHoja.addEventListener("click", () => {
		limpiarHoja();
		// Reseteo el valor del file.
		document.querySelector("#file").value = "";
	});

	let lapiz = document.querySelector("#lapiz");
	lapiz.addEventListener("click", (e) => {
		comenzarDibujo(e);
	});

	let goma = document.querySelector("#goma");
	goma.addEventListener("click", (e) => {
		comenzarBorrado(e);
	});

	cargarImagen();
});

function cargarImagen(e) {
  // let canvas = document.querySelector('#canvas');
  // let ctx = canvas.getContext( '2d' );
  let input = document.querySelector('.input');

  // Cuando le da clic a Abrir/Ok en la pestaña de seleccionar imagen.
  input.onchange = e => {
    limpiarHoja();
    verificarImagen(e, ctx);
  }
}

function verificarImagen(e, ctx) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    // Espera a procesar la imagen una vez que se carga.
    reader.onload = readerEvent => {
      procesarImagen(readerEvent, ctx);
    }
  }

function procesarImagen(readerEvent, ctx) {
	let content = readerEvent.target.result;
	let image = new Image();

	image.src = content;

	// Espera a que la imagen se cargue en la página para ejecutar la función.
	image.onload = function () {

	    canvas.width = this.width * 0.5;
	    canvas.height = this.height * 0.5;
	    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

	    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	    let pixeles = imgData.data;

	    let btnDescargar = document.querySelector("#descargar");
	    btnDescargar.classList.remove("display-none");
	    btnDescargar.addEventListener("click", () => {
	    	descargar(btnDescargar);
	    })

	    let btnFiltroNegativo = document.querySelector("#filtroNegativo");
	    btnFiltroNegativo.classList.remove("display-none");
	    btnFiltroNegativo.addEventListener("click", () => {
	    	filtroNegativo(pixeles, imgData);
	    	esconderBotonesFiltros();
	    })

	    let btnFiltroSepia = document.querySelector("#filtroSepia");
	    btnFiltroSepia.classList.remove("display-none");
	    btnFiltroSepia.addEventListener("click", () => {
	    	filtroSepia(pixeles, imgData);
	    	esconderBotonesFiltros();
	    })

	    let btnFiltroGris = document.querySelector("#filtroGris");
	    btnFiltroGris.classList.remove("display-none");
	    btnFiltroGris.addEventListener("click", () => {
	    	filtroGris(pixeles, imgData);
	    	esconderBotonesFiltros();
	    })
	}
}

function descargar(btnDescargar) {
	let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");

	btnDescargar.download = "mi-imagen.png";
	btnDescargar.href = image;
	btnDescargar.click();
}

function filtroGris(pixeles, imgData) {
    for (let i = 0; i < pixeles.length; i += 4) {
      let greyscale = (pixeles[i] + pixeles[i+1] + pixeles[i+2]) / 3;
      pixeles[i] = greyscale;
      pixeles[i+1] = greyscale;
      pixeles[i+2] = greyscale;
      pixeles[i+3] = 255;
    }

    // Inserto la imagen nueva con el filtro gris.
    ctx.putImageData(imgData, 0, 0);
}

function filtroSepia(pixeles, imgData) {
	for (let i = 0; i < pixeles.length; i += 4) {
	  // Calcula la luminosidad percibida para este pixel
	  let luminosidad = .3 * pixeles[i] + .6 * pixeles[i + 1] + .1 * pixeles[i + 2];
	  pixeles[i] = Math.min(luminosidad + 40, 255); // R
	  pixeles[i + 1] = Math.min(luminosidad + 15, 255); // G
	  pixeles[i + 2] = luminosidad; // B																
	}

	// Imagen con filtro.
	ctx.putImageData(imgData, 0, 0);
}

function filtroNegativo(pixeles, imgData) {
    for (let i = 0; i < pixeles.length; i += 4) {
      pixeles[i] = 255 - pixeles[i]; // R
      pixeles[i + 1] = 255 - pixeles[i + 1]; // G
      pixeles[i + 2] = 255 - pixeles[i + 2]; // B
    }

    // Imagen con filtro.
    ctx.putImageData(imgData, 0, 0);
}

function limpiarHoja() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	esconderBotonesFiltros();

	// Reestablezco el tamaño del canvas.
	canvas.height = window.innerHeight - menuHeight;
	canvas.width = window.innerWidth;
}

function esconderBotonesFiltros() {
	let boxCanvas = document.querySelector(".box-canvas");
	let allBotonesFiltros = boxCanvas.querySelectorAll("button");

	for(let i = 0; i < allBotonesFiltros.length; i++) {
		allBotonesFiltros[i].classList.add("display-none");
	}
}

function comenzarBorrado(e) {
	goma();
	canvas.addEventListener("mousedown", posicionInicioBorrado);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", dibujo);
}

function comenzarDibujo(e) {
	lapiz();
	canvas.addEventListener("mousedown", posicionInicioDibujo);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", dibujo);
}

function definirColor(c) {
	color = c;
}

function definirGrosorLapiz(g) {
	grosorLapiz = g;
}

function definirGrosorGoma(g) {
	grosorGoma = g;
}

function posicionInicioDibujo(e) {
	dibujando = true;
	borrando = false;
	dibujo(e);
}

function posicionInicioBorrado(e) {
	dibujando = false;
	borrando = true;
	dibujo(e);
}

function posicionFinalizado() {
	dibujando = false;
	borrando = false;
	// Resetear el path para que no me ponga obligatoriamente líneas conectadas.
	ctx.beginPath();
}

function dibujo(e) {
	if(dibujando) {
		// Le debo restar la altura del menú.
		ctx.lineTo(e.clientX, e.clientY - menuHeight);
		// ctx.strokeStyle = color;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - menuHeight);
		// console.log(dibujando);
	}

	if(borrando) {
		// Le debo restar la altura del menú.
		ctx.lineTo(e.clientX, e.clientY - menuHeight);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - menuHeight);
	}
}

function lapiz() {
	ctx.lineWidth = grosorLapiz;
	ctx.strokeStyle = color;
}

function goma() {
	ctx.lineWidth = grosorGoma;
	ctx.strokeStyle = "white";
}
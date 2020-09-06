"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
// Le resto 65px que es lo que mide de alto el menú de opciones de arriba.
let menuHeight = 65;
let dibujando = false;
let color = "black";
let grosor = 1;

canvas.height = window.innerHeight - menuHeight;
canvas.width = window.innerWidth;

document.addEventListener("DOMContentLoaded", () => {

	let nuevaHoja = document.querySelector("#nuevaHoja");
	nuevaHoja.addEventListener("click", () => {
		limpiarHoja();
	});

	let lapiz = document.querySelector("#lapiz");
	lapiz.addEventListener("click", (e) => {
		comenzarDibujo(e);
	});

	cargarImagen();

	// let goma = document.querySelector("#goma");
	// goma.addEventListener("click", (e) => {
	// 	comenzarBorrado(e);
	// });
});

function cargarImagen(e) {
  // let canvas = document.querySelector('#canvas');
  // let ctx = canvas.getContext( '2d' );
  let input = document.querySelector('.input');

  // Cuando le da clic a Abrir/Ok en la pestaña de seleccionar imagen.
  input.onchange = e => {
    limpiarHoja(ctx);
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
	}
}

function limpiarHoja() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function comenzarBorrado(e) {
	canvas.addEventListener("mousedown", posicionInicio);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", borrar);
}

function comenzarDibujo(e) {
	canvas.addEventListener("mousedown", posicionInicio);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", dibujar);
}

function definirColor(c) {
	color = c;
}

function definirGrosor(g) {
	grosor = g;
}

function posicionInicio(e) {
	dibujando = true;
	dibujar(e);
}

function posicionFinalizado() {
	dibujando = false;
	// Resetear el path para que no me ponga obligatoriamente líneas conectadas.
	ctx.beginPath();
}


function dibujar(e) {
	if(dibujando) {
		ctx.lineWidth = grosor;
		ctx.lineCap = "round";

		// Le debo restar la altura del menú.
		ctx.lineTo(e.clientX, e.clientY - menuHeight);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - menuHeight);
	}
}

// function borrar(e) {
// 	if(dibujando) {
// 		ctx.lineWidth = 5;
// 		ctx.lineCap = "round";

// 		// Le debo restar la altura del menú.
// 		ctx.clearRect(10,10,20,20);
// 	}
// }

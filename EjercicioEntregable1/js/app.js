"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.querySelector("#canvas2");
const ctx2 = canvas2.getContext("2d");

let dibujando = false;
let borrando = false;

// menuHeight será la altura del menú de arriba y le sumo un pixel para que quede mejor posicionado el mouse a la 
// hora de pintar
let navbarHeight = (document.querySelector(".navbar").offsetHeight);
let footerHeight = (document.querySelector(".botonera").offsetHeight);

let color = "black";
let grosorLapiz = 5;
let grosorGoma = 50;

document.addEventListener("DOMContentLoaded", () => {

	creacionCanvas();

	let nuevaHoja = document.querySelector("#nuevaHoja");
	nuevaHoja.addEventListener("click", () => {
		limpiarHoja();
		// Reseteo el valor del file.
		document.querySelector("#Inputfile").value = "";
	});

	let lapiz = document.querySelector("#lapiz");
	lapiz.addEventListener("click", (e) => {
		comenzarDibujo(e);
	});

	let goma = document.querySelector("#goma");
	goma.addEventListener("click", (e) => {
		comenzarBorrado(e);
	});

	let Inputfile = document.querySelector("#Inputfile");
	Inputfile.addEventListener("click", () => {
	// Hago esto para que me deje subir la misma foto de nuevo.
		if(Inputfile.value != "") {
			Inputfile.value = "";
		}
		cargarImagen();
	})
});

function creacionCanvas() {

	// Le resto el tamaño del navbar y footer.
	canvas.height = window.innerHeight - navbarHeight - footerHeight;
	canvas.width = window.innerWidth;
}

function cargarImagen(e) {
  	// Cuando le da clic a Abrir/Ok en la pestaña de seleccionar imagen.
  	Inputfile.onchange = e => {
 		limpiarHoja();
    	verificarImagen(e);
  	}
}

function verificarImagen(e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    // Espera a procesar la imagen una vez que se carga.
    reader.onload = readerEvent => {
      procesarImagen(readerEvent, ctx);
    }
}

function procesarImagen(readerEvent) {
	let content = readerEvent.target.result;
	let image = new Image();

	image.src = content;

	cargandoImagen();

	// Espera a que la imagen se cargue en la página para ejecutar la función.
	image.onload = function () {

		limpiarHoja();

	    let scale = Math.min(canvas.width / this.width, canvas.height / this.height);

	    // Dibujo la imagen en el canvas. (esto lo ve el usuario)
	    ctx.drawImage(this, 0, 0, this.width * scale, this.height * scale);

	    // Segundo canvas con la verdadera resolución de la imagen. (esto no lo va a poder ver, es sólo para descargar la
	    // verdadera resolución de la imagen)
	    canvas2.width = this.width;
	    canvas2.height = this.height;
	    ctx2.drawImage(this, 0, 0, canvas2.width, canvas2.height);

	    // Habilito el párrafo de Filtros:
	    document.querySelector("#filtros").classList.remove("display-none");

	    // Obtengo los datos de la imagen.
	    let imgData = ctx.getImageData(0, 0, this.width * scale, this.height * scale);
	    let imgDataOculto = ctx2.getImageData(0, 0, this.width, this.height);

	    let pixeles = imgData.data;
	    let pixelesOculto = imgDataOculto.data;

	    botonera(pixeles, imgData, pixelesOculto, imgDataOculto);
	}
}

function cargandoImagen() {
	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Subiendo imagen..", (canvas.width/2), 100);
}

function botonera(pixeles, imgData, pixelesOculto, imgDataOculto) {

	mostrarBotonesFiltros();

	// Por alguna razón, el limpiarHoja() de cuando se sube una imagen no funciona
	// correctamente y cuando subo una y luego subo otra y le doy un filtro, aparecen las dos (la primera abajo de la segunda)
	// y con esta limpieza que hago en todos los clics de los filtros anda bien.

    let btnDescargar = document.querySelector("#descargar");
    btnDescargar.addEventListener("click", () => {
    	descargar(btnDescargar);
    })

    let btnFiltroNegativo = document.querySelector("#filtroNegativo");
    btnFiltroNegativo.addEventListener("click", () => {
    	limpiarHoja();
    	filtroNegativo(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })

    let btnFiltroSepia = document.querySelector("#filtroSepia");
    btnFiltroSepia.addEventListener("click", () => {
    	limpiarHoja();
    	filtroSepia(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })

    let btnFiltroGris = document.querySelector("#filtroGris");
    btnFiltroGris.addEventListener("click", () => {
    	limpiarHoja();
    	filtroGris(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })

    let btnFiltroBrillo = document.querySelector("#filtroBrillo");
    btnFiltroBrillo.addEventListener("click", () => {
    	limpiarHoja();
    	filtroBrillo(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })

    let btnFiltroOscuro = document.querySelector("#filtroOscuro");
    btnFiltroOscuro.addEventListener("click", () => {
    	limpiarHoja();
    	filtroOscuro(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })

    let btnFiltroSaturacion = document.querySelector("#filtroSaturacion");
    btnFiltroSaturacion.addEventListener("click", () => {
    	limpiarHoja();
    	filtroSaturacion(pixeles, imgData, pixelesOculto, imgDataOculto);
    	esconderBotonesFiltros();
    })
}

function filtroSaturacion(pixeles, imgData) {
	let value = 1;
   	for (let i = 0; i < pixeles.length; i += 4) {
    	let r = pixeles[i]; 
       	let g = pixeles[i + 1];
       	let b = pixeles[i + 2];
       	let gray = 0.2989*r + 0.5870*g + 0.1140*b;
       	pixeles[i] = -gray * value + pixeles[i] * (1+value);
       	pixeles[i+1] = -gray * value + pixeles[i+1] * (1+value);
       	pixeles[i+2] = -gray * value + pixeles[i+2] * (1+value);
   	}

   	ctx.putImageData(imgData, 0, 0);
}

function mostrarBotonesFiltros(btnDescargar) {
	let boxCanvas = document.querySelector(".box-canvas");
	let allBotonesFiltros = boxCanvas.querySelectorAll("button");

	for(let i = 0; i < allBotonesFiltros.length; i++) {
		allBotonesFiltros[i].classList.remove("display-none");
	}
}

function filtroOscuro(pixeles, imgData, pixelesOculto, imgDataOculto) {

	for(let i = 0; i < pixeles.length; i += 4) {
		pixeles[i] -= 100; // R
	    pixeles[i + 1] -= 100; // G
	    pixeles[i + 2] -= 100; // B
	  }


	ctx.putImageData(imgData, 0, 0);

	for(let i = 0; i < pixelesOculto.length; i += 4) {
		pixelesOculto[i] -= 100; // R
	    pixelesOculto[i + 1] -= 100; // G
	    pixelesOculto[i + 2] -= 100; // B
	  }

	ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroBrillo(pixeles, imgData, pixelesOculto, imgDataOculto) {
	// El valor por defecto del contraste es 100.
	let constraste = 100;
	let factor = ( 259 * ( constraste + 255 ) ) / ( 255 * ( 259 - constraste ) );
 
    for (let i = 0; i < pixeles.length; i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];
 
        pixeles[i * 4] = factor * ( r - 128 ) + 128;
        pixeles[i * 4 + 1] = factor * ( g - 128 ) + 128;
        pixeles[i * 4 + 2] = factor * ( b - 128 ) + 128;
    }

    ctx.putImageData(imgData, 0, 0);

    for (let i = 0; i < pixelesOculto.length; i++) {
        let r = pixelesOculto[i * 4];
        let g = pixelesOculto[i * 4 + 1];
        let b = pixelesOculto[i * 4 + 2];
 
        pixelesOculto[i * 4] = factor * ( r - 128 ) + 128;
        pixelesOculto[i * 4 + 1] = factor * ( g - 128 ) + 128;
        pixelesOculto[i * 4 + 2] = factor * ( b - 128 ) + 128;
    }
 
    ctx2.putImageData(imgDataOculto, 0, 0);
}

function descargar(btnDescargar) {
	let image = canvas2.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");

	btnDescargar.download = "mi-imagen.png";
	btnDescargar.href = image;
}

function filtroGris(pixeles, imgData, pixelesOculto, imgDataOculto) {
    for (let i = 0; i < pixeles.length; i += 4) {
    	let greyscale = (pixeles[i] + pixeles[i+1] + pixeles[i+2]) / 3;
      	pixeles[i] = greyscale;
      	pixeles[i+1] = greyscale;
      	pixeles[i+2] = greyscale;
      	pixeles[i+3] = 255;
    }

    // Inserto la imagen nueva con el filtro gris.
    ctx.putImageData(imgData, 0, 0);

    for (let i = 0; i < pixelesOculto.length; i += 4) {
    	let greyscale = (pixelesOculto[i] + pixelesOculto[i+1] + pixelesOculto[i+2]) / 3;
      	pixelesOculto[i] = greyscale;
      	pixelesOculto[i+1] = greyscale;
      	pixelesOculto[i+2] = greyscale;
      	pixelesOculto[i+3] = 255;
    }
    ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroSepia(pixeles, imgData, pixelesOculto, imgDataOculto) {
	for (let i = 0; i < pixeles.length; i += 4) {
	  	// Calcula la luminosidad percibida para este pixel
	  	let luminosidad = .3 * pixeles[i] + .6 * pixeles[i + 1] + .1 * pixeles[i + 2];
	  	pixeles[i] = Math.min(luminosidad + 40, 255); // R
	  	pixeles[i + 1] = Math.min(luminosidad + 15, 255); // G
	  	pixeles[i + 2] = luminosidad; // B																
	}

	// Imagen con filtro.
	ctx.putImageData(imgData, 0, 0);

	for (let i = 0; i < pixelesOculto.length; i += 4) {
	  	// Calcula la luminosidad percibida para este pixel
	  	let luminosidad = .3 * pixelesOculto[i] + .6 * pixelesOculto[i + 1] + .1 * pixelesOculto[i + 2];
	  	pixelesOculto[i] = Math.min(luminosidad + 40, 255); // R
	  	pixelesOculto[i + 1] = Math.min(luminosidad + 15, 255); // G
	  	pixelesOculto[i + 2] = luminosidad; // B																
	}

	ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroNegativo(pixeles, imgData, pixelesOculto, imgDataOculto) {
    for (let i = 0; i < pixeles.length; i += 4) {
     	pixeles[i] = 255 - pixeles[i]; // R
     	 pixeles[i + 1] = 255 - pixeles[i + 1]; // G
     	 pixeles[i + 2] = 255 - pixeles[i + 2]; // B
    }

    // Imagen con filtro.
    ctx.putImageData(imgData, 0, 0);

    for (let i = 0; i < pixelesOculto.length; i += 4) {
     	pixelesOculto[i] = 255 - pixelesOculto[i]; // R
     	pixelesOculto[i + 1] = 255 - pixelesOculto[i + 1]; // G
     	pixelesOculto[i + 2] = 255 - pixelesOculto[i + 2]; // B
    }

    ctx2.putImageData(imgDataOculto, 0, 0);
}

function limpiarHoja() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	esconderBotonesFiltros();
}

function esconderBotonesFiltros() {
	let boxCanvas = document.querySelector(".box-canvas");
	let allBotonesFiltros = boxCanvas.querySelectorAll("button");

	for(let i = 0; i < allBotonesFiltros.length; i++) {
		allBotonesFiltros[i].classList.add("display-none");
	}

	// Deshabilito el párrafo de Filtros:
	document.querySelector("#filtros").classList.add("display-none");

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
	// Llamo a lapiz para actualizar el color
	lapiz();
	// Comienzo el dibujo si elige color
	comenzarDibujo();
}

function definirGrosorLapiz(g) {
	grosorLapiz = g;
	// Llamo a lapiz para actualizar el grosor
	lapiz();
	//Comienzo el dibujo si elige grosor
	comenzarDibujo();
}

function definirGrosorGoma(g) {
	grosorGoma = g;
	// Llamo a goma para actualizar el grosor
	goma();
	//Comienzo el dibujo si elige grosor
	comenzarBorrado();
}

function posicionInicioDibujo(e) {
	dibujando = true;
	borrando = false;
	// Llamo a la función para que empiece a dibujar si hace un clic, es decir que dibuje un punto si fuera necesario.
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
		ctx.lineTo(e.clientX, e.clientY - navbarHeight);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - navbarHeight);
	}

	if(borrando) {
		// Le debo restar la altura del menú.
		ctx.lineTo(e.clientX, e.clientY - navbarHeight);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - navbarHeight);
	}
}

function lapiz() {
	document.body.classList.add("lapiz");
	document.body.classList.remove("goma");
	ctx.lineWidth = grosorLapiz;
	ctx.strokeStyle = color;
	ctx.lineCap = "round";
}

function goma() {
	document.body.classList.remove("lapiz");
	document.body.classList.add("goma");
	ctx.lineWidth = grosorGoma;
	ctx.strokeStyle = "white";
	ctx.lineCap = "round";
}
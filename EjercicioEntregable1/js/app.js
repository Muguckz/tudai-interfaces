"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
// const canvas2 = document.querySelector("#canvas2");
// const ctx2 = canvas2.getContext("2d");

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
		esconderBotonesFiltros();
		limpiarHoja();
		// Reseteo el valor del input file.
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
	// Hago esto para que me deje subir la misma imagen de nuevo.
		if(Inputfile.value != "") {
			Inputfile.value = "";
		}
		cargarImagen();
	})

	let btnDescargar = document.querySelector("#descargar");
    btnDescargar.addEventListener("click", () => {
    	descargar(btnDescargar);
    })
});

function resetImage(imgOriginal) {
	 let scale = Math.min(canvas.width / imgOriginal.width, canvas.height / imgOriginal.height);
	 ctx.drawImage(imgOriginal, 0, 0, imgOriginal.width * scale, imgOriginal.height * scale);
}

function getImgData(imgOriginal) {
	let scale = Math.min(canvas.width / imgOriginal.width, canvas.height / imgOriginal.height);
	let imgData = ctx.getImageData(0, 0, imgOriginal.width * scale, imgOriginal.height * scale);
	return imgData;
}

function infoCargandoImagen() {
	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Subiendo imagen..", (canvas.width/2), 100);
}

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

	infoCargandoImagen();

	// Espera a que la imagen se cargue en la página para ejecutar la función.
	image.onload = function () {

		limpiarHoja();

		let imgOriginal = this;

	    let scale = Math.min(canvas.width / this.width, canvas.height / this.height);

	    ctx.drawImage(this, 0, 0, this.width * scale, this.height * scale);

	    // Segundo canvas con la verdadera resolución de la imagen. (esto no lo va a poder ver, es sólo para descargar la
	    // verdadera resolución de la imagen)
	    // canvas2.width = this.width;
	    // canvas2.height = this.height;
	    // ctx2.drawImage(this, 0, 0, canvas2.width, canvas2.height);

	    // let imgDataOculto = ctx2.getImageData(0, 0, this.width, this.height);

	    // let pixelesOculto = imgDataOculto.data;

	    botonera(imgOriginal);
	}
}

function botonera(imgOriginal) {

	mostrarBotonesFiltros();

    let btnFiltroNegativo = document.querySelector("#filtroNegativo");
    btnFiltroNegativo.addEventListener("click", () => {
    	limpiarHoja();
    	resetImage(imgOriginal);
    	filtroNegativo(imgOriginal);
    })

    let btnFiltroSepia = document.querySelector("#filtroSepia");
    btnFiltroSepia.addEventListener("click", () => {
    	limpiarHoja();
    	resetImage(imgOriginal);
    	filtroSepia(imgOriginal);
    })

    let btnFiltroGris = document.querySelector("#filtroGris");
    btnFiltroGris.addEventListener("click", () => {
    	limpiarHoja();
    	resetImage(imgOriginal);
    	filtroGris(imgOriginal);
    })

    // let btnFiltroBrillo = document.querySelector("#filtroBrillo");
    // btnFiltroBrillo.addEventListener("click", () => {
    // 	limpiarHoja();
    // 	resetImage(imgOriginal);
    // 	filtroBrillo(imgOriginal);
    // })

    let btnFiltroOscuro = document.querySelector("#filtroOscuro");
    btnFiltroOscuro.addEventListener("click", () => {
    	limpiarHoja();
    	resetImage(imgOriginal);
    	filtroOscuro(imgOriginal);
    })

    // let btnFiltroSaturacion = document.querySelector("#filtroSaturacion");
    // btnFiltroSaturacion.addEventListener("click", () => {
    // 	limpiarHoja();
    // 	resetImage(imgOriginal);
    // 	filtroSaturacion(imgOriginal);
    // })

    let btnFiltroBlur = document.querySelector("#filtroBlur");
    btnFiltroBlur.addEventListener("click", () => {
    	limpiarHoja();
    	resetImage(imgOriginal);
    	filtroBlur(imgOriginal);
    })

	let cantidadSaturacion = document.querySelector("#cantidadSaturacion");
	cantidadSaturacion.addEventListener("change", () => {
		limpiarHoja();
		resetImage(imgOriginal);
		filtroSaturacion(imgOriginal);
	})

	let cantdadBrillo = document.querySelector("#cantidadBrillo");
	cantidadBrillo.addEventListener("change", () => {
		limpiarHoja();
		resetImage(imgOriginal);
		filtroBrillo(imgOriginal);
	});
}

function filtroBlur(imgOriginal) {
	let imgData = getImgData(imgOriginal);

    for (let x = 0; x < imgData.width; x++) {
        for (let y = 0; y < imgData.height; y++) {

            let index = (x + y * imgData.width) * 4;
            let r = 0;
            let b = 0;
            let g = 0;

            r = sumarColorAdyacenteR(imgData, x, y);

            g = sumarColorAdyacenteG(imgData, x, y);

            b = sumarColorAdyacenteB(imgData, x, y);

            imgData.data[index + 0] = r / 9;
            imgData.data[index + 1] = g / 9;
            imgData.data[index + 2] = b / 9;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function sumarColorAdyacenteR(imgData, x, y) {
	return getRed(imgData, x - 1, y - 1) + getRed(imgData, x, y - 1) + getRed(imgData, x + 1, y - 1)
		   + getRed(imgData, x - 1, y) + getRed(imgData, x, y) + getRed(imgData, x + 1, y)
		   + getRed(imgData, x - 1, y + 1) + getRed(imgData, x, y + 1) + getRed(imgData, x + 1, y + 1);
}

function sumarColorAdyacenteG(imgData, x, y) {
	return getGreen(imgData, x - 1, y - 1) + getGreen(imgData, x, y - 1) + getGreen(imgData, x + 1, y - 1)
           + getGreen(imgData, x - 1, y) + getGreen(imgData, x, y) + getGreen(imgData, x + 1, y + 1)
           + getGreen(imgData, x - 1, y + 1) + getGreen(imgData, x, y + 1) + getGreen(imgData, x + 1, y + 1)
}

function sumarColorAdyacenteB(imgData, x, y) {
	return getBlue(imgData, x - 1, y - 1) + getBlue(imgData, x, y - 1) + getBlue(imgData, x + 1, y - 1)
           + getBlue(imgData, x - 1, y) + getBlue(imgData, x, y) + getBlue(imgData, x + 1, y + 1)
           + getBlue(imgData, x - 1, y + 1) + getBlue(imgData, x, y + 1) + getBlue(imgData, x + 1, y + 1)	
}

function getRed(imgData, x, y) {
    let i = (x + y * imgData.width) * 4;
    return imgData.data[i + 0];
}

function getGreen(imgData, x, y) {
    let i = (x + y * imgData.width) * 4;
    return imgData.data[i + 1];
}

function getBlue(imgData, x, y) {
    let i = (x + y * imgData.width) * 4;
    return imgData.data[i + 2];
}

function descargar(btnDescargar) {
	let image = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
	btnDescargar.download = "mi-imagen.png";
	btnDescargar.href = image;
}

function filtroSaturacion(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let cantidadSaturacion = document.querySelector("#cantidadSaturacion").value;

	for (let x = 0; x < imgData.width; x++) {
	    for (let y = 0; y < imgData.height; y++) {
	        let index = (y + imgData.height * x) * 4;
	        let rgb = [imgData.data[index + 0], imgData.data[index + 1], imgData.data[index + 2]]
	        let hsv = RGBtoHSV(rgb);
	        hsv[1] *= cantidadSaturacion;
	        let colorfinal = HSVtoRGB(hsv);
	        imgData.data[index + 0] = colorfinal[0];
	        imgData.data[index + 1] = colorfinal[1];
	        imgData.data[index + 2] = colorfinal[2];
	    }
	}
	ctx.putImageData(imgData, 0, 0);
}

function RGBtoHSV(rgb) {
    let r, g, b, h, s, v, minimo, maximo, delta;
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    minimo = Math.min(r, g, b);
    maximo = Math.max(r, g, b);

    v = maximo;
    delta = maximo - minimo;

    if (maximo != 0) {
        s = delta / maximo;       
    } else {
        s = 0;
        h = -1;
        return [h, s, undefined];
    }

    if (r === maximo) {
        h = (g - b) / delta;     
    }
    else if (g === maximo) {
        h = 2 + (b - r) / delta;  
    } else {
        h = 4 + (r - g) / delta;  
    }
    
    h *= 60;

    if (h < 0) {
        h += 360;
    }

    if (isNaN(h)) {
        h = 0;
    }

    return [h, s, v];
}

	function HSVtoRGB(hsv) {
    let i;
    let h, s, v, r, g, b, f, p, q, t;
    h = hsv[0];
    s = hsv[1];
    v = hsv[2];

    if (s === 0) {
        r = g = b = v;
        return [r, g, b];
    }

    h /= 60;           
    i = Math.floor(h);
    f = h - i;          
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:     
            r = v;
            g = p;
            b = q;
            break;
    }

    return [r, g, b];
}

function filtroOscuro(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let pixeles = imgData.data;

	for(let i = 0; i < pixeles.length; i += 4) {
		pixeles[i] -= 100; // R
	    pixeles[i + 1] -= 100; // G
	    pixeles[i + 2] -= 100; // B
	  }

	ctx.putImageData(imgData, 0, 0);

	// for(let i = 0; i < pixelesOculto.length; i += 4) {
	// 	pixelesOculto[i] -= 100; // R
	//     pixelesOculto[i + 1] -= 100; // G
	//     pixelesOculto[i + 2] -= 100; // B
	//   }

	// ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroBrillo(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let pixeles = imgData.data;

	let cantidadBrillo = document.querySelector("#cantidadBrillo").value;

  	for (let x = 0; x < imgData.height; x++) {
	    for (let y = 0; y < imgData.width; y++) {
	        let index = (y + imgData.width * x) * 4;

	        // Se multiplica la cantidad del brillo por rgb, los colores oscuros como el negro apenas cambian o no lo hacen.
	        imgData.data[index + 0] = cantidadBrillo * imgData.data[index + 0];
	        imgData.data[index + 1] = cantidadBrillo * imgData.data[index + 1];
	        imgData.data[index + 2] = cantidadBrillo * imgData.data[index + 2];
	    }
    }

    ctx.putImageData(imgData, 0, 0);
}

function filtroGris(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let pixeles = imgData.data;

    for (let i = 0; i < pixeles.length; i += 4) {
    	let greyscale = (pixeles[i] + pixeles[i+1] + pixeles[i+2]) / 3;
      	pixeles[i] = greyscale;
      	pixeles[i+1] = greyscale;
      	pixeles[i+2] = greyscale;
      	pixeles[i+3] = 255;
    }

    // Inserto la imagen nueva con el filtro gris.
    ctx.putImageData(imgData, 0, 0);

    // for (let i = 0; i < pixelesOculto.length; i += 4) {
    // 	let greyscale = (pixelesOculto[i] + pixelesOculto[i+1] + pixelesOculto[i+2]) / 3;
    //   	pixelesOculto[i] = greyscale;
    //   	pixelesOculto[i+1] = greyscale;
    //   	pixelesOculto[i+2] = greyscale;
    //   	pixelesOculto[i+3] = 255;
    // }
    // ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroSepia(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let pixeles = imgData.data;

	for (let i = 0; i < pixeles.length; i += 4) {
	  	// Calcula la luminosidad percibida para este pixel
	  	let luminosidad = .3 * pixeles[i] + .6 * pixeles[i + 1] + .1 * pixeles[i + 2];
	  	pixeles[i] = Math.min(luminosidad + 40, 255); // R
	  	pixeles[i + 1] = Math.min(luminosidad + 15, 255); // G
	  	pixeles[i + 2] = luminosidad; // B																
	}

	// Imagen con filtro.
	ctx.putImageData(imgData, 0, 0);

	// for (let i = 0; i < pixelesOculto.length; i += 4) {
	//   	// Calcula la luminosidad percibida para este pixel
	//   	let luminosidad = .3 * pixelesOculto[i] + .6 * pixelesOculto[i + 1] + .1 * pixelesOculto[i + 2];
	//   	pixelesOculto[i] = Math.min(luminosidad + 40, 255); // R
	//   	pixelesOculto[i + 1] = Math.min(luminosidad + 15, 255); // G
	//   	pixelesOculto[i + 2] = luminosidad; // B																
	// }

	// ctx2.putImageData(imgDataOculto, 0, 0);
}

function filtroNegativo(imgOriginal) {
	let imgData = getImgData(imgOriginal);
	let pixeles = imgData.data;

    for (let i = 0; i < pixeles.length; i += 4) {
     	pixeles[i] = 255 - pixeles[i]; // R
     	pixeles[i + 1] = 255 - pixeles[i + 1]; // G
     	pixeles[i + 2] = 255 - pixeles[i + 2]; // B
    }

    // Imagen con filtro.
    ctx.putImageData(imgData, 0, 0);

    // for (let i = 0; i < pixelesOculto.length; i += 4) {
    //  	pixelesOculto[i] = 255 - pixelesOculto[i]; // R
    //  	pixelesOculto[i + 1] = 255 - pixelesOculto[i + 1]; // G
    //  	pixelesOculto[i + 2] = 255 - pixelesOculto[i + 2]; // B
    // }

    // ctx2.putImageData(imgDataOculto, 0, 0);
}

function mostrarBotonesFiltros(btnDescargar) {
	let boxCanvas = document.querySelector(".box-canvas");
	let allBotonesFiltros = boxCanvas.querySelectorAll("button");
	let boxBrillo = boxCanvas.querySelector("#boxBrillo");

	boxBrillo.classList.remove("display-none");

	for(let i = 0; i < allBotonesFiltros.length; i++) {
		allBotonesFiltros[i].classList.remove("display-none");
	}
}

function esconderBotonesFiltros() {
	let boxCanvas = document.querySelector(".box-canvas");
	let allBotonesFiltros = boxCanvas.querySelectorAll("button");
	let boxBrillo = boxCanvas.querySelector("#boxBrillo");

	boxBrillo.classList.add("display-none");

	for(let i = 0; i < allBotonesFiltros.length; i++) {
		allBotonesFiltros[i].classList.add("display-none");
	}
}

function definirColor(c) {
	color = c;
	// Llamo a lapiz para actualizar el color
	lapiz();
	// Comienzo el dibujo si elige color
	comenzarDibujo();
}

function definirGrosorLapiz(g) {
	grosorLapiz = g
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

function comenzarDibujo(e) {
	lapiz();
	canvas.addEventListener("mousedown", posicionInicioDibujo);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", dibujo);
}

function comenzarBorrado(e) {
	goma();
	canvas.addEventListener("mousedown", posicionInicioBorrado);
	canvas.addEventListener("mouseup", posicionFinalizado);
	canvas.addEventListener("mousemove", dibujo);
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
		ctx.closePath();
	}

	if(borrando) {
		// Le debo restar la altura del menú.
		ctx.lineTo(e.clientX, e.clientY - navbarHeight);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY - navbarHeight);
		ctx.closePath();
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

function limpiarHoja() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
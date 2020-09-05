"use strict"

document.addEventListener("DOMContentLoaded", function(){

  cargarImagen();

});

function filtroGris(ctx, imageScaledWidth, imageScaledHeight) {
    // Obtengo los datos de la imagen del contexto del canvas
    let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

    for (let i = 0; i < imageData.data.length; i += 4) {
      let greyscale = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3 
      imageData.data[i] = greyscale;
      imageData.data[i+1] = greyscale;
      imageData.data[i+2] = greyscale;
      imageData.data[i+3] = 255;
    }
    // Inserto la imagen nueva con el filtro gris.
    ctx.putImageData(imageData, 0, 0);
}

function procesarImagen(readerEvent, ctx) {
    let content = readerEvent.target.result;
    let image = new Image();

    image.src = content;

    // Espera a que la imagen se cargue en la página para ejecutar la función.
    image.onload = function () {

      let imageAspectRatio = (1.0 * this.height) / this.width;
      let imageScaledWidth = canvas.width;
      let imageScaledHeight = canvas.width * imageAspectRatio;

      // Dibujo la imagen en canvas.
      ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

      filtroGris(ctx, imageScaledWidth, imageScaledHeight)
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


function cargarImagen(e) {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext( '2d' );
  let input = document.querySelector('.input');

  // Cuando le da clic a Abrir/Ok en la pestaña de seleccionar imagen.
  input.onchange = e => {
    limpiarCanvas(ctx);
    verificarImagen(e, ctx);
  }
}

function limpiarCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}






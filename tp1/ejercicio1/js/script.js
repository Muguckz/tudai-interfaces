"use strict"

document.addEventListener("DOMContentLoaded", function() {

	const cols = 10;
	const rows = 10;
	let matriz = [];

	llenarMatriz(matriz, cols, rows);

	let valorMaximoMatriz;
	valorMaximoMatriz = calcularValorMaximoMatriz(matriz, cols, rows);
	console.log("Valor máximo de la matriz: " + valorMaximoMatriz);

	calcularValorMaximoFilaPar(matriz, cols, rows);
	calcularValorMinimoFilaImpar(matriz, cols, rows);
	calcularValorPromedioPorFila(matriz, cols, rows);
	
});

function llenarMatriz(matriz, cols, rows) {

	for (let i = 0; i < cols; i++) {
		matriz[i] = [];
		for (let j = 0; j < rows; j++) {
			matriz[i][j] = Math.round(Math.random()*100);
		}
	}
	console.table(matriz);
}

function calcularValorMaximoMatriz(matriz, cols, rows) {
	let valorMaximoMatriz = 0;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (matriz[i][j] > valorMaximoMatriz) {
				valorMaximoMatriz = matriz[i][j]
			}
		}
	}

	return valorMaximoMatriz;
}

function calcularValorMaximoFilaPar(matriz, cols, rows) {
	let valorMaximoPorFilaPar = -1;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (i % 2 == 0) {
				if (matriz[i][j] > valorMaximoPorFilaPar) {
					valorMaximoPorFilaPar = matriz[i][j];
				}
			} else {
				valorMaximoPorFilaPar = matriz[i][j];
			}
		}
		if (i % 2 == 0) {
			console.log("El valor máximo de la fila: " + i + " es: " + valorMaximoPorFilaPar);
		}
	}
}

function calcularValorMinimoFilaImpar(matriz, cols, rows) {
	let valorMinimoPorFilaImpar = 101;


	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (i % 2 != 0) {
				if (matriz[i][j] < valorMinimoPorFilaImpar) {
					valorMinimoPorFilaImpar = matriz[i][j];
				}
			} else {
				valorMinimoPorFilaImpar = matriz[i][j];
			}
		}
		if (i % 2 != 0) {
			console.log("El valor mínimo de la fila: " + i + " es: " + valorMinimoPorFilaImpar);
		}
	}
}

function calcularValorPromedioPorFila(matriz, cols, rows) {
	let suma = 0;

	for (let i = 0; i < cols; i++) {
		suma = 0;
		for (let j = 0; j < rows; j++) {
			suma += matriz[i][j];
		}
		console.log(suma/rows);
	}	
}
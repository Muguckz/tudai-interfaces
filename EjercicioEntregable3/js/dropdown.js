document.querySelector("#dropdown").addEventListener("click", dropdown);

function dropdown() {
	let hamburguer = document.querySelector("#hamburguer");

	hamburguer.classList.toggle("d-none");
}
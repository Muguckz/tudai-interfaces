document.querySelector("#dropdown").addEventListener("click", dropdown);
acordeon();

function dropdown() {
	let hamburguer = document.querySelector("#hamburguer");

	hamburguer.classList.toggle("d-none");
}

function acordeon() {
	let acordeon = document.querySelectorAll(".acordeon");

	for (let i = 0; i < acordeon.length; i++) {
		acordeon[i].addEventListener("click", function() {
	    this.classList.toggle("active");
	    let info_acordeon = this.nextElementSibling;

	    if ( ! info_acordeon.classList.contains("d-none")) {
	    	info_acordeon.classList.add("d-none");
	    } else {
	    	info_acordeon.classList.remove("d-none")
	    }

	  });
	}
}




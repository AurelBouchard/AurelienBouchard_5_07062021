// import {createCard} from "./templates";

// AFFICHAGE DES ARTICLES MEUBLEs
const panel = document.getElementById("panel");


// demande de la liste des article à l'API : GET http://localhost:3000/api/furniture

const getFurnitures = fetch(`http://localhost:3000/api/furniture`);

getFurnitures
	.then( response => {
		response.json()
			.then( arrayOfObjects => {
				arrayOfObjects.forEach(furniture => {
					panel.appendChild(createCard(furniture));
				});
			});
	} )
	.catch( error => {
		console.log(error);
	} );


export {};

const createCard = (furniture) => {
	let newDiv = document.createElement("div");
	newDiv.setAttribute("class", "col-fluid col-md-5 m-auto");

	let cardLink = document.createElement("a");
	cardLink.setAttribute("href", `article.html?id=${furniture._id}`);
	cardLink.setAttribute("title", `${furniture.name} : ${furniture.varnish.length} variations`);
	cardLink.setAttribute("class", "text-decoration-none");

	let cardDiv =  document.createElement("div");
	cardDiv.setAttribute("class", "card furniture mb-5");

	let cardImg = document.createElement("img");
	cardImg.setAttribute("src",`${furniture.imageUrl}`)
	cardImg.setAttribute("class","card-img-top")
	cardImg.setAttribute("alt",`${furniture.name}`)

	let cardFooter = document.createElement("div");
	cardFooter.setAttribute("class","card-footer d-flex");

	let span1 = document.createElement("span");
	span1.setAttribute("class","h5 card-title d-inline-block");
	span1.textContent = `${furniture.name}`;

	let span2 = document.createElement("span");
	span2.setAttribute("class","h5 d-inline-block ml-auto price");
	span2.textContent = `${furniture.price/100} €`;

	newDiv.appendChild(cardLink);
	cardLink.appendChild(cardDiv);
	cardDiv.appendChild(cardImg);
	cardDiv.appendChild(cardFooter);
	cardFooter.appendChild(span1);
	cardFooter.appendChild(span2);

	return newDiv;
}

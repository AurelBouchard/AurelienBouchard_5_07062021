//import {createCard} from "./templates";

// AFFICHAGE DES ARTICLES MEUBLEs
const panel = document.getElementById("panel");


// demande de la liste des article à l'API : GET http://localhost:3000/api/furniture

const getFurnitures = fetch(`http://localhost:3000/api/furniture`);

getFurnitures
	.then( response => { return response.json()})
	.then( arrayOfObjects => {
		arrayOfObjects.forEach(furniture => {
			panel.appendChild(createCard(furniture));
		})
	})
	.catch( error => { console.log(error) });


//export {};



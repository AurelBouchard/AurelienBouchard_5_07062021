import {createCard} from "./layoutHome.js";

// where articles will be displayed
const panel = document.getElementById("panel");


// ask for the full article list to the API
const getFurnitures = fetch(`http://localhost:3000/api/furniture`);

getFurnitures
	.then( response => { return response.json()})
	.then( arrayOfObjects => {
		arrayOfObjects.forEach(furniture => {
			panel.appendChild(createCard(furniture));
		})
	})
	.catch( error => { console.log(error) });



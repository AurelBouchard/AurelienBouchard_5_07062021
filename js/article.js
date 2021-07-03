import {asideLink, updatePageArticle} from "./layoutArticle.js";
import {getTheIdFromURL, createBasketInLocalStorage, updateQuantityUp} from "./utils.js";
import {Article} from "./__classes.js";

// demande d'un article à l'API : GET http://localhost:3000/api/:id
const productId = getTheIdFromURL();
let currentArticle;
let currentOption = "";


const askForAnArticle = fetch(`http://localhost:3000/api/furniture/${productId}`);

// affichage de l'article dans la partie centrale
askForAnArticle
	.then( response => { return response.json() })
	.then( furniture => {
		updatePageArticle(furniture);
		// option is set to the first one regardless to "select option menu"
		currentOption = furniture.varnish[0];
		currentArticle = setArticle(currentOption, furniture);
		})
	.catch( error => { console.log(error) });



// récupération des thumbnails pour l'aside
const asideCol = document.getElementById("aside");

const askForImages = fetch(`http://localhost:3000/api/furniture`);

askForImages
	.then( response => { return response.json()})
	.then( listOfArticles => {
		listOfArticles.forEach(furniture => { asideCol.appendChild(asideLink(furniture)) });
	})
	.catch( error => {console.log(error)} );


// ADD TO BASKET FUNCTIONS

export function addToBasket() {
	// update articleOption
	//currentArticle.selectedOption = currentOption;

	// create an article upon DOM.element values
	const articleToBeAdded = setArticle(currentOption, currentArticle);

	// check if basket object exists in localStorage
	const hasBasket = localStorage.getItem("basket") !== null;

	// if no basket => create it
	if (!hasBasket) createBasketInLocalStorage();

	let basket = JSON.parse(localStorage.getItem("basket"));

	let articleExistInBasket = false;

	// check for an existing IDENTICAL article in basket only if basket is not empty
	if (basket.articles.length>0) {
		for (let index in basket.articles) {

			if ((basket.articles[index]._id === articleToBeAdded._id) && (basket.articles[index].selectedOption === articleToBeAdded.selectedOption)) {
				articleExistInBasket = true;

				updateQuantityUp(basket, index);
				localStorage.setItem("basket", JSON.stringify(basket));
			}
		}
	}

	if (!articleExistInBasket) {
		// if basket is empty OR no existing identical article : add new article

		basket.articles.push(articleToBeAdded);
		updateQuantityUp(basket, basket.articles.length-1);

		localStorage.setItem("basket", JSON.stringify(basket));
	}

	//console.log("finally")
	//console.log(localStorage.getItem("basket"));
}

export function setArticle(currentOption, furniture) {
	// create an object "article" width id, name, option, price and imageUrl :
	let _id			= furniture._id;
	let name		= furniture.name;
	let selectedOption		= currentOption; // must be a string
	let price		= furniture.price;
	let quantity	= 0;

	return new Article (_id, name, selectedOption, price, quantity);
}

export function modifyCurrentOption(varnish) {
	currentOption = varnish;
}

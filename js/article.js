import {asideLink, updatePageArticle} from "./layoutArticle.js";
import {getTheIdFromURL, createBasketInLocalStorage, updateQuantityUp} from "./utils.js";
import {Article} from "./__classes.js";

const productId = getTheIdFromURL();
let currentArticle;
let currentOption = "";

// ask for one article to the API
const askForAnArticle = fetch(`http://localhost:3000/api/furniture/${productId}`);

askForAnArticle
	.then( response => { return response.json() })
	.then( furniture => {
		// set the displayed element with the returned data
		updatePageArticle(furniture);

		// option is set to the first one regardless to "select option menu"
		currentOption = furniture.varnish[0];

		// currentArticle is made with 2 parameters
		currentArticle = setArticle(currentOption, furniture);
		})
	.catch( error => { console.log(error) });



// where thumbnails will be displayed
const asideCol = document.getElementById("aside");

// ask for the full article list to the API
const askForImages = fetch(`http://localhost:3000/api/furniture`);

askForImages
	.then( response => { return response.json()})
	.then( listOfArticles => {
		// display thumbnails in aside
		listOfArticles.forEach(furniture => { asideCol.appendChild(asideLink(furniture)) });
	})
	.catch( error => {console.log(error)} );


// ADD TO BASKET FUNCTIONS

export function addToBasket() {
	// catching current parameters
	const articleToBeAdded = setArticle(currentOption, currentArticle);

	// check if basket object exists in localStorage
	const hasBasket = localStorage.getItem("basket") !== null;

	// if no basket => create it
	if (!hasBasket) createBasketInLocalStorage();

	let basket = JSON.parse(localStorage.getItem("basket"));

	// check for an existing IDENTICAL article in basket only if basket is not empty
	let articleExistInBasket = false;
	if (basket.articles.length>0) {
		for (let index in basket.articles) {

			if ((basket.articles[index]._id === articleToBeAdded._id)
				&& (basket.articles[index].selectedOption === articleToBeAdded.selectedOption)) {
				articleExistInBasket = true;

				updateQuantityUp(basket, index);
				localStorage.setItem("basket", JSON.stringify(basket));
			} // else no identical article
		}
	} // else basket is empty

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
	// create an Article object width id, name, option, price and imageUrl :
	let _id			= furniture._id;	// IMPORTANT : same naming as backend
	let name		= furniture.name;	// IMPORTANT : same naming as backend
	let price		= furniture.price;	// IMPORTANT : same naming as backend
	let quantity	= 0;
	let selectedOption = currentOption; // must be a string

	return new Article (_id, name, price, quantity, selectedOption);
}

export function modifyCurrentOption(varnish) {
	currentOption = varnish;
}

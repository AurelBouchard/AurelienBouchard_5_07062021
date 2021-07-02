import {addNewLineInListing, wrongInput, wrongEmail, clearWrong} from "./layoutBasket.js";
import {clearLocalStorageThenRefresh, isValidEmail, isOnlyText} from "./utils.js";
import {Order, Contact} from "./__classes.js";
import {port} from "./__config.js";


// check if basket exist and not empty
const basket = JSON.parse(localStorage.getItem("basket"));
const basketExist = !(basket == null);
let isBasketEmpty = true;

try {
	isBasketEmpty = basket.data.nOfArticles === 0;
} catch (e) {}


if (isBasketEmpty || !basketExist) {
	// special display if basket is empty

	document.getElementById("summary").setAttribute("class", "d-none");
	document.getElementById("listing").setAttribute("class", "d-none");
	document.getElementById("form").setAttribute("class", "d-none");

} else {
	// normal behaviour with at least 1 article
	document.getElementById("sadMessage").setAttribute("class", "d-none");

	const listing = document.getElementById("listing");

	const emptyBasketBtn = document.getElementById("emptyBasket");
	emptyBasketBtn.addEventListener("click", clearLocalStorageThenRefresh);

	const validationBtn1 = document.getElementById("validate");
	const validationBtn2 = document.getElementById("validateSec");
	validationBtn1.addEventListener("click", sendOrder);
	validationBtn2.addEventListener("click", sendOrder);

	for ( let i in basket.articles) {
		if (basket.articles[i].quantity > 0) {
			listing.appendChild(addNewLineInListing(basket, i));
		}
	}

	// relocate emptyBasketBtn after list of articles
	listing.insertAdjacentElement("beforeend", emptyBasketBtn);

	//update price sum
	const priceP = document.getElementById("priceP");
	priceP.textContent = basket.data.totalPrice/100+" €";

	// erase wrong input alerts
	clearWrong();
}


function sendOrder(){
	// erase wrong input alerts
	clearWrong();

	// get inputs values :
	let firstName	= document.getElementById("inputFirstName");
	let lastName	= document.getElementById("inputLastName");
	let email		= document.getElementById("inputEmail");
	let address		= document.getElementById("inputAddress");
	let city		= document.getElementById("inputCity");

	// check if inputs are all valid from bottom to top and set focus
	let validInputs = true ;

	if (!isValidEmail(email.value)) {
		validInputs = false;
		email.parentElement.appendChild(wrongEmail());
		email.focus();
	}

	if (!isOnlyText(city.value)) {
		validInputs = false;
		city.parentElement.appendChild(wrongInput("la ville"));
		city.focus();
	}

	// address is not tested

	if (!isOnlyText(lastName.value)) {
		validInputs = false;
		lastName.parentElement.appendChild(wrongInput("le nom"));
		lastName.focus();
	}

	if (!isOnlyText(firstName.value)) {
		validInputs = false;
		firstName.parentElement.appendChild(wrongInput("le prénom"));
		firstName.setAttribute("valid", "false")
		firstName.focus();
	}

	
	if (validInputs) {
		// if ok prepare list of articles
		const listOfArticles = [];
		for (let each of basket.articles) {
			listOfArticles.push(each.id);
		}

		// then prepare object "order"
		// constructor(firstName, lastName, address, city, email, listOfArticles)
		const contact	= new Contact(firstName.value, lastName.value, address.value, city.value, email.value);
		const order		= new Order(contact, listOfArticles);

		postToServer(order);
	}
}

function postToServer(order) {

	const fetchApiWithOrder = fetch(`http://localhost:3000/api/furniture/order`,{
		method: "POST",
		headers:{
			"Content-Type": "application/json"
		},
		body: JSON.stringify(order)
	});


	fetchApiWithOrder
		.then( response => { return response.json()})
		.then( object => {
			// empty localStorage and put orderConfirm Object in
			localStorage.clear();
			localStorage.setItem("orderConfirm",JSON.stringify(object));

			// jump to orderconfirm.html
			window.location = `http://localhost:${port}/pages/orderconfirm.html`
		})
		.catch( error => { alertMessage(error) });
}

function alertMessage(message){
	alert("Une erreur s'est produite. Détails : "+message);
// N'EST JAMAIS APPELLEE ............................................ ?????????????????????????????????????
}
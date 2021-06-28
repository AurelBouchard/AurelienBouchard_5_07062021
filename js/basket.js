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
			listing.appendChild(addNewLineInListing(i));
		}
	}

	// relocate emptyBasketBtn after list of articles
	listing.insertAdjacentElement("beforeend", emptyBasketBtn);

	//update price sum
	const priceP = document.getElementById("priceP");
	priceP.textContent = basket.data.totalPrice/100+" €";
}




function clearLocalStorageThenRefresh() {
	localStorage.clear();
	refresh();
}

function refresh() {
	console.log("refresh after 80ms");
	setTimeout(function() {document.location.reload()},80);
}



function sendOrder(currentBasket){
	// get inputs values :
	let firstName = document.getElementById("inputFirstName").value;
	let lastName = document.getElementById("inputLastName").value;
	let email = document.getElementById("inputEmail").value;
	let address = document.getElementById("inputAddress").value;
	let city = document.getElementById("inputCity").value;

	// check if inputs are all valid
	let validInputs = true ;
	if (!isOnlyText(firstName)) {
		alert("Attention le prénom ne doit comporter que des lettres, tiret ou apostrophe.");
		validInputs = false;
	}
	if (!isOnlyText(lastName)) {
		alert("Attention le nom ne doit comporter que des lettres, tiret ou apostrophe.");
		validInputs = false;
	}
	// address is not tested
	if (!isOnlyText(city)) {
		alert("Attention la ville ne doit comporter que des lettres, tiret ou apostrophe.");
		validInputs = false;
	}

	if (!isValidEmail(email)) {
		alert("Attention format d'eamil non valide.");
		validInputs = false;
	}
	
	if (validInputs) {
		// if ok prepare list of articles
		const listOfArticles = [];
		for (let each of basket.articles) {
			listOfArticles.push(each.id);
		}

		// then prepare object "order"
		// constructor(firstName, lastName, address, city, email, listOfArticles)
		const contact = new Contact(firstName, lastName, address, city, email);
		const order = new Order(contact, listOfArticles);

		let orderJson = JSON.stringify(order);

		postToServer(orderJson);
	}
}

function isOnlyText(text) {
	// pattern is ^[a-zA-Z\-'\ ]{1,40}$
	const pattern = /^[a-zA-Z\-'éèêö ]{1,40}$/;

	return pattern.test(text);
}

function isValidEmail(email) {
	// pattern is : ^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$
	const pattern = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$/;
	email = String(email).toLowerCase();

	return pattern.test(email);
}

function postToServer(order) {

	const fetchApiWithOrder = fetch(`http://localhost:3000/api/furniture/order`,{
		method: "POST",
		headers:{
			"Content-Type": "application/json"
		},
		body: order
	});


	fetchApiWithOrder
		.then( returnedResponse => {
			returnedResponse.json()
				.then( object => {
					console.log("youhou !!");
					console.log(object);
					
					// empty localStorage and put orderConfirm Object in
					localStorage.clear();
					localStorage.setItem("orderConfirm",JSON.stringify(object));

					// jump to orderconfirm.html
					window.location = `http://localhost:${port}/pages/orderconfirm.html`

				})
				.catch( returnedError => {
					// deal with “returnedError”
					console.log("2/ "+returnedError);
					alertMessage(returnedError);
				} );
		} )
		.catch( returnedError => {
			// deal with “returnedError”
			console.log("1/ "+returnedError);
			alertMessage(returnedError);
		} );

}

function alertMessage(message){
	alert("Une erreur s'est produite. Détails : "+message);
// N'EST JAMAIS APPELLEE ............................................ ?????????????????????????????????????
}

const isBasketEmpty = localStorage.getItem("article0") == null;

const priceP = document.getElementById("priceP");

const listOfArticles =[];

let sum=0;


if (isBasketEmpty) {
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


	let i=0;
	do {
		addNewLineInListing(i);		
		i++;
	}
	// do it while there is an other orinoco articles up next
	while (localStorage.getItem(`article${i}`) !== null); 

	// move emptyBasketBtn after list of articles
	listing.insertAdjacentElement("beforeend", emptyBasketBtn);

}


function addNewLineInListing(index) {

	let newLine = document.createElement("div");
	let hasNext = localStorage.getItem(`article${index+1}`) !== null;
	hasNext ? newLine.setAttribute("class","row border-bottom border-grey mr-3") :
		// different border-bottom if no line after
		newLine.setAttribute("class","row border-bottom border-dark mr-3");

	let article = document.createElement("p");
	article.setAttribute("class","mb-2 mt-4");

	// control
	console.log(JSON.parse(localStorage.getItem(`article${index}`)));

	let spanTitre = document.createElement("span");
	spanTitre.textContent = JSON.parse(localStorage.getItem(`article${index}`)).title;
	
	let spanOption = document.createElement("span");
	spanOption.textContent = ", couleur du vernis : "+JSON.parse(localStorage.getItem(`article${index}`)).varnish;

	let spanPrice = document.createElement("span");
	spanPrice.setAttribute("class","d-inline-block float-right");
	spanPrice.textContent = JSON.parse(localStorage.getItem(`article${index}`)).price/100+" €";

	updateSum(JSON.parse(localStorage.getItem(`article${index}`)).price/100, "plus");
	listOfArticles.push(JSON.parse(localStorage.getItem(`article${index}`)).id);

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// introduction d'une erreur qui n'est pas "cach" dans la promesse
	//listOfArticles.push(JSON.parse(localStorage.getItem(`orinoco${index}`)).title);

	listing.appendChild(newLine);
	newLine.appendChild(article);
	article.appendChild(spanTitre);
	article.appendChild(spanOption);
	article.appendChild(spanPrice);

};

function clearLocalStorageThenRefresh() {
	localStorage.clear();
	refresh();
};

function refresh() {
	console.log("refresh after 1s");
	setTimeout(function() {document.location.reload()},1000);
};

function updateSum(value, sign) {
	if (sign==="less") {
		sum -= value;
	};
	if (sign==="plus") {
		sum += value;
	};
	// update displayed value
	priceP.textContent = sum +" €";
};

function sendOrder(){
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
	// done
	
	// then prepare object "order"
	// constructor(firstName, lastName, address, city, email, listOfArticles)
	const contact = new Contact(firstName, lastName, address, city, email);
	const order = new Order(contact, listOfArticles);

	let orderJson = JSON.stringify(order);

	postToServer(orderJson);
	};
};

function isOnlyText(text) {
	// pattern is ^[a-zA-Z\-'\ ]{1,40}$
	const pattern = /^[a-zA-Z\-'éèêö\ ]{1,40}$/;

	return pattern.test(text);
};

function isValidEmail(email) {
	// pattern is : ^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$
	const pattern = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$/;
	email = String(email).toLowerCase();

	return pattern.test(email);
};

function postToServer(order) {
	console.log(order);


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
					
					// empty localStorage and put confirOrder Object in
					localStorage.clear();
					localStorage.setItem("orderConfirm",JSON.stringify(object));

					// jump to orderconfirm.html
					//setTimeout(function() {},20000);
						window.location = "http://localhost:5500/pages/orderconfirm.html"
					

					
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

};

function alertMessage(message){
	alert("Une erreur s'est produite. Détails : "+message);
// N'EST JAMAIS APPELLEE ............................................ ?????????????????????????????????????
};
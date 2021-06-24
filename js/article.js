const mainCol = document.getElementById("main");

// get the id of the current article from the url
// i.e. http://192.168.0.200:5500/pages/article.html#5be9cc611c9d440000c1421e

function getTheIdFromURL(URL) {
	return URL.slice(URL.indexOf("#")+1);
};



// demande d'un article à l'API : GET http://localhost:3000/api/:id
const id = getTheIdFromURL(document.URL);

const fetchMyAPI = fetch(`http://localhost:3000/api/furniture/${id}`);


// affichage de l'article dans la partie centrale
fetchMyAPI
	.then( returnedResponse => {
		returnedResponse.json()
			.then( articleObject => {

					//////////////////////////////////////////////////////
					//													//
					//    SEPARER LE STATIQUE ET LE DYNAMIQUE !!!!!		//
					//													//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

					// top row includes : picture, price, title, options, addToBasket btn
					let divTopRow = document.createElement("div");
					divTopRow.setAttribute("class", "row");


					// first div handles picture as a link
					let firstDiv = document.createElement("div");
					firstDiv.setAttribute("class", "col-md-8 m-3 p-0");

					let newA = document.createElement("a");
					newA.setAttribute("href", `${articleObject.imageUrl}`);
					newA.setAttribute("title", "Voir en grand");
					newA.setAttribute("rel", "noreferrer noopener");
					newA.setAttribute("target", "_blank");

					let newImg = document.createElement("img");
					newImg.setAttribute("class","img-fluid shadow");
					newImg.setAttribute("src",`${articleObject.imageUrl}`);
					newImg.setAttribute("alt",`meuble ${articleObject.name}`);
					newImg.setAttribute("id","mainPicture");

					divTopRow.appendChild(firstDiv);
					firstDiv.appendChild(newA);
					newA.appendChild(newImg);


					// second div handles title, price, options, addToBasket btn
					let secDiv = document.createElement("div");
					secDiv.setAttribute("class", "col-md-3");

					let pTitle = document.createElement("p");
					pTitle.setAttribute("class", "h2");
					pTitle.setAttribute("id", "pTitle");
					pTitle.textContent = `${articleObject.name}`;

					let pPrice = document.createElement("p");
					pPrice.setAttribute("class", "h3");
					pPrice.setAttribute("id", "pPrice");
					pPrice.setAttribute("value", `${articleObject.price}`);
					pPrice.textContent = `${articleObject.price/100} €`;

					let br = document.createElement("br");

					let pOptions = document.createElement("p");
					pOptions.setAttribute("class", "h5");
					pOptions.textContent = "Personnalisation du vernis :";

					let divOptions = document.createElement("div");
					divOptions.setAttribute("class", "input-group mb-5");

					// first option is checked by default
					let divFirstOption = document.createElement("div");
					divFirstOption.setAttribute("class", "form-check m-1");

					let firstInput = document.createElement("input");
					firstInput.setAttribute("type", "radio");
					firstInput.setAttribute("name", "options");
					firstInput.setAttribute("id", "option0");
					firstInput.setAttribute("autocomplete" ,"off");
					firstInput.setAttribute("checked", "true");
					firstInput.setAttribute("value" ,`${articleObject.varnish[0]}`);

					let firstLabel = document.createElement("label");
					firstLabel.setAttribute("class", "p-1 ml-2");
					firstLabel.setAttribute("for", "option0");
					firstLabel.textContent = articleObject.varnish[0];

					divFirstOption.appendChild(firstInput);
					divFirstOption.appendChild(firstLabel);
					divOptions.appendChild(divFirstOption);

					// if more than 1 option :

					for (let i =1; i < articleObject.varnish.length; i++ ) {
						let divNewOption = document.createElement("div");
						divNewOption.setAttribute("class", "form-check m-1");

						let newInput = document.createElement("input");
						newInput.setAttribute("type", "radio");
						newInput.setAttribute("name", "options");
						newInput.setAttribute("id", `option${i}`);
						newInput.setAttribute("autocomplete" ,"off");
						newInput.setAttribute("value" ,`${articleObject.varnish[i]}`);

						let newLabel = document.createElement("label");
						newLabel.setAttribute("class", "p-1 ml-2");
						newLabel.setAttribute("for", `option${i}`);
						newLabel.textContent = articleObject.varnish[i];

						divNewOption.appendChild(newInput);
						divNewOption.appendChild(newLabel);
						divOptions.appendChild(divNewOption);
					}


					

					let btnAddToBasket = document.createElement("button");
					btnAddToBasket.setAttribute("id", "addToBasketBtn");
					btnAddToBasket.setAttribute("class", "btn p-3 w-100");
					btnAddToBasket.textContent = "Ajouter au panier";

					btnAddToBasket.addEventListener("click", addToBasket);

					divTopRow.appendChild(secDiv);
					secDiv.appendChild(pTitle);
					secDiv.appendChild(pPrice);
					secDiv.appendChild(br);
					secDiv.appendChild(pOptions);
					secDiv.appendChild(divOptions);
					secDiv.appendChild(btnAddToBasket);

					mainCol.appendChild(divTopRow);

					// bottom row includes description

					let divBottomRow = document.createElement("div");
					divBottomRow.setAttribute("class", "row");

					let divCol = document.createElement("div");
					divCol.setAttribute("class", "col m-3");

					let pDescTitle = document.createElement("p");
					pDescTitle.setAttribute("class", "h4");
					pDescTitle.textContent = "Description :"; 

					let pDescription = document.createElement("p");
					pDescription.setAttribute("class", "h5");
					pDescription.textContent = `${articleObject.description}`;


					divBottomRow.appendChild(divCol);
					divCol.appendChild(pDescTitle);
					divCol.appendChild(pDescription);

					mainCol.appendChild(divBottomRow);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

						//		STATIQUE => article.html


			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );



// récupération des thumbnails pour l'aside
const asideCol = document.getElementById("aside");

const fetchApiForImages = fetch(`http://localhost:3000/api/furniture`);

fetchApiForImages
	.then( returnedResponse => {
		// deal with “returnedResponse”
		returnedResponse.json()
			.then( arrayOfObjects => {
				arrayOfObjects.forEach(element => {
					// deal with each element as object article

					let newDiv = document.createElement("div");
					newDiv.setAttribute("class", "row my-3 pr-sm-2 pr-md-3 pr-lg-4");

					let newA = document.createElement("a");
					newA.setAttribute("href", `article.html#${element._id}`);
					newA.setAttribute("class", "shadow");
					newA.setAttribute("title", `${element.name}`);

					let newImg = document.createElement("img");
					newImg.setAttribute("class", "img-thumbnail");
					newImg.setAttribute("src", `${element.imageUrl}`);
					newImg.setAttribute("alt", `lien vers ${element.name}`);

					newA.appendChild(newImg);
					newDiv.appendChild(newA);					
					asideCol.appendChild(newDiv);

					asideCol.lastElementChild.addEventListener('click', refresh);
				});
			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );


function refresh() {
	console.log("refresh");
	setTimeout(function() {document.location.reload()},30);
}


// ADD TO BASKET FUNCTIONS

function addToBasket() {
	// create an object "article" width id, name, varnish, price and imageUrl :

	// id already exist

	// get name
	let name = document.getElementById("pTitle").textContent;

	// check wich option is checked
	let varnish = document.querySelector("input[name=options]:checked").getAttribute("value");

	// get price
	let price = document.getElementById("pPrice").getAttribute("value")*1;

	// get imageUrl
	let imageUrl = document.getElementById("mainPicture").src;

	const newArticleInBasket = new ArticleInBasket (id, name, varnish, price, imageUrl);


	// check localStorage length and a name
	let itemsInBasket = "article"+localStorage.length;


	// store this in localStorage
	localStorage.setItem(itemsInBasket, JSON.stringify(newArticleInBasket));

	// check item properly added then message/alert
	//		message is : continuer achats ou voir le panier (2 boutons = 2 liens)
	//		alert is : une erreur s'est produite

}

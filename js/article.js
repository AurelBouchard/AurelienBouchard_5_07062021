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

				let linkToPicture = document.getElementById("linkToPicture");
				linkToPicture.setAttribute("href", `${articleObject.imageUrl}`);


				let mainPicture = document.getElementById("mainPicture");
				mainPicture.setAttribute("src",`${articleObject.imageUrl}`);
				mainPicture.setAttribute("alt",`meuble ${articleObject.name}`);


				let pTitle = document.getElementById("pTitle");
				pTitle.textContent = `${articleObject.name}`;


				let pPrice = document.getElementById("pPrice");
				pPrice.setAttribute("value", `${articleObject.price}`);
				pPrice.textContent = `${articleObject.price/100} €`;


				let firstOption = document.createElement("option");
				firstOption.setAttribute("selected", "true");
				firstOption.textContent = `${articleObject.varnish[0]}`;

				let optionSelector = document.getElementById("optionSelector");
				optionSelector.appendChild(firstOption);


				// // if more than 1 option :

				for (let i =1; i < articleObject.varnish.length; i++ ) {
					let nextOption = document.createElement("option");
					nextOption.textContent = `${articleObject.varnish[i]}`;

					optionSelector.appendChild(nextOption);				
				};

				let btnAddToBasket = document.getElementById("addToBasketBtn");
				btnAddToBasket.addEventListener("click", addToBasket);

				pDescription.textContent = `${articleObject.description}`;
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

					let linkToPicture = document.createElement("a");
					linkToPicture.setAttribute("href", `article.html#${element._id}`);
					linkToPicture.setAttribute("class", "shadow");
					linkToPicture.setAttribute("title", `${element.name}`);

					let mainPicture = document.createElement("img");
					mainPicture.setAttribute("class", "img-thumbnail");
					mainPicture.setAttribute("src", `${element.imageUrl}`);
					mainPicture.setAttribute("alt", `lien vers ${element.name}`);

					linkToPicture.appendChild(mainPicture);
					newDiv.appendChild(linkToPicture);					
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
	let varnish = document.getElementById("optionSelector").value;

	// get price
	let price = document.getElementById("pPrice").getAttribute("value")*1;

	// get imageUrl
	let imageUrl = document.getElementById("mainPicture").src;

	const linkToPicturerticleInBasket = new ArticleInBasket (id, name, varnish, price, imageUrl);


	// check localStorage length and a name
	let itemsInBasket = "article"+localStorage.length;


	// store this in localStorage
	localStorage.setItem(itemsInBasket, JSON.stringify(linkToPicturerticleInBasket));

	// check item properly added then message/alert
	//		message is : continuer achats ou voir le panier (2 boutons = 2 liens)
	//		alert is : une erreur s'est produite

}

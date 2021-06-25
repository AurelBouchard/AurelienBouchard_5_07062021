// demande d'un article à l'API : GET http://localhost:3000/api/:id
const productId = getTheIdFromURL();

const fetchMyAPI = fetch(`http://localhost:3000/api/furniture/${productId}`);


// affichage de l'article dans la partie centrale
fetchMyAPI
	.then( response => {
		response.json()
			.then( furniture => {
				updateArticle(furniture);
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
	.then( response => {
		response.json()
			.then( listOfArticles => {
				listOfArticles.forEach(furniture => {
					asideCol.appendChild(asideLink(furniture));
				});
			});
	} )
	.catch( error => {
		console.log(error);
	} );

function getTheIdFromURL() {
	return (new URLSearchParams(document.location.search.substring(1))).get("id");
}



// ADD TO BASKET FUNCTIONS

function addToBasket() {
	// create an object "article" width id, name, varnish, price and imageUrl :

	let name = document.getElementById("pTitle").textContent;
	let varnish = document.getElementById("optionSelector").value;
	let price = document.getElementById("pPrice").getAttribute("value")*1;
	let imageUrl = document.getElementById("mainPicture").src;

	const articleInBasket = new ArticleInBasket (productId, name, varnish, price, imageUrl);


	// check localStorage length and a name ----------------------------------------------------- A CHANGER
	let itemsInBasket = "article"+localStorage.length;

		// IL FAUT VERIFIER LA PRESENCE D'UN OBJET BASKET
		// SI ABSENT CREER, PUIS
		// VERIFIER LA PRESENCE D'UN OBJET IDENTIQUE
		// AJOUTER L'OBJET : SOIT EN AUGMENTANT LA Q SOIT EN EN CREANT UN NOUVEL OBJET

	// store this in localStorage
	localStorage.setItem(itemsInBasket, JSON.stringify(articleInBasket));


}


const asideLink = (miniCard) => {
	let newDiv = document.createElement("div");
	newDiv.setAttribute("class", "row my-3 pr-sm-2 pr-md-3 pr-lg-4");

	let linkToPicture = document.createElement("a");
	linkToPicture.setAttribute("href", `article.html?id=${miniCard._id}`);
	linkToPicture.setAttribute("class", "shadow");
	linkToPicture.setAttribute("title", `${miniCard.name}`);

	let mainPicture = document.createElement("img");
	mainPicture.setAttribute("class", "img-thumbnail");
	mainPicture.setAttribute("src", `${miniCard.imageUrl}`);
	mainPicture.setAttribute("alt", `lien vers ${miniCard.name}`);

	linkToPicture.appendChild(mainPicture);
	newDiv.appendChild(linkToPicture);

	return newDiv;
};

function updateArticle(article) {
	let linkToPicture = document.getElementById("linkToPicture");
	linkToPicture.setAttribute("href", `${article.imageUrl}`);

	let mainPicture = document.getElementById("mainPicture");
	mainPicture.setAttribute("src",`${article.imageUrl}`);
	mainPicture.setAttribute("alt",`meuble ${article.name}`);

	let pTitle = document.getElementById("pTitle");
	pTitle.textContent = `${article.name}`;

	let pPrice = document.getElementById("pPrice");
	pPrice.setAttribute("value", `${article.price}`);
	pPrice.textContent = `${article.price/100} €`;

	let firstOption = document.createElement("option");
	firstOption.setAttribute("selected", "true");
	firstOption.textContent = `${article.varnish[0]}`;

	let optionSelector = document.getElementById("optionSelector");
	optionSelector.appendChild(firstOption);

	// // if more than 1 option :
	for (let i =1; i < article.varnish.length; i++ ) {
		let nextOption = document.createElement("option");
		nextOption.textContent = `${article.varnish[i]}`;

		optionSelector.appendChild(nextOption);
	}

	let btnAddToBasket = document.getElementById("addToBasketBtn");
	btnAddToBasket.addEventListener("click", addToBasket);

	let pDescription = document.getElementById("pDescription");
	pDescription.textContent = `${article.description}`;
}
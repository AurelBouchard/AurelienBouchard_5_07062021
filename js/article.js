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
	let quantity = 0;

	const articleToBeAdded = new ArticleInBasket (productId, name, varnish, price, imageUrl, quantity);

		// IL FAUT VERIFIER LA PRESENCE D'UN OBJET BASKET
		// SI ABSENT CREER, PUIS
		// VERIFIER LA PRESENCE D'UN OBJET IDENTIQUE
		// AJOUTER L'OBJET : SOIT EN AUGMENTANT LA Q SOIT EN EN CREANT UN NOUVEL OBJET

	// check if basket object exists in localStorage
	const hasBasket = localStorage.getItem("basket") !== null;

	// if no basket => create it
	if (!hasBasket) createBasketInLocalStorage();

	let basket = JSON.parse(localStorage.getItem("basket"));

	let articleExistInBasket = false;

	// check for an existing IDENTICAL article in basket only if basket is not empty
	if (basket.articles.length>0) {
		for (let index in basket.articles) {

			if ((basket.articles[index].id === articleToBeAdded.id) && (basket.articles[index].varnish === articleToBeAdded.varnish)) {
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

	console.log("finaly")
	console.log(localStorage.getItem("basket"));
}



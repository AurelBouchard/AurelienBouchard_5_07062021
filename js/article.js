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

					main.innerHTML = `				

						<div class="row">
							<div class="col-md-8 m-3 shadow p-0">
								<a href="${articleObject.imageUrl}" rel="noreferrer noopener" target="_blank">
								<img src="${articleObject.imageUrl}" alt="meuble ${articleObject.name}" class="img-fluid">
								</a>
							</div>

							<div class="col m-3">
								<p class="h2">${articleObject.name}</p>
								<p class="h3">${articleObject.price/100} €</p>
								</br>
								<p class="h5">Personnalisation :</p>
								<button id="addToBasketBtn" class="btn p-3">Ajouter au panier</button>
							</div>
						</div>

						<div class="row">
							<div class="col m-3">
								<p class="h4">Description :</p>
								<p class="h5">${articleObject.description}</p>
							</div>
						</div>


					`;
			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );



// récupération des thumnails pour l'aside
const asideCol = document.getElementById("aside");

const fetchApiForImages = fetch(`http://localhost:3000/api/furniture`);

fetchApiForImages
	.then( returnedResponse => {
		// deal with “returnedResponse”
		returnedResponse.json()
			.then( arrayOfObjects => {
				arrayOfObjects.forEach(element => {
					// deal with each element as object article

					asideCol.appendChild( document.createElement("div"));
					asideCol.lastElementChild.setAttribute("class", "row my-3 pr-sm-2 pr-md-3 pr-lg-4");
					asideCol.lastElementChild.innerHTML = `
						<a href="article.html#${element._id}" class="shadow">
						<img class="img-thumbnail" src="${element.imageUrl}">
						</a>
					`;

					// prise en compte du besoin de rafraichissement pour chaque lien

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

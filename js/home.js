// AFFICHAGE DES ARTICLES MEUBLEs
const panel = document.getElementById("panel");


// demande de la liste des article à l'API : GET http://localhost:3000/api/furniture

const fetchMyAPI = fetch(`http://localhost:3000/api/furniture`);

fetchMyAPI
	.then( returnedResponse => {
		// deal with “returnedResponse”
		returnedResponse.json()
			.then( arrayOfObjects => {
				arrayOfObjects.forEach(element => {
					// deal with each element as object article

					panel.appendChild( document.createElement("div"));
					panel.lastElementChild.setAttribute("class", "col-fluid col-md-5 m-auto");
					panel.lastElementChild.innerHTML = `<a href="article.html#${element._id}" title="${element.name} : ${element.varnish.length} variations" class="text-decoration-none">
						
							<div class="card furniture mb-5">
								<img src="${element.imageUrl}" class="card-img-top">
								<div class="card-footer d-flex">
									<span class="h5 card-title d-inline-block">${element.name}</span>
									<span class="h5 d-inline-block ml-auto price">${element.price/100} €</span>
								</div>
							</div>
					</a>
					`;
				});
			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );

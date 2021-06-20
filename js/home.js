// AFFICHAGE DES ARTICLES MEUBLEs
const panel = document.getElementById("test");


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
					panel.lastElementChild.setAttribute("class", "col mt-5");
					panel.lastElementChild.innerHTML = `<a href="article.html#${element._id}">
						
							<div class="card article">
								<div class="card-header ">
									<h5 class="card-title d-flex justify-content-between">${element.name}<span class="price">${element.price/100} €</span></h5>
								</div>
								<img src="${element.imageUrl}" class="card-img-top">
								<span class="fa-stack fa-2x addFavorite">
									<i class="fas fa-star fa-stack-1x"></i>
									<i class="far fa-star fa-stack-1x"></i>
								</span>
								<div class="card-body">
									<p class="card-text">${element.description}</p>
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

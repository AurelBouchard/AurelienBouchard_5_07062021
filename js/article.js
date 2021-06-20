const test = document.getElementById("test");

// get the id of the current article from the url
// i.e. http://192.168.0.200:5500/pages/article.html#5be9cc611c9d440000c1421e


function getTheIdFromURL(URL) {
	return URL.slice(URL.indexOf("#")+1);
};



// demande d'un article à l'API : GET http://localhost:3000/api/:id
const id = getTheIdFromURL(document.URL);

const fetchMyAPI = fetch(`http://localhost:3000/api/furniture/${id}`);

fetchMyAPI
	.then( returnedResponse => {
		// deal with “returnedResponse”
		returnedResponse.json()
			.then( articleObject => {
				console.log(articleObject)


					test.appendChild( document.createElement("div"));
					test.lastElementChild.setAttribute("class", "col mt-5");
					test.lastElementChild.innerHTML = `						
							<div class="card article">
							
								<div class="card-header ">
									<h5 class="card-title d-flex justify-content-between">${articleObject.name}<span class="price">${articleObject.price/100} €</span></h5>
								</div>

								<img src="${articleObject.imageUrl}" class="card-img-top">
								
								<div class="card-body">
									<p class="card-text">${articleObject.description}</p>
								</div>
							</div>
					`;
			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );

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

					// panel.appendChild( document.createElement("div"));
					// panel.lastElementChild.setAttribute("class", "col-fluid col-md-5 m-auto");
					// panel.lastElementChild.innerHTML = `<a href="article.html#${element._id}" title="${element.name} : ${element.varnish.length} variations" class="text-decoration-none">
					//
					// 		<div class="card furniture mb-5">
					// 			<img src="${element.imageUrl}" class="card-img-top" alt="${element.name}">
					// 			<div class="card-footer d-flex">
					// 				<span class="h5 card-title d-inline-block">${element.name}</span>
					// 				<span class="h5 d-inline-block ml-auto price">${element.price/100} €</span>
					// 			</div>
					// 		</div>
					// </a>
					// `;

					let newDiv = document.createElement("div");
					newDiv.setAttribute("class", "col-fluid col-md-5 m-auto");

					let cardLink = document.createElement("a");
					cardLink.setAttribute("href", `article.html#${element._id}`);
					cardLink.setAttribute("title", `${element.name} : ${element.varnish.length} variations`);
					cardLink.setAttribute("class", "text-decoration-none");

					let cardDiv =  document.createElement("div");
					cardDiv.setAttribute("class", "card furniture mb-5");

					let cardImg = document.createElement("img");
					cardImg.setAttribute("src",`${element.imageUrl}`)
					cardImg.setAttribute("class","card-img-top")
					cardImg.setAttribute("alt",`${element.name}`)

					let cardFooter = document.createElement("div");
					cardFooter.setAttribute("class","card-footer d-flex");

					let span1 = document.createElement("span");
					span1.setAttribute("class","h5 card-title d-inline-block");
					span1.textContent = `${element.name}`;

					let span2 = document.createElement("span");
					span2.setAttribute("class","h5 d-inline-block ml-auto price");
					span2.textContent = `${element.price/100} €`;

					newDiv.appendChild(cardLink);
						cardLink.appendChild(cardDiv);
							cardDiv.appendChild(cardImg);
							cardDiv.appendChild(cardFooter);
								cardFooter.appendChild(span1);
								cardFooter.appendChild(span2);

					panel.appendChild(newDiv);


				});
			});
	} )
	.catch( returnedError => {
		// deal with “returnedError”
		console.log(returnedError.json());
	} );

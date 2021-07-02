// ARTICLE.HTML :

import {addToBasket} from "./article.js";

export const asideLink = (miniCard) => {
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
}

export function updateArticle(article) {
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

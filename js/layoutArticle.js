// ARTICLE.HTML :

import {addToBasket, modifyCurrentOption} from "./article.js";

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

export function updatePageArticle(furniture) {
    let linkToPicture = document.getElementById("linkToPicture");
    linkToPicture.setAttribute("href", `${furniture.imageUrl}`);

    let mainPicture = document.getElementById("mainPicture");
    mainPicture.setAttribute("src",`${furniture.imageUrl}`);
    mainPicture.setAttribute("alt",`meuble ${furniture.name}`);

    let pTitle = document.getElementById("pTitle");
    pTitle.textContent = `${furniture.name}`;

    let pPrice = document.getElementById("pPrice");
    pPrice.setAttribute("value", `${furniture.price}`);
    pPrice.textContent = `${furniture.price/100} €`;

    let firstOption = document.createElement("option");
    firstOption.setAttribute("selected", "true");
    firstOption.textContent = `${furniture.varnish[0]}`;
    firstOption.addEventListener("click", () => {
        modifyCurrentOption(furniture.varnish[0])});

    let optionSelector = document.getElementById("optionSelector");
    optionSelector.appendChild(firstOption);

    // // if more than 1 option :
    for (let i =1; i < furniture.varnish.length; i++ ) {
        let nextOption = document.createElement("option");
        nextOption.textContent = `${furniture.varnish[i]}`;
        nextOption.addEventListener("click", () => {
            modifyCurrentOption(furniture.varnish[i])});

        optionSelector.appendChild(nextOption);
    }

    let btnAddToBasket = document.getElementById("addToBasketBtn");
    btnAddToBasket.addEventListener("click", addToBasket);

    let pDescription = document.getElementById("pDescription");
    pDescription.textContent = `${furniture.description}`;
}

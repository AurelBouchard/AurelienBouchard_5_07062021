

// ARTICLE.JS and ARTICLE.HTML :

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


// BASKET.JS and BASKET.HTML :

const addNewLineInListing = (index) => {

    let newLine = document.createElement("div");
    let hasNext = basket.articles[index+1] !== null;
    hasNext ? newLine.setAttribute("class","row border-bottom border-grey mr-3") :
        // different border-bottom if no line after
        newLine.setAttribute("class","row border-bottom border-dark mr-3");

    let article = document.createElement("p");
    article.setAttribute("class","mb-2 mt-4");

    // control
    //console.log(JSON.parse(localStorage.getItem(`article${index}`)));

    let spanTitre = document.createElement("span");
    spanTitre.textContent = basket.articles[index].title;

    let spanOption = document.createElement("span");
    spanOption.textContent = ", couleur du vernis : "+basket.articles[index].varnish;

    let spanPrice = document.createElement("span");
    spanPrice.setAttribute("class","d-inline-block float-right");
    spanPrice.textContent = basket.articles[index].price/100+" €";

    //updateSum(JSON.parse(localStorage.getItem(`article${index}`)).price/100, "plus");
    //listOfArticles.push(JSON.parse(localStorage.getItem(`article${index}`)).id);

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // introduction d'une erreur qui n'est pas "catch" dans la promesse
    //listOfArticles.push(JSON.parse(localStorage.getItem(`orinoco${index}`)).title);


    newLine.appendChild(article);
    article.appendChild(spanTitre);
    article.appendChild(spanOption);
    article.appendChild(spanPrice);

    return newLine;

};
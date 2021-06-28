

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

    let lineStyle = "col pl-0 mb-2 mt-4 col-auto";

    let colTitreOption = document.createElement("div");
    colTitreOption.setAttribute("class", lineStyle);
    colTitreOption.textContent = basket.articles[index].title+", couleur du vernis : "+basket.articles[index].varnish;

    let colPrice = document.createElement("div");
    colPrice.setAttribute("class",lineStyle);
    colPrice.textContent = basket.articles[index].price/100+" €";

    let colQuantity = document.createElement("div");
    colQuantity.setAttribute("class",lineStyle);
    colQuantity.textContent = "x "+basket.articles[index].quantity;

    let colBtn = document.createElement("div");
    colBtn.setAttribute("class","col p-3");

    let rowPlus = document.createElement("div");
    rowPlus.setAttribute("class","row");
    let plusBtn = document.createElement("i");
    plusBtn.setAttribute("class","far fa-plus-square ml-auto");
    plusBtn.addEventListener("click", function() {
        updateQuantityUp(basket, index);
        localStorage.setItem("basket", JSON.stringify(basket));
        refresh();} );

    let rowMinus = document.createElement("div");
    rowMinus.setAttribute("class","row");
    let minusBtn = document.createElement("i");
    minusBtn.setAttribute("class","far fa-minus-square ml-auto");
    minusBtn.addEventListener("click", function() {
        updateQuantityDown(basket, index);
        localStorage.setItem("basket", JSON.stringify(basket));
        refresh();} );




    newLine.appendChild(colTitreOption);
    newLine.appendChild(colPrice);
    newLine.appendChild(colQuantity);
    newLine.appendChild(colBtn);
    colBtn.appendChild(rowPlus);
    rowPlus.appendChild(plusBtn);
    colBtn.appendChild(rowMinus);
    rowMinus.appendChild(minusBtn);

    return newLine;

};

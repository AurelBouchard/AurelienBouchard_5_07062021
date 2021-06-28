// HOME.HTML

const createCard = (furniture) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "col-fluid col-md-5 m-auto");

    let cardLink = document.createElement("a");
    cardLink.setAttribute("href", `article.html?id=${furniture._id}`);
    cardLink.setAttribute("title", `${furniture.name} : ${furniture.varnish.length} variations`);
    cardLink.setAttribute("class", "text-decoration-none");

    let cardDiv =  document.createElement("div");
    cardDiv.setAttribute("class", "card furniture mb-5 shadow");

    let cardImg = document.createElement("img");
    cardImg.setAttribute("src",`${furniture.imageUrl}`)
    cardImg.setAttribute("class","card-img-top")
    cardImg.setAttribute("alt",`${furniture.name}`)

    let cardFooter = document.createElement("div");
    cardFooter.setAttribute("class","card-footer d-flex");

    let span1 = document.createElement("span");
    span1.setAttribute("class","h5 card-title d-inline-block");
    span1.textContent = `${furniture.name}`;

    let span2 = document.createElement("span");
    span2.setAttribute("class","h5 d-inline-block ml-auto price");
    span2.textContent = `${furniture.price/100} €`;

    newDiv.appendChild(cardLink);
    cardLink.appendChild(cardDiv);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardFooter);
    cardFooter.appendChild(span1);
    cardFooter.appendChild(span2);

    return newDiv;
}


// ARTICLE.HTML :

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
}

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


// BASKET.HTML :

const addNewLineInListing = index => {

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
}

const wrongInput = field => {
    let p = document.createElement("p");
    p.setAttribute("class", "w-100 alert alert-warning");
    p.setAttribute("role", "alert");
    p.textContent = "Attention "+field+" ne doit comporter que des lettres, tiret ou apostrophe.";
    return p}

const wrongEmail = () => {
    let p = document.createElement("p");
    p.setAttribute("class", "w-100 alert alert-warning");
    p.setAttribute("role", "alert");
    p.textContent = "Attention le format d'email n'est pas correcte.";
    return p;
}

function clearWrong() {
    // erase wrong input alerts
    let wrong = document.querySelectorAll(".alert");
    wrong.forEach(w => {w.remove()});
}

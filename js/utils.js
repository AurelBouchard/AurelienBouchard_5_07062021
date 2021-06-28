function getTheIdFromURL() {
    return (new URLSearchParams(document.location.search.substring(1))).get("id");
}

function refresh() {
    console.log("refresh after 80ms");
    setTimeout(function() {document.location.reload()},80);
}

function createBasketInLocalStorage() {
    console.log("createBasketInLocalStorage");
    const emptyBasket = {
        articles : [],
        data : {
            nOfArticles:0,
            totalPrice:0
        }
    }
    localStorage.setItem("basket", JSON.stringify(emptyBasket));

    console.log(localStorage.getItem("basket"));
}

function clearLocalStorageThenRefresh() {
    localStorage.clear();
    refresh();
}

function updateQuantityUp(currentBasket, indexInArticles) {
    console.log(currentBasket);
    console.log(indexInArticles);
    // update quantities
    currentBasket.articles[indexInArticles].quantity++;
    currentBasket.data.nOfArticles++;
    // update total price of basket
    currentBasket.data.totalPrice += currentBasket.articles[indexInArticles].price;
    console.log("new total price :");
    console.log(currentBasket.data.totalPrice);
}

function updateQuantityDown(currentBasket, indexInArticles) {
    // remove 1 article if articles[] is not empty
    if (currentBasket.articles[indexInArticles].quantity === 0) {return}
    // update quantities
    currentBasket.articles[indexInArticles].quantity--;
    currentBasket.data.nOfArticles--;
    // update total price of basket
    currentBasket.data.totalPrice -= currentBasket.articles[indexInArticles].price;
    console.log("new total price :");
    console.log(currentBasket.data.totalPrice);
}

function isOnlyText(text) {
    // pattern is ^[a-zA-Z\-'\ ]{1,40}$
    const pattern = /^[a-zA-Z\-'éèêö ]{1,40}$/;

    return pattern.test(text);
}

function isValidEmail(email) {
    // pattern is : ^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$
    const pattern = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$/;
    email = String(email).toLowerCase();

    return pattern.test(email);
}





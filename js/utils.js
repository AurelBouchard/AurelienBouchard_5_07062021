export function getTheIdFromURL() {
    return (new URLSearchParams(document.location.search.substring(1))).get("id");
}

export function refresh() {
    //console.log("refresh after 80ms");
    setTimeout(function() {document.location.reload()},0);
}

export function createBasketInLocalStorage() {
    //console.log("createBasketInLocalStorage");
    const emptyBasket = {
        articles : [],
        data : {
            nOfArticles:0,
            totalPrice:0
        }
    }
    localStorage.setItem("basket", JSON.stringify(emptyBasket));
}

export function clearLocalStorageThenRefresh() {
    localStorage.clear();
    refresh();
}

export function updateQuantityUp(currentBasket, indexInArticles) {
    // update quantities
    currentBasket.articles[indexInArticles].quantity++;
    currentBasket.data.nOfArticles++;
    // update total price of basket
    currentBasket.data.totalPrice += currentBasket.articles[indexInArticles].price;
}

export function updateQuantityDown(currentBasket, indexInArticles) {
    // remove 1 article if articles[] is not empty
    if (currentBasket.articles[indexInArticles].quantity === 0) {return}
    // update quantities
    currentBasket.articles[indexInArticles].quantity--;
    currentBasket.data.nOfArticles--;
    // update total price of basket
    currentBasket.data.totalPrice -= currentBasket.articles[indexInArticles].price;
}

export function isOnlyText(text) {
    // pattern is ^[a-zA-Z\-'éèêö ]{1,40}$
    const pattern = /^[a-zA-Z\-'éèêö ]{1,40}$/;
    return pattern.test(text);
}

export function isValidEmail(email) {
    // pattern is : ^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$
    const pattern = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$/;
    email = String(email).toLowerCase();
    return pattern.test(email);
}





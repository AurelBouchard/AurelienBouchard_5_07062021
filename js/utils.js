export function getTheIdFromURL() {
    return (new URLSearchParams(document.location.search.substring(1))).get("id");
}

export function refresh() {
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
    // remove 1 article ONLY if articles[] is not empty
    if (currentBasket.articles[indexInArticles].quantity === 0) {return}
    // update quantities
    currentBasket.articles[indexInArticles].quantity--;
    currentBasket.data.nOfArticles--;
    // update total price of basket
    currentBasket.data.totalPrice -= currentBasket.articles[indexInArticles].price;
}

export function isOnlyText(text) {
    // regex pattern is ^[a-zA-Z\-'éèêö ]{1,40}$
    const pattern = /^[a-zA-Z\-'éèêö ]{1,40}$/;
    return pattern.test(text);
}

export function isValidEmail(email) {
    // regex pattern is : ^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,}$
    // regex pattern by email-validator :
    // ^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$
    // allow too much kind of email
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9-]+[.]{1}[a-z]{2,10}$/;     // single domain name
    email = String(email).toLowerCase();
    return pattern.test(email);
}

export function alertMessage(message){
    alert("Une erreur s'est produite. Détails : "+message);
}





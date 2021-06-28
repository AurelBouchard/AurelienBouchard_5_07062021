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


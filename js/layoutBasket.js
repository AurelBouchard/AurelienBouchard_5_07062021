// BASKET.HTML :

import {updateQuantityUp, updateQuantityDown, refresh} from "./utils.js";

export const addNewLineInListing = (basket, index) => {

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

export const wrongInput = field => {
    let p = document.createElement("p");
    p.setAttribute("class", "w-100 alert alert-warning");
    p.setAttribute("role", "alert");
    p.textContent = "Attention "+field+" ne doit comporter que des lettres, tiret ou apostrophe.";
    return p}

export const wrongEmail = () => {
    let p = document.createElement("p");
    p.setAttribute("class", "w-100 alert alert-warning");
    p.setAttribute("role", "alert");
    p.textContent = "Attention le format d'email n'est pas correcte.";
    return p;
}

export function clearWrong() {
    // erase wrong input alerts
    let wrong = document.querySelectorAll(".alert");
    wrong.forEach(w => {w.remove()});
}
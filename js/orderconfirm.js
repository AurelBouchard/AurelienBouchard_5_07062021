import {port} from "./__config.js";

// if user come with no confirmOrder object in local storage => home.html
const isNoOrderConfirm = localStorage.getItem("orderConfirm") == null;

isNoOrderConfirm ? window.location = `http://localhost:${port}/pages/home.html` : createContent();

function createContent() {
	// getting data from localStorage
	const orderConfirm = JSON.parse(localStorage.getItem("orderConfirm"));

	const orderId = orderConfirm.orderId;
	const fullName = orderConfirm.contact.firstName +" "+orderConfirm.contact.lastName;
	const fullAddress = orderConfirm.contact.address +" "+orderConfirm.contact.city;


	const messageZone = document.getElementById("main");

	const messageLine1 = document.createElement("p");
	const messageLine2 = document.createElement("p");
	const messageLine3 = document.createElement("p");

	messageLine1.textContent = `Félicitation ${fullName}, votre commande est validée.`;
	messageLine2.textContent = `Elle porte le numero ${orderId}.`;
	messageLine3.textContent = `Elle vous sera livrée à l'adresse : ${fullAddress}`;

	messageZone.appendChild(messageLine1);
	messageZone.appendChild(messageLine2);
	messageZone.appendChild(messageLine3);

	setTimeout(function() {localStorage.clear()}, 500);
}
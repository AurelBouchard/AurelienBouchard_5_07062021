// common classes used by article.js and basket.js

export class Article {
	// _id, name and price must be "_id", "name" and "price" !! (same naming as backend object)
	constructor(_id, name, price, quantity, selectedOption){
		this._id		= _id;
		this.name		= name;
		this.price		= price;
		this.quantity	= quantity;
		this.selectedOption = selectedOption;
	}
}


export class Contact {
	// according to Class Order
	constructor(firstName, lastName, address, city, email) {
		this.firstName	= firstName;
		this.lastName	= lastName;
		this.address	= address;
		this.city		= city;
		this.email		= email;
	};
}


export class Order {
	// according to backend
	constructor(contact, products) {
		this.contact	= contact;
		this.products	= products;
	};
};




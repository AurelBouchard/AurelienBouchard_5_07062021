// common classes used by several js

export class Article {
	// _id & name must be "_id" & "name" !! (same naming as backend object)
	constructor(_id, name, selectedOption, price, quantity){
		this._id		= _id;
		this.name		= name;
		this.selectedOption = selectedOption;
		this.price		= price;
		this.quantity	= quantity;
	}
}


export class Contact {
	constructor(firstName, lastName, address, city, email) {
		this.firstName	= firstName;
		this.lastName	= lastName;
		this.address	= address;
		this.city		= city;
		this.email		= email;
	};
}


export class Order {
	constructor(contact, products) {
		this.contact	= contact;
		this.products	= products;
	};
};




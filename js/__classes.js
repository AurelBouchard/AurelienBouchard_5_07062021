// common classes used by several js

export class ArticleInBasket {
	constructor(id, title, varnish, price, imageUrl, quantity){
		this.id			= id;
		this.title		= title;
		this.varnish	= varnish;
		this.price		= price;
		this.imageUrl	= imageUrl;
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




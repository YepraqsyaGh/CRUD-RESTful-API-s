interface Product {
	id: string,
	name: string,
	description?: string,
	price?: number,
	category?: string,
	stock?: {
		available?: number,
		reserved?: number,
		location?: string
	},
	tags?: string[],
	rating?: number,
	deleted?: boolean
	manufacturer: {
		address: {
			street: string;
		}
	}
}

export default Product
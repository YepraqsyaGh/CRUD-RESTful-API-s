import path from "path"
import fs from "fs-extra"
import Product from "../../shared/types/Product";
import CustomError from "../../shared/types/CustomError";
import StatusCode from "../../shared/types/StatusCode";

const filePath = path.resolve(__dirname, '..', '..', 'products.json');

export const getAllProducts = async (query: string): Promise<Product[]> => {
	try {
		const packageObj = await fs.readJson(filePath);
		const products = packageObj.products.filter((product: Product) =>
			!product.deleted && product.name.toLowerCase().includes(query.toLowerCase())
		)

		if (!products || !products.length) {
			throw new CustomError("Not found products", StatusCode.NOT_FOUND)
		}

		return products;
	} catch (err) {
		console.error(err);
		throw new CustomError("Unable to receive the products", StatusCode.INTERNAL_SERVER_ERROR)
	}
};

export const addNewProduct = async (newProduct: Product): Promise<Product> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		packageObj.products.push({
			...newProduct,
			id: `${packageObj.products.length + 1}`,
			delete: false,
		});

		await fs.writeJson("src/products.json", packageObj)

		return packageObj.products[packageObj.products.length - 1]

	} catch (err) {
		console.error(err);
		throw new CustomError('Unable to add the new product', StatusCode.INTERNAL_SERVER_ERROR);
	}
};

export const updadeProductAddressById = async (id: string, newStreet: string): Promise<Product> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		let poductIndex = 0
		
		const products = packageObj.products.map((product: Product, index: number) => {
			if (product.id === id && !product.deleted) {
				poductIndex = index

				return {
					...product,
					address: {
						...product.manufacturer,
						address: {
							...product.manufacturer.address,
							street: newStreet,
						},

					}
				}
			}

			return product
		})

		await fs.writeJson("src/products.json", { products: products })

		return packageObj.products[poductIndex]
	} catch (err) {
		console.error(err);
		throw new CustomError('Unable to update product', StatusCode.INTERNAL_SERVER_ERROR);
	}
};

export const deleteProductById = async (id: string): Promise<void> => {
	try {
		const packageObj = await fs.readJson("src/products.json");

		const products = packageObj.products.map((product: Product) => {
			if (product.id === id && !product.deleted) {
				return {
					...product,
					deleted: true,
				}
			}

			return product
		})

		await fs.writeJson("src/products.json", { products: products })


	} catch (err) {
		console.error(err);
		throw new CustomError('Unable to delete product', StatusCode.INTERNAL_SERVER_ERROR);
	}
};
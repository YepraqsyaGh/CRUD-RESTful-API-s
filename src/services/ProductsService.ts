import fs from "fs-extra"
import Product from "../types/Product";
import CustomError from "../types/CustomError";
import path from "path"
import StatusCode from "../types/StatusCode";

const filePath = path.resolve(__dirname, '..', 'products.json');

export const getAllProducts = async (): Promise<Product[]> => {
	try {
		const packageObj = await fs.readJson(filePath);
		const products = packageObj.products.filter((product: Product) => !product.deleted)

		if (!products || !products.length) {
			throw new CustomError("Not found products", StatusCode.NOT_FOUND)
		}

		return products;
	} catch (err) {
		console.error(err);
		throw new CustomError("Unable to receive the products", StatusCode.INTERNAL_SERVER_ERROR)
	}
};

export const getProductById = async (id: string): Promise<Product> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		const product = packageObj.products.find((p: Product) => p.id === id && !p.deleted);

		if (!product) {
			throw new CustomError("Not found products", StatusCode.NOT_FOUND)
		}

		return product;

	} catch (err) {
		console.error(err);
		throw new CustomError("Unable to receive the product", StatusCode.INTERNAL_SERVER_ERROR)

	}
};

export const addNewProduct = async (newProduct: Product): Promise<void> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		packageObj.products.push({
			...newProduct,
			id: `${packageObj.products.length + 1}`,
			delete: false,
		});

		await fs.writeJson("src/products.json", packageObj)

	} catch (err) {
		console.error(err);
		throw new CustomError('Unable to add the new product', StatusCode.INTERNAL_SERVER_ERROR);
	}
};

export const updateProductById = async (id: string, changes: Product): Promise<void> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		const product = packageObj.products.find((p: Product) => p.id === id && !p.deleted);

		if (!product) {
			throw new CustomError("Not found products", StatusCode.NOT_FOUND)
		}


		const products = packageObj.products.map((product: Product) => {
			if (product.id === id && !product.deleted) {
				return {
					...product,
					...changes,
				}
			}

			return product
		})

		await fs.writeJson("src/products.json", { products: products })


	} catch (err) {
		console.error(err);
		throw new CustomError('Unable to update product', StatusCode.INTERNAL_SERVER_ERROR);
	}
};

export const deleteProductById = async (id: string): Promise<void> => {
	try {
		const packageObj = await fs.readJson("src/products.json");
		const product = packageObj.products.find((p: Product) => p.id === id && !p.deleted);

		if (!product) {
			throw new CustomError("Not found products", StatusCode.NOT_FOUND)
		}

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
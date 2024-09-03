import { Request, Response } from "express";
import {
	addNewProduct,
	deleteProductById,
	getAllProducts,
	getProductById,
	updateProductById
} from "../services/ProductsService";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await getAllProducts();

		res.json(products);
	} catch (error: any) {
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await getProductById(req.params.id);

		res.json(product);
	} catch (error: any) {
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		await addNewProduct(req.body);

		res.json({ message: 'Successfully added' });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		await updateProductById(req.params.id, req.body);

		res.json({ message: 'Successfully updated' });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		await deleteProductById(req.params.id);

		res.json({ message: 'Successfully deleted' });
	} catch (error: any) {
		res.status(error.statusCode).json({ message: error.message });
	}
};
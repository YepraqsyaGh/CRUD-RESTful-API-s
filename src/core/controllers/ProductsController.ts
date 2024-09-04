import { Request, Response } from "express";
import {
	addNewProduct,
	deleteProductById,
	getAllProducts,
	updadeProductAddressById
} from "../services/ProductsService";
import { CustomRequest } from "../../shared/types/CustomRequest";
import CustomError from "../../shared/types/CustomError";
import StatusCode from "../../shared/types/StatusCode";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
	try {		
		const query = req.query.q as string;
		const products = await getAllProducts(query);

		res.json(products);
	} catch (error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
		}
	}
};

export const getProduct = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		res.json(req.product);
	} catch (error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
		}
	}
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await addNewProduct(req.body);

		res.json(product);
	} catch (error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
		}
	}
};

export const updadeProductAddress = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await updadeProductAddressById(req.params.id, req.body.street);

		res.json(product);
	} catch (error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
		}
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		await deleteProductById(req.params.id);

		res.json({ message: 'Successfully deleted' });
	} catch (error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
		}
	}
};
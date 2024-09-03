import { Router, Request, Response } from "express";
import {
	getProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct
} from "../controllers/ProductsController";

import { productValidation } from "../utils/validations";
import handleValidationErrors from "../utils/handleValidationErrors";

const productsRoter: Router = Router();

productsRoter.get('/', getProducts)

productsRoter.get('/:id', getProduct)

productsRoter.post('/', productValidation, handleValidationErrors, addProduct)

productsRoter.put('/:id', updateProduct)

productsRoter.delete('/:id', deleteProduct)

export default productsRoter;
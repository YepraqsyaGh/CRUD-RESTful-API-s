import { Router } from "express";
import {
	getProducts,
	getProduct,
	addProduct,
	updadeProductAddress,
	deleteProduct
} from "../controllers/ProductsController";

import { productValidation } from "../../shared/utils/validations";
import handleValidationErrors from "../../shared/utils/handleValidationErrors";
import { checkProductExists } from "../middlewares/ProductMiddleware";

const productsRouter: Router = Router();

productsRouter.get('/', getProducts)

productsRouter.get('/:id', checkProductExists, getProduct)

productsRouter.post('/', productValidation, handleValidationErrors, addProduct)

productsRouter.patch('/:id', checkProductExists, updadeProductAddress)

productsRouter.delete('/:id', checkProductExists, deleteProduct)

export default productsRouter;
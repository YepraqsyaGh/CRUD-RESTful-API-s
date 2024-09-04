import { Response, NextFunction } from 'express';
import fs from 'fs-extra';
import path from "path"
import CustomError from '../../shared/types/CustomError';
import  Product from '../../shared/types/Product';
import StatusCode from '../../shared/types/StatusCode';
import { CustomRequest } from '../../shared/types/CustomRequest';

const filePath = path.resolve(__dirname, '..', '..', 'products.json');

export const checkProductExists = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const packageObj = await fs.readJson(filePath);

        const product = packageObj.products.find((p: Product) => p.id === id && !p.deleted);

        if (!product) {
            return next(new CustomError("Product not found", StatusCode.NOT_FOUND));
        }

        req.product = product;
        next();
    } catch (error) {
        return next(new CustomError("Error reading product data", StatusCode.INTERNAL_SERVER_ERROR));
    }
};


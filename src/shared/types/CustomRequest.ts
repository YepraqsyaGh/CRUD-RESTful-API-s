import { Request } from 'express';
import Product from './Product';

export interface CustomRequest extends Request {
    product?: Product;
}

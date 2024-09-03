import { body } from 'express-validator';

export const productValidation = [
    body('price', 'The price must be a positive').isFloat({ gt: 0 }),
    body('stock.available', 'The available must be a positive integer').isInt({ gt: 0 }),
  ];
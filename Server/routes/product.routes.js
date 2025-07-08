import express from 'express';
import { addNewProduct, getAllProduct } from '../controllers/product.controller.js';
import { isUserAuthenticated } from '../middlewares/user.middleware.js';

const router = express.Router();

// add new product
router.post('/newproduct', isUserAuthenticated, addNewProduct);

// get new product
router.get('/getproducts', isUserAuthenticated, getAllProduct);

export default router;
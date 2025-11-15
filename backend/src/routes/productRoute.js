import express from 'express'
import { createProduct, getProduct, getProductById } from '../controllers/productController.js'
import protect from '../middlewares/authMiddleware.js';
const router=express.Router();
import multer from 'multer';

const storage=multer.memoryStorage();
const upload=multer({storage});

router.get('/',getProduct);
router.get('/:id',getProductById)
router.post('/',protect,upload.single('image'),createProduct) //for admin with auth middleware
export default router;

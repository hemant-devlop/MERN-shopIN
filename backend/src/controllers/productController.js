import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/DataUri.js';
import Product from '../models/productSchema.js'

//get all products
export const getProduct = async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
}

//get product by id 
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(400).json({ message: 'product not found' });
        // console.log(product)
        res.status(200).json(product)
    } catch (error) {
        res.status.json({message:error.message})
    }
}

//Admin::create product by admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, brand, category } = req.body;
        let image = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const result = await cloudinary.uploader.upload(fileUri);
            image = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }
        const product = await Product.create({ name, description, price, brand, category, image, createdBy: req.user._id })
        res.status(201).json({ message: "product created", product })

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: error.message })
    }
}
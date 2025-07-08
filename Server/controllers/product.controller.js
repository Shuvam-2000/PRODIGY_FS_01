import Product from "../models/product.models.js";

// add product
export const addNewProduct = async (req,res) => {
    try {
        const { productName, productDescription, productPrice, productQuantity } = req.body

        if(!productName || 
            !productDescription || 
            !productPrice || 
            !productQuantity) return res.status(400).json({
                message: "All fields are required",
                success: false
            })

        // check if product already exists
        const productExists = await Product.findOne({ productName })

        if(productExists) return res.status(400).json({
            message: "Product Already Exists",
            success: false
        })

        // create new product
        const newProduct = await Product.create({
            productName,
            productDescription,
            productPrice,
            productQuantity
        })

        res.status(201).json({
            message: "Product Created SuccessFully",
            success: true,
            newProduct
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

// get all product
export const getAllProduct = async (req,res) => {
    try {
        const products = await Product.find();
        
        // if no product present
        if(!products) return res.status(400).json({
            message: "No Product Found",
            success: false
        })

        res.status(200).json({
            message: "Here are all the products",
            success: true,
            products    // get all products
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
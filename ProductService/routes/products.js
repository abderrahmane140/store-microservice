const express = require("express")

const {CreateProduct,
    getProduct,
    getProducts,
    deleteProducts,
    updateProduct
}=require('../controller/productsController')
const router = express.Router()

const Product =require("../models/productsModel")


//GET all products

router.get('/',getProducts)

//GET a single products 
router.get('/:id',getProduct)

//POST a new products
router.post('/',CreateProduct)

//DELETE a products
router.delete('/:id',deleteProducts)

//UPDATE a products
router.patch('/:id',updateProduct)

module.exports= router
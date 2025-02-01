require('dotenv').config();
const express = require('express')
const router = express.Router();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;


//create a product
router.post("/products", async (req, res) => {
    try{
        const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "products service is unavailable"})
    }
});

//get all the product
router.get("/products", async (req, res) => {
    try{
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "products service is unavailable"})
    }
});

//get the product by id
router.get("/products/:id", async (req, res) => {
    try{
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "products service is unavailable"})
    }
});

//update product
router.put("/products/:id", async (req, res) => {
    try{
        const response = await axios.put(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`,req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "products service is unavailable"})
    }
});

//delete a product
router.delete("/products/:id", async (req, res) => {
    try{
        const response = await axios.delete(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "products service is unavailable"})
    }
});

module.exports = router
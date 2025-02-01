require('dotenv').config();
const axios = require('axios')
const express = require('express')
const router = express.Router()

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

//create the order
router.post("/orders", async (req, res) => {
    try{
        const response = await axios.post(`${ORDER_SERVICE_URL}/api/order`, req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//get all the order
router.get("/order", async (req, res) => {
    try{
        const response = await axios.get(`${ORDER_SERVICE_URL}/api/order`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//get the order by id
router.get("/order/:id", async (req, res) => {
    try{
        const response = await axios.get(`${ORDER_SERVICE_URL}/api/order/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//update order
router.patch("/order/:id", async (req, res) => {
    try{
        const response = await axios.patch(`${ORDER_SERVICE_URL}/api/order/${req.params.id}`,req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//delete a order
router.delete("/order/:id", async (req, res) => {
    try{
        const response = await axios.delete(`${ORDER_SERVICE_URL}/api/order/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

module.exports = router
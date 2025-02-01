require('dotenv').config();
const axios = require('axios')
const express = require('express')
const router = express.Router()

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

//create the order
router.post("/orders", async (req, res) => {
    try{
        const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//get all the order
router.get("/orders", async (req, res) => {
    try{
        const response = await axios.get(`${ORDER_SERVICE_URL}/orders`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//get the order by id
router.get("/order/:id", async (req, res) => {
    try{
        const response = await axios.get(`${ORDER_SERVICE_URL}/orders/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//update order
router.put("/order/:id", async (req, res) => {
    try{
        const response = await axios.put(`${ORDER_SERVICE_URL}/orders/${req.params.id}`,req.body);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

//delete a order
router.delete("/order/:id", async (req, res) => {
    try{
        const response = await axios.delete(`${ORDER_SERVICE_URL}/orders/${req.params.id}`);
        res.json(response.data);
    }catch(error){
        res.status(500).json({error: "Order service is unavailable"})
    }
});

const { 
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder
 } = require('../Controller/order')
const express = require('express')

const router = express.Router()

//POST a new order
router.post('/', createOrder)

//Get all orders
router.get('/', getOrder);

//GET a single order
router.get('/:id', getOrderById);

//DELETE a order
router.delete('/:id', deleteOrder);

//UPDATE a order
router.patch('/:id', updateOrder)


module.exports = router
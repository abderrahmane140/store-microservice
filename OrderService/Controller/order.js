const { requestProductPrice } = require('../broker/orderProducer');
const Order = require('../model/order.Model');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../redisClient'); // Redis client

const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Map product IDs from the items
    const productIds = items.map(item => item.productId);

    // Generate a unique order ID
    const orderId = uuidv4();

    // Request product prices (sends request via Kafka)
    await requestProductPrice(productIds, orderId);

    // Poll Redis for the cached prices
    const checkCache = async () => {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const cachedPrices = await redisClient.get(orderId);

          if (cachedPrices) {
            clearInterval(interval); // Stop polling once data is found
            resolve(JSON.parse(cachedPrices));
          }
        }, 500); // Poll every 500ms
      });
    };

    // Wait for the cached prices to be available
    const prices = await checkCache();
    items.forEach(item => {
        const productPrice = prices.find(price => price.productId.toString() === item.productId.toString());
        if (!productPrice) {
            throw new Error(`Price not found for product ID: ${item.productId}`);
        }
        item.unitPrice = productPrice.price;
    });
    
    // Calculate the total price
    const totalPrice = items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    
    // Create and save the order
    const order = new Order({ userId, items, totalPrice });
    await order.save();
    
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

// Other order-related functions remain unchanged
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrder, getOrderById, updateOrder, deleteOrder,createOrder };

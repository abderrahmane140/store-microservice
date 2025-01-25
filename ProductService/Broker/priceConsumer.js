require('dotenv').config();
const { Kafka } = require('kafkajs');
const Product = require('../models/productsModel');
const mongoose = require('mongoose');

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(','),
});

const consumer = kafka.consumer({ groupId: 'order-group-1' });
const producer = kafka.producer();

async function run() {
    try {
        // Connect to the database if not already connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB.');
        }

        await consumer.connect();
        await producer.connect();
        console.log('Kafka consumer and producer connected.');

        await consumer.subscribe({ topic: 'order-price-request', fromBeginning: false });
        console.log('Subscribed to order-price-request topic.');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { productIds, orderId } = JSON.parse(message.value.toString());
                console.log(`Received message: ${JSON.stringify({ productIds, orderId })}`);

                try {
                    const prices = await Promise.all(
                        productIds.map(async (id) => {
                            try {
                                const product = await Product.findById(id);
                                if (product && product.price) {
                                    return { productId: id, price: product.price };
                                } else {
                                    console.warn(`Product ${id} not found or has no price`);
                                    return null;
                                }
                            } catch (error) {
                                console.error(`Error fetching product ${id}:`, error);
                                return null;
                            }
                        })
                    );

                    const validPrices = prices.filter((price) => price !== null);
                    console.log(`Prices fetched for order ${orderId}: ${JSON.stringify(validPrices)}`);

                    const response = { orderId, prices: validPrices };

                    await producer.send({
                        topic: 'product-price-response',
                        messages: [{ key: orderId.toString(), value: JSON.stringify(response) }],
                    });

                    console.log('Price response sent for order:', response);
                } catch (error) {
                    console.error('Error processing request:', error);
                }
            },
        });
    } catch (error) {
        console.error('Error connecting Kafka consumer/producer:', error);
    }
}

run().catch(console.error);

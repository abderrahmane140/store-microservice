require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(','),
});

const producer = kafka.producer();

async function requestProductPrice(productIds, orderId) {
    const message = {
        orderId,
        productIds,
    };

    try {
        await producer.connect();
        await producer.send({
            topic: 'order-price-request',
            messages: [{ key: 'price-request', value: JSON.stringify(message) }],
        });
        console.log('Price request sent for order:', orderId);
    } catch (error) {
        console.error('Error sending price request:', error);
    } finally {
        await producer.disconnect();
    }
}

module.exports = { requestProductPrice };

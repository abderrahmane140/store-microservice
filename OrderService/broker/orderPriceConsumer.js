const redisClient = require('../redisClient');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(','),
});
const consumer = kafka.consumer({ groupId: 'order-group-2' });

async function run() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'product-price-response', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const response = JSON.parse(message.value.toString());
                console.log('Received price response:', response);

                // Cache the prices in Redis with a TTL (e.g., 1 hour)
                const ttlInSeconds = 3600;
                await redisClient.setEx(response.orderId, ttlInSeconds, JSON.stringify(response.prices));
                console.log('Cached prices in Redis for order:', response.orderId);
            },
        });
    } catch (error) {
        console.error('Error in consumer:', error);
    }
}
run()
module.exports = { run };

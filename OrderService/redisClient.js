require('dotenv').config();
const { createClient } = require('redis');

// Create Redis client
const redisClient = createClient({
    username: 'default', // Default username for Redis
    password: process.env.REDIS_PASSWORD, // Add only if Redis requires authentication
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

// Error handling
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

// Export Redis client
module.exports = redisClient;

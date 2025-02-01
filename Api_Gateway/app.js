require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger');
const authenticate = require('./middlewares/authenticate')

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/', authenticate, require('./routes/Product'));
app.use('/api/',authenticate, require('./routes/Order'));



app.listen(process.env.PORT, () => {
    console.log("API Gateway running on port", process.env.PORT);
});
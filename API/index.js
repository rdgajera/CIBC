const MongoClient = require("mongoose");
const url = "mongodb://localhost:27017/transactions";
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const transactionRoutes = require('./routes/transactions');


// MongoDB connection
MongoClient.connect(url, {
}).then(() => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
});


// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to sanitize inputs
app.use(mongoSanitize());

app.use(cors());

// Routes
app.use('/transactions', transactionRoutes);


// Start the server
app.listen(3000, () => {
    try {
        console.log("server connected");
    } catch (error) {
        console.log(error.errorResponse.errmsg);
    }
})
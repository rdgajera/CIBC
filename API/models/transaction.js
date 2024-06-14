const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: Number,
    sender: {
        firstName: String,
        lastName: String,
        dateOfBirth: String,
        IDNumber: String,
    },
    recipient: {
        firstName: String,
        lastName: String,
        email: String,
        accountNumber: String,
        bank: String,
    },
    Amount: Number,
    CurrencyCd: String,
    Comments: String,
    status: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
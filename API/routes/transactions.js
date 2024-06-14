const express = require('express');
const MongoClient = require("mongoose");
const router = express.Router();
const Transaction = require('../models/transaction');


// Load initial data from a JSON file into the database
router.post('/load', async (req, res) => {
    const transactionsData = require('../data/transactions.json');

    try {
        await Transaction.insertMany(transactionsData);
        res.status(201).json({ message: 'Data loaded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET All transactions within a date range
router.get('/', async (req, res) => {
    // const { startDate, endDate } = req.query;

    try {
        let transactions = await Transaction.find({
            // date: { $gte: new Date(startDate).getTime(), $lte: new Date(endDate).getTime() },
            status: { $in: ["COMPLETED", "IN PROGRESS", "REJECTED"] }
        }).sort({ date: 1 });
        transactions = transactions.map(transaction => ({ ...transaction._doc, date: formatDate(transaction.date) }));
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT route to update comments of a transaction
router.put('/', async (req, res) => {
    const { id } = req.query;
    const { comments } = req.body;
    try {
        // Convert id to ObjectId
        const objectId = new MongoClient.Types.ObjectId(id);

        // Update only the Comments field
        const updates = { Comments: comments };

        const transaction = await Transaction.findByIdAndUpdate(
            objectId,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({...transaction._doc, date: formatDate(transaction.date)});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



/**
 * Added Extra by me to complete the CRUD
 * very basic but will need to be changed in furture
 */

// Create a new transaction
router.post('', async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.body);
        if (!transaction) {
            return res.status(404).send();
        }
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

const formatDate = (timestamp) => {
    const date = new Date(timestamp); const day = String(date.getDate()).padStart(2, '0'); const month = String(date.getMonth() + 1).padStart(2, '0');
    year = date.getFullYear(); return `${day}/${month}/${year}`;
};

module.exports = router;
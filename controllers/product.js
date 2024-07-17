const productRouter = require('express').Router();
const Product = require('../models/producto/producto.model');

productRouter.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch {
        res.status(500).json({ message: error.message })
    }
});


productRouter.get('/', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch {
        res.status(500).json({ message: error.message })
    }
});

module.exports = productRouter; 
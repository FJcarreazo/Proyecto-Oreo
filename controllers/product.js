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

productRouter.delete('/delete', async (request, response) => {
    const deleteProduct = await Product.deleteOne({ _id: request.body.id });
    if (!deleteProduct) {
      return response.status(500).json({ error: 'No se pudo eliminar el producto' });
    }
    return response.status(200).json('Producto eliminado');
});

module.exports = productRouter; 
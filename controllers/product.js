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

productRouter.patch('/update', async (request, response) => {
    const updateParams = {
        name: request.body.name,
        quantity: request.body.quantity,
        description: request.body.description,
        price: request.body.price
    }
    const updateProduct = await Product.findByIdAndUpdate(request.body.id, updateParams, { new: true});
    if (updateProduct) {
        return response.status(500).json({ error: 'No se ha podido actualizar el producto'});
    }
    return response.status(201).json(updateProduct);
});




module.exports = productRouter; 
const productRouter = require('express').Router();
const Product = require('../models/producto/producto.model');
const { CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET, FOLDER_NAME } = require('../config');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: FOLDER_NAME,
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

const removeImage = (urlImage) => {
    if (urlImage) {
        const url = urlImage.split('/');
        const image = url[url.length - 1].split('.');
        cloudinary.uploader
            .destroy(FOLDER_NAME + '/' + image[0])
            .then(() => (true))
            .catch(() => (false));
    }
}

const upload = multer({ storage });

productRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        }
        if (req.file) data.image = req.file.path;

        const product = await Product.create(data);
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

productRouter.delete('/:id', async (request, response) => {
    try {
        const product = await Product.findOne({ '_id': request.params.id });
        if (!product) {
            return response.status(400).json({ error: 'No existe el producto' });
        }
        if (product.image) removeImage(product.image);

        const deleteProduct = await Product.deleteOne({ _id: request.params.id });
        if (!deleteProduct) {
            return response.status(400).json({ error: 'No se pudo eliminar el producto' });
        }
        return response.status(200).json('Producto eliminado');
    } catch (e) {
        console.error(e);
        return response.status(500).json(e);
    }
});

productRouter.patch('/', upload.single('image'), async (request, response) => {
    const product = await Product.findOne({ '_id': request.body.id });
    if (!product) {
        return response.status(400).json({ error: 'No existe el producto' });
    }
    try {
        if (request.file && product.image) removeImage(product.image);
        if (request.file) product.image = request.file.path;
        product.name = request.body.name;
        product.description = request.body.description;
        product.price = request.body.price;
        product.quantity = request.body.quantity;

        const updateProduct = await product.save();
        return response.status(200).json(updateProduct);
    } catch (e) {
        console.error(e);
        return response.status(500).json(e);
    }
});




module.exports = productRouter; 
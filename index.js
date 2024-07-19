const app = require('./app');
const http = require('http');
//const Product = require('./models/producto/producto.model');


const server = http.createServer(app);

/* app.post('/endpoint/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log(req)
        res.status(200).json(product);
    } catch {
        res.status(500).json({message: error.message})
    }
}) */

server.listen(3003, () => {
    console.log('Running in http://localhost:3003');
})
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const productRouter = require('./controllers/product');
const cartRouter = require('./controllers/carrito');
const { MONGO_URI, MONGO_DEBUG } = require('./config');
const imageRouter = require('./controllers/image');

(async () => {

    try {
        mongoose.set('debug', MONGO_DEBUG);
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})();
//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());


//Rutas frontend
app.use('/', express.static(path.resolve('views', 'login')));
app.use('/style', express.static(path.resolve('views', 'style')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/signin', express.static(path.resolve('views', 'home')));
app.use('/inicio', express.static(path.resolve('views', 'inicio')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/create', express.static(path.resolve('views', 'create')));
app.use('/agendarProducto', express.static(path.resolve('views', 'agendarProducto')));

app.use('/admin/users', express.static(path.resolve('views', 'userlist')));
app.use('/admin/products', express.static(path.resolve('views', 'productList')));





app.use(morgan('tiny'));
//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/products', productRouter);
app.use('/api/image', imageRouter);
app.use('/api/cart', cartRouter);
app.use('/api/logout', logoutRouter);
app.use('/endpoint/products', productRouter);

module.exports = app;
const PAGE_URL = process.env.NODE_ENV === 'production'
    ? 'https://proyecto-oreo.onrender.com'
    : 'http://localhost:3003';

const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST

const MONGO_DEBUG = process.env.MONGO_DEBUG || false;



module.exports = { PAGE_URL, MONGO_URI, MONGO_DEBUG };
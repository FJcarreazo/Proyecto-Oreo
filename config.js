const PAGE_URL = process.env.NODE_ENV === 'production'
    ? 'https://proyecto-oreo.onrender.com'
    : 'http://localhost:3003';

const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST

const MONGO_DEBUG = process.env.MONGO_DEBUG || false;
const CLOUD_NAME = process.env.CLOUD_NAME || false;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || false;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || false;
const FOLDER_NAME = process.env.FOLDER_NAME || false;



module.exports = {
    PAGE_URL,
    MONGO_URI,
    MONGO_DEBUG,
    CLOUD_NAME,
    CLOUDINARY_KEY,
    CLOUDINARY_SECRET,
    FOLDER_NAME,
};
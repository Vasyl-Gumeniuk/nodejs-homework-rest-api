const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const upload = require('./upload');
const resizeImage = require('./resizeImage');

module.exports = {
    validateBody,
    authenticate,
    upload,
    resizeImage,
}
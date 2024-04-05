const jwt = require('jsonwebtoken');
const responseFormatter = require('../utils/responseFormatter')
const secretKey = 'aexonic'; // Replace with your secret key used for signing JWT

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const bearerToken = req.headers['authorization'];
        // Check if token is not provided
        if (!bearerToken) {
            return res.status(400).json(responseFormatter.responseFormatter({}, 'Token is not provided.', 'bad request', 400));
        }
        const token = bearerToken.split(' ')[1]
        // Verify token using secret key
        const decoded = jwt.verify(token, secretKey);
        if (!decoded)  return res.status(401).json(responseFormatter.responseFormatter({}, 'Invalid auhorization token.', 'bad request', 401));         
        // Attach decoded user data to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Token is invalid
        // console.log(error);
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server error.', 'error', 500));
    }
};

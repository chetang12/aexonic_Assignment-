
const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const authMiddleware = require('../middlewares/authMiddleware'); // To validate token
const validator = require('../middlewares/validators');
const userRegisterSchema = require('../validators/validateRegister')
const loginSchema = require('../validators/validateLogin')
const getAllUsersSchema = require('../validators/validateGetAllUsers')
const searchUsersSchema = require('../validators/validateGetAllUsers')
const updateUserSchema = require('../validators/validateUpdateUser')

// Registration API
router.post('/user/register', validator(userRegisterSchema), appController.registerUser);

// Login API
router.post('/user/login', validator(loginSchema), appController.loginUser);

router.use(authMiddleware.verifyToken)

// List all users with pagination
router.get('/users', validator(getAllUsersSchema), appController.getAllUsers);

// Update user details
router.put('/user', validator(updateUserSchema), appController.updateUser);

// Search users
router.get('/users/search', validator(searchUsersSchema), appController.searchUsers);

module.exports = router;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/models');

const saltRounds = 10;
const secretKey = 'aexonic'; // Replace with a secure key

const responseFormatter = require('../utils/responseFormatter');

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNo, address } = req.body;
        const isUserAlreadyExist = await User.findOne({ email: email }, {}, { lean: true });
        if (isUserAlreadyExist) return res.status(400).json(responseFormatter.responseFormatter({}, 'User already exist.', 'bad request', 400))
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, mobileNo, address });
        return res.status(201).json(responseFormatter.responseFormatter(user, 'User registeration successfull', 'success', 201));
    } catch (error) {
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server Error', 'error', 500));
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, {}, { lean: true });
        if (!user) return res.status(404).json(responseFormatter.responseFormatter({}, 'User not found', 'bad request', 404));
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json(responseFormatter.responseFormatter({}, 'Invalid Credentials', 'bad request', 400));
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json(responseFormatter.responseFormatter(token, 'Logged in successfull', 'success', 200));
    } catch (error) {
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server Error', 'error', 500));
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const users = await User.find().skip(skip).limit(limit);
        return res.status(200).json(responseFormatter.responseFormatter(users, 'Users fetched successfull', 'success', 200));
    } catch (error) {
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server Error', 'error', 500));
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.user; // from token
        const user = await User.findById(userId, {}, { lean: true });
        if (!user) return res.status(404).json(responseFormatter.responseFormatter({}, 'No such user', 'bad request', 404));
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { lean: true, new: true });
        return res.status(200).json(responseFormatter.responseFormatter(updatedUser, 'User updated successfully', 'success', 200));
    } catch (error) {
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server Error', 'error', 500));
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const { searchText, skip, limit } = req.query;

        const regex = new RegExp(searchText.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'gi');

        const users = await User.aggregate([
            {
                $match: {
                    $or:
                        [
                            { firstName: regex },
                            { lastName: regex },
                            { email: regex },
                            { mobileNo: regex }
                        ]
                }
            },
            {
                $skip: Number(skip)
            },
            {
                $limit: Number(limit)
            }
        ]);
        console.log(users);
        return res.status(200).json(responseFormatter.responseFormatter(users, 'Users fetched successfully', 'success', 200));
    } catch (error) {
        // console.log(error);
        return res.status(500).json(responseFormatter.responseFormatter({}, 'Internal Server Error', 'error', 500));
    }
};

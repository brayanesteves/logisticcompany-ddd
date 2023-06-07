const User                = require('../models/mongodb/users');
const jwt                 = require('jsonwebtoken');
const asyncHandler        = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token) {
                const decoded = jwt.verify(token, "brayanesteveshalconbit");
                const user = await User.findById(decoded.id);
                req.user = user;
                next();
            }
        } catch(error) {
            throw new Error('Not Authorized token expired. Please Login again.');
        }
    } else {
        throw new Error('There is no token attached to header');
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const  { email } = req.user;
    const adminUser = await User.findOne({ email });
    if(adminUser.role !== "admin") {
        throw new Error('You are not an admin');
    } else {
        next();
    }
});

const isEmployee = asyncHandler(async (req, res, next) => {
    const  { email } = req.user;
    const adminUser = await User.findOne({ email });
    if(adminUser.role !== "employee") {
        throw new Error('You are not an employee');
    } else {
        next();
    }
});

const isAdminEmployee = asyncHandler(async (req, res, next) => {
    const  { email } = req.user;
    const adminUser = await User.findOne({ email });
    console.log(adminUser.role.startsWith('employee'));
    console.log(adminUser.role);
    if(adminUser.role.startsWith('admin') || adminUser.role.startsWith('employee')) {
        next();
    } else {
        throw new Error('You are not an admin or employee');
    }
});

module.exports = { authMiddleware, isAdmin, isEmployee, isAdminEmployee };
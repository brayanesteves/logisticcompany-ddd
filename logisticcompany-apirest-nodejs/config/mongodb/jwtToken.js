const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, "brayanesteveshalconbit", { expiresIn:"1d" });
};

module.exports = { generateToken };
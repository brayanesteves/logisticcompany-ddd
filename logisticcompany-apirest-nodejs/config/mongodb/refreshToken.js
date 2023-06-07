const jwt = require("jsonwebtoken");
const generateRefeshToken = (id) => {
    return jwt.sign({ id }, "brayanesteveshalconbit", { expiresIn:"3d" });
};

module.exports = { generateRefeshToken };
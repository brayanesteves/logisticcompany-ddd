const jwt = require('jsonwebtoken');

/**
 * Generate token
 * @param {*} user 
 */
const tokenSign   = async(user) => {
    return jwt.sign({
         _id: user._id,
        role: user.role
    }, 
    /**
     * Payload, Charge util
     */
    process.env.JWT_SECRET,
    {
        /**
         * Time health
         */
        expiresIn: "2h"
    });
};

const verifyToken = async(token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
        return null;
    }
};

const decodeSign  = (token) => {

};

module.exports = { tokenSign, decodeSign, verifyToken };
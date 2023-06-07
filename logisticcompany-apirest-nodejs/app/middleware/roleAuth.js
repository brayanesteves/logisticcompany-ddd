const { verifyToken } = require('../helpers/generateToken');
const userModel       = require('../models/mongodb/users');

const checkRoleAuth = (roles) => async(req, res, next) => {
    try {
        const token     = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const userData  = await userModel.findById(tokenData._id);

        /**
         * ['admin'].includes('user')
         */
        if([].concat(roles).includes(userData.UsrTyp_Rfrnc)) {
            next();
        } else {
            res.status(409);
            res.send({ error: "Not permissions" });
        }
    } catch(e) {
        console.log(e);
        res.status(409);
        res.send({ error: "Stop user" });
    }
};

module.exports = checkRoleAuth;
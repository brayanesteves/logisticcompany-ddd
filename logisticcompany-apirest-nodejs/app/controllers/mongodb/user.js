const { generateToken }       = require('../../../config/mongodb/jwtToken');
const User                    = require('../../models/mongodb/users');
const asyncHandler            = require("express-async-handler");
const { validateMongDbId }    = require('../../utils/validateMongodbId');
const { generateRefeshToken } = require('../../../config/mongodb/refreshToken');
const crypto                  = require("crypto");
const jwt                     = require("jsonwebtoken");
const { sendEmail }           = require("./email");

const createUserSingle = async (req, res) => {
    const email    = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        res.json({ message:"User Already Exists.", success:false });
    }
};

const createUser = asyncHandler(async (req, res) => {
    const email    = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists.");
    }
});

const loginUserCtrl = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    // Check if 'user' exists or not
    const findUser = await User.findOne({ email });
    if(findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefeshToken(findUser?._id);
        const updateuser   = await User.findByIdAndUpdate(findUser.id,  {
            refreshToken:refreshToken,
        }, {
            new:true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.json({
                  _id:findUser?._id,
            firstname:findUser?.firstname,
             lastname:findUser?.lastname,
                email:findUser?.email,
               mobile:findUser?.mobile,
                token:generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials.");
    }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) {
        throw new Error('No Refresh Token in Cookies.');
    }
    const refreshToken = cookie.refreshToken;
    const user         = await User.findOne({ refreshToken });
    if(!user) {
        throw new Error('No Refresh Token present in "DB" or not matched.');
    }
    jwt.verify(refreshToken, "brayanesteveshalconbit", (err, decoded) => {
        if(err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token.');
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

// Logout functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;    
    if(!cookie?.refreshToken) {
        throw new Error('No Refresh Token in Cookies.');
    }
    const refreshToken = cookie.refreshToken;    
    const user         = await User.findOne({ refreshToken });    
    if(!user) {
        res.clearCookie('refreshToken', {
            httpOnly:true,
              secure:true,
        });
        // Forbidden
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken:"",
    });
    res.clearCookie('refreshToken', {
        httpOnly:true,
          secure:true,
    });
    // Forbidden
    return res.sendStatus(204);
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error) {
        throw new Error(error);
    }
});

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongDbId(_id);
    const { firstname, lastname, email, mobile } = req.body;
    try {
        const user = await User.findByIdAndUpdate(_id, {
            firstname:firstname, 
             lastname:lastname, 
                email:email, 
               mobile:mobile,
        },
        {
            new:true,
        });
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findById(id);
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndDelete(id);
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked:true,
        },
        {
            new:true,
        });
        res.json({
            meesage:`User ${user.firstname}. ${user.lastname} - Blocked`,
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked:false,
        },
        {
            new:true,
        });
        res.json({
            meesage:`User ${user.firstname}. ${user.lastname} - Unblocked`,
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id }      = req.user;
    const { password } = req.body;
    validateMongDbId(_id);
    try {
        const user = await User.findById(_id);
        if(password) {
            user.password = password;
            const updatedPassword = await user.save();
            res.json({
                meesage:`Updated Password`,
                updatedPassword,
            });
        } else {
            res.json({
                user
            });
        }        
    } catch(error) {
        throw new Error(error);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user      = await User.findOne({ email });
    if (!user){ 
        throw new Error("User not found with this email");
    }
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here</>`;
      const data     = {
             to: email,
           text: "Hey User",
        subject: "Forgot Password Link",
            htm: resetURL,
      };
      sendEmail({
        message:"Password updated succesfully",
        data
      });
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token }    = req.params;
    const hashedToken  = crypto.createHash("sha256").update(token).digest("hex");
    
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user){
        throw new Error(" Token Expired, Please try again later");
    }

    user.password             = password;
    user.passwordResetToken   = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({
        message:"Reset Password succesfully",
        user
    });
});
  

module.exports = { createUserSingle, createUser, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword };
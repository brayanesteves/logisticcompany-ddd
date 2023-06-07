const mongoose = require("mongoose");
const bcrypt   = require('bcrypt');
const crypto   = require("crypto");

const userSchema = new mongoose.Schema({
    firstname: {
            type:String,
        required:true,
    },
    lastname: {
            type:String,
        required:true,
    },
    email: {
            type:String,
        required:true,
          unique:true,
    },
    mobile: {
            type:String,
        required:true,
          unique:true,
    },
    password: {
            type:String,
        required:true,        
    },
    role: {
           type:String,
        default:"user"
    },
    isBlocked: {
           type:Boolean,
        default:false,
    },
    address: [{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Address"
    }],
    refreshToken: {
        type:String,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps:true
});

/**
 * It's for create 'user' encrypt 'password'
 */
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt    = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * It's for login, compare password
 */
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function() {
    const resetToken          = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken   = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
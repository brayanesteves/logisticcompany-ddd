const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    trackingNumber: {
            type: String,
        required: true,
    },
    currentLocation: {
            type: String,
        required: true,
    },
    status: {
        /**
         * 1) in transit   = en tránsito
         * 2) in warehouse = en bodega
         * 3) delivered    = entregado
         */
            type: String,
         default: 'in transit'
    },
    locationHistory: [{
        location: String,
        date: { type: Date, default: Date.now }
    }],
    deliveryDate: {
        type: Date,
    required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    action: {
        type:String,
     default:"created",
    },
    sendEmail: {
        type:String,
     default:"pending",
    },
    sendSMS: {
        type:String,
     default:"pending",
    },
});

module.exports = mongoose.model("PackageHistory", packageSchema);
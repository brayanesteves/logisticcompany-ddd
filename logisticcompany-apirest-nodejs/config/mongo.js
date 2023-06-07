const mongoose = require('mongoose');

const dbConnect_MongoDB = () => {
    const DB_URI_MONGODB = process.env.DB_URI_MONGODB;
    mongoose.connect(DB_URI_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if(!err) {
            console.log('==== CONNECT SUCCESSFUL ====');
        } else {
            console.error('==== ERROR CONNECT ====');
        }
    });
};

module.exports = { dbConnect_MongoDB };
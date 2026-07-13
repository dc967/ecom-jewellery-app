const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb id connect");
    } catch (error) {
         console.log("Mongo DB connection id failed", error.message);
         process.exit(1);
    }
}

module.exports = connectDB;
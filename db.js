const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGODB_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log("[SERVER] DB Connection Sucessful...")
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;
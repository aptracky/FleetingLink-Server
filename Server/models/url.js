const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    code: {
        required: true,
        unique: true,
        type: String
    }, 
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', urlSchema);
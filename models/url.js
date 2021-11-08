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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

urlSchema.index({createdAt: 1},{expireAfterSeconds: 2592000});

module.exports = mongoose.model('Url', urlSchema);
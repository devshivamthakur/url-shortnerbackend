const mongoose = require('mongoose');

const urlInfoSchema = new mongoose.Schema({
    redirectURL: {
        required: true,
        unique: true,
        type: String
    },
    shortId: {
        required: true,
        unique: true,
        type: String
    },
    urlHistory: [{
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
},{
    timestamps: true,
});

module.exports = mongoose.model('UrlInfo', urlInfoSchema);

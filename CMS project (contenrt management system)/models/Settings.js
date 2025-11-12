const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    website_title: {
        type: String,
        required: true,
        default: 'CMS Website'
    },
    website_logo: {
        type: String,
        required: false
    },
    footer_description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);

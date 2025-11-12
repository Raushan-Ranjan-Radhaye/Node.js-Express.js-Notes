const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    first_name: {
        type: String,
        // required: true
    },
    last_name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    }
})

const contact = mongoose.model('Contact', contactSchema)

module.exports = contact// contact varible ko ham expoort kar  rahi hai aur kisi aur file se conatct variable ko import kar ke isks use hoga

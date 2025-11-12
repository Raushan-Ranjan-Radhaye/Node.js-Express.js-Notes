const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,// data jo fill hoga wo string hoga
        required: true,// ye field required hoga
        unique: true//sab user ka username alaga hoga
    },
    
    userpassword: {
        type: String,// data jo fill hoga wo string hoga
        required: true// ye field required hoga
    }
});

const User = mongoose.model('User', userSchema);//yaha se ham isko export kare rahi hai jo duesa file se import hoga (User varible)

module.exports = User;


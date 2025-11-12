const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum:['author', 'admin'],
    required: true,
    default:'author',
  }
});

userSchema.pre('save', async function(next){// pre ka matlab hai ki save hone se pahale
    if(this.isModified('password')){// passwors ko hash kar ke encrypt kar dega
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

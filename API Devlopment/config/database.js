const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()//now we are used the dotenv

const connectDB =() =>{mongoose.connect(process.env.MONGO_URL)// iska patha database ka env file me hai jiska vairble ka use ham kar rahi hai
  .then(() => {console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
}

module.exports = connectDB





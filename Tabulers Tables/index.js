const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users.model');

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

//Connect MongoDb
mongoose.connect('mongodb://127.0.0.1:27017/users_demo')
.then(()=>{console.log("MongoDB Connected")})
.catch((err) => {console.error("MongoDB connection error:", err)})

//Get all Users
app.get('/api/users', async (req, res)=>{
    const users = await User.find();
    res.json({data:users});
});

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})


// see the veido on  (31) to setup all
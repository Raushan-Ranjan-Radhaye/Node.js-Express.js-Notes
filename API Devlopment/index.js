const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students.routes');
const connectDB = require('./config/database')
const {MulterError} = require('multer')
const path = require('path')
const auth = require('./middleware/auth')// ham yaha par path dekar jo export kiya hai na usko ham yaha par use kar rahi hai varible ko
const userRoutes = require('./routes/users.routes')
const cors = require('cors');
//iska use karke ham api ka data ko frontend me show karte hai


connectDB()// jo ham database wala file me connec tDb ko export kiya hai yaha par ham isko import kar rahi hai
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.post('/', (req, res) => {
    const data = req.body
  res.send(`Hello, ${data.name}`);
});

//cors are used
app.use(cors())



// api hai yaha rouutes yaha par
// uper ke lik na hai aur ye check kaerga ga ki user authticuser hai ki nahi
app.use('/api/students', auth, studentRoutes);
app.use('/api/users', userRoutes);



app.use((error,req,res,next)=>{
  if(error instanceof MulterError){
    return res.status(400).send(`Image Error:${error.message}:${error.code}`)
  }else if(error){
    return res.status(500).send(`Something went wrong: ${error.message}`)
  }
})



app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});


module.exports = app;
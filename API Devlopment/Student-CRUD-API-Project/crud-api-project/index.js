const express = require('express');
const app = express();
const studentRoutes = require('./routes/students.routes')
const connectDB = require('./config/database');
const { MulterError } = require('multer');
const cors = require('cors')
const path = require('path')

connectDB()

const PORT = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use(cors())

app.use('/api/students', studentRoutes)

app.use((error,req,res,next)=>{
  if(error instanceof MulterError){
    return res.status(400).send(`Image Error: ${error.message} : ${error.code}`)
  }else if(error){
    return res.status(500).send(`Something went wrong: ${error.message}`)
  }
  next()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
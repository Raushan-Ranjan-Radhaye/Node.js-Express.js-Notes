const express = require('express')
const mongoose = require('mongoose')
const minifyHTML = require('express-minify-html-terser');
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const compression = require('compression')



//middleware
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout')
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(compression({
    level: 9,// ye aur bhi jayda api ko cpmress kaerag
    threshold: 10*1024//agar 10 kb se kaam data hoga to wo usko compess nahi kaerag
}))
//api ko fast kar te hai

//iska help se ham apna website ka storage ko low kae te hai performance  increase hoga yese
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));


//view engine
app.set('view engine', 'ejs'); 

//Database Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

//Routes
app.use('/', require('./routes/frontend'));

app.use('/admin', (req,res,next)=>{
    res.locals.layout = 'admin/layout';
    next();
})
app.use('/admin', require('./routes/admin'));


app.listen(3000, ()=>{
    console.log('Hello World!!')
})


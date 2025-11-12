const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./model/user.model')



//Database Connections
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
.then(() => console.log('Connected to MongoDB'))



//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");



let checklogin = (req,res,next)=>{// ye check karega ga ki user login hai gaar login hoga to session craete huwa hoga wo check kaega
    if(req.session.userId){
        next();
    } else {
        res.redirect('/login'); // agar session create ya login nahi howa hoga to home page ko acess nahi kar payega
    }
}





//Routes

app.get('/profile',checklogin,(req,res)=>{
    if(req.session.userId){
        res.send('<h1>Welcome, you are logged in!</h1><a href="/logout">Logout</a>');
    } else {
        res.send('<h1>Profile Page</h1><a href="/register">Register</a> | <a href="/login">Login</a>');
    }
})




app.get('/register',(req,res)=>{
    res.render('register', {error: null});
})


app.get('/login',(req,res)=>{
    res.render('login', {error: null});
})



app.post('/register', async (req,res)=>{
    const {username,userpassword} = req.body;// name me ham html ka value hai username password
    try {
        const hashedPassword = await bcrypt.hash(userpassword, 10);// password ko salting ya strong kaerag incrypt karega 10 didgit me
        // res.send({username,userpassword:hashedPassword})// ye wala code se ham iska data ko browser me show karerag jo form me fill hoga
        await User.create({username:username,userpassword:hashedPassword});// database me data store karerag PASSWORD KO HASED KAE KE
        res.redirect('/login');// register hone ke bad login page pe redirect karerag
    } catch (error) {
        res.render('register', {error: 'Username already exists or other error'});
    }

})



app.post('/login', async (req,res)=>{
    const {username,userpassword} = req.body;

    const user = await User.findOne({username});// database me username ko find karerag
    if(!user) return res.render('login', {error: 'Invalid username or password'});// agr username nhi mila to error show karerag

    const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    if(isMatch){// login wala route se password ko match kaerag database se match karne par home page par redirct hoga
        req.session.userId = user._id;// username or password maatch hoga to create hoga session
        res.redirect('/');
    } else {
        res.render('login', {error: 'Invalid username or password'});
    }
})



app.get('/logout', (req,res)=>{
    req.session.destroy((err) => {
        if(err){
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
})

app.get('/', (req,res)=>{
    if(req.session.userId){
        res.send('<h1>Welcome to the Home Page!</h1><a href="/profile">Profile</a> | <a href="/logout">Logout</a>');
    } else {
        res.send('<h1>Home Page</h1><a href="/register">Register</a> | <a href="/login">Login</a>');
    }
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});


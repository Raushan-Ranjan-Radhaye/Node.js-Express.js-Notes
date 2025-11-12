const express = require('express')
const passport = require('passport')
const session = require('express-session')
const app = express();
require('./auth/google')


// session 
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
}))
// yaha par ham isko use kar rahi hai
app.use(passport.initialize())
app.use(passport.session())



app.get('/', (req,res)=>{
    res.send('<a href= "/auth/google">Login With Google</a>')
})

app.get('/auth/google',
    passport.authenticate(
        'google',
        {scope:['profile',"email"]}
    ));

app.get('/auth/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: '/',
            successRedirect: '/profile'
        }
    ),
    );


    function authCheck(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/')
    }


app.get('/profile', authCheck,(req,res)=>{

        console.log(req.user)
    //iska help se ham email ka naam show hota hai
    res.send(`<h1>Welcome ${req.user.displayName} </h1>
    <img src="${req.user.photos[0].value}" alt="Profile Picture"/>
    <a href='/logout'>Logout</a>
    `);// photos ka method se email par laga photo show hota hai
})


app.get('/logout', (req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

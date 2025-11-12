const express = require('express');
const app = express();

const session = require('express-session');
//now we are include the session

// phale ham sesions ko computer ke ram me store kar te the but ham ham ise database me store karenge

const MongoStore = require("connect-mongo")




// setup of sessions

app.use(session({
  // now use the session to pass the four keys
  secret:"secretpassword",
  resave:false,// user sessions ko modify nahi kar payega
  saveUninitialized:false,// jab tak user login nahi karega tab tak session create nahi hoga,
  store:MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/sessiondb'}),// yaha par se ham session ka data ko databse ka data me store kar rahi hai
  cookie:{maxAge:1000*60*60*24} // 1 day ke baad user ka session end hoga matlab ligout hoga
}))




app.get('/', (req, res) => {
  if(req.session.username){//(req.session.username) ye wala property ham ham jis jis route par set kiya hai usmw sesion craete hoga
    res.send(`<h1>User name has been set: ${req.session.username}</h1>`);
    // sessions create hoga to ye wala message show hoga nahi to else wala message show hoga
  }else{
    res.send('<h1>yahoo baba.</h1>');
  }
});


// isis route se haam sessions ko craete kar rahi  hai

app.get('/set-username', (req, res) => {
  req.session.username = "Yahoo baba" // now we are craete a session
  // jab ham set-username wala route par jayenge to sessions create hoga
  res.send('<h1>Username has been set in sessions.</h1>');
});



app.get('/get-username', (req, res) => {
  if(req.session.username){
    res.send(`<h1>User name has been set: ${req.session.username}</h1>`);
  }else{
    res.send('<h1>No username set in session.</h1>');
  }
});



app.get('/aboutus', (req, res) => {
  if(req.session.username){
    res.send(`<h1>User name has been set: ${req.session.username}</h1>`);
  }else{
    res.send('<h1>About As</h1>');
  }
});



// user jab is route par jayega to uska session destroy ho jayega
app.get('/destroy', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.status(500).send('Error destroying session');
    }else{
      res.send('Session destroyed successfully');
    }
  });
});





















app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:`);
});

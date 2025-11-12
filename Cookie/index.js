const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser('mySecretKey123'));// yaha par cookipaeser ka use krna hai




//routes
app.get('/', (req, res) => {
  var home = `Home Page`;
  const username = req.cookies.username;
  res.send(`Username from cookie: ${username}`);
  if(!username){
    res.send(`${home}: No cookie found`);// cooki nahi hoga to ye wala message show hoga
  }else{
    res.send(`${home}: Username from cookie: ${username}`);// agar cookie mattch hoga to ye wala message show hoga
  }
});




app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Yahoo baba', 
    {
        maxAge: 900000,// 15 minutes are auto remove  the cookie
        httpOnly: true, // user javaScript ka code se cookie ko read nahi kar payega
        signed: true // cookie ko sign kar dega
    }
  )
  res.send('Cookie has been set');
});



app.get('/get-cookie', (req, res) => {
//   const username = req.cookies.username;// unsigned cookie ko read karne ke liye ye use karna hai
    const username = req.signedCookies.username;// signed cookie ko read karne ke liye ye use karna hai

  res.send(`Username from cookie: ${username}`);
  if(!username){
    res.send('No cookie found');// cooki nahi hoga to ye wala message show hoga
  }else{
    res.send(`Username from cookie: ${username}`);// agar cookie mattch hoga to ye wala message show hoga
  }
});


app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');// cookie ko delete karne ke liye ye use karna hai
  res.send('Cookie has been deleted');

});




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


import { name, render } from 'ejs';
import express from 'express' // use this feature to write the ("type":"module",) in package.json file
//New way to declaerd the express.js
const app = express()

// Add static middleware to serve files from public folder
app.use(express.static('public'))

app.set("view engine", "ejs")//we are set the ejs template engine by default his search the ejs file on (views) folder
// isi liay ham ejs ke file ko ham views folder banke yahi naaam likna hai


app.use(express.urlencoded({extended: false}))
//iska use kar ke ham html ka code ham dusre file me late hai


app.use(express.static('public'))
// agar  hamo custom css likna hai to hamko isko include kar na hoga (public yaha par folder naam hai)



// ham gahar folder ka naam koi dursa rajk rahi hai to ye se hoga
// app.set('view', "./my-templates")(,my-templte rae folder name)


app.get('/', (req, res) => {
    res.render('form', { message: null });
});


app.get('/about', (req, res) => {

var users =[
    {name:"Askhay Kumar", age:25, city:"patna"},
    {name:"Askhay Kumar", age:25, city:"patna"},
    {name:"Askhay Kumar", age:25, city:"patna"},
    {name:"Askhay Kumar", age:25, city:"patna"}

];


    res.render('about', {title:'About Page', message:'welcome',items: users})
    //render method html ko show karata hai browsr me (about yaha par about file ka naam hai)
});


app.get('/form', (req,res)=>{
    res.render("form", {message: null})
    //render is method to show the html file on browser
})

app.post('/submit', (req,res)=>{
    const name = req.body.myname
    //user jo input karega value wo accept hoga yaha par name me ham myname set kiya hai form.ejs file se


    const message = `Hello,${name} You submitted the form.`
    res.render('form',{message: message})
})



//used to start the sever
app.listen(3000, ()=>{
    console.log('Success, server started')
})

const express = require('express');
const app = express();

const router  = express.Router()



const mymiddleware = ((req,res, next)=>{
    // next is a middleware
    const d = new Date() // take methos of date
    console.log(`Time : /${d.getDate()} /${req.method}/${req.url}/ ${d.getMonth()}`)
    // we are print in console date month second year etc ( now we also print the route of url or route name and print methods )
    next()
})// ye hamara middleware uper me hai aur iskne nichay wala route chalega isis middleware se agar 
// ham middlewarew kw uper me koi route banange to wo kaam nahi midlerware but route kaam kaerega maylab ham middleware me jo ham time ya kuch bhi set kiya hai wo route ke run hone se wo kaam kaerag




const myothermiddleware = ((req,res, next)=>{
    // next is a middleware
    console.log("My second middleware")
    // we are print in console date month second year etc ( now we also print the route of url or route name and print methods )
    next()
})// ye hamara middleware uper me hai aur iskne nichay wala route chalega isis middleware se agar 





app.use(mymiddleware)
// (mymiddleware) se ham middleware banaye hai jisko ham yaha par use kar rahi hai
// iske nichay jitne bhi route hoga sab par ye kaam kaeraga
// agar ham isko kisime bhi route me paste karte hai isko to wo usi me kaam kaerga baki route me nahi




app.get('/', mymiddleware,myothermiddleware,(req,res)=>{
    res.send('Home Page')// yaha par ham isme middlreware set kiya hai jisme jo isme (mymiddleware) route me chalega baki me nahi
})// aab ham yaha par ham (myothermiddleware) ek aur middleware ko use kare rahi hai jo ham ne is middleware me value set kiya hai wo value print hoga route ko acees karne par




app.get('/about', (req,res)=>{
    res.send('About PAge')
})




app.get('/', (req,res)=>{
    res.send('hello')
})



app.get('/', (req,res)=>{
    res.send('hello')
})




app.listen(3000, ()=>{
    console.log(" Server are started")
})
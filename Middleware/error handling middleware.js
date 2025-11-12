const express = require('express');
const app = express();




app.get('/home',(req,res)=>{
    res.send(' Page')// yaha par ham isme middlreware set kiya hai jisme jo isme (mymiddleware) route me chalega baki me nahi
})// aab ham yaha par ham (myothermiddleware) ek aur middleware ko use kare rahi hai jo ham ne is middleware me value set kiya hai wo value print hoga route ko acees karne par




app.get('/abouts', (req,res)=>{
    res.send('About Page')
})


app.use((res,req)=>{
    res.send("error 404 page not found")
})
// isko sare route ke nichay lagna hai user yesa route ko access karta hai jo ham nahi banaya hai to usko ye error dega






app.use(( err, req, res,next)=>{
    console.error(err.stack)
    res.status(500).send("something broken")
    next()
})
// ye wala error hamding middleeare ham sab route ke nichay set karna hai
// uper wala route me kahi bhi kuch nhi route me error hoga to ye isko console me show karegea 




app.listen(3000, ()=>{
    console.log(" Server are started")
})
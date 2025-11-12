const express = require('express');
const app = express();

const router  = express.Router()


router.use((req, res,next)=>{
    console.log("Route")
    next()
})




router.get('/home',(req,res)=>{
    res.send(' Page')// yaha par ham isme middlreware set kiya hai jisme jo isme (mymiddleware) route me chalega baki me nahi
})// aab ham yaha par ham (myothermiddleware) ek aur middleware ko use kare rahi hai jo ham ne is middleware me value set kiya hai wo value print hoga route ko acees karne par




router.get('/abouts', (req,res)=>{
    res.send('About PAge')
})

app.use("/home", router)





app.get('/', (req,res)=>{
    res.send('hello')
})






app.listen(3000, ()=>{
    console.log(" Server are started")
})
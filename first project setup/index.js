const express = require('express')
const path = require('path')
const app = express()
//we are include a express framework

app.use(express.json())
// te aab json format ka data ko accept kaega ya ham send bhi karte hai

app.use(express.urlencoded({extended: false}))
//aab ye urlencoded data bhi send kar ta hai

// app.get('/',(req, res)=>{
//     // (/) ka matlab hai ki ye home page ka route hai
//     res.send("helbhjyhjyhugnglo")
//     //res.send (ye res sever ko response send karega (send browser me data ko reload HTML karga))
// })


// app.get('/about',(req, res)=>{
//     res.send("ff")
// })

// app.get('/about/:id',(req,res)=>{
//     //(req.params) ek method hai jo is trah ke route me data pass hoga to usko store karega
//     res.send(req.params)
// //is tarh ham route ek aur route pass karta hai to wo outoput me id ka value me data store karega json format me
// })

app.get('/search', (req,res)=>{
    const name = req.query.name
    const age = req.query.age

    res.send(`Search result for name: ${name} , age :${age}`)
})


                                //Send Method

// app.get('/', (req, res)=>{
//     res.send({
//         name: "Yahoobaba",
//         age: 25
//     })
//     //it is also be return the object
// })


// app.get('/', (req, res)=>{
//     res.send
//     (
//      ['Apple','banana','Mango']
//     )
//     //it is also be return array
// })


//                 //JSON Method
app.get('/', (req, res)=>{
    const users = [
        {id:1, name: "Salman"},
        {id:2, name: "Khan"}
    ]
    res.json(users)
    //it is also be return json data type format
})

//        redirect
//used to switch the route to another route
// app.get('/about', (req,res)=>{
//    res.redirect('/user')
//    //ham agar about ka route par jayenge to ye user wala route par awitch kar dega
// })

                    // render

// send to send the big html data code on browser
app.set('view engine', 'ejs')//we are include the ejs engine
app.set('views', path.join(__dirname, 'views'))//set the path of html floder

app.get('/user', (req, res)=>{
    res.render('user')
    //user are ejs file name to open
})

//              download

app.get('/download', (req,res)=>{
    res.download('./files/pdf any - Google Search.pdf','hello.pdf')
    //include ./file are path of folder and his name and also be include rename the his hello.pdf
})


//           sendFile

app.get('/sendFile', (req,res)=>{
    res.sendFile(__dirname + '/files/pdf any - Google Search.pdf')
    //include ./file are path of folder and his name and also be include rename the his hello.pdf
})
//it is never be downlaod the file but the open the next tab on your file


//          sendStatus

app.get("/error",(req,res)=>{
    res.sendStatus(404)
    //not found
})


                //headerSent

app.get("/check",(req,res)=>{
    console.log(res.headersSent)
    res.send("Hello")
    console.log(res.headersSent)
})


//            post
//we are send tha json fromat of data in server in to use post method
app.post('/about', (req,res)=>{
    res.send(req.body)
    //body ke ander ham json ya kisi bhi foemat ka data send karte hai
})



app.get('/abouts', (req,res)=>{
    res.send(req.hostname)
    //give the host name
})


app.get('/abouts2', (req,res)=>{
    res.send(req.originalUrl)
    //give the route 
})


app.get('/abouts3', (req,res)=>{
    res.send(req.ip)
    //give the ip address
})



app.get('/abouts4', (req,res)=>{
    res.send(req.ip)
    //give the ip address
})


app.get('/abouts5', (req,res)=>{
    res.send(req.protocol)
    //give the https or http which are used
})


app.get('/abouts6', (req,res)=>{
    res.send(req.secure)
    // we are used http then return false and we used https then return true
})

app.get('/abouts7', (req,res)=>{
    res.send(req.route)
    //give the full information of route
})

app.get('/about/:userid', (req,res)=>{
    if(req.accepts('html')){
    res.send("<h1>Hello HTML</h1>")
    }
})


app.get('/abouts8', (req,res)=>{
    res.send(req.headers.host)
    }//give the port number of local host of server are run
)


app.get('/abouts9', (req,res)=>{
    res.send(req.headers)
    }//give the full information of server of host
)























//used to start the sever
app.listen(3000, ()=>{
    console.log('Success, server started')
})






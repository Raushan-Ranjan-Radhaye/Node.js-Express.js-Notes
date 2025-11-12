const express = require('express')
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');
require('dotenv').config();
const app = express()
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs');

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',// defult write in gmail used
    port:587,
    secure:false,//ssh certifite hoga tbhi ye(true hoga)
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // password genetaed by goggle in email are with 2-step verification
    }
})

app.post('/send-email',async (req,res)=>{
    const {to, subject, text} = req.body;

    //send a html file through email
    const templatePath = await fs.readFile('./views/email-template.ejs', 'utf8');
    const html = ejs.render(templatePath, {name: 'Raushan Ranjan'})

    try{
        const info = await transporter.sendMail({
            from: "Raushan Ranjan <worldhelloraushan@gmail.com>", // yahi wala email se send hoga messgae
            to: to,
            subject: subject,
            // text: text,
            html: html,
            // html: "<h1> Hello World </h1>",
            attachments: [
                {
                    filename: 'Document.pdf',//name of file to send to email in attached
                    path: path.join(__dirname, 'files', 'Document.pdf')
                },

            ]
        })
        res.json({message: 'Email sent successfully', info })
    }catch(err){
        res.status(500).json({message: 'Error sending email', err})
    }
})


app.get('/', (req,res)=>{
    res.render('mailpage')
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})



///hamko yaha par browser me from me dursa email dalna hai jisko mail send kar na hai

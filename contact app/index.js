const express = require("express")// set the express.js  in app variable
const app  = express()
const mongoose = require('mongoose')//include the mongodb
const Contact = require("./models/contacts.models")// ham contact models ke file me se (contact) varible ko yaha par import ho rahi ahi 



//Database connection
mongoose.connect("mongodb://127.0.0.1:27017/contacts-curd")// contact curd automatic create it
.then(()=>console.log("Database Connected"))
.catch(err => console.log("Database connection error:", err))




//Middleware
app.set('view engine', 'ejs')//set the ejs engine to used
app.use(express.urlencoded({extended:false}))// accepted the html data in server
app.use(express.static('public'))// custom css and stsitc file in public folder by default search



//Routes
app.get('/', async (req,res)=>{
    try {
        const perPage = 5
        const page = parseInt(req.query.page) || 1
        const totalContacts = await Contact.countDocuments()
        const totalPages = Math.ceil(totalContacts / perPage)
        const contacts = await Contact.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec()


        
        res.render('home',{
            contacts: contacts,
            counter: (page - 1) * perPage + 1,
            hasPrevPage: page > 1,
            prevPage: page - 1,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            nextPage: page + 1
        })
    } catch (error) {
        console.error('Error fetching contacts:', error)
        res.status(500).render('500', { error: error.message })
    }
})

app.get('/show-contact/:id', async (req,res)=>{
    try {
        const contact = await Contact.findById(req.params.id)
        if(contact){
            res.render('show-contact', { contact: contact });
        } else {
            res.status(404).render('404')
        }
    } catch (error) {
        res.status(500).render('500', { error: error.message })
    }
})

app.get('/add-contact', (req,res)=>{
    res.render('add-contact')
})

app.post('/add-contact', async (req,res)=>{
    try {
        const newContact = new Contact(req.body)
        await newContact.save()
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error adding contact')
    }
})

app.get('/update-contact/:id', async (req,res)=>{
    try {
        const contact = await Contact.findById(req.params.id)
        if(contact){
            res.render('update-contact', { contact: contact });
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching contact')
    }
})

app.post('/update-contact/:id', async (req,res)=>{
    try {
        await Contact.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error updating contact')
    }
})

app.get('/delete-contact/:id', async (req,res)=>{
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error deleting contact')
    }
})

app.listen(3000, ()=>{
    console.log("server are sarted")
})




















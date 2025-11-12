const express = require('express')
const Contact = require("./models/contact")
const path = require('path')
const ejs = require('ejs')
const mysql = require('mysql2/promise')
const sequelize = require('./models/index')

const app = express()
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        await connection.execute('CREATE DATABASE IF NOT EXISTS contact_db');
        await connection.end();
        console.log('Database created or already exists');
    } catch (err) {
        console.log('Error creating database:', err);
    }

    try {
        await sequelize.sync();
        console.log("Database Tables Created!");
    } catch (err) {
        console.log(err);
    }

    // Set EJS as the templating engine
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'view'))

    // Middleware to serve static files
    app.use(express.static(path.join(__dirname, 'view/public')))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    //Read all Contacts
    app.get('/contacts', async (req, res) => {
      try {
        const contacts = await Contact.findAll()
        res.json(contacts)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })

    //Read Single Contact
    app.get('/contacts/:id', async (req, res) => {
      try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: "Contact not Found" })
        res.json(contact)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })

    //Create a contact
    app.post('/contacts', async (req, res) => {
      try {
        const contact = await Contact.create(req.body)
        res.status(201).json(contact)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })

    //Update a contact
    app.put('/contacts/:id', async (req, res) => {
      try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: "Contact not Found" })
        await contact.update(req.body)
        res.json(contact)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })

    //Delete a contact
    app.delete('/contacts/:id', async (req, res) => {
      try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: "Contact not Found" })
        await contact.destroy()
        res.json({ message: "Contact deleted successfully" })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    })

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
})();


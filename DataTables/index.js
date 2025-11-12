const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users.model')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



//Connects MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/user_demo")
.then(()=> console.log('Database Connected'))
.catch(err => console.error('Database connection error:', err));



// Get all users
app.get('/api/users', async (req, res)=>{// yahi route hai jo sever par data send kar rhai hai
    try {
        const users = await User.find();
        res.json({data: users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single user
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Seed random users
app.post('/api/users/seed', async (req, res) => {
    const names = ['John', 'Jane', 'Bob', 'Alice', 'Mike', 'Sara', 'Tom', 'Lisa', 'David', 'Emma'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const users = [];
    for (let i = 0; i < 10; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const email = `${name.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
        const age = Math.floor(Math.random() * 50) + 18;
        users.push({ name, email, age });
    }
    try {
        await User.insertMany(users);
        res.json({ message: '10 random users inserted' });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting users' });
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

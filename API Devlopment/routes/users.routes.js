const express = require("express")
const router = express.Router()
const User = require('../models/users.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv")
dotenv.config()

router.post('/register', async(req, res)=>{
    try{
        const{username, email, password} = req.body
        const existingUser = await User.findOne({$or: [{username}, {email}]})
        if(existingUser) return res.status(400).json({message: "Username or email already exists."})

        const hasedPassword = await bcrypt.hash(password, 10)
        const user = new User({username, email, password: hasedPassword})
        const saveUser = await user.save()
        res.json(saveUser)
    }catch(err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/login', async(req, res)=>{
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) return res.status(404).json({message: 'User not found'})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'})

        const token = jwt.sign(// user jab sign hoga to ek token genertate hoga
            {userId: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({token, user: {id: user._id, username: user.username, email: user.email}})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/logout', async(req, res)=>{
    res.json({message: "Logout successful"})
})

module.exports = router

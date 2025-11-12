const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const userModel = require('../models/User')
const newsModel = require('../models/News')
const settingsModel = require('../models/Settings')
const { validationResult } = require('express-validator')
const createError = require('../utils/error_message')
const fs = require('fs')



const loginPage = (req, res) => {
    res.render('admin/login',{
        layout:false
    })
}


const adminLogin = async (req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()});
     return res.render('admin/login', {
        layout:false,
        errors:errors.array()
    })
}
const {username, password} = req.body
try{
    const user = await userModel.findOne({username})
    if(!user) {
        return res.status(400).send("Invalid username or password")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.status(400).send("Invalid username or password")
    }
    const jwtData = {id: user._id, role: user.role, fullname: user.fullname}
    const token = jwt.sign({id: user._id, role: user.role, fullname: user.fullname}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 3600000})
    res.redirect('/admin/dashboard')
} catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error');
}
};




const logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/admin/')
}

const dashboard = (req, res) => {
    res.render('admin/dashboard', {role:req.role, fullname:req.fullname})
}

const settings = async(req, res, next) => {
    try{
        const settings = await settingsModel.findOne()
            res.render('admin/settings', {role:req.role, settings})
        } catch (error){
            next(error)
        }
    }


const saveSettings = async (req,res,next) => {
    const {website_title, footer_description} = req.body;
    const website_logo = req.file?.filename;
    try{
        const settings = await settingsModel.findOne({});
        if (!settings) {
            return next(createError('Settings not found', 404));
        }
        settings.website_title = website_title;
        settings.website_logo = website_logo;
        settings.footer_description = footer_description;

        if(website_logo){
            if(settings.website_logo){
                const logoPath = `../public/uploads/${settings.website_logo}`;
                if(fs.existsSync(logoPath)){
                    fs.unlinkSync(logoPath);
                }
            }
            settings.website_logo = website_logo;
        }

        await settings.save();

        res.redirect('/admin/settings');
    }catch(error){
        next(error)
    }
}



const allUsers = async (req, res) => {
    const users = await userModel.find()
    res.render('admin/users', {users, role:req.role})
}

const addUserPage = async (req, res) => {
    res.render('admin/users/create',{role:req.role, errors: [] })
}



const addUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('admin/users/create', {
            role: req.role,
            errors: errors.array()
        })
    }
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ ...userData, password: hashedPassword });
    res.redirect('/admin/users')

}


const updateUserPage = async (req, res) => {
   const id = req.params.id
   try{
    const user = await userModel.findById(id)
    if(!user) {
        return res.status(404).send("user not found")
    }
    res.render('admin/users/update', {user, role:req.role})
   }catch (error) {
    console.error(error)
   res.status(500).send('Internal Server Error');
   }
}


const updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        await userModel.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const article = await newsModel.findOne({ author: id });
        if (article) {
            return res.status(400).json({ success: false, message: 'User is associated with an article' });
        }
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return next(createError('User not Found', 404));
        }
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    loginPage,
    adminLogin,
    logout,
    allUsers,
    addUser,
    updateUserPage,
    addUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settings,
    saveSettings,
}


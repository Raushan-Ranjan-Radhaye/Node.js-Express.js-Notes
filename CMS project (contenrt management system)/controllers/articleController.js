const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const userModel = require('../models/User');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path')
const createError = require('../utils/error_message')


const allArticle = async(req,res,next)=>{
try{
    const articles = await newsModel.find().populate('category','name').populate('author','fullname')
    res.render('admin/articles' ,{role: req.role, articles});
}catch(error){
    console.error(error);
    res.status(500).send('Server Error')
    }
}


const addArticlePage = async(req,res,next)=>{

    const categories = await categoryModel.find();
res.render('admin/articles/create', {role:req.role, categories, errors:0});
}


const addArticle = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const categories = await categoryModel.find();
        return res.render('admin/articles/create', {
            role:req.role,
            errors:errors.array(),
            categories
        })
    }
    try {
        const {title, content, category} = req.body;
        if (!title || !content || !category) {
            return res.status(400).send('All fields are required');
        }
        if (!req.file) {
            return res.status(400).send('Image is required');
        }
        const article = new newsModel({
            title,
            content,
            category,
            author: req.id,
            image: req.file.filename
        });
        await article.save();
        res.redirect('/admin/article');
    } catch (error) {
        next(error)
    }
}



const updateArticle = async(req,res,next)=>{
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const categories = await categoryModel.find();
        return res.render('admin/articles/update', {
            article:req.body,
            role:req.role,
            errors:errors.array(),
            categories
        })
    }
    const {title, content, category} = req.body;
    try{
        if (!title || !content || !category) {
            return res.status(400).send('All fields are required');
        }
        const article = await newsModel.findById(id);
        if(!article){
            return res.status(401).send('Unauthorized');
        }
        article.title = title;
        article.content = content;
        article.category = category;
        if(req.file){
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', article.image);
            fs.unlinkSync(imagePath);
            article.image = req.file.filename;
        }
        await article.save();
        res.redirect('/admin/article');
    }catch(error){
        next(error)
    }
}

const updateArticlePage = async(req,res,next)=>{
    const id = req.params.id;
    
    try{
        const article = await newsModel.findById(id).populate('category', 'name').populate('author', 'fullname')
        if(!article){
            return res.status(404).send("Article Not Found");
        }
        const categories = await categoryModel.find();
        res.render('admin/articles/update', {role:req.role, article, categories});
    }catch(error){
        console.error(error)
        res.status(500).send("Server Error")
            next(error)

    }
}


const deleteArticle = async(req,res,next)=>{
    const id = req.params.id;
    try{
        const article = await newsModel.findByIdAndDelete(id);
        if(!article){
            return res.status(404).send("Article Not Found");
        }
        res.status(200).send("Article Deleted Successfully");
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error");
            next(error)
        
    }
}



module.exports = {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticle,
    updateArticlePage,
    deleteArticle
}



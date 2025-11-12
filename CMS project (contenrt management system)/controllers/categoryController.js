const { validationResult } = require('express-validator');
const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const createError = require('../utils/error_message');


const allCategory = async (req,res)=>{
    const categories = await categoryModel.find();
    res.render('admin/categories/index', {categories, role:req.role})
}
const addCategoryPage = async(req,res)=>{
    res.render('admin/categories/create', {role:req.role,errors:0})
}


const addCategory = async (req,res)=>{
const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('admin/categories/create',{
            role: req.role,errors: 0 ,
            errors:errors.array()
        })
    }
    try{
        await categoryModel.create(req.body)
        res.redirect('/admin/categories');
    }catch(error){
        console.error(error);
        res.status(400).send('Server Error: ' + error.message);
    }
}



const updateCategoryPage = async (req,res)=>{
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('admin/categories/update',{
            role: req.role,errors: 0 ,
            errors:errors.array()
        })
    }
    const category = await categoryModel.findById(id);
    if(!category){
        // return res.status(404).send("Category not found");
        return next(createError('Category not Found', 404));
    }
    res.render('admin/categories/update', { category, role:req.role})
}



const updateCategory = async (req,res)=>{
    const id = req.params.id;


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const category = await categoryModel.findById(id)
        return res.render('admin/categories/update',{
            category,
            role: req.role,
            errors:errors.array()
        })
    }
    try{
        const category = await categoryModel.findByIdAndUpdate(id, req.body);
        if(!category){
            return res.status(404).send("Category not found");
        }
        res.redirect('/admin/categories');
    }catch(error){
        console.error(error);
        res.status(400).send('Server Error: ' + error.message);
    }
}

const deleteCategory = async (req,res)=>{
    const id = req.params.id;
    try{
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            // return res.status(404).send("Category not found");
        return next(createError('Category not Found', 404));
        }
        
        const article = await newsModel.findOne({category:id});
        if(article){
            return res.status(400).json({success:false, message: 'Category is associated with an article'})
        }

    await category.deleteOne();
    res.json({success: true});
    }catch(error){
        next(error)
    }
}

module.exports = {
    allCategory,
    addCategory,
    addCategoryPage,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}
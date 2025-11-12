const mongoose = require('mongoose')
const categoryModel = require('../models/Category')
const newsModel = require('../models/News')
const userModel = require('../models/User')
const commentModel = require('../models/Comment')

const index = async (req, res) => {
    const news = await newsModel.find()
    .sort({createdAt:-1})
    .populate('category', {'name':1, 'slug':1})
    .populate('author', 'fullname')
    // res.json(news)

    const categoriesInUse = await newsModel.distinct('category')
    const categories = await categoryModel.find({'_id': {$in:categoriesInUse}})
    res.locals.categories = categories
    res.render('index', {news, categories})
    // res.json({news, categories})


}
    const articleByCategories = async (req, res) => {
        const category = await categoryModel.findOne({slug:req.params.name});
        if(!category){
            return res.status(404).send('Category not Found');
        }
        const news = await newsModel.find({category:category._id})
        .populate('category',{'name':1, slug:1})
        .populate('author', 'fullname')
        .sort({createdAt: -1})

        const categoriesInUse = await newsModel.distinct('category')
        const categories = await categoryModel.find({'_id':{$in:categoriesInUse}})
        res.render('category', {news, categories, category})
    }



    const singleArticle = async (req, res) => {
        const singleNews = await newsModel.findById(req.params.id)
        .populate('category',{'name':1, slug:1})
        .populate('author', 'fullname')
        .sort({createdAt: -1})

        const categoriesInUse = await newsModel.distinct('category')
        const categories = await categoryModel.find({'_id': {$in:categoriesInUse}})
        res.locals.categories = categories
        res.render('single', {singleNews, categories})
    }
    const search = async (req, res) => {
        const query = req.query.q || '';
        const news = await newsModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        })
        .populate('category',{'name':1, slug:1})
        .populate('author', 'fullname')
        .sort({createdAt: -1})

        const categoriesInUse = await newsModel.distinct('category')
        const categories = await categoryModel.find({'_id': {$in:categoriesInUse}})
        res.render('search', {news, categories, query})
    }
    const author = async (req, res) => {
        const news = await newsModel.find({author:req.params.id})
        .populate('category',{'name':1, slug:1})
        .populate('author', 'fullname')
        .sort({createdAt: -1})

        const categoriesInUse = await newsModel.distinct('category')
        const categories = await categoryModel.find({'_id': {$in:categoriesInUse}})
        res.locals.categories = categories
        res.render('author', {news, categories})
    }
    const addComment = async (req, res) => {
        try {
            const articleId = req.params.id;
            const { comment, userId } = req.body;

            if (!comment || !userId) {
                return res.status(400).json({ error: 'Comment and userId are required' });
            }

            const newComment = new commentModel({
                article: articleId,
                user: userId,
                comment: comment,
                createdAt: new Date()
            });
            await newComment.save();

            res.status(201).json({ message: 'Comment added successfully' });
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    const testing = async(req,res)=>{
        // res.send('hello'.repeat(500000))
        const news = await newsModel.find()
        // res.json(news)
    }
    
    module.exports = {
        index,
        articleByCategories,
        singleArticle,
        search,
        author,
        addComment,
        testing
    }

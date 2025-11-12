const express = require('express')
const router = express.Router()


const siteController = require('../controllers/siteController');
router.get('/', siteController.index);
router.get('/category/:name', siteController.articleByCategories);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search)
router.get('/author/:id', siteController.author)
router.post('/single/:id', siteController.addComment);
router.get('/testing', siteController.testing)
module.exports = router;


const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedin')
const isAdmin = require('../middleware/isAdmin')
const uploads = require('../middleware/multer')
const isValid = require('../middleware/validation')

const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const isAuthor = require('../middleware/isAuthor');


//Login Routes
router.get('/', userController.loginPage);
router.post('/index', isValid.loginValidation,userController.adminLogin);
router.get('/logout',isLoggedIn,userController.logout);
router.get('/dashboard',isLoggedIn, userController.dashboard)
router.get('/settings',isLoggedIn,isAdmin, userController.settings)// ye walal page admin  hoga to acees hoga middleware pass kiya hai
router.post('/settings',isLoggedIn,isAdmin, uploads.single('website_logo'), userController.saveSettings)



//Users Curd Routes
router.get('/users',isLoggedIn,isAdmin, userController.allUsers)
router.get('/add-user',isLoggedIn,isAdmin, isValid.categoryValidation, userController.addUserPage);
router.post('/add-user',isLoggedIn,isAdmin, userController.addUser)
router.get('/update-user/:id',isAdmin, isLoggedIn,userController.updateUserPage)
router.post('/update-user/:id', isValid.UserUpdateValidation,isAdmin, isLoggedIn,userController.updateUser)
router.delete('/delete-user/:id', isAdmin,isLoggedIn,userController.deleteUser)



//Category Curd Routes
router.get('/categories', isLoggedIn,isAdmin,categoryController.allCategory);
router.get('/add-category', isLoggedIn,isAdmin,categoryController.addCategoryPage)
router.post('/add-category', isValid.categoryValidation, isLoggedIn,isAdmin,categoryController.addCategory)
router.get('/update-category/:id', isLoggedIn,isAdmin,categoryController.updateCategoryPage)
router.post('/update-category/:id', isValid.categoryValidation, isLoggedIn,isAdmin,categoryController.updateCategory)
router.delete('/delete-category/:id', isLoggedIn,isAdmin,categoryController.deleteCategory)


//Article Curd Routes
router.get('/article', isLoggedIn, articleController.allArticle)
router.get('/add-article', isLoggedIn,  articleController.addArticlePage)
router.post('/add-article', isLoggedIn, uploads.single('image'), isValid.articleValidation, articleController.addArticle)
router.get('/update-article/:id', isLoggedIn, articleController.updateArticlePage)
router.post('/update-article/:id', isLoggedIn,uploads.single('image'),articleController.updateArticle)
router.delete('/delete-article/:id', isLoggedIn, articleController.deleteArticle)


//Comments Routes
router.get('/comments', isLoggedIn,commentController.allComments)


//Middleware 404// ye route jo nahi hai wo error dega show serch kar ne par
router.use((req,res,next)=>{
    res.status(404).render('admin/404', {
        message: 'page not Found',
        role:req.role
    })
});


//505 Error Handler
router.use( isLoggedIn, (err,req,res,next)=>{
    console.error(err.stack);
    const status = err.status || 500;
    const view = status === 404 ? 'admin/404' : 'admin/505';
    res.status(500).render(view,{
        message:err.message || 'Internal Server Error',
        role:req.role
    })
});






module.exports = router;

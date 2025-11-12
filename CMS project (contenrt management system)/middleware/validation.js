const { body } = require('express-validator');

const loginValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/) // No spaces allowed in username
        .withMessage('Username must not contain spaces')
        .isLength({ min: 5, max: 10 })
        .withMessage('Username must be 5 to 10 letters long'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 12})
        .withMessage('Password must be 5 to 12 characters long')
]

const UserValidaion = [
body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 5, max: 25 })
    .withMessage('Fullname must be 5 to 25 letters long'),

body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/) // No spaces allowed in username
        .withMessage('Username must not contain spaces')
        .isLength({ min: 5, max: 12})
        .withMessage('Username must be 5 to 12 letters long'),


body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:5, max:12})
        .withMessage('Password must be 5 to 12 characters required'),


        body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['author', 'admin'])
        .withMessage('Role must be author or admin')
        // yaha par ham inihi dono me se option ko lena hai aur koi duradsa nahi
]


const UserUpdateValidation = [
body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 5, max: 25 })
    .withMessage('Fullname must be 5 to 25 letters long'),


    body('password')
    .optional({checkFalsy: true})// iska matlb hai ki ye field optional hai isko user fill katega to ye sab value check hoga
        .isLength({min:5, max:12})
        .withMessage('Password must be 5 to 12 characters required'),


        body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['author', 'admin'])
        .withMessage('Role must be author or admin')
        // yaha par ham inihi dono me se option ko lena hai aur koi duradsa nahi

]



const categoryValidation = [
body('name')
.trim()
.notEmpty()
.withMessage('Category Name is Required')
.isLength({min:3, max:12})
.withMessage('Category Name must be 3 to 12 characters long'),



body('description')
.trim()
.isLength({max:100})
.withMessage('Description must be at most 100 characters long'),
]

const articleValidation = [

    body('title')
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({min:10, max:50})
    .withMessage("Title must be 10 to 50 characters long"),

    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({min:50, max:500})
    .withMessage('Content must be 50 to 500 characters long'),

    body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),



]


module.exports = {
    loginValidation,
    UserUpdateValidation,
    articleValidation,
    categoryValidation,
    UserValidaion
}
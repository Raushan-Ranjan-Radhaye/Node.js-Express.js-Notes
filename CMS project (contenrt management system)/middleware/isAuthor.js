const isAuthor = (req, res, next) => {
    if(req.role === 'author') {
        next();
    }else{
       res.redirect('/admin/dashboard');
    }
}

module.exports = isAuthor;

const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    // ye device me storage lega data ko strogae karne kiya file ka
    destination:(req,file,cb) => {
        //path of file are save
        cb(null, './uploads')
        // path of folder
    },


    filename: (req,file,cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        // file are saved to extetention name with current date
        cb(null,newFileName)
    }
})


const fileFilter = (req,file,cb) =>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){// (image/jpeg) iska use karne se only hamko
        //yaha par ham rectration laga diya hai jo only  image la koui bhi file only accepts kaerga aur koi fromat support nahi karega
        cb(null,true)
    }else{
        cb(new Error('Only images are allowed'), false)
    }
}

const upload = multer ({
    storage:storage,
    limits:{
        fileSize:1024*1024*3,// user are uploads only 3 mb of
    },
    fileFilter: fileFilter

})





app.get('/', (req,res)=>{
    res.render("myform")
})



app.post('/submitform', upload.array("userfile",3), (req,res) =>{//(single ki jagah ham array use kar rahi hai)  isme ek baarrme ek se jayda file ko upload karte hai
    if(!req.files || req.files.length === 0){
        return res.status(400).send('No files uploaded.')
        // limit se jayda file upload hoga to yahi error show hoga
    }
    res.send(req.files);
}, (error,req,res,next) => {
    if(error instanceof multer.MulterError){
        if(error.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).send(`Error : Too many files uploaded!`)
        }
        return res.status(400).send(`Multer Error: ${error.message}`)
    }else if(error){
        return res.status(500).send(`Something went wrong: ${error.message}`)
    }
    next()
});



app.listen(3000, ()=>{
    console.log("server started on port 3000")
})

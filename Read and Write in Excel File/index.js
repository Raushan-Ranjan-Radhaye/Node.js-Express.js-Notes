const express = require('express')
const multer = require('multer')
const XLSX = require('xlsx');
const app = express();
const path = require('path')
const ejs  = require('ejs')
const session = require('express-session')
// const csrf = require('csurf')

app.set("view engine", "ejs")

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}))

// CSRF protection middleware removed globally

const upload = multer({dest: 'uploads/'})

app.get ('/', (req,res)=>{
   res.render('excel');
})

app.post ('/upload-excel', upload.any(), (req,res)=>{
    // CSRF token is not available in req.csrfToken() since csrf middleware is not applied
    // For simplicity, skip CSRF check for this demo, but in production, implement proper CSRF handling

    const file = req.files[0];
    const filePath = path.join(__dirname, 'uploads', file.filename);

    const workbook = XLSX.readFile(filePath)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    res.json({
        message: 'Excel file uploaded ok',
        data:data
    })
})

//Export Excel file
app.get('/export-excel', (req,res)=>{
    // ye wala route par jjane se automatically downloaded hoga excel file
    const data = [
        {Name: "Jhon", Age:30, City: "New York"},
        {Name: "Jane", Age:25, City:"London"},
        {Name: "Bob", Age:40, City:"Paris"},
    ]

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelbuffer = XLSX.write(workbook, {type: 'buffer', bookType:'xlsx'});

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.send(excelbuffer);
})



app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

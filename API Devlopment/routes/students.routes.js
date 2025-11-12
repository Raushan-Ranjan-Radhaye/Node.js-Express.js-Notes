
const express = require('express');
const router = express.Router();
const Student = require('../models/students.models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');// iskas help se ham agar student ka record delete kacr te hai to wo record ke sath image bhi automatically delete hoga

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, "./uploads")
  },

  filename:(req,file,cb) => {
    const newFileName = Date.now() + path.extname(file.originalname)
    cb(null, newFileName)
  }
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image/')){
    cb(null, true)
  }else{
    cb(new Error('Only Images are allowed'), false )
  }
}



const upload = multer({
  storage:storage,
  fileFilter:fileFilter,
  limit:{
    fileSize:1024*1024*3// only three mb file are acceptable
  }
})

//Get All Students
router.get("/", async (req,res)=>{
    try{

      const search = req.query.search || ''

      const query = {
        $or : [
          {first_name: {$regex: search, $options: 'i' }},
          {last_name: {$regex: search, $options: 'i' }}
        ]
      }

        const students = await Student.find(query);
        res.json(students);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


//Get a Single Student by ID
router.get('/:id',async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Add new Student
router.post('/',upload.single('profile_pic'),async (req, res) => {
    try {
        // const newStudent = await Student.create(req.body);
        const student = new Student(req.body)//(req.body) ise se hamrara database ka data browser me show hoga
        if(req.file){
            student.profile_pic = req.file.filename
        }
        const newStudent = await student.save()
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Update Student by ID
router.put('/:id', upload.single('profile_pic'), async (req,res) => {
  try{
    const existingStudent = await Student.findById(req.params.id)
    if(!existingStudent) {
      // Clean up uploaded file if student not found
      if(req.file && req.file.filename){
        const filepath = path.join('./uploads', req.file.filename)
        fs.unlink(filepath, (err)=>{
          if(err) console.log('Failed to delete image:', err)
        })
      }
      return res.status(404).json({message: 'Student not found'})
    }
    
    if(req.file){
      if(existingStudent.profile_pic){
        const oldimagepath = path.join('./uploads', existingStudent.profile_pic)
        fs.unlink(oldimagepath, (err) =>{
          if(err) console.log('Failed to delete old image', err)
        })
      }
      req.body.profile_pic = req.file.filename
    }

    const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body,
      {new: true}
    )
    res.json(updateStudent)


  }catch(err){
    // Clean up uploaded file if update fails
    if(req.file && req.file.filename){
      const filepath = path.join('./uploads', req.file.filename)
      fs.unlink(filepath, (err)=>{
        if(err) console.log('Failed to delete image:', err)
      })
    }
    res.status(400).json({message: err.message})
  }
})





//Delete a Student by ID
router.delete('/:id',async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        if(student.profile_pic){
          const filePath = path.join('./uploads', student.profile_pic)// ham yaha par isko path set kar raha hai ki file ka path kaha par hai jisse ye usko find kar ke delete karega
          fs.unlink(filePath, (err)=>{
            if(err) console.log('Failed to delete image:', err)
          })
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
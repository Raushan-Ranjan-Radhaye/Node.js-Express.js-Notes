const express = require('express');
const app = express();
const fs = require('fs')


//write File
// ye wala route par jane se se public folder ke ander ek txt file generate hoga
app.get('/write-file', (req,res)=>{
    fs.writeFile('./public/output.txt', 'This is a test message.', (err)=>{
        if(err){
            return res.status(500).send('Failed to write file')
        }
        res.send('File written successfully');
    })
});


//Read the File
// yaha se ham usi file ko read kar te hai
app.get('/read-file', (req, res) => {
    fs.readFile('./public/output.txt', 'utf8', (err, data)=>{
        if(err){
            return res.status(500).send('Failed to read file')
        }
        res.setHeader('Content-Type', 'text/plain')
        res.send(data);
    })
})


//Append File
app.get('/append-file', (req,res)=>{
        fs.appendFile('./public/output.txt', '\nNew Line appended.', (err)=>{
        if(err){
            return res.status(500).send('Failed to append file')
        }
        res.send("Content appended.");
    })
})



//delete
//this route par jane se file hai na jo banaya huwa hai wo delete hoga
app.get('/delete-file', (req,res)=>{
    fs.unlink('./public/output.txt', (err)=>{
        if(err){
            return res.status(500).send('Failed to delete file')
        }
        res.send('File deleted successfully');
    })
})


// Read a folder / directory
app.get('/read-folder', (req,res)=>{
    fs.readdir('./public/', (err, files)=>{//yaha se ham folder ko read karte hai
        if(err){
            console.log(err)
            return res.status(500).send('Failed to read folder');
        }

        files.forEach(file =>{
            console.log(file)
        })
        console.log(files)
        res.json({files});
    })
})


// Rename a file
//iska help se ham file ko rename karte hai
app.get('/rename-file', (req,res)=>{
    fs.rename('./public/output.txt','./public/new-output.txt', (err)=>{
        if(err){
            return res.status(500).send('Failed to rename file')
        }
        res.send('File renamed successfully');
    })
})


// Stream Data
//iska help se ham big file ko read kar te hai
app.get('/stream-text', (req,res)=>{
    const fileStream = fs.createReadStream('./public/new-output.txt')

    fileStream.on('open', ()=>{
        fileStream.pipe(res)
    })

    fileStream.on('error', ()=>{
        res.status(500).send('File not Found or error reading file.')
    })
})



// Create a folder
// ye wala route open hone par public folder me ek folder create hoga
app.get('/create-folder', (req,res)=>{
    fs.mkdir('./public/myfolder', (err)=>{// myfolder ke naam se create hoga
        if(err){
            return res.status(500).send('Error creating folder.')
        }
        res.send('Folder created successfully');
    })
})


// Rename a Folder
app.get('/rename-folder', (req,res)=>{
    fs.rename('./public/myfolder','./public/renamedFolder',(err)=>{// folder ham kar rahe rename hoga (public/renamedFolder) jiska naam yee hoga
        if(err){
            return res.status(500).send('Error renaming folder.', err)
        }
        res.send('Folder renamed successfully');
    })
})


// folder are deleted
//(rmdir)ye method only empty folder ko delete kata hai
//(rm) ye pura folder aur uske ke ander ke file ko bhi delete kare rahi hai
app.get('/delete-folder', (req,res)=>{
    fs.rmdir('./public/renamedFolder',(err)=>{
        if(err){
            return res.status(500).send('Error deleting folder.', err)
        }
        res.send('Folder deleted successfully');
    })
})



// Read a pdf file
app.get('/read-pdf', (req,res)=>{
    fs.readFile('./public/data.pdf',(err, data)=>{
        if(err){
            return res.status(500).send('PDF file not found.', err)
        }
        res.setHeader('Content-Type', 'application/pdf')
        res.send(data);
    })
})



// Read a JSON file
app.get('/read-json', (req,res)=>{
    fs.readFile('./public/data.json',(err, data)=>{
        if(err){
            return res.status(500).send('JSON file not found.', err)
        }
        res.setHeader('Content-Type', 'application/json')
        res.send(data);
    })
})



// Write a JSON file
app.get('/write-json', (req,res)=>{
    const filePath = './public/data.json'// path ko ham varible me store kar ke ham use kar rehai hai
    const data = { name: 'Salman khan', email: "salman@gmail.com", age:25}

    fs.writeFile(filePath,JSON.stringify(data),(err)=>{
        if(err){
            return res.status(500).send('Failed to write JSON file.', err)
        }
        res.send('JSON file written successfully');
    })
})



// Read a JSON file and keep existance data (append)
app.get('/append-json', (req,res)=>{
    const filePath = './public/data.json'// path ko ham varible me store kar ke ham use kar rehai hai
    const newData = { name: 'yahoo baba', email: "yahoo@gmail.com", age:23}

    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            return res.status(500).send('Failed to read JSON file.', err)
        }

        let jsonData;
        jsonData = JSON.parse(data)

        if(!Array.isArray(jsonData)){
            jsonData = [jsonData]
        }

        jsonData.push(newData)

        fs.writeFile(filePath, JSON.stringify(jsonData),(err)=>{
            if(err){
                return res.status(500).send('Failed to write JSON file.', err)
            }
            res.send("JSON file appended successfully")
        })
    })
})

//Read Image File
app.get('/read-image', (req,res)=>{
    fs.readFile('./public/image.png',(err,data)=>{
        if(err){
            return res.status(500).send('Image are not Found', err)
        }
        res.setHeader('Content-Type', 'image/png');
        res.send(data)
    })
})


// Read video file
app.get('/read-video', (req, res) => {
    fs.readFile('./public/my.mp4', (err, data) => {
        if (err) {
            return res.status(500).send('Video not found.');
        }

        res.setHeader('Content-Type', 'video/mp4');
        res.send(data);
    });
});


//Getting information for a file
app.get('/file-info', (req, res) => {
    fs.stat('./public/my.mp4', (err, stats) => {
        if (err) {
            return res.status(500).send('File not found.');
        }

        res.send(stats.size + 'bytes');
        console.log("File:" + stats.isFile())//yaha pare check karte hai ki ye file hai ya folder
        console.log("Folder:" + stats.isDirectory())
    });
});


//Check if file exists
app.get('/file-exists', (req, res) => {
    fs.access('./public/my.mp4', (err)=>{
        if(err){
            return res.status(500).send('File are not exists')
        }
        res.send("File Exists");
    })
})





























app.listen(3000, () => {
    console.log('App listening on port 3000!');
}); 








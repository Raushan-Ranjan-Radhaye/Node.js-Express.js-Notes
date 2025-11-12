const express = require('express');
const mysql2 = require('mysql2')
const app = express()

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())


//MySQL Connection
const db = mysql2.createConnection({
    host:"localhost",// local system par yahi hota hai
    user:"root",
    password: "",// null by defaults
    database:"contactsdb"// ye databse name hai
})

db.connect((err)=>{
    if(err){
        console.log("Error connection:" + err.stack)
        return;
    }
    console.log("MySQL Connected")
    db.query(`CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(255),
        address TEXT
    )`, (err) => {
        if(err) console.log("Error creating table: " + err);
    });
})

//Read All Contacts
app.get('/contacts', (req,res)=>{// databse se data ko lakar ye usko read karega
    db.query("SELECT * FROM contacts", (err, rows)=>{
        if(err) return res.status(500).send(err)
       res.send(rows);
    })
})


//Read Single Contacts
// We are get the one single value to help of id to used req.params methods
app.get('/contacts/:id', (req,res)=>{// databse se data ko lakar ye usko read karega
    db.query("SELECT * FROM contacts WHERE id = ?",[req.params.id], (err, row)=>{
        if(err) return res.status(500).send(err)
        if(row.length === 0) return res.status(404).send({message:"Contacts not Found."})
       res.send(row[0]);
    })
})




//Create Contacts
app.post('/contacts', (req,res)=>{// databse se data ko lakar ye usko read karega
    const {first_name, last_name, email, phone, address} = req.body// isko hamko ixactly usi tarh lena hai jisa datbase me table ka value ko liya hoi

    const sql = "INSERT INTO contacts (first_name, last_name, email, phone, address) VALUES(?,?,?,?,?)"
// ye is databse ke tables me se ye fields ko in sab se search karega aur (sql) varible me ja kar usko saved kaerag data field me insert hone par
    db.query(sql,[first_name, last_name, email, phone, address], (err, result)=>{
        if(err) return res.status(500).send(err)
        res.send({
            message:"Contact Created",
            id: result.insertId
        });
    })
})

// Updated Contact

app.put('/contacts/:id', (req,res)=>{// databse se data ko lakar ye usko read karega
    if (!req.body) return res.status(400).send({message: 'Request body is required'})

    const {first_name, last_name, email, phone, address} = req.body// isko hamko ixactly usi tarh lena hai jisa datbase me table ka value ko liya hoi

    const sql = "UPDATE contacts SET first_name=?, last_name=?, email=?, phone=?, address=? WHERE id=?"
// ye is databse ke tables me se ye fields ko in sab se search karega aur (sql) varible me ja kar usko saved kaerag data field me insert hone par
    db.query(sql,[first_name, last_name, email, phone, address, req.params.id], (err, result)=>{
        if(err) return res.status(500).send(err)
        if(result.affectedRows === 0 ) return res.status(404).send({message: 'Contact not found'})

        res.send({
            message:"Contact Updated",
        });
    })
})

//Delete Single Contacts
// We are delete the one single value to help of id to used req.params methods
app.delete('/contacts/:id', (req,res)=>{// databse se data ko lakar ye usko read karega
    db.query("DELETE FROM contacts WHERE id = ?",[req.params.id], (err, result)=>{
        if(err) return res.status(500).send(err)
        if(result.affectedRows === 0) return res.status(404).send({message:"Contact not found"})
        res.send({message: "Contact deleted successfully"});
    })
})


app.get('/', (req,res)=>{
    res.send('hello')
})


app.listen(3000, ()=>{
    console.log("sever are ready")
});


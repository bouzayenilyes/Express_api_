const express = require("express");
const mysql = require('mysql'); 


//Initialize express application
const app = express();
app.use(express.json()); 


// mysql connection setup

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "products",
});

// Connect to MYSQL Database check

db.connect((err) => {
    if (err) throw err;
    console.log("mysql connected .. ")
}); 


// Create a new user C

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const sql = "INSERT INTO prodcucts (name, price) VALUES (?, ?)";
    db.query(sql, [name, price], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertID, name, price })
    });
}); 

// get all products R

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM prodcucts";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    });
}); 



// Update a user

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;


    const sql = "UPDATE prodcucts SET name = ?, price = ? WHERE id = ? ";
    db.query(sql, [name, price, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send({ id, name, price })
    });
}); 

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM prodcucts WHERE id = ? ";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send({ message: 'Product deleted successfully' })
    });
}); 


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

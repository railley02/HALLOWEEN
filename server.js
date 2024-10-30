const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'story_pumpkin'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});
app.use(express.static('hallow'));
app.post('/stories', (req, res) => {
    const story = req.body.story;
    const query = 'INSERT INTO stories (content) VALUES (?)';
    db.query(query, [story], (err, result) => {
        if (err) throw err;
        res.status(201).send({ message: 'Story added successfully' });
    });
});

app.get('/stories', (req, res) => {
    const query = 'SELECT * FROM stories';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).send(results);
    });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));

require("dotenv").config();
const express = require('express');
const db = require('./db/server')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3009;

//middleware
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log('yeah our middleware');
    next();
})

//get all the users
app.get('/users', async (req, res) => {
    const results = await db.query('select * from users')
    console.log(results);
    res.status(200).json({
        status: 'success',
        data: {
            users: ['maruf', 'fahim']
        }
    })
})

//get a user
app.get('/users/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        data: {
            name: 'Rupok'
        }
    })
})

//create a user
app.post('/users', (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            name: 'Rupok'
        }
    })
})

//Update a user
app.put('/users/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            name: 'Rupok'
        }
    })
})

//Delete User
app.delete('/users/:id', (req, res) => {
    res.status(204).json({
        status: 'success'
    })
})
app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
  });
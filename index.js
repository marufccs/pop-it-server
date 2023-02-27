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
    // console.log('yeah our middleware');
    next();
})

//get all the users
app.get('/users', async (req, res) => {
    try {
        const results = await db.query('select * from users');
        // console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                users: results.rows
            }
        })
    } 
    catch(err){
        console.error(err)
    }
})

//get a user
app.get('/users/:id', async (req, res) => {
    try {
        const results = await db.query(
            'select * from users where id = $1', [req.params.id]
        );
        res.status(200).json({
            status: 'success',
            data: {
                user: results.rows[0]
            }
        })
    }
    catch(err){
        console.error(err)
    }

})

//create a user
app.post('/users', async (req, res) => {
    try{
        const results = await db.query('INSERT INTO users (first_name, last_name, email, instagram_username, gender) values ($1, $2,$3, $4, $5) returning *', [req.body.first_name, req.body.last_name, req.body.email, req.body.instagram_username, req.body.gender]);
        // console.log(results);
        res.status(201).json({
            status: 'success',
            data: {
                user: results.rows[0]
            }
        })
    }
    catch(err){
        console.error(err);
    }
})

//Update a user
app.put('/users/:id', async (req, res) => {
    try{
        const results = await db.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, instagram_username = $4, gender = $5 where id = $6 returning *', [req.body.first_name, req.body.last_name, req.body.email, req.body.instagram_username, req.body.gender, req.params.id]
        );
        // console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                user: results.rows[0]
            }
        })
    }
    catch(err){
        console.error(err)
    }
})

//Delete User
app.delete('/users/:id', async (req, res) => {
    try {
        const results = db.query('DELETE from users where id= $1', [req.params.id]);
        res.status(204).json({
            status: 'success'
        })
    }
    catch(err){
        console.error(err)
    }

})

//get all the contents
app.get('/contents', async (req, res) => {
    try {
        const results = await db.query('select * from contents');
        // console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                contents: results.rows
            }
        })
    } 
    catch(err){
        console.error(err)
    }
})

//get a content
app.get('/contents/:id', async (req, res) => {
    try {
        const results = await db.query(
            'select * from contents where id = $1', [req.params.id]
        );
        res.status(200).json({
            status: 'success',
            data: {
                content: results.rows[0]
            }
        })
    }
    catch(err){
        console.error(err)
    }

})

//create a content
app.post('/contents', async (req, res) => {
    try {
        const results = await db.query('INSERT INTO contents (user_id, title, content_tag, content_description, user_name, image_url, published_date) values ($1, $2, $3, $4, $5, $6, $7) returning *', [req.body.user_id, req.body.title, req.body.content_tag, req.body.content_description, req.body.user_name, req.body.image_url, req.body.published_date]);
        console.log(results);
        res.status(201).json({
            status: 'success',
            data: {
                contents: results.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
    }
})

//Update a content
app.put('/contents/:id', async (req, res) => {
    try{
        const results = await db.query(
            'UPDATE contents SET first_name = $1, last_name = $2, email = $3, instagram_username = $4, gender = $5 where id = $6 returning *', [req.body.first_name, req.body.last_name, req.body.email, req.body.instagram_username, req.body.gender, req.params.id]
        );
        // console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                content: results.rows[0]
            }
        })
    }
    catch(err){
        console.error(err)
    }
})

//Delete a Content
app.delete('/contents/:id', async (req, res) => {
    try {
        const results = db.query('DELETE from contents where id= $1', [req.params.id]);
        res.status(204).json({
            status: 'success'
        })
    }
    catch(err){
        console.error(err)
    }

})



app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
  });
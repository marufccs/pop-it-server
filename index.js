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
        const results = await db.query('INSERT INTO users (first_name, last_name, email, instagram_username, gender, role) values ($1, $2,$3, $4, $5, $6) returning *', [req.body.first_name, req.body.last_name, req.body.email, req.body.instagram_username, req.body.gender, req.body.role]);
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

app.get('/contents', async (req, res) => {
    try {
        const results = await db.query('select * from contents');
        const contents = results.rows.map(content => ({
            ...content,
            published_date: new Date(content.published_date)
        }));
        res.status(200).json({
            status: 'success',
            results: contents.length,
            data: {
                contents: contents
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
        const results = await db.query('INSERT INTO contents (user_id, title, content_tag, content_description, user_name, image_url, published_date) values ($1, $2, $3, $4, $5, $6, NOW()) returning *', [req.body.user_id, req.body.title, req.body.content_tag, req.body.content_description, req.body.user_name, req.body.image_url, ]);
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
    try {
      const { title, content_description, content_tag } = req.body;
      const results = await db.query(
        'UPDATE contents SET title = $1, content_description = $2, content_tag = $3 WHERE id = $4 RETURNING *',
        [req.body.title, req.body.content_description, req.body.content_tag, req.params.id]
      );
      res.status(200).json({
        status: 'success',
        data: {
          contents: results.rows[0]
        }
      })
    } catch (err) {
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

//Like the content 

app.post('/like-content', async (req, res) => {
    const { user_id, content_id } = req.body;
    const timestamp = new Date();
    try {
      // Insert a new row in the likes table
      const result = db.query('INSERT INTO likes (user_id, content_id, timestamp) VALUES ($1, $2, $3) RETURNING *', [user_id, content_id, timestamp]);
      
      // Get the updated number of likes for the specified content ID
      const likesResult = await db.query('SELECT COUNT(*) FROM likes WHERE content_id = $1', [content_id]);
      const numLikes = likesResult.rows[0].count;
  
      res.status(200).json({ numLikes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

//Get the number of likes for a content
app.get('/like-content', async (req, res) => {
    const { content_id } = req.query;
    if (isNaN(content_id)) {
      res.status(400).json({ error: 'Invalid content ID' });
      return;
    }
    try {
      // Count the number of likes for the specified content ID
      const result = await db.query('SELECT COUNT(*) FROM likes WHERE content_id = $1', [content_id]);
      const numLikes = result.rows[0].count;
      res.status(200).json({ numLikes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });



app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
  });
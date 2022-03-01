const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});



// Add Post
router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});



async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    // User au lieu encant123
    ('mongodb+srv://encant123:encant123@encantdb.cqhf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    return client.db('encantdb').collection('posts');
}




module.exports = router;

// Aller voir jwt / authentification headers pour sécuriser l'api. Sinon utiliser session mais moins efficace
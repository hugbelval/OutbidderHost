const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});


// Add User
router.post('/', async (req, res) =>{
    const users = await loadUsersCollection();
    console.log("add user"+req.body.name);
    await users.insertOne({
        // Inclure tous les attributs du user
        name: req.body.name
    });
    res.status(201).send();
});

// Delete User
router.delete('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    await users.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});


async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://encant123:encant123@encantdb.cqhf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    return client.db('encantdb').collection('users');
}




module.exports = router;

// Aller voir jwt / authentification headers pour sécuriser l'api. Sinon utiliser session mais moins efficace
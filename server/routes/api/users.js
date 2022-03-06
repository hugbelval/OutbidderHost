const express = require('express');
// const mongodb = require('mongodb');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../../models/users');


// Get Users
router.get('/', async (req, res) => {
    User.find()
    .then(posts => {
        res.send(posts);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    })
});

exports.createPost = (req, res, next) => {
    
  }

// Add User
router.post('/', async (req, res) =>{
    console.log("Body: %j", req.body);
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    console.log(username);
  
    // Crée un nouvel article avec les informations du formulaire
    const user = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      phone: phone
    });
  
    // Enregistre l'article dans la base de données
    // Utilisation de la méthode save() qui retourne une promesse
    user.save()
      .then( () => {
        res.status(201).send();
      })
      .catch(err => {
        console.log('err', err);
      });
});

// Delete User
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({_id: id})
    .then(() => {
        res.status(200).send();
    })
    .catch((err) => {
        console.log('err', err);
    });
});
/*
// Changer en mongoose
async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://encant123:encant123@encantdb.cqhf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    return client.db('encantdb').collection('users');
}
*/

module.exports = router;

// Aller voir jwt / authentification headers pour sécuriser l'api. Sinon utiliser session mais moins efficace
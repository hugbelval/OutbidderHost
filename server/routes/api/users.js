const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// const mongodb = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get Users
router.get('/', async (req, res) => {
    //decodedToken = jwt.verify(token, process.env.SECRET_JWT);
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
router.post('/signup', async (req, res, next) =>{
    console.log("Body: %j", req.body);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    
    console.log("Body ok");
    bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
        console.log("Creating user");
        const user = new User({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            phone: phone
        });
        return user.save();
    })
    .then(user => {
        console.log("user created");
        res.status(201).json({message: "Utilisateur créé !", user: user});
    })
    .catch(err => {
        console.log("Catch serveur creation")
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode, userdata:req.body});
    })
});

router.post('/login', async (req, res, next) =>{
    console.log("Body: %j", req.body);
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    User.findOne({email:email})
    .then(user => {
        console.log("Inside findone");
        if(!user) {
            console.log("Not found");
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            console.log("Wrong password")
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        // Création du token JWT
        const token = jwt.sign(
            {
                email: loadedUser.email,
                username:loadedUser.username,
                firstname: loadedUser.firstname,
                lastname: loadedUser.lastname,
                phone: loadedUser.phone,
                userId: loadedUser._id.toString()
            },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: '1h' }
        );
        res.status(200).json({token:token});
    }).catch(err =>{
        console.log("Server catch");
        if (!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode, userdata:req.body});
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
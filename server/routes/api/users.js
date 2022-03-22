const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: require('find-config')('.env') });
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


// Add User
router.post('/signup',
body('email').isLength({min:1}).withMessage("L'email est requis").isEmail().withMessage("L'email est non valide").custom(value => {
    return User.findOne({email:value}).then(user => {
      if (user) {
        return Promise.reject('Email déja utilisé');
      }
    });}),
body('password').isLength({min: 8, max: 40}).withMessage("Le mot de passe doit contenir de 8 à 40 caractères")
.isAlphanumeric().withMessage("Le mot de passe doit contenir seulement lettres et chiffres"),
body('firstname').isLength({min:1}).withMessage("Le prénom est requis").isLength({max:40}).withMessage("Le prénom doit contenir moins de 40 caractères")
.matches(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/).withMessage("Le prénom doit être alphanumérique"),
body('lastname').isLength({min:1}).withMessage("Le nom est requis").isLength({max:40}).withMessage("Le nom doit contenir moins de 40 caractères")
.matches(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/).withMessage("Le nom doit être alphanumérique"),
body('phone').isLength({min:10, max:10}).withMessage("Le téléphone doit contenir 10 chiffres").matches(/^[0-9]*$/).withMessage("Le téléphone doit contenir seulement des chiffres"),
async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    
    const errors = validationResult(req).mapped();
    if(!(Object.keys(errors).length === 0)){
        const error = new Error("Requête erronée");
        error.statusCode = 400;
        error.data = {errors: errors, userdata:req.body};
        return next(error);
    }
    bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
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
        console.log("Catch serveur creation");
        err.message = "Une erreur est survenue lors de la création du compte";
        next(err);
    });
});

router.post('/login',  async (req, res, next) => {
    console.log("Body: %j", req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    let loadedUser;
    User.findOne({email:email})
    .then(user => {
        console.log("Inside findone");
        if(!user) {
            console.log("User Not found");
            const error = new Error('La combinaison email/mot de passe est incorrecte');
            error.data = {userdata: req.body};
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            console.log("Wrong password");
            const error = new Error('La combinaison email/mot de passe est incorrecte');
            error.data = {userdata: req.body};
            error.statusCode = 401;
            throw error;
        }
        // Création du token JWT
        const token = jwt.sign(
            {
                email: loadedUser.email,
                firstname: loadedUser.firstname,
                lastname: loadedUser.lastname,
                phone: loadedUser.phone,
                userId: loadedUser._id.toString()
            },
            `${process.env.SECRET_JWT}`,
            { expiresIn: '1h' }
        );
        res.status(200).json({token:token});
    }).catch(err =>{
        console.log("Server catch");
        next(err);
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
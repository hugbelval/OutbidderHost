const express = require('express');
const ObjectUser = require('../../models/object');
const multer = require("multer");
let imageName;
const { body, validationResult } = require('express-validator');
const fs = require("fs");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../encant/encant/public/img/')
    },
    filename: function(req, file, cb){
        imageName = new Date().getTime() + file.originalname;
        cb(null, imageName)
    }
});

const unlinkAsync = promisify(fs.unlink)

const upload = multer({storage: storage});

const router = express.Router();

router.get('/', async (req, res) => {
    ObjectUser.find()
    .then(objects => {
        res.send(objects);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    })
});

router.get('/:objectId', async (req, res) => {
    ObjectUser.findById(req.params.objectId)
    .then(object => {
        res.send(object);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    })
})

router.post('/ajouter',upload.single('objectImage'),
    body("name").isLength({min:1}).withMessage("Le nom ne peut pas être vide.")
    .matches(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/).withMessage("Le nom doit être alphanumérique."),
    body("description").isLength({max:2000}).withMessage("La description ne peut être plus de 2000 caractères.")
    .matches(/^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/).withMessage("La description doit être alphanumérique."),
    body("endDate")
    .custom(value => {
        if(new Date(value) <= new Date()){
            return Promise.reject("La date sélectionnée doit être plus grande que celle d'aujourd'hui.")
        } else if (value == "Invalid Date"){
            return Promise.reject("Une date doit être sélectionnée.")
        }
    }),
    body("objectImage")
    .custom(value => {
        if(typeof value == "string"){
            return Promise.reject("Une image doit être ajoutée à votre item en vente.")
        }
    }),
    body("startBid").isLength({min:1}).withMessage("Il faut mettre un montant de base à l'item."),
    async (req, res) => {
    const errors = validationResult(req).mapped();
    for (const key of Object.keys(errors)) {
        if(errors[key].msg == "Invalid value"){
            delete errors[key]
        }
    }
    if(Object.keys(errors).length != 0){
        if(typeof req.body.objectImage != "string"){
            await unlinkAsync(req.file.path)
        }
        return res.status(400).json({errors: errors, objectData:req.body});
    }
    new ObjectUser ({
        name: req.body.name,
        endDate: req.body.endDate,
        description: req.body.description,
        seller: jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET_JWT).userId,
        currentBid: req.body.startBid,
        image: imageName
    })
    .save()
    .then(() => {
        res.status(201).send()
    })
    .catch(err => {
        console.log('err', err);
    });
    
})

module.exports = router;
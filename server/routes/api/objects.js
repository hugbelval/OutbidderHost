const express = require('express');
const Object = require('../../models/object');
const multer = require("multer");
let imageName;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../encant/encant/public/img/')
    },
    filename: function(req, file, cb){
        imageName = new Date().getTime() + file.originalname;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage});

const router = express.Router();

router.get('/', async (req, res) => {
    Object.find()
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
    Object.findById(req.params.objectId)
    .then(object => {
        res.send(object);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    })
})

router.post('/ajouter',upload.single('objectImage'),async (req, res) => {
    new Object ({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        seller: req.body.seller,
        currentBid: req.body.currentBid,
        image: imageName
    })
    .save()
    .then(result => {
        res.status(201).send()
    })
    .catch(err => {
        console.log('err', err);
    });
})

module.exports = router;
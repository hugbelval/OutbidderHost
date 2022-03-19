const express = require('express');
const Object = require('../../models/object');

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

module.exports = router;
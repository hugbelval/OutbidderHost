const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: require('find-config')('.env') });

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, 'public')));

const objects = require('./routes/api/objects');
const users = require('./routes/api/users');
app.all('*', function(req, res, next) {
  if (req.url === '/users/signup' || req.url === '/users/login') return next();
  else {
    console.log("Verifying jwt");
    const authHeader = req.headers["authorization"];
    if (authHeader.startsWith("Bearer ")){
      const token = authHeader.split(" ")[1];
      console.log(token)
      if (token && jwt.verify(token, process.env.SECRET_JWT)) return next();
    }
    return res.sendStatus(401);
  }
});
app.use('/users', users);
app.use('/encant', objects);

// Handle production
if(process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'))
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

mongoose
  .connect('mongodb+srv://encant123:encant123@encantdb.cqhf2.mongodb.net/encantdb?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(err => console.log(err));

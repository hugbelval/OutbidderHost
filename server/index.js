const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, 'public')));

const posts = require('./routes/api/posts');
const users = require('./routes/api/users');

app.use('/users', users);
app.use('/encant', posts);

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

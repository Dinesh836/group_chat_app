const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/shop", {useNewUrlParser: true, useUnifiedTopology: false})
.then(result => {
    app.listen(3000, () => {
        console.log(`App listening on port 3000.`)
    });
}).catch(err => console.log(err))

// Define a simple route

app.get('/', (req, res) => {
  res.send('Hello World!');
});


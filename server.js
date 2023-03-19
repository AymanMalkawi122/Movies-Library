"use strict";
const express = require('express');
const app = express();
const PORT = 3003;
let Data = require('./Movie Data/data.json');


function MovieObject(obj) {
    this.title = obj.title;
    this.poster_path = obj.poster_path;
    this.overview = obj.overview;
}

app.get('/', (req, res) => {
    if (req.path != "/")
        res.status(404).send('Not Found');

    else {
        try {
            res.send(new MovieObject(Data));
        } catch (error) {
            res.status(500).send({
                "status": 500,
                "responseText": "Sorry, something went wrong"
            });
        }
    }

})

app.get('/favorite', (req, res) => {
    if (req.path != "/favorite")
        res.status(404).send('Not Found');

    else {
        try {
            res.send("Welcome to Favorite Page");
        } catch (error) {
            res.status(500).send({
                "status": 500,
                "responseText": "Sorry, something went wrong"
            });
        }
    }
})

app.listen(PORT, () => {
    console.log(`port:${PORT}`);
})
"use strict";

const express = require('express');
const Data = require('./Movie Data/data.json');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT; 
const API_KEY = process.env.API_KEY;

function MovieObject(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.poster_path = obj.poster_path;
    this.overview = obj.overview;
}

app.get('/', (req, res) => {
    try {
        res.send(new MovieObject(Data));
    } catch (error) {
        res.status(500).send({
            "status": 500,
            "responseText": "Sorry, something went wrong"
        });
    }
})

app.get('/favorite', (req, res) => {
    try {
        res.send("Welcome to Favorite Page");
    } catch (error) {
        res.status(500).send({
            "status": 500,
            "responseText": "Sorry, something went wrong"
        });
    }
})

app.get('/trending', (req, res) => {
    let APIreq=`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    axios.get(APIreq)
        .then(function (response) {
            res.send(response.data.results.map(Item => {
                return new MovieObject(Item);
            })
            );
        })
        .catch(function (error) {
            res.status(500).send({
                "status": 500,
                "responseText": error
            });
            console.log(error);
        })
})

app.get('/search', (req, res) => {
    let query=req.query.name;
    let APIreq = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
    axios.get(APIreq)
        .then(function (response) {
            res.send(response.data.results.map(Item => {
                return new MovieObject(Item);
            })
            );
        })
        .catch(function (error) {
            res.status(500).send({
                "status": 500,
                "responseText": error
            });
            console.log(error);
        })
})

app.get('/upcoming', (req, res) => {
    let APIreq = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
    axios.get(APIreq)
        .then(function (response) {
            res.send(response.data.results.map(Item => {
                return new MovieObject(Item);
            })
            );
        })
        .catch(function (error) {
            res.status(500).send({
                "status": 500,
                "responseText": error
            });
            console.log(error);
        })
})

app.get('/discover', (req, res) => {
    let APIreq = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
    axios.get(APIreq)
        .then(function (response) {
            res.send(response.data.results.map(Item => {
                return new MovieObject(Item);
            })
            );
        })
        .catch(function (error) {
            res.status(500).send({
                "status": 500,
                "responseText": error
            });
            console.log(error);
        })
})

app.get('*', (req, res) => {
    res.status(404).send('404 Page not found');
});

app.listen(PORT, () => {
    console.log(`port:${PORT}`);
})
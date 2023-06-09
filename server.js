"use strict";

const express = require('express');
const app = express();

const cors = require('cors');

const Data = require('./Movie Data/data.json');
const axios = require('axios');
require('dotenv').config();
app.use(express.json());
app.use(cors());

const { Client } = require('pg')
let url = process.env.URL;
const client = new Client(url);

let tableName = "movies";
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

function MovieObject(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.poster_path = obj.poster_path;
    this.overview = obj.overview;
}

function errorHadnler(req, res, err = "Sorry, something went wrong") {
    res.status(500).send({
        "status": 500,
        "responseText": err
    });
    console.log(err);
}

function thenHadnler(req, serverRes, apiRes) {
    serverRes.send(apiRes.data.results.map(Item => {
        return new MovieObject(Item);
    })
    );
}



app.get('/', (req, res) => {
    try {
        res.send(new MovieObject(Data));
    } catch {
        errorHadnler(req, res);
    }
})

app.get('/favorite', (req, res) => {
    try {
        res.send("Welcome to Favorite Page");
    } catch (error) {
        errorHadnler(req, res);
    }
})
//API endpoints
app.get('/trending', (req, res) => {
    let APIreq = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    axios.get(APIreq)
        .then(function (response) {
            thenHadnler(req, res, response);
        })
        .catch(function (error) {
            errorHadnler(req, res, error);
        })
})

app.get('/search', (req, res) => {
    let query = req.query.name;
    let APIreq = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
    axios.get(APIreq)
        .then(function (response) {
            thenHadnler(req, res, response);
        })
        .catch(function (error) {
            errorHadnler(req, res, error);
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
            thenHadnler(req, res, response);
        })
        .catch(function (error) {
            errorHadnler(req, res, error);
        })
})
//Databease endpoints
app.post('/addMovie', (req, res) => {
    try {
        console.log(req.body);
        let { title, release_date, poster_path, overview,comment } = req.body;
        let values = [title,release_date,poster_path,overview,comment]
        let query = `insert into ${tableName} (title,release_date,poster_path,overview,comment) values ($1,$2,$3,$4,$5) returning *`;
        client.query(query,values)
        .then((queryRes)=>{
            res.status(201).json(queryRes.rows)})
            .catch()
    } catch (err) {
        errorHadnler(req, res, err);
    }
})

app.get('/getMovies', (req, res) => {
    try {
        let query = `select * from ${tableName}`;
        client.query(query)
        .then((queryRes)=>{
            res.json(queryRes.rows)})
        .catch()
    } catch (err) {
        errorHadnler(req, res, err);
    }
})

app.post('/DELETE/:id', (req, res) => {
    try {
        let query = `delete from ${tableName} WHERE id=${req.params.id}`;
        client.query(query)
        .then((queryRes)=>{
            res.status(204).send("done");
        })
        .catch()
    } catch (err) {
        errorHadnler(req, res, err);
    }
})

app.post('/UPDATE/:id', (req, res) => {
    try {
        let query = `update ${tableName} set comment=$1 where id=${req.params.id} returning *`;
        client.query(query,[req.body.comment])
        .then((queryRes)=>{
            res.json(queryRes.rows)
        })
        .catch()
    } catch (err) {
        errorHadnler(req, res, err);
    }
})

app.get('/getMovie/:id', (req, res) => {
    try {
        let query = `select * from ${tableName} where id=${req.params.id}`;
        client.query(query)
        .then((queryRes)=>{
            res.json(queryRes.rows)})
        .catch()
    } catch (err) {
        errorHadnler(req, res, err);
    }
})



app.get('*', (req, res) => {
    res.status(404).send('404 Page not found');
});

client
    .connect().then(() => {
        app.listen(PORT, () => {
            console.log(`port:${PORT}`);
        }
        )
    })
    .catch(() => {
        console.log(`error when connceting to PORT:${PORT}`);
    })

const express = require('express');
const Posts = require('./postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
    Posts.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log('get posts error', err);
            res.status(500).json({ errorMessage: "Unable to retrieve posts" })
        })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;
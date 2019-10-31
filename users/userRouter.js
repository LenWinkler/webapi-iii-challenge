const express = require('express');

const Users = require('./userDb')

const router = require('express').Router();

router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('add user error', err);
            res.status(500).json({ errorMessage: "Unable to add user to database" })
        })
});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('get users error', err);
            res.status(500).json({ errorMessage: "Unable to retrieve users" })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    Users.getById(req.user.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error retrieving user', err);
            res.status(500).json({ errorMessage: "Error retrieving user" })
        })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
        .then(response => {
            if(response) {
                console.log(response);
                req.user = response;
                next();
            } else {
                res.status(400).json({ message: "invalid user id" })
        }
    })
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "Missing user data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "Missing required name field" })
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "Missing post data" })
    } else if(!req.body.text) {
        res.status(400).json({ message: "Missing required text field" })
    } else {
        next();
    }
};

module.exports = router;

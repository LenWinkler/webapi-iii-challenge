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

router.get('/:id', validatePostId, (req, res) => {
    Posts.getById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('get post by id error', err);
            res.status(500).json({ errorMessage: "Unable to retrieve post" })
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    Posts.remove(req.params.id)
        .then(response => {
            res.status(200).json({ message: "Post deleted successfully" })
        })
        .catch(err => {
            console.log('delete post error', err);
            res.status(500).json({ errorMessage: "Unable to delete post" })
        })
});

router.put('/:id', validatePostId, (req, res) => {
    Posts.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json({ message: "Post updated successfully"})
        })
        .catch(err => {
            console.log('error updating post', err);
            res.status(500).json({ errorMessage: "Unable to update post" })
        })
});

// custom middleware

function validatePostId(req, res, next) {
    Posts.getById(req.params.id)
        .then(response => {
            if(response) {
                next();
            } else {
                res.status(404).json({ errorMessage: "Post with that ID does not exist" })
            }
        })
};

module.exports = router;
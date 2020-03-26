const express = require('express');

const server = express();

const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/userRouter');

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)

  next();
};

server.use(express.json());
server.use(logger);

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

module.exports = server;

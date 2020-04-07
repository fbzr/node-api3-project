const express = require('express');
const logger = require('./middleware/logger');
const validateUserId = require('./middleware/validateUserId');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('/:id', validateUserId, (req, res) => {
  res.json({ user: req.user });
});

module.exports = server;

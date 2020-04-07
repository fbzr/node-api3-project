const express = require('express');
const logger = require('./middleware/logger');
const validateUserId = require('./middleware/validateUserId');
const validateUser = require('./middleware/validateUser');
const validatePost = require('./middleware/validatePost');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/users', require('./users/userRouter'));
server.use('/api/posts', require('./posts/postRouter'));

module.exports = server;

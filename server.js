const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const errorMiddleware = require('./middleware/error');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/users', require('./users/userRouter'));
server.use('/api/posts', require('./posts/postRouter'));

// error middleware
server.use(errorMiddleware);

module.exports = server;

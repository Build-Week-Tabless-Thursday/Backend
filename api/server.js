const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routes/auth-router.js');
const tabsRouter = require('./routes/tabs-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', authRouter);
server.use('/tabs', tabsRouter);


module.exports = server;
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const authRouter = require("./routes/auth-router.js");
const tabsRouter = require("./routes/tabs-router.js");
const tabRouter = require("./routes/tab-router.js");
const userRouter = require("./routes/user-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(compression());
server.use(express.json());

server.use("/", authRouter);
server.use("/me", userRouter);
server.use("/tabs", tabsRouter);
server.use("/tab", tabRouter);

module.exports = server;

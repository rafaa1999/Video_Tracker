const express = require("express");

const UserRouter = require('./user/UserRouter');
const ErrorHandler = require('./error/ErrorHandler');
const VideoRouter = require('./video/VideoRouter');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(UserRouter);
app.use(VideoRouter);

app.use(ErrorHandler);

module.exports = app;
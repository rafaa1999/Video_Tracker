const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserService = require('./UserService');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/users', async (req, res, next) => {
  const response = await UserService.getAllUsers(req.body);
  res.send(response);
  next();
});

router.use(express.json());

router.post('/users/login', async (req, res, next) => {
  const response = await UserService.createUser(req.body);
  res.redirect(`http://localhost:5500?id=${response._id}`);
  next();
});

module.exports = router;
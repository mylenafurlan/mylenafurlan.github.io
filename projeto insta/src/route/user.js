var express = require('express');
var router = express.Router();
var userController = require('../control/userControl.js');
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

router.get('/', async function (req, res, next) {
  var users = await userController.getUsers();
  console.log(users)
  return res.send(users);
});

router.post('/', async function (req, res, next) {
  var response = await userController.createUser(req.body);
  if (response == "O email informado já existe!") {
    return res.status(400).send(response);  // 400 para bad 
  }
  else if (response == null) {
    return res.status(400).send("Erro ao criar usuário!");
  }
  return res.status(201).send(response); // 201 para created
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Informe email e senha!");
  }
  var response = await userController.login(email, password);
  if (response == "Usuário não encontrado!") {
    return res.status(403).send(response); // 403 para forbidden
  }
  return res.send({ token: response });
});

router.post('/data', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async function (req, res, next) {
  return res.send(req.auth);

});

module.exports = router;

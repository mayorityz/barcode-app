const express = require("express");
const Router = express.Router();
const controller = require("./../controllers/users.controller");

Router.post("/login", controller.login);
Router.post("/createuser", controller.createuser);

module.exports = Router;

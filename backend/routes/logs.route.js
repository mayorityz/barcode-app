const express = require("express");
const Router = express.Router();
const controller = require("./../controllers/logs.controller");

Router.post("/newLog", controller.addLog);

module.exports = Router;

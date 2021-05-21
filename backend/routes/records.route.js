const express = require("express");
const Router = express.Router();
const controller = require("./../controllers/records.controller");

Router.post("/addition", controller.addition);
Router.post("/fetchrecord", controller.fetchrecord);

module.exports = Router;

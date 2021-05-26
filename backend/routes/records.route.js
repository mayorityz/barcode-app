const express = require("express");
const Router = express.Router();
const controller = require("./../controllers/records.controller");

Router.post("/addition", controller.addition);
Router.post("/fetchrecord", controller.fetchrecord);
Router.get("/getAllRecords", controller.fetchAll);

module.exports = Router;

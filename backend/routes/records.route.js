const express = require("express");
const Router = express.Router();
const controller = require("./../controllers/records.controller");

Router.post("/addition", controller.addition);
Router.post("/fetchrecord", controller.fetchrecord);
Router.get("/getAllRecords", controller.fetchAll);
Router.get("/upload", controller.upload);
Router.post("/fetchrecordrange", controller.queryDateRange);

module.exports = Router;

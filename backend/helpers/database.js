require("dotenv").config();
const db = require("mongoose");

var DB_POOL = process.env.NODE_ENV
  ? process.env.MONGOLIVE
  : process.env.MONGODBURL;

console.log(process.env.NODE_ENV);

const connection = db.connect(DB_POOL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = connection;

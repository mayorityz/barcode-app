const DB = require("mongoose");

const recordSchema = new DB.Schema({
  barcode: String,
  model: String,
  brand: String,
  serial: String,
  outlet: String,
  owner: String,
  phone: String,
  chiller: String,
  latitude: String,
  longitude: String,
  address: String,
});

const Records = DB.model("records", recordSchema);

module.exports = Records;

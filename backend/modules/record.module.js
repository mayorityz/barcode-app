const DB = require("mongoose");

const recordSchema = new DB.Schema({
  barcode: String,
  reference: String,
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
  salesArea: String,
  assetType: String,
  assetName: String,
  brandName: String,
  channel: String,
  outletCode: String,
  tier: String,
  CT: String,
  dataset: String,
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  date: {
    type: Date,
    default: Date.now,
  },
  VStatus: String,
  remark: String,
  tradeverif: String,
});

const Records = DB.model("records", recordSchema);

module.exports = Records;

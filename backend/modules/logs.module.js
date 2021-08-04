const DB = require("mongoose");

const LogSchema = new DB.Schema({
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
  salesArea: String,
  assetType: String,
  assetName: String,
  brandName: String,
  channel: String,
  outletCode: String,
  tier: String,
  latitude: String,
  longitude: String,
  primary: String,
  secondary: {
    type: String,
    default: "none",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  remark: String,
  user: String,
});

const Logs = DB.model("logs", LogSchema);

module.exports = Logs;

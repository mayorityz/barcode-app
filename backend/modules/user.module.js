const DB = require("mongoose");

const userSchema = new DB.Schema({
  username: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = DB.model("users", userSchema);

module.exports = Users;

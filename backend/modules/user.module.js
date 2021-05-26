const DB = require("mongoose");

const userSchema = new DB.Schema({
  username: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status : {
  	default : 0,
  	type : String,
  }
});

const Users = DB.model("users", userSchema);

module.exports = Users;

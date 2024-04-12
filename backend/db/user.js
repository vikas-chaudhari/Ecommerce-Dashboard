const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/ecommerce";

mongoose.connect(url);

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const usersModel = new mongoose.model("users", usersSchema);

module.exports = usersModel;

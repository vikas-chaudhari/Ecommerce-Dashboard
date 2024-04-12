const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/ecommerce";
mongoose.connect(url);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  userId: String,
  company: String,
});
const productModel = new mongoose.model("products", productSchema);
module.exports = productModel;

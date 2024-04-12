const express = require("express");
const usersModel = require("./db/user");
const productModel = require("./db/product");
const cors = require("cors");
app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const Jwt = require("jsonwebtoken");
const jwtkey = "ecomm"; // this key should be kept confidential
// otherwise anyone can generate tokens from it and get illegal access.
// or keep this key in .env file

app.get("/", (req, resp) => {
  resp.send("homepage");
});

app.post("/register", async (req, resp) => {
  const data = new usersModel(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  console.log(result);
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  try {
    if (req.body.email && req.body.password) {
      let data = await usersModel.findOne(req.body).select({ password: 0 });
      // or
      // let data = await usersModel.find(req.body).select("-password");
      if (data) {
        Jwt.sign({ data }, jwtkey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            resp.send({ result: "something went wrong." });
          }
          resp.send({ data, auth: token });
        });
      } else {
        resp.send({ result: "No user Found" });
      }
    } else {
      resp.send({ result: "please enter both fields." });
    }
  } catch (error) {
    console.log("ERROR : ", error);
    throw error;
  }
});

app.post("/add-product", async (req, resp) => {
  let data = new productModel(req.body);
  let result = await data.save();
  resp.send(result);
});

app.get("/get-products", async (req, resp) => {
  let data = await productModel.find({});
  if (data == []) {
    resp.send({ result: "No Products found" });
  } else {
    resp.send(data);
  }
});

app.delete("/delete/:id", async (req, resp) => {
  const data = await productModel.deleteOne({ _id: req.params.id });
  resp.send(data);
});

app.get("/delete/:id", async (req, resp) => {
  console.log(req.params.id);
  let data = await productModel.findOne({ _id: req.params.id });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

app.put("/delete/:id", async (req, resp) => {
  let result = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let data = await productModel.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });

  resp.send(data);
});

app.listen(port);

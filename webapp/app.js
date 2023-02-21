const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/item.js");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const mongodb = "mongodb://127.0.0.1:27017/Lab2";
// const mongodb = "mongodb+srv://lunmars:lunmars1@cluster0.pnfpvdv.mongodb.net/cello?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(3000);
  })
  .catch((e) => console.log("ERROR: " + e));

app.get("/", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { item: result });
    })
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/add-item", (req, res) => {
  res.render("addItem");
});

app.post("/items", (req, res) => {
  console.log(req.body);
  const item = Item(req.body);
  item
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => console.log("ERROR: " + e));
});

app.use((req, res) => {
  res.render("error");
});

// app.get("/create-item", (req, res) => {
//   const item = new Item({
//     name: "Galaxy S23",
//     price: 1200,
//   });

//   item
//     .save()
//     .then((result) => res.send(result))
//     .catch((e) => console.log("ERROR: " + e));
// });

// app.get("/get-item", (req, res) => {
//   Item.find()
//     .then((result) => res.send(result))
//     .catch((e) => console.log("ERROR: " + e));
// });
// app.get("/get-item-by-id", (req, res) => {
//   Item.findById("63ebc338807ea1c35b13b311")
//     .then((result) => res.send(result))
//     .catch((e) => console.log("ERROR: " + e));
// });

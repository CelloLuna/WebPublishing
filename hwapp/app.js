const express = require("express");
const mongoose = require("mongoose");
const mongodb = "mongodb+srv://lunmars:lunmars1@cluster0.pnfpvdv.mongodb.net/cello?retryWrites=true&w=majority";
const app = express();
var title;
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongoose connected!");
    app.listen(3000);
  })
  .catch((e) => console.log("ERROR:" + e));

app.get("/", (req, res) => {
  title = "Home";
  res.render("index", { title });
});
app.get("/services", (req, res) => {
  title = "Services";
  res.render("services", { title });
});
app.get("/about", (req, res) => {
  title = "About Us!";
  res.render("about", { title });
});
app.get("/contact", (req, res) => {
  title = "Contact Us!";
  res.render("contact", { title });
});

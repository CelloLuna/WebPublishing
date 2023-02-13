const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.listen(3000);

const item = [
  { name: "IPhone 8", price: 800 },
  { name: "Pixel 7", price: 600 },
  { name: "Galxy S23", price: 1200 },
  { name: "Galaxy Z-Flip", price: 1500 },
];

app.get("/", (req, res) => {
  res.render("index", { item });
});

app.get("/add-item", (req, res) => {
  res.render("addItem");
});
app.use((req, res) => {
  res.render("error");
});

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student.js");
const mongodb = "mongodb://127.0.0.1:27017/Student_Management";
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
app.get("/student", (req, res) => {
  title = "Student Page";
  res.render("student", { title });
});
app.get("/add-student", (req, res) => {
  const student = new Student({
    Stud_ID: 1,
    stfname: "Marcello",
    stlname: "Luna",
    stcourse: "CWEB",
    styear: 2,
    stcontact: "phone",
    stage: 20,
  });

  student
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/course", (req, res) => {
  title = "Course Page";
  res.render("course", { title });
});
app.get("/staff", (req, res) => {
  title = "Staff page";
  res.render("staff", { title });
});

function addCourse() {
  item
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
}

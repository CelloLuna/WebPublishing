const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student.js");
const Course = require("./models/course.js");
const Staff = require("./models/staff.js");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const mongodb = "mongodb://127.0.0.1:27017/Student_Management";
var title;

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

//STUDENT PAGES
app.get("/student", (req, res) => {
  title = "Student Page";
  res.render("student", { title });
});
app.get("/add-student", (req, res) => {
  const student = new Student({
    Stud_ID: 5,
    stfname: "Thomas",
    stlname: "Lennon",
    stcourse: "CWEB",
    styear: 2,
    stcontact: "phone",
    stage: 21,
  });
  student
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/studentId", (req, res) => {
  Student.findById("63f641830a4cb121efb865c6")
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/allStudents", (req, res) => {
  Student.find()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/studentId", (req, res) => {
  Student.findById("63f641830a4cb121efb865c6")
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.post("/students", (req, res) => {
  console.log(req.body);
  const student = Student(req.body);
  student.save().then(() => {
    res.redirect("/studentsView");
  });
});
app.get("/studentsView", (req, res) => {
  title = "View";
  Student.find().then((result) => {
    res.render("studentsView", { title, student: result });
  });
});

//COURSE PAGES
app.get("/course", (req, res) => {
  title = "Course Page";
  res.render("course", { title });
});
app.get("/add-course", (req, res) => {
  const course = new Course({
    course_ID: 5,
    course_desc: "Cyber Security",
    units: 12,
    course_remarks: "CSEC",
  });

  course
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/allCourses", (req, res) => {
  Course.find()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/courseId", (req, res) => {
  Course.findById("63f6471e493dd44fb09aaae1")
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/coursesView", (req, res) => {
  title = "View";
  Course.find().then((result) => {
    res.render("coursesView", { title, course: result });
  });
});
app.post("/courses", (req, res) => {
  console.log(req.body);
  const course = Course(req.body);
  course.save().then(() => {
    res.redirect("/coursesView");
  });
});

//STAFF PAGES
app.get("/staff", (req, res) => {
  title = "Staff page";
  res.render("staff", { title });
});
app.get("/add-staff", (req, res) => {
  const staff = new Staff({
    staff_ID: 5,
    fname: "Theresa",
    lname: "T",
    contact: "Phone",
    address: "2123456 st",
    gender: "F",
  });

  staff
    .save()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/allStaff", (req, res) => {
  Staff.find()
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/staffId", (req, res) => {
  Staff.findById("63f64922780415004ee2eac0")
    .then((result) => res.send(result))
    .catch((e) => console.log("ERROR: " + e));
});
app.get("/staffView", (req, res) => {
  title = "View";
  Staff.find().then((result) => {
    res.render("staffView", { title, staff: result });
  });
});
app.post("/staff", (req, res) => {
  console.log(req.body);
  const staff = Staff(req.body);
  staff.save().then(() => {
    res.redirect("/staffView");
  });
});

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const courseSchema = new schema(
  {
    course_ID: {
      type: Number,
      required: true,
    },
    course_desc: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    course_remarks: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

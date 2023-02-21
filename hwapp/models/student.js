const mongoose = require("mongoose");
const schema = mongoose.Schema;
const studentSchema = new schema(
  {
    Stud_ID: {
      type: Number,
      required: true,
    },
    stfname: {
      type: String,
      required: true,
    },
    stlname: {
      type: String,
      required: true,
    },
    stcourse: {
      type: String,
      required: true,
    },
    styear: {
      type: Number,
      required: true,
    },
    stcontact: {
      type: String,
      required: true,
    },
    stage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

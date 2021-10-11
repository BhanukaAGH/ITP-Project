const mongoose = require("mongoose");

const Supplier = mongoose.model("suppliers", {
  name: {
    type: String,
  },
  Phonenumber: {
    type: Number,
  },
  Email: {
    type: String,
  },
  Location: {
    type: String,
  },
  imgager: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = Supplier;

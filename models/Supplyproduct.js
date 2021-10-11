const mongoose = require("mongoose");

const Supplyproduct = mongoose.model("supplyproduct", {
  name: {
    type: String,
  },
  Category: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  Price: {
    type: Number,
  },
  date: {
    type: String,
  },
});

module.exports = Supplyproduct;

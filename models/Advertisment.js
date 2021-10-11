const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
    },
    images: [{ type: String, default: null }],
    //brand: {type: String, required: [true, "can't be blank"]},
    description: { type: String, required: [true, "can't be blank"] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Advertisment', ProductSchema)

const mongoose = require('mongoose')

require('./Store')

const Store = mongoose.model('Store')

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      lowercase: true,
      required: true,
    },
    images: [{ type: String, default: null }],
    brand: { type: String, required: true },
    model: { type: String, required: true },
    available: { type: Number, required: true },
    weight: {
      value: { type: Number, default: 0 },
      unit: { type: String, default: 'g' },
    },
    dimensions: {
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      length: { type: Number, default: 0 },
      unit: { type: String, default: 'mm' },
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
)

ProductSchema.methods.addStore = async function (amount) {
  try {

    const store = new Store({
      productId: this._id,
      date: new Date(),
      amount,
    })

    await store.save()

    this.available = this.available ? this.available + amount : amount
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = mongoose.model('Product', ProductSchema)

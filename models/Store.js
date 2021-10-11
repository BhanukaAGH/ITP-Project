const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  productId: mongoose.ObjectId,
  date: {type: Date, required: [true, 'cannot be blank']},
  amount: {type: Number, required: [true, 'cannot be blank'], min: 1}
}, {timestamps: true});

StoreSchema.index({itemId: 1});

mongoose.model('Store', StoreSchema);

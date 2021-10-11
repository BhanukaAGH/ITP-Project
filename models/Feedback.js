const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  productId: mongoose.ObjectId,
  name: {type: String, required: [true, 'cannot be blank']},
  feedback: {type: String, required: [true, 'cannot be blank']},
  time: {type: Date, required: [true, 'cannot be blank']}
}, {timestamps: true});

FeedbackSchema.index({productId: 1});

mongoose.model('Feedback', FeedbackSchema);

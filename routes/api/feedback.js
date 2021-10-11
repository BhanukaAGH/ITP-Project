const router = require('express').Router();
const mongo = require("mongodb");
require('../../models/Feedback');
const mongoose = require("mongoose");
const Feedback = mongoose.model('Feedback');

router.post('/send-feedback', async (request, response) => {

  const feedback = new Feedback({
    productId: new mongo.ObjectId(request.body._id),
    name: request.body.name,
    feedback: request.body.feedback,
    time: new Date()
  })

  try {

    await feedback.save();

    response.status(200).send({_id: feedback._id});

  } catch (error) {
    response.status(500).send({status: false, message: 'An unknown error occurred..!'})
  }

});

router.post('/get-feedbacks', async (request, response) => {

  try {

    const feedbacks = await Feedback.find({productId: new mongo.ObjectId(request.body._id)});
    response.status(200).send(feedbacks);

  } catch (error) {
    response.status(500).send({status: false, message: 'An unknown error occurred..!'})
  }

});

router.post('/delete-feedback', async (request, response) => {

  try {

    await Feedback.deleteOne({_id: new mongo.ObjectId(request.body._id)});
    response.status(200).send({status: true, message: 'Feedback successfully deleted..!'});

  } catch (error) {
    response.status(500).send({status: false, message: 'An unknown error occurred..!'})
  }

});

module.exports = router;

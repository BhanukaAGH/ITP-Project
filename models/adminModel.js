const mongoose = require('mongoose');

const postScheama = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    cardNo:{
        type:String,
        required:true
    },
    expm:{
        type:String,
        required:true
    },
    expy:{
        type:String,
        required:true
    },
    csv:{
        type:String,
        required:true
    }
   
});

module.exports = mongoose.model('Card' , postScheama); 
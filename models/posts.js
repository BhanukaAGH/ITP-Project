const mongoose = require('mongoose');

const postScheama = new mongoose.Schema({
    topic:{
        type:String,
        required:true

    },
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Posts' , postScheama); 
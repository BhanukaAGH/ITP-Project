const mongoose = require('mongoose');



const deliverySchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    pstate: {
        type: String,
        required: true
    },
    dtype: {
        type: String,
        required: true
    },
    ddate: {
        type: String,
        required: true
    },
    dname: {
        type: String,
        required: true
    },
    dstate: {
        type: String,
        required: true
    },


});
deliverySchema.index({'$**': 'text'});

module.exports=mongoose.model("Delivery", deliverySchema);
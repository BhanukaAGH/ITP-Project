const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    Cname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orderitems: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderdate: {
        type: String,
        required: true
    }


});

orderSchema.index({'$**': 'text'});

module.exports=mongoose.model("Order", orderSchema);

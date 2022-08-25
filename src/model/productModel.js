const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    NoOfProductSale:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true
    },
    currentDate:{

        type: Date,
        required:true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
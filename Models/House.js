const mongoose = require("mongoose")

const HouseSchema = mongoose.Schema({
        title:{
            type:String,
        },
        width:{
            type:Number
        },
        length:{
            type:Number
        },
        noBedrooms:{
            type:Number
        },
        size:{
            type:Number
        },
        propertyTypeRentSale:{
            type:String
        },
        price:{
            type:String
        },
        description:{
            type:String
        },
        file:{
            type:[String]
        },
        houseNo:{
            type:String
        },
        plotNo:{
            type:String
        },
        streetNo:{
            type:String
        },
        scheme:{
            type:String
        },
        sector:{
            type:String
        },
        city:{
            type:String
        },
        category:{
            type:String
        },
    },
    { timestamps: true }
);

const House= mongoose.model('House', HouseSchema);

module.exports = House ;
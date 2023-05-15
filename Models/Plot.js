const mongoose = require("mongoose")
//title, width,length,noBedrooms,size,propertyType,propertyTypeRentSale,east,north,price,description,houseFilePath,houseNo,streetNo,scheme,sector,city
const PlotSchema = mongoose.Schema({
        title:{
            type:String,
        },
        width:{
            type:Number
        },
        length:{
            type:Number
        },
        propertyType:{
            type:String
        },
        link:{
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
        plotNo:{
            type:String
        },
        streetNo:{
            type:String
        },
        sector:{
            type:String
        },
        city:{
            type:String
        },

    },
    { timestamps: true }
);

const Plot= mongoose.model('Plot', PlotSchema);

module.exports = Plot ;
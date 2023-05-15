const mongoose = require("mongoose")
//title, width,length,noBedrooms,size,propertyType,propertyTypeRentSale,east,north,price,description,houseFilePath,houseNo,streetNo,scheme,sector,city 
const PropertySchema = mongoose.Schema({    
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
    propertyType:{
        type:String
    },
    propertyTypeRentSale:{
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
    houseNo:{
        type:String
    },
    plotNo:{
        type:String
    },
    streetNo:{
        type:String
    },
    projectNo:{
        type:String
    },
    projectName:{
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
    propertySubType:{
        type:String
    }
    
    
},
{ timestamps: true }
);

const Property= mongoose.model('Property', PropertySchema);

module.exports = Property ;
const mongoose = require("mongoose")
//title, width,length,noBedrooms,size,propertyType,propertyTypeRentSale,east,north,price,description,houseFilePath,houseNo,streetNo,scheme,sector,city
const ProjectSchema = mongoose.Schema({
        title:{
            type:String,
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

const Project= mongoose.model('Project', ProjectSchema);

module.exports = Project
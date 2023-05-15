const mongoose = require("mongoose")
const MapSchema = mongoose.Schema({    
    title:{
        type:String,
    },
    description:{
        type:String
    },
    link:{
        type:String
    },
    
    file:{
        type:[String]
    },
    

},
{ timestamps: true }
);

const Map = mongoose.model('Map', MapSchema);

module.exports = Map ;
const mongoose = require("mongoose")
const UserSchema1 = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }

},
{ timestamps: true }
);






const User = mongoose.model('ZeeshanUser', UserSchema1);

module.exports = User;
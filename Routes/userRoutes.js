
const { signup, login , getAllUsers} = require("../Controller/userController");

const userRoter = require("express").Router();


userRoter.post("/signup" , signup)
userRoter.post('/login' , login)
userRoter.get('/' , getAllUsers)



module.exports = userRoter;




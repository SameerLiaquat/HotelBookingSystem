
const { getAllProperties,getProperty,createProperty,updateProperty, deleteProperty} = require("../Controller/propertyController");

const propertyRouter = require("express").Router();
const upload=require("../Middlewares/middlewares")
const {verifyAdmin, verifyToken} = require("../Middlewares/middlewares");


propertyRouter.get("/" ,verifyToken, getAllProperties)
propertyRouter.get("/:id",verifyToken , getProperty)

propertyRouter.post("/",verifyToken, verifyAdmin,upload , createProperty)

propertyRouter.delete("/:id",verifyToken,verifyAdmin,deleteProperty)
propertyRouter.patch("/:id",verifyToken,verifyAdmin,upload,updateProperty)


module.exports = propertyRouter;




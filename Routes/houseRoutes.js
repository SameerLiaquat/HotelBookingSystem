
const { getAllHouses,getHouse,createHouse,updateHouse,deleteHouse} = require("../Controller/houseController");

const houseRouter = require("express").Router();
const upload=require("../Middlewares/middlewares")
const {verifyAdmin, verifyToken} = require("../Middlewares/middlewares");


houseRouter.get("/" ,verifyToken, getAllHouses)
houseRouter.get("/:id",verifyToken , getHouse)

houseRouter.post("/",verifyToken, verifyAdmin,upload , createHouse)

houseRouter.delete("/:id",verifyToken,verifyAdmin,deleteHouse)
houseRouter.patch("/:id",verifyToken,verifyAdmin,upload,updateHouse)


module.exports = houseRouter;




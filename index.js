const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
require("dotenv").config();
const cors = require("cors")



const userRouter = require("./Routes/userRoutes");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/files",express.static('public/uploads'));

app.use( '/user', userRouter)


// app.post("/middlewares",middlewares,(req,res)=>{
//     console.log(req.body.file)
//     res.send("Upload")
// })


app.listen(process.env.PORT||3005 , ()=>{
    console.log(`App Listning at Port 3005`)
})

MONGODB_URI='mongodb+srv://sameer:1234@cluster0.n30upkk.mongodb.net/test'
// MONGODB_URI = "mongodb+srv://zeeshan:asdfg12345@cluster0.q8osuvr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI).then(err=>{
        console.log("Connected")
})
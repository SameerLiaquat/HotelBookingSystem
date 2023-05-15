const User = require("../Models/User");

let signup = (req, res) => {
    let { username, password, role } = req.body;

    let user = new User({
        username,
        password,
        role
    });
    user.save().then((user) => {
        res.status(200).send({ message: "User created", user })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let login = (req, res) => {
    let { username, password, role } = req.body;
    User.findOne({ username: username, role: role }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not Found" })
        }
        else {
            if (user.password == password) {
                let token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    role: user.role,
                }, process.env.SECRET_KEY, { expiresIn: '24h' })
                res.status(200).send({ message: "User Found", user, token: token })
            } else {
                res.status(500).send({ message: "Password invalid" })
            }
        }
    })
}

let getAllUsers = (req , res)=>{
    console.log("ALL Users")
    User.find({}).then((users)=>{
        res.status(200).send({message:"Users fetched",users})
    }).catch(err=>{
        res.status(500).send({message:"Error",err})
    })
}
module.exports = {
    signup,
    login,
    getAllUsers

}
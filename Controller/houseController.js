const { BASE_FILE_URL } = require("../BaseURL");
const { deleteFile } = require("../DeleteFile");
const House = require("../Models/House");

//title, width,length,noBedrooms,size,propertyType,propertyTypeRentSale,east,north,price,description,file,propertyNo,streetNo,scheme,sector,city



let getAllHouses = (req, res) => {
    House.find({}).then((houses) => {
        houses.forEach(house => {
            let files = house.file
            if (files && files.length > 0) {
                files.forEach((file, i) => {
                    files[i] = BASE_FILE_URL + file
                })
            } else {
                house.file = []
                let defaultProp = BASE_FILE_URL;
                defaultProp += "default_house.png"
                house.file.push(defaultProp)
            }
        })
        res.status(200).send({ message: "Houses fetched", houses })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}

let getHouse = (req, res) => {
    let { id } = req.params
    console.log(id,"House get")

    House.findOne({ _id: id }).then((house) => {
        let files = house.file
        if (files && files.length > 0) {
            files.forEach((file, i) => {
                files[i] = BASE_FILE_URL + file
            })
        } else {
            house.file = []
            let defaultProp = BASE_FILE_URL;
            defaultProp += "default_house.png"
            house.file.push(defaultProp)
        }
        console.log(house)
        res.status(200).send({ message: "House found", house })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}


let deleteHouse = (req, res) => {
    let { id } = req.params
    House.findOne({ _id: id }).then((house) => {
        house.file.forEach(p=>deleteFile(p))
    }).catch(err => {
    })
    House.deleteOne({ _id: id }).then((house) => {
        res.status(200).send({ message: "House deleted", house })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let updateHouse = (req, res) => {
    let { id } = req.params
    let propertyData = req.body;
    var myquery = { _id: id };
    var newvalues = { $set: { ...propertyData } };
    let { file } = propertyData
    if (file && file.length > 0) {
        House.findOne({ _id: id }).then((house) => {
            house.file.forEach(f => deleteFile(f))
        }).catch(err => {
        })
    }
    House.findOneAndUpdate(myquery, newvalues, { new: true }).then((house) => {
        res.status(200).send({ message: "House updated", house })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let createHouse = (req, res) => {
    let propertyData = { ...req.body };
    console.log(propertyData)

    let house = new House({ ...propertyData });

    house.save().then((house) => {
        res.status(201).send({ message: "House Saved", house })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}




module.exports = {
    getAllHouses,
    createHouse,
    deleteHouse,
    getHouse,
    updateHouse
}

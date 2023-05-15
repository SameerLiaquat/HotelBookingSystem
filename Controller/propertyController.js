const { BASE_FILE_URL } = require("../BaseURL");
const { deleteFile } = require("../DeleteFile");
const Property = require("../Models/Property");

//title, width,length,noBedrooms,size,propertyType,propertyTypeRentSale,east,north,price,description,file,propertyNo,streetNo,scheme,sector,city 



let getAllProperties = (req, res) => {
    Property.find({}).then((properties) => {
        properties.forEach(property => {
            let files = property.file
            if (files && files.length > 0) {
                files.forEach((file, i) => {
                    files[i] = BASE_FILE_URL + file
                })
            } else {
                property.file = []
                let defaultProp = BASE_FILE_URL;
                if (property.category == "project")
                    defaultProp += "default_project.png"
                else if (property.category == "house")
                    defaultProp += "default_house.png"
                else if (property.category == "plot")
                    defaultProp += "default_plot.jpg"
                property.file.push(defaultProp)
            }
        })
        res.status(200).send({ message: "Propertys fetched", properties })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}

let getProperty = (req, res) => {
    let { id } = req.params
    console.log(id,"Propert get")

    Property.findOne({ _id: id }).then((property) => {
        let files = property.file
        if (files && files.length > 0) {
            files.forEach((file, i) => {
                files[i] = BASE_FILE_URL + file
            })
        } else {
            property.file = []
            let defaultProp = BASE_FILE_URL;
            if (property.category == "project")
                defaultProp += "default_project.png"
            else if (property.category == "house")
                defaultProp += "default_house.png"
            else if (property.category == "plot")
                defaultProp += "default_plot.jpg"
            property.file.push(defaultProp)
        }
        console.log(property)    
        res.status(200).send({ message: "Property found", property })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}


let deleteProperty = (req, res) => {
    let { id } = req.params
    Property.findOne({ _id: id }).then((property) => {
        property.file.forEach(p=>deleteFile(p))
    }).catch(err => {
    })
    Property.deleteOne({ _id: id }).then((property) => {
        res.status(200).send({ message: "Property deleted", property })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let updateProperty = (req, res) => {
    let { id } = req.params
    let propertyData = req.body;
    var myquery = { _id: id };
    var newvalues = { $set: { ...propertyData } };
    let { file } = propertyData
    if (file && file.length > 0) {
        Property.findOne({ _id: id }).then((property) => {
            property.file.forEach(f => deleteFile(f))
        }).catch(err => {
        })
    }
    Property.findOneAndUpdate(myquery, newvalues, { new: true }).then((property) => {
        res.status(200).send({ message: "Property updated", property })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let createProperty = (req, res) => {
    let propertyData = { ...req.body };
    console.log(propertyData)

    let property = new Property({ ...propertyData });

    property.save().then((property) => {
        res.status(201).send({ message: "Property Saved", property })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}




module.exports = {
    getAllProperties,
    createProperty,
    deleteProperty,
    getProperty,
    updateProperty
}
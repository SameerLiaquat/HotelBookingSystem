const Map = require("../Models/Map");
const { BASE_FILE_URL } = require('../BaseURL')
const { deleteFile } = require('../DeleteFile')
const defaultMap = "default_map.png"

let createMap = (req, res) => {
    let { title, link, description, file } = req.body
    let mapData = { title, link, description, file }
    console.log(mapData)
    let map = new Map({
        ...mapData
    });
    map.save().then((map) => {
        res.status(201).send({ message: "Map Saved", map })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let getAllMaps = (req, res) => {
    Map.find({}).then((data) => {
        data.forEach(d => {
            if(d.file && d.file.length>0)
                d.file = BASE_FILE_URL + d.file
            else
                d.file = BASE_FILE_URL + defaultMap
        })
        res.status(200).send({ message: "Maps fetched", data })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let getMap = (req, res) => {
    let { id } = req.params
    Map.findOne({ _id: id }).then((map) => {
        res.status(200).send({ message: "Map found", map })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let deleteMap = (req, res) => {
    let { id } = req.params
    Map.findOne({ _id: id }).then((map) => {
        deleteFile(map.file)
    }).catch(err => {
    })

    Map.deleteOne({ _id: id }).then((map) => {
        res.status(200).send({ message: "Map deleted", map })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })
}
let updateMap = (req, res) => {
    let { id } = req.params
    let { title, file, link, description } = req.body;
    if (file) {
        file = file[0]
    }

    var myquery = { _id: id };
    var newvalues = {
        $set: {
            title, file, description, link
        }
    };
    if(file){
        Map.findOne({ _id: id }).then((map) => {
            deleteFile(map.file)
        }).catch(err => {
        })    
    }

    Map.findOneAndUpdate(myquery, newvalues, { new: true }).then((map) => {
        res.status(200).send({ message: "Map updated", map })
    }).catch(err => {
        res.status(500).send({ message: "Error", err })
    })

}


module.exports = {
    getAllMaps,
    createMap,
    deleteMap,
    getMap,
    updateMap
}
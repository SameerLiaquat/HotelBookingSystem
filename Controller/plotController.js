const { BASE_FILE_URL } = require("../BaseURL");
const { deleteFile } = require("../DeleteFile");
const Plot = require("../Models/Plot");


    function getAllPlots(req, res) {
        Plot.find({})
            .then((plots) => {
                plots.forEach((plot) => {
                    let files = plot.file;
                    if (files && files.length > 0) {
                        files.forEach((file, i) => {
                            files[i] = BASE_FILE_URL + file;
                        });
                    } else {
                        plot.file = [];
                        let defaultProp = BASE_FILE_URL;
                        defaultProp += "default_plot.png";
                        plot.file.push(defaultProp);
                    }
                });
                res.status(200).send({ message: "Plots fetched", plots });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function getPlot(req, res) {
        let { id } = req.params;
        console.log(id, "Plot get");

        Plot.findOne({ _id: id })
            .then((plot) => {
                let files = plot.file;
                if (files && files.length > 0) {
                    files.forEach((file, i) => {
                        files[i] = BASE_FILE_URL + file;
                    });
                } else {
                    plot.file = [];
                    let defaultProp = BASE_FILE_URL;
                    defaultProp += "default_plot.png";
                    plot.file.push(defaultProp);
                }
                console.log(plot);
                res.status(200).send({ message: "Plot found", plot });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function deletePlot(req, res) {
        let { id } = req.params;
        Plot.findOne({ _id: id })
            .then((plot) => {
                plot.file.forEach((p) => deleteFile(p));
            })
            .catch((err) => {});
        Plot.deleteOne({ _id: id })
            .then((plot) => {
                res.status(200).send({ message: "Plot deleted", plot });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function updatePlot(req, res) {
        let { id } = req.params;
        let plotData = req.body;
        var myquery = { _id: id };
        var newvalues = { $set: { ...plotData } };
        let { file } = plotData;
        if (file && file.length > 0) {
            Plot.findOne({ _id: id })
                .then((plot) => {
                    plot.file.forEach((f) => deleteFile(f));
                })
                .catch((err) => {});
        }
        Plot.findOneAndUpdate(myquery, newvalues, { new: true })
            .then((plot) => {
                res.status(200).send({ message: "Plot updated", plot });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function createPlot(req, res) {
        let plotData = { ...req.body };
        console.log(plotData);

        let plot = new Plot({ ...plotData });

        plot
            .save()
            .then((plot) => {
                res.status(201).send({ message: "Plot saved", plot });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            }
        );
    }

module.exports = {
    getAllPlots,
    createPlot,
    deletePlot,
    getPlot,
    updatePlot
}
